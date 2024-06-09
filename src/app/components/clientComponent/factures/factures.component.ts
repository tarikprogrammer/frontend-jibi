import {AfterViewInit, Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {CreancierService} from "../../../services/creancierServices/creancier.service";
import {RouterClientService} from "../../../services/RouterShared/router-client.service";


@Component({
  selector: 'app-factures',
  templateUrl: './factures.component.html',
  styleUrls: ['./factures.component.css']
})
export class FacturesComponent implements OnInit,AfterViewInit{
  showRouter=false;
 /* listCreanciers!:any;*/
  imageCreancier:string="../../assets/media/";
  paiementRouter=false;
  listCreanciers=sessionStorage.getItem('creanciers');
  listodCreanciers=this.creancierService.listCeanciers;
  constructor(private router:Router,public creancierService:CreancierService,public sharedRouter:RouterClientService) {
  }
  ngOnInit(): void {
    this.sharedRouter.linkClick=false;
    console.log("this.sharedRouter.linkClick=false",this.sharedRouter.linkClick=false)
  }
  ngAfterViewInit(): void {
    this.sharedRouter.linkClick=false;

  }
  setHome() {
    this.showRouter=false;
    this.creancierService.showRouter=this.showRouter;
  }

  setHistorique() {
    this.showRouter=true;
    this.creancierService.showRouter=this.showRouter;
  }
 getSession(){
   return this.listCreanciers ? JSON.parse(this.listCreanciers):null
 }

  setFactures(creance_id: any) {
   this.creancierService.currentCreancier=this.creancierService.listCeanciers.filter((creancier:any)=>creancier.creancier_id==creance_id)
    /*console.log(this.listodCreanciers.filter((creancier:any)=>creancier.creancier_id==creancier_id))*/
    console.log(this.creancierService.currentCreancier)

    this.showRouter=true;
    this.creancierService.showRouter=this.showRouter;
    this.paiementRouter=true;
    this.creancierService.showPaiement=this.paiementRouter;
    this.router.navigateByUrl("/client/factures/creance")
  }

  filterByCategory(event:any) {
    console.log(event.target.value);
    let creancierItem:any;
    if(this.creancierService.listCeanciers.length==5){
      this.listodCreanciers=this.creancierService.listCeanciers;

    }
    if(creancierItem!=event.target.value){
      this.creancierService.listCeanciers=this.listodCreanciers;
    }
    if(event.target.value!="all") {
      this.creancierService.listCeanciers = this.creancierService.listCeanciers.filter((creancier: any) => {
        if (event.target.value) {
          creancierItem = event.target.value;
          return creancier.logoName.includes(event.target.value);
        }
      })
    }

  }


}
