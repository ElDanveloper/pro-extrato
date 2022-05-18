import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
    selector: 'app-footer-page',
    templateUrl: './footer-page.component.html',
    styleUrls: ['./footer-page.component.css']
})
export class FooterPageComponent implements OnInit {

    @Input() end = false
    @Input() labelConfirmar = 'Salvar'
    @Input() labelCancelar = 'Cancelar'

    @Output() cancelar = new EventEmitter<any>()
    @Output() confirmar = new EventEmitter<any>()

    constructor() {
    }

    ngOnInit() {
    }

    clickCancelar() {
        this.cancelar.emit()
    }

    clickConfirmar() {
        this.confirmar.emit()
    }
}
