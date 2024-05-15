// register-page.component.ts
import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent {
  @ViewChild('registerPage', { static: false }) registerPageRef?: ElementRef;

  scrollToTop() {
    if (this.registerPageRef?.nativeElement) {
      this.registerPageRef.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
