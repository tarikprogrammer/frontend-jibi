import { Component } from '@angular/core';
import {CreancierService} from "../../../services/creancierServices/creancier.service";
import {Router} from "@angular/router";
import {FormBuilder, FormGroup} from "@angular/forms";
import {CreanceService} from "../../../services/creanceService/creance.service";

@Component({
  selector: 'app-creance-chosed',
  templateUrl: './creance-chosed.component.html',
  styleUrls: ['./creance-chosed.component.css']
})
export class CreanceChosedComponent {
  currentCreancier:any=this.creancierService.currentCreancier;
  imageCreancier:string="../../assets/media/";
  creanceRequest!:FormGroup;
  constructor(public creancierService:CreancierService,private router:Router,private fb:FormBuilder,public creanceServices:CreanceService) {
  }

  setCeance(creance: any) {
    this.creanceRequest=this.fb.group({
      "creance":[creance]
    })
    this.creanceServices.getCreance(this.creanceRequest).subscribe((response:any)=>{
      if(response!=null){
        this.creanceServices.creanceCurrent=response;
        console.log("response",response);
        this.creancierService.showRouter=true;
        this.creancierService.showPaiement=true;
        this.router.navigateByUrl("/client/factures/paiement");
      }
    })
  }

  retour() {
    this.creancierService.showRouter=false;
    this.creancierService.showPaiement=false;
    this.router.navigateByUrl("/client/factures/factures")
  }
}
