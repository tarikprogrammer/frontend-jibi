import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {AuthAgentService} from "../../services/authAgent/auth-agent.service";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  logoUrl:string="../../assets/media/logo.png";
  isShow:boolean=false;
  linkClick:boolean=true;
  coverPath:string="../../assets/images/";
  notificationAgent:string="";
  constructor(private router:Router,public agentService:AuthAgentService) {
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
    this.router.navigateByUrl('/agent');
  }


  setProfile() {
    this.linkClick=false;
    this.router.navigateByUrl("agent/profile");
  }

  logout() {
    this.router.navigateByUrl("/login")
  }
}
