import { Injectable } from '@angular/core';
import {FormGroup} from "@angular/forms";
import {HttpClient, HttpErrorResponse, HttpResponse} from "@angular/common/http";
import {catchError, map, Observable, switchMap, throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class HistoriqueService {
  historiqueClient!: FormGroup;
  baseUrl: string = "http://localhost:8080/jibi/";
  response: any = {};

  constructor(private http: HttpClient) {
  }

  saveHistorique(request: FormGroup) {
    return this.http.post(this.baseUrl + "createHistorique", request.value);
  }

  getTransaction(request: FormGroup) {
    return this.http.post(this.baseUrl + "historiques", request.value);
  }

  getRIB(request: FormGroup) {
    return this.http.post(this.baseUrl + "account/getRIB", request.value);
  }

  generateQr(request: FormGroup): Observable<string> {
    const url = this.baseUrl + "qr/img";

    return this.http.post(url, request.value, { responseType: 'blob' }).pipe(
      switchMap((blob: Blob) => this.blobToBase64(blob))
    );
  }

  private blobToBase64(blob: Blob): Observable<string> {
    return new Observable<string>((observer) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        observer.next(base64String);
        observer.complete();
      };
      reader.onerror = (error) => {
        observer.error(error);
      };
      reader.readAsDataURL(blob);
    });
  }

  decodeQrCode(file: File): Observable<string> {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);

    return this.http.post(this.baseUrl+"qr/decode", formData, { responseType: 'text' }).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }

  sendTransaction(request:FormGroup){
    return this.http.post(this.baseUrl+"newTransaction",request.value);
  }

}
