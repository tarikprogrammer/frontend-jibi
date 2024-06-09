import {Component, OnInit} from '@angular/core';
import {CreancierService} from "../../../services/creancierServices/creancier.service";
import {Router} from "@angular/router";
import {FormBuilder, FormGroup} from "@angular/forms";
import {AccountServicesService} from "../../../services/account/account-services.service";
import Swal from "sweetalert2";
import {OtpServicesService} from "../../../services/otp/otp-services.service";
import {HistoriqueService} from "../../../services/transactions/historique.service";
@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.css']
})

export class OtpComponent implements OnInit {
  clientPaiement!:FormGroup;
  isClick:boolean=false;
  OtpForm1!:FormGroup;
  OtpForm2!:FormGroup;
  OtpForm3!:FormGroup;
  OtpForm4!:FormGroup;
  OtpForm5!:FormGroup;
  OtpForm6!:FormGroup;
  OtpFinale!:FormGroup;
  otpIn:string="";
  historiqueFactures!:FormGroup;
  currentClient=sessionStorage.getItem('currentClient');

  ngOnInit(): void {
    this.OtpForm1=this.fb.group({
      otp:['']
    })
    this.OtpForm2=this.fb.group({
      otp:['']
    })
    this.OtpForm3=this.fb.group({
      otp:['']
    })
    this.OtpForm4=this.fb.group({
      otp:['']
    })
    this.OtpForm5=this.fb.group({
      otp:['']
    })
    this.OtpForm6=this.fb.group({
      otp:['']
    })

   console.log("this.otpIn",this.otpIn);
    console.log("this.OtpFinale",this.OtpFinale)
  }
  constructor(public creancierServices:CreancierService,private router:Router,private fb:FormBuilder,private accountServices:AccountServicesService,private otpverify:OtpServicesService,public historique:HistoriqueService) {
  }
  getSession(){
    return this.currentClient ? JSON.parse(this.currentClient):null;
  }
  payer() {
    this.isClick=true;
    this.clientPaiement=this.fb.group({
      ref:[this.creancierServices.creancierPaiement.ref],
      solde:[this.creancierServices.creancierPaiement.solde],
      phone:[this.getSession().phone],
      impayes:[this.creancierServices.creancierPaiement.impayes]
    })
    this.otpIn=this.OtpForm1.get('otp')?.value+this.OtpForm2.get('otp')?.value+this.OtpForm3.get('otp')?.value+this.OtpForm4.get('otp')?.value+this.OtpForm5.get('otp')?.value+this.OtpForm6.get('otp')?.value;
    this.OtpFinale=this.fb.group({
      otp:[this.otpIn]
    })
    console.log("this.otpIn",this.otpIn);
    console.log("this.OtpFinale",this.OtpFinale.value)
    setTimeout(()=>{
      this.otpverify.verifyOtp(this.OtpFinale).subscribe((response)=>{
        if(response){
          this.accountServices.effectuerPaiement(this.clientPaiement).subscribe((responsePaiement)=>{
            this.isClick=false;
            if(responsePaiement){
              /*---------------------debut de enregistrement de transaction --------------*/
              this.historiqueFactures=this.fb.group({
                fname:[this.getSession().fname],
                facturePaye:[this.creancierServices.creancierPaiement.creance],
                montant:[this.creancierServices.factureTotal],
                phone:[this.getSession().phone]
              })
              /*------------------ save transaction------------*/
              this.historique.saveHistorique(this.historiqueFactures).subscribe();

              /*---------------------- fin code pour transaction------------------------*/
              Swal.fire({
                icon: "success",
                title: "votre paiement a été effectué avec succès",
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
            }
          })
        }else{
          Swal.fire({
            icon: "error",
            title: "otp n'est pas valide",
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


}
