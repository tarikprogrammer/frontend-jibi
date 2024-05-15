import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import Typed from 'typed.js'; // Adjust this line based on your project setup


@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css']
})
export class HeroComponent implements AfterViewInit {
  @ViewChild('mutlipleText') mutlipleText!: ElementRef;

  ngAfterViewInit() {
    const typed = new Typed(this.mutlipleText.nativeElement, {
      strings: ['FASTER','SMOOTHER'],
      typeSpeed: 80,
      backSpeed: 80,
      backDelay: 1000,
      loop: true
    });
  }
}
