import { Component } from '@angular/core';
import {HistoriqueService} from "../../../services/transactions/historique.service";
import {HttpClient} from "@angular/common/http";
import {FormBuilder, FormGroup} from "@angular/forms";
import Swal from "sweetalert2";

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent {
  isQrChoosed:boolean=false;
  isRIBChoosed:boolean=false;
  fileToUpload: File | null = null;
  ribData: any = null;
  errorMessage: string | null = null;
  formTransaction!:FormGroup;
  buttonClicked:boolean=false;
  currentClient=sessionStorage.getItem('currentClient');

  constructor(public qrTransaction:HistoriqueService,private http:HttpClient,private fb:FormBuilder) {
  }

  getSession(){
    return this.currentClient ? JSON.parse(this.currentClient):null;
  }

  annuler() {

  }

  typeTransaction(event:any) {
    const requestType=event.target.value;
    console.log(requestType)
    switch (requestType){
      case "RIB":
        this.isRIBChoosed=true;
        break;
      case "QR CODE":
        this.isQrChoosed=true;
        break;
      default:
        this.isQrChoosed=false;
        this.isRIBChoosed=false;
    }
  }

  getImageQr(file:any){
    console.log(file.target.files);
    const fileUpload=file.target.files;
    if(fileUpload.length>0){
      this.handleFileInput(fileUpload);
    }
  }
  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
    console.log(this.fileToUpload)
  }
  parseRIBData(decodedText: string) {
    const ribLines = decodedText.split('\n');
    return {
      iban: ribLines[0] || '',
      bic: ribLines[1] || ''
    };
  }

  uploadFileToActivity() {
    this.buttonClicked=true;
    if (this.fileToUpload) {
      this.qrTransaction.decodeQrCode(this.fileToUpload).subscribe(
        decodedText => {
          this.ribData = this.parseRIBData(decodedText);
          console.log(this.ribData.iban)
          this.errorMessage = null;
        },
        error => {
          this.errorMessage = error;
          this.ribData = null;
        }
      );
    }
    this.formTransaction=this.fb.group({
      rib:[],
      amount:[],
      senderId:[this.getSession().id]
    })
    if(this.isQrChoosed){
      this.formTransaction.get('rib')?.setValue(this.ribData.iban.RIB);
    }

    this.qrTransaction.sendTransaction(this.formTransaction).subscribe((response)=>{
      setTimeout(()=>{
        if(response){
          this.buttonClicked=false;
          Swal.fire({
            icon: "success",
            title: "Transaction done",
            showConfirmButton: false,
            timer: 5500,
            width:'300px',
            background:'white',
            customClass: {
              title: 'custom-swal-title',
              popup: 'custom-swal-popup'
            }
          });

        }else{
          this.buttonClicked=false;
          Swal.fire({
            icon: "error",
            title: "Transaction echouée",
            showConfirmButton: false,
            timer: 5500,
            width:'300px',
            background:'white',
            customClass: {
              title: 'custom-swal-title',
              popup: 'custom-swal-popup'
            }
          });
        }
      },3000)
    })

  }
}
