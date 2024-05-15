import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css']
})
export class AddClientComponent {
  @Output() scrollToTopRequest = new EventEmitter<void>();
  currentStep = 1;
  activePage = 'first-add';

  showStep(step: number) {
    this.currentStep = step;
    this.setActivePage(step);
  }

  setActivePage(step: number) {
    switch (step) {
      case 1:
        this.activePage = 'first-add';
        break;
      case 2:
        this.activePage = 'second-add';
        break;
      case 3:
        this.activePage = 'third-add';
        break;
      default:
        this.activePage = '';
    }
  }

  scrollToTop() {
    this.scrollToTopRequest.emit();
  }
}
