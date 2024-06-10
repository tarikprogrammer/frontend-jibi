import {Component, OnInit} from '@angular/core';
import {HistoriqueService} from "../../../services/transactions/historique.service";
import {Router} from "@angular/router";
import {FormBuilder, FormGroup} from "@angular/forms";
import {RouterClientService} from "../../../services/RouterShared/router-client.service";
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';
import {data} from "autoprefixer";

@Component({
  selector: 'app-generate-qr',
  templateUrl: './generate-qr.component.html',
  styleUrls: ['./generate-qr.component.css']
})
export class GenerateQrComponent implements OnInit{
  formRIB!:FormGroup;
  qrResponse!:any;
  qrCodeImage: string | null = null;
  isGenerated:boolean=false;
  buttonClicked:boolean=false;
  ngOnInit(): void {
  }
  constructor(public getHisto:HistoriqueService,private router:Router,private fb:FormBuilder,private sharedRouter:RouterClientService) {
  }

  annuler() {
    this.sharedRouter.linkClick=true;
    this.router.navigateByUrl("/client");
  }

  generateQr() {
    this.buttonClicked=true;
    this.formRIB=this.fb.group({
      RIB:[this.getHisto.response.ref]
    })
    console.log(this.getHisto.response.ref)
    this.getHisto.generateQr(this.formRIB).subscribe(
      (base64QrImage:any) => {
        setTimeout(()=>{
          this.qrCodeImage = `${base64QrImage}`;
          this.isGenerated=true;
          this.buttonClicked=false;
        },2000)
        console.log(this.qrCodeImage)
      },
      (error) => {
        console.error('Error generating QR code', error);
      }
    );

  }

  download() {
    if (this.qrCodeImage) {
      const link = document.createElement('a');
      link.href = this.qrCodeImage;
      link.download = 'qrcode.png';
      link.click();
    }

  }
}
