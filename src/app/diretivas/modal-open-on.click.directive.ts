import {Directive, Input, OnInit, TemplateRef, ViewContainerRef} from '@angular/core';
import {DadosDefaultService} from "../services/dados-default.service";

@Directive({
  selector: '[appModalOpenOnClick]'
})
export class ModalOpenOnClickDirective implements OnInit {

    constructor(private templateRef: TemplateRef<any>, private viewContainer: ViewContainerRef,
                private dadosDefault: DadosDefaultService) {

    }

    hash;

    @Input() set appModalOpenOnClick(args) {
        let el: HTMLBaseElement
        if(args.length) {
            el = args[0]
            this.hash = args[1]
            el.addEventListener('click', () => {
                const index = this.dadosDefault.listaModais.findIndex(x => x === this.hash)
                if(index !== -1) return
                this.viewContainer.clear()
                this.viewContainer.createEmbeddedView(this.templateRef)
                this.dadosDefault.listaModais.push(this.hash)
            })
        }
    }

    ngOnInit(): void {
        this.dadosDefault.modal.subscribe(hash => {                       
            if (this.hash === hash) {
                this.dadosDefault.listaModais.splice(this.dadosDefault.listaModais.findIndex(v => v === hash), 1)
                this.viewContainer.clear()

            }
        })
    }
}
