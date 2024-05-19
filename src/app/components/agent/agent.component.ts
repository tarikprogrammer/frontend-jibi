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
  currentAgent=sessionStorage.getItem('currentAgent');

  constructor(private router:Router,public agentService:AuthAgentService) {
  }
  ngOnInit(): void {
    this.setHome();
    this.coverPath=this.coverPath+this.getSession().imageUrl;


  }
  ngAfterViewInit(): void {
    this.notificationAgent="change your password";
      this.createChartjs1();
      this.createChartjs2();

  }
  getSession(){
    return this.currentAgent ? JSON.parse(this.currentAgent):null
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
  createChartjs2(){
    const chart1 = new Chart("chart", {
      type: 'bar',
      data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [{
          label: 'My First Dataset',
          data: [65, 59, 80, 81, 56, 55, 40],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 205, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(201, 203, 207, 0.2)',

          ],
          borderColor: [
            'rgb(255, 99, 132)',
            'rgb(255, 159, 64)',
            'rgb(255, 205, 86)',
            'rgb(75, 192, 192)',
            'rgb(54, 162, 235)',
            'rgb(153, 102, 255)',
            'rgb(201, 203, 207)',
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
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
    setTimeout(()=>{
      this.router.navigateByUrl('/agent');
    },1000)
    this.ngAfterViewInit();

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
