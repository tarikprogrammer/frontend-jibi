import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-p-wallet',
  templateUrl: './p-wallet.component.html',
  styleUrls: ['./p-wallet.component.css']
})
export class PWalletComponent {
  @Output() scrollToTopRequest = new EventEmitter<void>();
  currentStep = 1;
  activePage = 'first-wallet';

  showStep(step: number) {
    this.currentStep = step;
    this.setActivePage(step);
  }

  setActivePage(step: number) {
    switch (step) {
      case 1:
        this.activePage = 'first-wallet';
        break;
      case 2:
        this.activePage = 'second-wallet';
        break;
      case 3:
        this.activePage = 'third-wallet';
        break;
      default:
        this.activePage = '';
    }
  }

  scrollToTop() {
    this.scrollToTopRequest.emit();
  }
}
