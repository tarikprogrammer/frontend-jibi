import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {AuthAgentService} from "../../services/authAgent/auth-agent.service";
import Chart from "chart.js/auto";

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
  currentClient=sessionStorage.getItem('currentClient');
  slideConfig = {
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    dots: true,
    autoplay: true,
    autoplaySpeed: 2000
  };

  constructor(private router:Router,public agentService:AuthAgentService) {
  }
  ngOnInit(): void {
    this.setHome();
    this.coverPath=this.coverPath+this.getSession().imageUrl;


  }
  ngAfterViewInit(): void {
    this.notificationAgent="change your password";

  }
  getSession(){
    return this.currentClient ? JSON.parse(this.currentClient):null
  }






  showAside() {
    this.isShow=true;

  }

  dismissAside() {
    this.isShow=false;
  }
  isClick(){
    this.linkClick=false;
    this.isShow=!this.isShow;
    this.agentService.getAllClient().subscribe((response) => {
      this.agentService.allClients=response;
      console.log("service",this.agentService.allClients)
      console.log("objet",Object.values(this.agentService.allClients))

    });

  }

  setHome() {
    this.linkClick=true;
    setTimeout(()=>{
      this.router.navigateByUrl('/client');
    },1000)
    this.ngAfterViewInit();

  }


  setProfile() {
    this.isChangePass=!this.isChangePass;

  }

  logout() {
    sessionStorage.removeItem('currentClient')
    this.router.navigateByUrl("login")
  }


  changePassword() {
    this.linkClick=false;
    this.isChangePass=false;
    this.router.navigateByUrl("agent/profile");
  }


}
