import {Component, OnInit} from '@angular/core';
import {window} from "rxjs";
import {AccountServicesService} from "../../../services/account/account-services.service";

@Component({
  selector: 'app-solde',
  templateUrl: './solde.component.html',
  styleUrls: ['./solde.component.css']
})
export class SoldeComponent implements OnInit{
  currentClient=sessionStorage.getItem('currentClient');
  getSession(){
    return this.currentClient ? JSON.parse(this.currentClient):null;
  }

  constructor(public account:AccountServicesService) {
  }

  ngOnInit(): void {
  }

}
