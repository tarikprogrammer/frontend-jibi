import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {FormGroup} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class CreanceService {
  baseUrl:string="http://localhost:8080/jibi/creance/";
  creanceCurrent!:any;
  constructor(private http:HttpClient) { }
  getCreance(creance:FormGroup){
    return this.http.post(this.baseUrl+'creanceInfo',creance.value)
  }
}
