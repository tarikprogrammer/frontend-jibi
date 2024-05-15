import {Component, EventEmitter, Output, ViewChild} from '@angular/core';
import {RegisterServiceService} from "../../services/registerAgent/register-service.service";

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent {
  @Output() scrollToTopRequest = new EventEmitter<void>();

  constructor(public auth:RegisterServiceService) {
  }
  currentStep = 1;
  activePage = 'profile';

  showStep(step: number) {
    this.currentStep = step;
    this.setActivePage(step);
  }

  setActivePage(step: number) {
    switch (step) {
      case 1:
        this.activePage = 'profile';
        break;
      case 2:
        this.activePage = 'personal-infos';
        break;
      default:
        this.activePage = '';
    }
  }

  scrollToTop() {
    this.scrollToTopRequest.emit();
  }

}
