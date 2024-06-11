import {Component, OnInit} from '@angular/core';
import {HistoriqueService} from "../../../services/transactions/historique.service";
import {HttpClient} from "@angular/common/http";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import Swal from "sweetalert2";

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit{
  isQrChoosed:boolean=false;
  isRIBChoosed:boolean=false;
  ribValue!:any;
  fileToUpload: File | null = null;
  ribData: any = null;
  errorMessage: string | null = null;
  formTransaction!:FormGroup;
  buttonClicked:boolean=false;
  currentClient=sessionStorage.getItem('currentClient');

  constructor(public qrTransaction:HistoriqueService,private http:HttpClient,private fb:FormBuilder) {
  }
 ngOnInit() {
    this.formTransaction=this.fb.group({
      rib:[this.ribValue],
      amount:[''],
      senderId: [this.getSession().id]

    })
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
      console.log("entred")
      this.qrTransaction.decodeQrCode(this.fileToUpload).subscribe(
        decodedText => {
          console.log("hellooo")
          this.ribData = this.parseRIBData(decodedText);
          const ibanData = JSON.parse(this.ribData.iban);
          this.ribValue = ibanData.RIB;
          if(this.ribValue){
            this.formTransaction.get('rib')?.setValue(this.ribValue);
          }
          const ribControl = this.formTransaction.get('rib');
          console.log(this.formTransaction.value)
          console.log("this.formTransaction.value",this.formTransaction.value)
          if(ribControl && ribControl.value) {
            this.qrTransaction.sendTransaction(this.formTransaction).subscribe((response) => {
              setTimeout(() => {
                if (response) {
                  this.buttonClicked = false;
                  Swal.fire({
                    icon: "success",
                    title: "Transaction done",
                    showConfirmButton: false,
                    timer: 5500,
                    width: '300px',
                    background: 'white',
                    customClass: {
                      title: 'custom-swal-title',
                      popup: 'custom-swal-popup'
                    }
                  });

                } else {
                  this.buttonClicked = false;
                  Swal.fire({
                    icon: "error",
                    title: "Transaction echouée",
                    showConfirmButton: false,
                    timer: 5500,
                    width: '300px',
                    background: 'white',
                    customClass: {
                      title: 'custom-swal-title',
                      popup: 'custom-swal-popup'
                    }
                  });
                }
              }, 3000)
            })
          }

        },
        error => {
          console.log("errror")
          this.errorMessage = error;
          this.ribData = null;
        }
      );

    }
    /*if(this.isQrChoosed){
      console.log(this.ribValue)

      console.log("this.formTransaction.get('rib')?.setValue(this.ribValue);",this.formTransaction.get('rib')?.setValue(this.ribValue))
    }*/

  }
  /*uploadFileToActivity() {
    this.buttonClicked = true;
    if (this.fileToUpload) {
      this.qrTransaction.decodeQrCode(this.fileToUpload).subscribe(
        decodedText => {
          this.ribData = this.parseRIBData(decodedText);
          const ibanData = JSON.parse(this.ribData.iban);
          this.ribValue = ibanData.RIB;
          if (this.ribValue) {
            this.formTransaction.get('rib')?.setValue(this.ribValue);
          }
          console.log("this.ribValue", this.ribValue);
          this.errorMessage = null;

          // Now proceed to send the transaction
          const ribControl = this.formTransaction.get('rib');
          if (ribControl && ribControl.value) {
            console.log("this.formTransaction.value", this.formTransaction.value);
            this.qrTransaction.sendTransaction(this.formTransaction.value).subscribe(response => {
              setTimeout(() => {
                if (response) {
                  this.buttonClicked = false;
                  Swal.fire({
                    icon: "success",
                    title: "Transaction done",
                    showConfirmButton: false,
                    timer: 5500,
                    width: '300px',
                    background: 'white',
                    customClass: {
                      title: 'custom-swal-title',
                      popup: 'custom-swal-popup'
                    }
                  });
                } else {
                  this.buttonClicked = false;
                  Swal.fire({
                    icon: "error",
                    title: "Transaction failed",
                    showConfirmButton: false,
                    timer: 5500,
                    width: '300px',
                    background: 'white',
                    customClass: {
                      title: 'custom-swal-title',
                      popup: 'custom-swal-popup'
                    }
                  });
                }
              }, 3000);
            });
          } else {
            console.log("ribControl is null or ribControl.value is null");
          }
        },
        error => {
          console.log("error");
          this.errorMessage = error;
          this.ribData = null;
        }
      );
    } else {
      console.log(this.formTransaction.value);
    }
  }*/

}
