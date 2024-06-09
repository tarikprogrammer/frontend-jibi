import {AfterViewInit, Component,  OnInit} from '@angular/core';
import { Router } from "@angular/router";
import { AuthAgentService } from "../../services/authAgent/auth-agent.service";
import Chart from "chart.js/auto";
@Component({
  selector: 'app-agent',
  templateUrl: './agent.component.html',
  styleUrls: ['./agent.component.css']
})
export class AgentComponent implements OnInit,AfterViewInit{
  logoUrl:string="../../assets/media/logo.png";
  isShow:boolean=false;
  linkClick:boolean=true;
  coverPath:string="../../assets/images/";
  notificationAgent:string="";
  isChangePass=false;
  isPassUpadeted=true;
  currentAgent=sessionStorage.getItem('currentAgent');
  updatePass=sessionStorage.getItem(this.getSession().username);
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


  }
  ngAfterViewInit(): void {
    this.notificationAgent="change your password";
      this.createChartjs1();
    const audio = new Audio("../../assets/audio/notification.mp3");
    setTimeout(()=>{
      if(!this.getSessionUpdatePass()){
        this.isChangePass=true;

      }

     /* audio.play();*/
    },3000)
    setTimeout(()=>{
      this.isChangePass=false
    },10000)

  }
  getSession(){
    return this.currentAgent ? JSON.parse(this.currentAgent):null
  }
  getSessionUpdatePass(){
    return this.updatePass ? JSON.parse(this.updatePass):null
  }





  /*------------------------- chart js -------------------------------*/
  createChartjs1(){
    const ctx = document.getElementById('myChart') as HTMLCanvasElement;
    const chart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: [
          'compte de 200DH',
          'compte de 5 000DH',
          'compte de 20 000DH'
        ],
        datasets: [{
          label: 'My First Dataset',
          data: [300, 50, 100],
          backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            'rgb(255, 205, 86)'
          ],
          hoverOffset: 4
        }]
      },options: {
        plugins: {
          legend: {
              display:false

          }
        }
      }
    });
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
    this.ngAfterViewInit();
    window.location.reload()


  }


  setProfile() {
    this.isChangePass=!this.isChangePass;

  }

  logout() {
    sessionStorage.removeItem('currentAgent')
    this.router.navigateByUrl("login")
  }


  changePassword() {
    this.linkClick=false;
    this.isChangePass=false;
    this.router.navigateByUrl("agent/profile");
  }
}
