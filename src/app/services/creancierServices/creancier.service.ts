import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {FormGroup} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class CreancierService {
  baseUrl:string="http://localhost:8080/jibi/creancier/";
  currentCreancier!:any;
  listCeanciers:any;
  showRouter:boolean=false;
  showPaiement:boolean=false;
  creancierPaiement:any;
  factureTotal!: number;
  constructor(private http:HttpClient) { }
  getCreanciers(){
    return this.http.get(this.baseUrl+"list");
  }
  sendCreancier(paiement:FormGroup){
    const fd= paiement.value;
    return this.http.post(this.baseUrl+"getCreancierInfo",fd);
  }

}
