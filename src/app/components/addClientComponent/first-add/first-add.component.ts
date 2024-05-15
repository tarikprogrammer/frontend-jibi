import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {RegisterClientService} from "../../../services/registerClient/register-client.service";

@Component({
  selector: 'app-first-add',
  templateUrl: './first-add.component.html',
  styleUrls: ['./first-add.component.css']
})
export class FirstAddComponent implements OnInit{
  firstAdd!:FormGroup
  constructor(private fb:FormBuilder,private registerService:RegisterClientService) {
  }
  ngOnInit(): void {
    this.firstAdd=this.fb.group({
      fname:this.fb.control(''),
      lname:this.fb.control(''),
      email:this.fb.control(''),
      password:this.fb.control('')
    })
  }
  @Input() step: number = 1;
  @Output() stepChange = new EventEmitter<number>();
  @Output() scrollToTopRequest = new EventEmitter<void>();

  increaseStep() {
    this.stepChange.emit(this.step + 1);
    this.scrollToTop();
    this.registerService.getData1(this.firstAdd);
  }
  scrollToTop() {
    this.scrollToTopRequest.emit();
  }


}
