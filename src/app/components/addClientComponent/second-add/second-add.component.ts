import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {RegisterClientService} from "../../../services/registerClient/register-client.service";

@Component({
  selector: 'app-second-add',
  templateUrl: './second-add.component.html',
  styleUrls: ['./second-add.component.css']
})
export class SecondAddComponent implements OnInit{
  secondAdd!:FormGroup;

  constructor(private registerClient:RegisterClientService,private fb:FormBuilder) {
  }

  ngOnInit(): void {
   this.secondAdd = this.fb.group({
     phone:[""],
     piece_identite:[""],
     numeroDePieceIdentite:[""],
     addresse:[""]
   })
  }
  @Input() step: number = 1;
  @Output() stepChange = new EventEmitter<number>();
  @Output() scrollToTopRequest = new EventEmitter<void>();

  increaseStep() {
    this.stepChange.emit(this.step + 1);
    this.scrollToTop();
    this.registerClient.getData2(this.secondAdd)
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
