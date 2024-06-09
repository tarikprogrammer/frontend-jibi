import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {AuthAgentService} from "../../../services/authAgent/auth-agent.service";
import {AuthClientService} from "../../../services/authClient/auth-client.service";

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.css']
})
export class UpdatePasswordComponent implements OnInit{
  updateProfile!:FormGroup;
  changePass="your password has been changed successfully";
  isChangedPass=false;
  isLoader=false;
  currentClient=sessionStorage.getItem('currentClient');
  constructor(private fb:FormBuilder,public serviceClient:AuthClientService) {
  }
  ngOnInit(): void {

    this.updateProfile = this.fb.group({
      password:[""],
      phone:[this.getSession().phone]
    })
  }
  getSession(){
    return this.currentClient ? JSON.parse(this.currentClient):null
  }

  update() {
    this.isLoader=true;
   this.serviceClient.getPasswordIpdated(this.updateProfile);
    setTimeout(()=>{
      this.isLoader=false;
      this.serviceClient.updatePass().subscribe((response)=>{
        if(response==true){
          sessionStorage.setItem(this.getSession().phone,'true');
          this.isChangedPass=true;
          setTimeout(()=>{
            this.changePass="";
            window.location.reload();
          },3000)
        }
      },(error)=>{
        console.log(error)
      })
    },2000)

  }



}
