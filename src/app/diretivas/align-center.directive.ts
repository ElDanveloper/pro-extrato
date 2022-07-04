import {Directive, ElementRef, Renderer2} from '@angular/core';

@Directive({
  selector: '[appAlignCenter]'
})
export class AlignCenterDirective {

    constructor(private el: ElementRef, private renderer: Renderer2) { }

    ngOnInit(): void {
        this.renderer.setStyle(this.el.nativeElement, 'text-align', 'center')
    }

}
