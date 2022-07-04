import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {DadosDefaultService} from "../../../services/dados-default.service";
import {NetworkService} from "../../../services/network.service";
import {MessageService} from "primeng/api";
import {map} from "rxjs/operators";
import {Util} from "../../../controller/Util";
import {Formulario} from "../../../controller/Formulario";


@Component({
  selector: 'app-modal-reconcile-accounting',
  templateUrl: './modal-reconcile-accounting.component.html',
  styleUrls: ['./modal-reconcile-accounting.component.css']
})
export class ModalReconcileAccountingComponent implements OnInit, OnChanges {

    @Input() modalVisible = false;
    @Input() data
    @Input() valorASerConciliado;
    @Output() dadosSalvos = new EventEmitter()
    @Output() closeModal = new EventEmitter()
    lista = [];
    selected = [];
    valorSelecionado = 0;

    constructor(private dadosDefault: DadosDefaultService, private networkService: NetworkService, private messageService: MessageService) {

    }

    ngOnInit() {

    }

    fecharModal() {
        this.selected = []
        this.closeModal.emit()
    }

    confirmar() {
        if(this.valorASerConciliado.Valor !== this.valorSelecionado) {
            this.messageService.add(Util.pushErrorMsg('O valor selecionado deve ser igual ao valor total'))
            return
        }
        // const data = Formulario.parseForm(new LancamentoPreConciliado(), this.valorASerConciliado, null, null, LancamentoPreConciliado.datas())
        // this.networkService.salvarPost(getUrlFinanceiro(), 'fin/conciliarParaListaLancContabil', {Ext: data, Lista: this.selected.map(v => v.Idlancamento.toString())}).subscribe(v => {
        //     console.log(v)
        //     this.fecharModal()
        // }, e => this.messageService.add(Util.pushErrorMsg(e)));
    }

    ngOnChanges(changes: SimpleChanges): void {
        if(this.data) {
            // this.networkService.getSimples(getUrlFinanceiro(), `fin/contabilNaoConciliados?IdContaCaixa=${this.data.idContaCaixa}&DataInicial=${this.data.dataInicial}&DataFinal=${this.data.dataFinal}`).pipe(map((x: any) => x.value)).subscribe((v: any) => {
            //     this.lista = v;
            // });
        }
    }

    recalcularValorSelecionado() {
        // this.valorSelecionado = this.selected.reduce((accum, val) => accum + val.Valor, 0);
    }

    trackTarget(item, index) {
        return item.Id
    }

    colorValue(v) {
        const classes = {
            'texto-verde': false,
            'texto-vermelho': false,
        }
        return Util.isNegative(v) ? {...classes, 'texto-vermelho': true} : {...classes, 'texto-verde': true}
    }

}
