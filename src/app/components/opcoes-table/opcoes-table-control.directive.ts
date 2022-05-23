import {Directive, ElementRef, EventEmitter, HostListener, Output} from '@angular/core'

@Directive({
    // tslint:disable-next-line:directive-selector
    selector: '[clickOutside]'
})
export class OpcoesTableControlDirective {

    constructor(private el: ElementRef) {
    }

    @Output() clickOutside = new EventEmitter();

    @HostListener('document:click', ['$event.target'])
    onClick(targetElement) {
        const clickInside = this.el.nativeElement.contains(targetElement)
        if(!clickInside) {
            this.clickOutside.emit(null)
        }
    }

}
