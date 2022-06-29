import {
    AfterContentInit,
    AfterViewInit,
    Component,
    ContentChild,
    EventEmitter,
    Input,
    OnInit,
    Output, ViewChild
} from '@angular/core';
import {DadosDefaultService} from "../../services/dados-default.service";
import {NetworkService} from "../../services/network.service";

@Component({
    selector: 'app-modal',
    templateUrl: './modal.component.html',
    styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit, AfterContentInit, AfterViewInit {

    modalVisible = true;
    @ViewChild('corpo') corpo
    @ContentChild('content') content;
    contentAfterInited: any
    title = '';
    @Input() hash;
    showBackground = false;
    @Input() fundo = false;
    @Input() style;
    @Input() autoOverflow = false
    @Output() closeModal = new EventEmitter<any>()
    constructor(private dadosDefault: DadosDefaultService, private networkService: NetworkService) {

    }

    exibirLoader = this.dadosDefault.exibirLoader
    exibirLoaderNetwork = this.networkService.exibirLoader
    @Input() labelConfirmar = 'Salvar';
    @Input( )styleScroll = {width: '100%', height: '300px'};

    ngOnInit() {
       
    }

    get contentStyle() {
        if(this.autoOverflow) {
            return {'min-width':'800px', 'max-width':'1000px', 'max-height':'500px','overflow':'auto'}
        } else {
            return {'min-width':'800px', 'max-width':'1000px', 'max-height':'500px','overflow':'visible'}
        }
    }

    ngAfterContentInit(): void {
        setTimeout(()=> {
            this.contentAfterInited = this.content
        }, 50)
        this.content.hash = this.hash;
        this.content.modal = true;
        this.title = this.content.labelModal ? this.content.labelModal : this.content.entidade.charAt(0).toUpperCase() + this.content.entidade.slice(1);
    }

    confirmar() {
        this.content.processarFormulario()
    }

    cancelar() {
        this.closeModal.emit()
        this.dadosDefault.closeModal(this.hash);
    }

    ngAfterViewInit(): void {
        this.showBackground = this.dadosDefault.listaModais.findIndex(v => v === this.hash) === 0
    }
}
