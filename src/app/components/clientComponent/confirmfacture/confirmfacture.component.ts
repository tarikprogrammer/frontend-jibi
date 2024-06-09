import {AfterViewInit, Component} from '@angular/core';
import {CreancierService} from "../../../services/creancierServices/creancier.service";
import {Router} from "@angular/router";
import {FormBuilder, FormGroup} from "@angular/forms";
import {AccountServicesService} from "../../../services/account/account-services.service";
import Swal from "sweetalert2";
import {document} from "postcss";
import {OtpServicesService} from "../../../services/otp/otp-services.service";

@Component({
  selector: 'app-confirmfacture',
  templateUrl: './confirmfacture.component.html',
  styleUrls: ['./confirmfacture.component.css']
})
export class ConfirmfactureComponent implements AfterViewInit{
  imageCreancier:string="../../assets/media/";
  currentClient=sessionStorage.getItem('currentClient');
  clientPaiement!:FormGroup;
  isClick:boolean=false;
  total!: number;
  impayesSplit:any[]=[];
  otpForm!:FormGroup;
 constructor(public creancierServices:CreancierService,private router:Router,private fb:FormBuilder,private accountServices:AccountServicesService,private otpServices:OtpServicesService) {
 }
  getSession(){
    return this.currentClient ? JSON.parse(this.currentClient):null;
  }

  annuler() {
    this.router.navigateByUrl("client/factures/paiement")
  }
  confirmer() {
   this.isClick=true;
    this.clientPaiement=this.fb.group({
      /*ref:[this.creancierServices.creancierPaiement.ref],*/
      solde:[this.creancierServices.creancierPaiement.solde],
      phone:[this.getSession().phone],
      /*impayes:[this.creancierServices.creancierPaiement.impayes]*/
    })
    this.otpForm=this.fb.group({
      phone:[this.getSession().phone],
      fname:[this.getSession().fname]
    })
    setTimeout(()=>{
      this.accountServices.verifySolde(this.clientPaiement).subscribe((response)=>{
        this.isClick=false;
        if(response){
          /*send otp*/
          this.otpServices.sendOtp(this.otpForm).subscribe();
          Swal.fire({
            icon: "success",
            title: "votre paiement a été enregistrer avec succès",
            showConfirmButton: false,
            timer: 5500,
            width:'300px',
            background:'white',
            customClass: {
              title: 'custom-swal-title',
              popup: 'custom-swal-popup'
            }
          });
          setTimeout(()=>{
            this.router.navigateByUrl("/client/factures/otp")
          },5500)
        }else {
          Swal.fire({
            icon: "error",
            title: "votre solde n'est pas suffisant",
            showConfirmButton: false,
            timer: 5500,
            width:'300px',
            background:'white',
            color:'red',
            customClass: {
              title: 'custom-swal-title-error',
              popup: 'custom-swal-popup'
            }
          });
        }

      })
    },4000)
  }
  calculateTotal(): void {
    const solde = Number(this.creancierServices.creancierPaiement.solde || 0);
   /* const impayes = Number(this.creancierServices.creancierPaiement.impayes || 0);*/
    let imapyes=this.creancierServices.creancierPaiement.impayes;
    this.impayesSplit=imapyes.split("%");
    const impaye=Number(this.impayesSplit[0]);
    this.total = solde + (solde * (impaye/100));
    this.creancierServices.factureTotal=this.total;
  }

  ngAfterViewInit(): void {
   this.calculateTotal();
  }
}
