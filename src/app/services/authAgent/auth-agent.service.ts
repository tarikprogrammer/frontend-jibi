import { Injectable } from '@angular/core';
import {FormGroup} from "@angular/forms";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AuthAgentService {
  authForm!:FormGroup;
  baseUrl="http://localhost:8080/jibi/backOffice/"
  currentAgent?:any;
  isLogin:boolean=false;
  updateAgent!:FormGroup;
  isChangedPass:boolean=false;
  allClients:Object=[];

  constructor(private http:HttpClient) { }
  getData(login:FormGroup){
    this.authForm=login;
  }
  sendData(){
    const formatData=this.authForm.value;
    return this.http.post(this.baseUrl+"login",formatData)
  }
  getAgentCurrent(agent:any){
    this.currentAgent=agent;
  }
  updatePass(update:FormGroup){
    this.updateAgent=update;
  }
  sendUpdatePass(){
    const formatData=this.updateAgent.value;
    return this.http.put(this.baseUrl+"update",formatData);
  }
  getAllClient(){
    return this.http.get(this.baseUrl+"clients");
  }

}
