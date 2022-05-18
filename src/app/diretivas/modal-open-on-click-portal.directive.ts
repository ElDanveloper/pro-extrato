import {
    ComponentFactoryResolver,
    Directive,
    Injector,
    Input,
    OnInit,
    TemplateRef,
    ViewContainerRef
} from '@angular/core';
import {DadosDefaultService} from "../services/dados-default.service";

@Directive({
  selector: '[appModalOpenOnClickPortal]'
})
export class ModalOpenOnClickPortalDirective implements OnInit {

    private componentRef;

    constructor(private templateRef: TemplateRef<any>, private viewContainer: ViewContainerRef,
                private dadosDefault: DadosDefaultService,
                private componentFactoryResolver: ComponentFactoryResolver,
                private injector: Injector,
                ) { }

    hash;

    @Input() set appModalOpenOnClick(args) {
        let el: HTMLBaseElement
        if(args.length) {
            el = args[0]
            this.hash = args[1]
            el.addEventListener('click', () => {
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
