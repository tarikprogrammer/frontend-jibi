import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {AuthAgentService} from "../../../services/authAgent/auth-agent.service";

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.css']
})
export class UpdateProfileComponent implements OnInit{
  updateProfile!:FormGroup;
  changePass="your password has been changed successfully";
  isChangedPass=false;
  isLoader=false;
  currentAgent=sessionStorage.getItem('currentAgent');
  constructor(private fb:FormBuilder,public serviceAgent:AuthAgentService) {
  }
  ngOnInit(): void {

    this.updateProfile = this.fb.group({
      password:[""],
      phone:[this.getSession().phone]
    })
  }
  getSession(){
    return this.currentAgent ? JSON.parse(this.currentAgent):null
  }

  update() {
    this.isLoader=true;
   this.serviceAgent.updatePass(this.updateProfile);
   setTimeout(()=>{
     this.isLoader=false;
     this.serviceAgent.sendUpdatePass().subscribe((response)=>{
       if(response==true){
         this.isChangedPass=true;
         this.serviceAgent.isChangedPass=this.isChangedPass;
         setTimeout(()=>{
           this.changePass="";
         },3000)
       }
     },(error)=>{
       console.log(error)
     })
   },2000)
  }
}
