import { Component } from '@angular/core';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent {
  isQrChoosed:boolean=false;
  isRIBChoosed:boolean=false;
  valider() {

  }

  annuler() {

  }

  typeTransaction(event:any) {
    const requestType=event.target.value;
    console.log(requestType)
    switch (requestType){
      case "RIB":
        this.isRIBChoosed=true;
        break;
      case "QR CODE":
        this.isQrChoosed=true;
        break;
      default:
        this.isQrChoosed=false;
        this.isRIBChoosed=false;
    }
  }
}
