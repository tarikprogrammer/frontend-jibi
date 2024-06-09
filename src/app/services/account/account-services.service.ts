import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {FormGroup} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class AccountServicesService {
  baseUrl="http://localhost:8080/jibi/account/";
  account!:any;
  constructor(private http:HttpClient) { }

  consulterAccount(account:any){
   const fd=account;
    return this.http.post(this.baseUrl+"consulter",fd);
  }

  effectuerPaiement(request:FormGroup){
    return this.http.post(this.baseUrl+"paiement",request.value);
  }
  verifySolde(request:FormGroup){
    return this.http.post(this.baseUrl+"verifySolde",request.value);
  }
}
