import {Component, Input, ViewChild} from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  isMenuOpen = false;
  isPageActive = false;
  isHovered = false;


  constructor(private router: Router) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.isPageActive = this.isActive((event as NavigationEnd).urlAfterRedirects);
      });
  }
  isActive(url: string): boolean {
    const currentUrl = this.router.url;
    return currentUrl.startsWith(url);
  }

}
