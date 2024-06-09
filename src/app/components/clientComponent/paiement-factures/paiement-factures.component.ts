import {Component, OnInit} from '@angular/core';
import {CreancierService} from "../../../services/creancierServices/creancier.service";
import {Router} from "@angular/router";
import {FormBuilder, FormGroup} from "@angular/forms";
import {CreanceService} from "../../../services/creanceService/creance.service";

@Component({
  selector: 'app-paiement-factures',
  templateUrl: './paiement-factures.component.html',
  styleUrls: ['./paiement-factures.component.css']
})
export class PaiementFacturesComponent implements OnInit{
  currentCreancier:any=this.creanceServices.creanceCurrent;
  imageCreancier:string="../../assets/media/";
  paiementForm!:FormGroup;
  phoneNumberStatement="";
  inputShow=false;
  isMyPhone=false;
  referenceValid:boolean=false;
  isClick:boolean=false;
  recharchePaiement:boolean=false;
  donation:boolean=false;
  electricity:boolean=false;
  currentClient=sessionStorage.getItem('currentClient');
  getSession(){
    return this.currentClient ? JSON.parse(this.currentClient):null;
  }
  constructor(public creanceServices:CreanceService,private router:Router,private fb:FormBuilder,public crencierServices:CreancierService ) {
  }

  ngOnInit(): void {
    switch (this.creanceServices.creanceCurrent.logoName){
      case "IAM RECHARGES":
          this.recharchePaiement=true;
          break;
      case "IAM FACTURES":
        this.recharchePaiement=true;
        break;
      case "REDAL":
        this.electricity=true;
        break;
      case "AMENDIS TANGER":
        this.electricity=true;
        break;
      case "ALCS":
        this.donation=true;
        break;
      default:
        this.donation=false;
        this.electricity=false;
        this.recharchePaiement=false;

    }
   this.paiementForm=this.fb.group({
     solde:[''],
     creance:[this.currentCreancier.creance]
   })

  }

  annuler() {
    this.crencierServices.showRouter=false;
    this.crencierServices.showPaiement=false;
    this.router.navigateByUrl("/client/factures/factures")
  }

  valider() {
    this.isClick=true
    this.crencierServices.sendCreancier(this.paiementForm).subscribe((response:any)=>{
      this.crencierServices.creancierPaiement=response;
       setTimeout(()=>{
         this.router.navigateByUrl("/client/factures/confirm");
       },3000)

    })
  }

  phoneNumber(event:any) {
    console.log(event.target.value);
    this.phoneNumberStatement=event.target.value;
    if(this.phoneNumberStatement!=""){
      this.inputShow=true;
    }
    if(this.phoneNumberStatement=="mon numero de telephone"){
      this.isMyPhone=true;
    }
  }
}
