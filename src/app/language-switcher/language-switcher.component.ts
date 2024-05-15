import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-language-switcher',
  templateUrl: './language-switcher.component.html',
  styleUrls: ['./language-switcher.component.css']
})
export class LanguageSwitcherComponent {
  constructor(private translate: TranslateService) {}

  changeLanguage(language: string) {
    console.log(`Language changed to: ${language}`);
    this.translate.use(language);
    this.isDropdownOpen = false; // Hide the dropdown after selection

  }

  // In your component.ts
  isDropdownOpen = false;

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }
  // In your component.ts
  isDarkTheme = true; // Set this based on your theme detection logic


}
