import { Injectable } from '@angular/core';
import {FormGroup} from "@angular/forms";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AuthClientService {
  authclient!:FormGroup;
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
}
