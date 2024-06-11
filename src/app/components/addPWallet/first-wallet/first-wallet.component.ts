import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {WalletService} from "../../../services/wallet/wallet.service";

@Component({
  selector: 'app-first-wallet',
  templateUrl: './first-wallet.component.html',
  styleUrls: ['./first-wallet.component.css']
})
export class FirstWalletComponent implements OnInit{
  firstAdd!:FormGroup;
  isClient:boolean=false;
  isEntreprise:boolean=false;
  constructor(private fb:FormBuilder,private wallet:WalletService) {
  }
  ngOnInit(): void {
    this.firstAdd=this.fb.group({
      fname:[''],
      lname:[''],
      email:[''],
      domain:['']
    })
  }

  @Input() step: number = 1;
  @Output() stepChange = new EventEmitter<number>();
  @Output() scrollToTopRequest = new EventEmitter<void>();

  increaseStep() {
    this.stepChange.emit(this.step + 1);
    this.scrollToTop();
   /* this.registerService.getData1(this.firstAdd);*/
    this.wallet.firstWallet=this.firstAdd;
  }
  scrollToTop() {
    this.scrollToTopRequest.emit();
  }

  accountType(event:any) {
    const type=event.target.value;
    if(type=="client"){
      this.isClient=true;
      this.isEntreprise=false;
      this.wallet.isClient=this.isClient;
      this.wallet.isEntreprise=this.isEntreprise;
    }
    if(type=="entreprise"){
      this.isEntreprise=true;
      this.isClient=false;
      this.wallet.isClient=this.isClient;
      this.wallet.isEntreprise=this.isEntreprise;
    }
  }
}
