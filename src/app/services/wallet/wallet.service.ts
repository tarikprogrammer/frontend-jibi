import { Injectable } from '@angular/core';
import {FormGroup} from "@angular/forms";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class WalletService {
  baseUrl:string="http://localhost:8080/jibi/";
  isEntreprise!:boolean;
  isClient!:boolean;
  firstWallet!:FormGroup;
  secondWallet!:FormGroup;
  thirdWallet!:FormGroup;
  mergeWallet!:FormGroup;
  constructor(private http:HttpClient) { }
  sendData(request:FormGroup){
    return this.http.post(this.baseUrl+"backOffice/clientPro/register",request.value);
  }
  sendDataCompany(request:FormGroup){
    return this.http.post(this.baseUrl+"newEntreprise",request.value);
  }
}
