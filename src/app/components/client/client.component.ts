import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {AuthAgentService} from "../../services/authAgent/auth-agent.service";
import Chart from "chart.js/auto";
import {AuthClientService} from "../../services/authClient/auth-client.service";
import {CreancierService} from "../../services/creancierServices/creancier.service";
import {AccountServicesService} from "../../services/account/account-services.service";
import {RouterClientService} from "../../services/RouterShared/router-client.service";
import {HistoriqueService} from "../../services/transactions/historique.service";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent {
  logoUrl:string="../../assets/media/logo.png";
  isShow:boolean=false;
  linkClick:boolean=true;
  coverPath:string="../../assets/images/";
  notificationAgent:string="";
  isChangePass=false;
  formHistorique!:FormGroup;
  listofTransaction:Object=[];
  formRef!:FormGroup;
  currentClient=sessionStorage.getItem('currentClient');
  updatePass=sessionStorage.getItem(this.getSession().phone);
  slideConfig = {
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    dots: true,
    autoplay: true,
    autoplaySpeed: 2000
  };
  changeCover:boolean=false;
  private listCreanciers: any;
  constructor(private router:Router,public agentService:AuthAgentService,public clientService:AuthClientService,private creancierService:CreancierService,private account:AccountServicesService,public sharedRouter:RouterClientService,public getHisto:HistoriqueService,private fb:FormBuilder) {
  }
  ngOnInit(): void {
    this.setHome();
  }
  ngAfterViewInit(): void {
    this.notificationAgent="change your password";
    const audio = new Audio("../../assets/audio/notification.mp3");
    setTimeout(()=>{
      if(!this.getSessionUpdatePass()) {
        this.isChangePass = true
      }
      /*audio.play();*/
    },3000)
    setTimeout(()=>{
      this.isChangePass=false
    },10000)

  }
  getSession(){
    return this.currentClient ? JSON.parse(this.currentClient):null;
  }

  getSessionUpdatePass(){
    return this.updatePass ? JSON.parse(this.updatePass):null;
  }





  showAside() {
    this.isShow=true;

  }

  dismissAside() {
    this.isShow=false;
  }
  isClick(){

  }

  setHome() {
    this.sharedRouter.linkClick=true;
    this.formHistorique=this.fb.group({
      phone:[this.getSession().phone]
    })
    this.getHisto.getTransaction(this.formHistorique).subscribe((response)=>{
      this.listofTransaction=response;
      console.log("this.listofTransaction",this.listofTransaction)
    })
    setTimeout(()=>{
      this.router.navigateByUrl('/client');
    },1000)
    this.ngAfterViewInit();

  }


  setProfile() {
    this.sharedRouter.linkClick=false
    this.isChangePass=!this.isChangePass;
    this.router.navigateByUrl("/client/update-password")

  }

  logout() {
    sessionStorage.removeItem('account')
    sessionStorage.removeItem('currentClient')
    this.router.navigateByUrl("/login")
  }


  changePassword() {
    this.sharedRouter.linkClick=false;
    this.isChangePass=false;
    this.router.navigateByUrl("/agent/profile");
  }


  setFactures() {
    this.sharedRouter.linkClick=false;
    /*this.isShow=!this.isShow;*/
    this.creancierService.getCreanciers().subscribe((response:any)=>{
      console.log("factures",response);
      this.creancierService.listCeanciers=response;
    /*  this.creancierService.creancierPaiement=false;*/
      this.creancierService.showPaiement=false;
      this.creancierService.showRouter=false;
      console.log(" this.creancierService.creancierPaiement", this.creancierService.creancierPaiement)
    })
    this.router.navigateByUrl('/client/factures')
  }

  changerProfile() {
    this.changeCover=!this.changeCover;

  }

  goToProfile() {
    this.sharedRouter.linkClick=false;
    this.router.navigateByUrl("/client/profile")
  }

  setSolde() {
    this.sharedRouter.linkClick=false;
    console.log(this.currentClient)
    this.account.consulterAccount(this.getSession()).subscribe((response:any)=>{
      this.account.account=response;
    })
    this.router.navigateByUrl('/client/solde')
  }

  protected readonly history = history;
  protected readonly Object = Object;

  sendMoney() {
    this.sharedRouter.linkClick=false;
    this.router.navigateByUrl('/client/transaction')
  }

  genererQrCode() {
    this.sharedRouter.linkClick=false;
    this.formRef=this.fb.group({
      phone:[this.getSession().phone]
    })
    this.getHisto.getRIB(this.formRef).subscribe((response)=>{
      this.getHisto.response=response;
      console.log(this.getHisto.response)
    })
    this.router.navigateByUrl("/client/generateQr")
  }
}
