import { Injectable } from '@angular/core';
import {FormGroup} from "@angular/forms";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})

export class RegisterServiceService {
   userProfile!:FormGroup;
   userDetail!:FormGroup;
   userdata!:FormGroup;
   baseUrl="http://localhost:8080/jibi/backOffice/";
   nextTo:boolean=false;
  constructor(private http:HttpClient) { }
  getInfoUserProfile(register:FormGroup){
    this.userProfile=register;
  }
  getInfoUserDetail(register:FormGroup){
    this.userDetail=register;
  }
  getAllData(register:FormGroup) {
    this.userdata=register

  }
  sendData(register:FormGroup){
    const formatData = register.value;
    return this.http.post(this.baseUrl+"register",formatData);
  }

}
