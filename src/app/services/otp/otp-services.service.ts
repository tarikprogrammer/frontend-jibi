import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {FormGroup} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class OtpServicesService {
  baseUrl:string="http://localhost:8080/jibi/otp/";
  constructor(private http:HttpClient) { }

  sendOtp(request:FormGroup){
    return this.http.post(this.baseUrl+"send",request.value)
  }
  verifyOtp(request:FormGroup){
    return this.http.post(this.baseUrl+"verify",request.value);
  }

}
