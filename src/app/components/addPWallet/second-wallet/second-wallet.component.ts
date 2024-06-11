import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {WalletService} from "../../../services/wallet/wallet.service";

@Component({
  selector: 'app-second-wallet',
  templateUrl: './second-wallet.component.html',
  styleUrls: ['./second-wallet.component.css']
})
export class SecondWalletComponent implements OnInit{
  secondAdd!:FormGroup;
  constructor(private fb:FormBuilder,public wallet:WalletService) {
  }

  ngOnInit(): void {
    this.secondAdd = this.fb.group({
      phone:[""],
      piece_identite:[""],
      numeroDePieceIdentite:[""],
      addresse:[""],
      companySize:[""]
    })
  }

  @Input() step: number = 1;
  @Output() stepChange = new EventEmitter<number>();
  @Output() scrollToTopRequest = new EventEmitter<void>();

  increaseStep() {
    this.stepChange.emit(this.step + 1);
    this.scrollToTop();
    /*this.registerClient.getData2(this.secondAdd)*/
    this.wallet.secondWallet=this.secondAdd;
  }
  scrollToTop() {
    this.scrollToTopRequest.emit();
  }

  decreaseStep() {
    if (this.step > 1) {
      this.stepChange.emit(this.step - 1);
      this.scrollToTop();
    }
  }

}
