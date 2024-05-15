import { Injectable } from '@angular/core';
import {FormGroup} from "@angular/forms";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class RegisterClientService {
  client1!:FormGroup;
  client2!:FormGroup;
  client3!:FormGroup;
  clientData!:FormGroup;
  baseUrl:string="http://localhost:8080/jibi/backOffice/client/"

  constructor(private http:HttpClient) { }
  getData1(client:FormGroup){
    this.client1=client;
  }
  getData2(client:FormGroup){
    this.client2=client;
  }
  getData3(client:FormGroup){
    this.client3=client;
  }
  getAllData(data:FormGroup){
    this.clientData=data;
  }
  sendData(data:FormGroup){
    const fd=data.value;
    return this.http.post(this.baseUrl+"register",fd);
  }

}
