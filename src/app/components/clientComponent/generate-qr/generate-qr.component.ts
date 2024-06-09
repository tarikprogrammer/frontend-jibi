import {Component, OnInit} from '@angular/core';
import {HistoriqueService} from "../../../services/transactions/historique.service";
import {Router} from "@angular/router";
import {FormBuilder, FormGroup} from "@angular/forms";
import {RouterClientService} from "../../../services/RouterShared/router-client.service";
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-generate-qr',
  templateUrl: './generate-qr.component.html',
  styleUrls: ['./generate-qr.component.css']
})
export class GenerateQrComponent implements OnInit{
  formRIB!:FormGroup;
  qrResponse!:any;
  ngOnInit(): void {
  }
  constructor(public getHisto:HistoriqueService,private router:Router,private fb:FormBuilder,private sharedRouter:RouterClientService) {
  }

  annuler() {
    this.sharedRouter.linkClick=true;
    this.router.navigateByUrl("/client");
  }

  generateQr() {
    this.formRIB=this.fb.group({
      RIB:[this.getHisto.response.ref]
    })
    console.log(this.getHisto.response.ref)
    this.getHisto.generateQr(this.formRIB).subscribe(
      (response: HttpResponse<Blob>) => {
        console.log(response)
        if (response !== null && response.body !== null) {
          const blob = new Blob([response.body], { type: 'image/' });
          const url = window.URL.createObjectURL(blob);
          console.log(url);
        }
      },
      (error: any) => {
        console.log("erreur")
      }
    );

  }
}
