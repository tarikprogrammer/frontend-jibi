import { Component, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import {RegisterServiceService} from "../../../services/registerAgent/register-service.service";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent  {
  mergeData!:FormGroup;
  isCreated:boolean=false;
  agentCreated="";
  showToast:boolean=false;
  loader:boolean=false;

  constructor(private auth:RegisterServiceService,private fb:FormBuilder) {
  }
  @Input() step: number = 3;
  @Output() stepChange = new EventEmitter<number>();
  @Output() scrollToTopRequest = new EventEmitter<void>();


  increaseStep() {
    this.stepChange.emit(this.step + 1);
    this.scrollToTop();
  }

  decreaseStep() {
    if (this.step > 1) {
      this.stepChange.emit(this.step - 1);
      this.scrollToTop();
    }
  }

  scrollToTop() {
    this.scrollToTopRequest.emit();
  }

  save() {
    this.loader=true
    this.mergeData=this.fb.group({
      ...this.auth.userProfile.controls,
      ...this.auth.userDetail.controls
    })
   this.auth.getAllData(this.mergeData);
   setTimeout(()=>{
     this.auth.sendData(this.mergeData).subscribe((response)=>{
         console.log(response)
         this.agentCreated="your account has been created successfuly";
         this.isCreated=true;
         this.showToast=true;
         this.loader=false

       },

       (error)=>{
         console.log("error");
         this.isCreated=false;
         this.agentCreated="your account has not been created try again";
         this.showToast=true
         this.loader=false

       } )

   },3000)
  }

  dismiss() {
    this.showToast=false
  }
}
