import {AfterContentInit, AfterViewInit, Component, ContentChild, Input, OnInit, ViewChild} from '@angular/core';
import {DadosDefaultService} from "../../services/dados-default.service";
import {Router} from "@angular/router";
import {NetworkService} from "../../services/network.service";

@Component({
    selector: 'app-custom-modal',
    templateUrl: './custom-modal.component.html',
    styleUrls: ['./custom-modal.component.scss']
})
export class CustomModalComponent implements OnInit, AfterContentInit, AfterViewInit {

    modalVisible = true;

    @ContentChild('content') content;
    contentAfterInited: any
    title = '';
    @Input() hash;
    showBackground = false;
    @Input() fundo = false;
    @Input() style;
    @Input() showFooter = true;

    zIndexOverlay: number = 800
    zIndexBody: number = 900
    overlay: string = 'rgba(51, 51, 51, 0.7)'

    podeFechar = true;

    classes = {
        'modal-body': true,
        'menu-expanded': true,
        'menu-colapsed': true,
    }


    constructor(private dadosDefault: DadosDefaultService, private networkService: NetworkService) {

    }

    exibirLoader = this.dadosDefault.exibirLoader
    exibirLoaderNetwork = this.networkService.exibirLoader

    ngOnInit() {
        this.zIndexOverlay = this.zIndexOverlay + (this.dadosDefault.listaModais.length + 1)
        this.zIndexBody = this.zIndexBody + (this.dadosDefault.listaModais.length + 1)
        this.overlay = this.dadosDefault.listaModais.findIndex(v => v === this.hash) !== 0 ? 'rgba(51, 51, 51, 0.3)' : 'rgba(51, 51, 51, 0.7)'
    }

    ngAfterContentInit(): void {
        setTimeout(() => {
            this.content.hash = this.hash;
            this.content.modal = true;
            this.title = this.content.entidade ? this.content.entidade.charAt(0).toUpperCase() + this.content.entidade.slice(1) : '';
        }, 10)
    }

    confirmar() {
        this.content.processarFormulario()
    }

    cancelar() {
        if (this.podeFechar) this.dadosDefault.closeModal(this.hash);
    }

    ngAfterViewInit(): void {
        this.showBackground = this.dadosDefault.listaModais.findIndex(v => v === this.hash) === 0
        setTimeout(()=> {
            this.contentAfterInited = this.content
        }, 50)
    }

    cancelClick(e) {
        this.podeFechar = false
        setTimeout(() => this.podeFechar = true, 500);
    }

}
