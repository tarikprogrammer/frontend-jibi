import {Component, OnInit} from '@angular/core';
import {HistoriqueService} from "../../../services/transactions/historique.service";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-historique',
  templateUrl: './historique.component.html',
  styleUrls: ['./historique.component.css']
})
export class HistoriqueComponent implements OnInit{
   listofTransaction: Object=[];
   formHistorique!: FormGroup;
  currentClient=sessionStorage.getItem('currentClient');
  constructor(private getHisto:HistoriqueService,private fb:FormBuilder ) {
  }

  getSession(){
    return this.currentClient ? JSON.parse(this.currentClient):null;
  }

  ngOnInit(): void {
    this.formHistorique=this.fb.group({
      phone:[this.getSession().phone]
    })
    this.getHisto.getTransaction(this.formHistorique).subscribe((response)=>{
      this.listofTransaction=response;
      console.log("this.listofTransaction",this.listofTransaction)
    })
  }

  protected readonly Object = Object;
}
