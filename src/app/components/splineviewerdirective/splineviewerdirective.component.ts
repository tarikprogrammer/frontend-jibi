import { Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: 'spline-viewer'
})
export class SplineviewerdirectiveComponent {
  constructor(private el: ElementRef, private renderer: Renderer2) {
    // You can perform any initialization here if needed
  }
}
