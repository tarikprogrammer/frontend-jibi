import { Injectable } from '@angular/core';
import {FormGroup} from "@angular/forms";
import {HttpClient, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class HistoriqueService {
  historiqueClient!:FormGroup;
  baseUrl:string="http://localhost:8080/jibi/";
  response:any={};
  constructor(private http:HttpClient) { }
  saveHistorique(request:FormGroup){
    return this.http.post(this.baseUrl+"createHistorique",request.value);
  }
  getTransaction(request:FormGroup){
    return this.http.post(this.baseUrl+"historiques",request.value);
  }
  getRIB(request:FormGroup){
    return this.http.post(this.baseUrl+"account/getRIB",request.value);
  }
  generateQr(request: FormGroup): Observable<HttpResponse<Blob>> {
    const url = this.baseUrl + "qr/img"; // URL de l'endpoint

    // Envoi de la requête POST avec l'URL et les données
    return this.http.post<Blob>(url, request.value, { observe: 'response' });
  }
}
