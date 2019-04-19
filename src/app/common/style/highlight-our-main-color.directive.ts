import { Directive, Renderer2, ElementRef } from '@angular/core';

@Directive({
  selector: '[appHighlightOurMainColor]'
})
export class HighlightOurMainColorDirective {

  constructor(private el: ElementRef, private renderer: Renderer2) {
    this.renderer.setStyle(this.el.nativeElement, 'color', '#fb6704');
   }

}
