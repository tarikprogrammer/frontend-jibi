import {Component, OnInit} from '@angular/core';
import {AuthAgentService} from "../../services/authAgent/auth-agent.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthClientService} from "../../services/authClient/auth-client.service";

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit{
  passwordStatus:boolean=false;
  authAgent!:FormGroup;
  authClient!:FormGroup;
  loader:boolean=false;
  messageAgent:string="";
  showMessage:boolean=false;
  constructor(private auth:AuthAgentService,private fb:FormBuilder,private router:Router,private authC:AuthClientService) {
  }
  ngOnInit(): void {
    this.authAgent=this.fb.group({
      phone:this.fb.control(''),
      password:this.fb.control(''),
      logintype:['admin']
    })


  }
  password() {
    const pass= document.getElementById('password') as HTMLInputElement;
    if(pass.type =="text" ){
      pass.type="password"
      this.passwordStatus=true
    }else{
      pass.type="text"
      this.passwordStatus=false
    }
  }


  login() {
    this.loader = true
    if (this.authAgent.get('logintype')?.value == 'agent') {
      this.auth.getData(this.authAgent);
      setTimeout(() => {
        this.auth.sendData().subscribe((response: any) => {
            this.loader = false;
            if (response['id'] == null) {
              this.messageAgent = "you're not a agent !!";
              this.showMessage = true;
              setTimeout(() => {
                this.showMessage = false;
              }, 3000)
            }
            if (response['id'] != null) {
              this.auth.getAgentCurrent(response);
              this.auth.isLogin = true;
              sessionStorage.setItem('currentAgent', JSON.stringify(response));
              this.router.navigateByUrl("agent")
            }
          }
        )
      }, 3000)

    }
    if(this.authAgent.get('logintype')?.value == 'client'){
      this.authC.getAuthClient(this.authAgent);
      setTimeout(()=>{
        this.authC.sendData().subscribe((response:any)=>{
          this.loader = false;
          if (response['id'] == null) {
            this.messageAgent = "you're not a client !!";
            this.showMessage = true;
            setTimeout(() => {
              this.showMessage = false;
            }, 3000)
          }
          if (response['id'] != null) {
           /* this.auth.getAgentCurrent(response);*/
            this.auth.isLogin = true;
            sessionStorage.setItem('currentClient', JSON.stringify(response));
            this.router.navigateByUrl("/client")
          }

        })
      },3000)
    }
  }

}
