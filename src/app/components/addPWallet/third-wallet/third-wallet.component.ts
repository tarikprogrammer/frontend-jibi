import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {WalletService} from "../../../services/wallet/wallet.service";

@Component({
  selector: 'app-third-wallet',
  templateUrl: './third-wallet.component.html',
  styleUrls: ['./third-wallet.component.css']
})
export class ThirdWalletComponent implements OnInit{
  thirdAdd!:FormGroup;
  mergeData!:FormGroup;
  loader:boolean=false;
  createdClient:boolean=false;
  createdMessage:string="registration client has been successfully";

  ngOnInit(): void {
    this.thirdAdd=this.fb.group({
      nationality:[''],
      solde:[]
    })
  }
  constructor(private fb:FormBuilder,public wallet:WalletService) {
  }

  @Input() step: number = 3;
  @Output() stepChange = new EventEmitter<number>();
  @Output() scrollToTopRequest = new EventEmitter<void>();
  increaseStep() {
    if(this.step<3) {
      this.stepChange.emit(this.step + 1);
      this.scrollToTop();
    }
    this.wallet.thirdWallet=this.thirdAdd;
    this.mergeData=this.fb.group({
      ...this.wallet.firstWallet.controls,
      ...this.wallet.secondWallet.controls,
      ...this.wallet.thirdWallet.controls
    })
    this.loader=true;
    this.wallet.mergeWallet=this.mergeData;
    if(this.wallet.isClient){
      setTimeout(()=>{
        this.wallet.sendData(this.wallet.mergeWallet).subscribe((response)=>{
          this.loader=false;
          this.createdClient=true;
          setTimeout(()=>{
            this.createdMessage="";
            this.createdClient=false;
            window.location.reload();
          },3000)
        })
      },3000)
    }
    if(this.wallet.isClient){
      setTimeout(()=>{
        this.wallet.sendDataCompany(this.wallet.mergeWallet).subscribe((response)=>{
          this.loader=false;
          this.createdClient=true;
          setTimeout(()=>{
            this.createdMessage="";
            this.createdClient=false;
            window.location.reload();
          },3000)
        })
      },3000)

    }

   /*

    setTimeout(()=>{
      this.register.sendData(this.mergeData).subscribe(
        (response)=>{
          this.loader=false;
          this.createdClient=true;
          setTimeout(()=>{
            this.createdMessage="";
            this.createdClient=false;
            window.location.reload();
          },3000)
        },(error)=>{
          console.log(error)
        }
      )
    },3000)*/

  }

  decreaseStep() {
    if (this.step > 1) {
      this.stepChange.emit(this.step - 1);
      this.scrollToTop();
    }
  }

  scrollToTop() {
    this.scrollToTopRequest.emit();
  }
}
