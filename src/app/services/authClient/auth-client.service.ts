import { Injectable } from '@angular/core';
import {FormGroup} from "@angular/forms";
import {HttpClient} from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})
export class AuthClientService {
  authclient!:FormGroup;
  updatePassword!:FormGroup;
  updateCover!:FormGroup;
  isCoverUpdated:boolean=false;
  coverName:string="";
  baseUrl="http://localhost:8080/jibi/webClient/"
  constructor(private http:HttpClient) {

  }
  getAuthClient(auth:FormGroup){
    this.authclient=auth;
  }
  sendData(){
    const formatData=this.authclient.value;
    return this.http.post(this.baseUrl+"login",formatData)
  }
  getPasswordIpdated(pass:FormGroup){
    this.updatePassword=pass;
  }
  updatePass(){
    const fd=this.updatePassword.value;
    return this.http.put(this.baseUrl+"update",fd);
  }
  getCoverUpdated(cover:FormGroup){
    this.updateCover=cover;
  }
  updateCoverForClient(){
    const fd=this.updateCover.value
    return this.http.put(this.baseUrl+"updateCover",fd);
  }
}
