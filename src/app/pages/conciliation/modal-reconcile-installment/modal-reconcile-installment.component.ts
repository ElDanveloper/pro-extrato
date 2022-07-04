import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {DadosDefaultService} from "../../../services/dados-default.service";
import {NetworkService} from "../../../services/network.service";
import {MessageService} from "primeng/api";
import {map} from "rxjs/operators";
import {Util} from "../../../controller/Util";
import {Formulario} from "../../../controller/Formulario";


@Component({
  selector: 'app-modal-reconcile-installment',
  templateUrl: './modal-reconcile-installment.component.html',
  styleUrls: ['./modal-reconcile-installment.component.css']
})
export class ModalReconcileInstallmentComponent implements OnInit, OnChanges {

    @Input() modalVisible = false;
    @Input() data
    @Input() valorASerConciliado
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
        // const data = Formulario.parseForm(new LancamentoPreConciliado(), this.valorASerConciliado, null, null, LancamentoPreConciliado.datas())
        // this.networkService.salvarPost(getUrlFinanceiro(), 'fin/conciliarParaListaParcela', {Ext: data, Lista: this.selected.map(v => v.IdLancamento.toString()), Encargos: this.valorASerConciliado.Valor - this.valorSelecionado}).subscribe(v => {
        //     console.log(v)
        //     this.fecharModal()
        // }, e => this.messageService.add(Util.pushErrorMsg(e)));
    }

    ngOnChanges(changes: SimpleChanges): void {
        if(this.data && this.valorASerConciliado) {
            // this.networkService.getSimples(getUrlFinanceiro(), `RelParcelasVo?$filter=(Tipo eq '${this.valorASerConciliado.Valor < 0 ? 'P': 'R'}' and Conciliado eq 'N')`).pipe(map((x: any) => x.value)).subscribe((v: any) => {
            //     this.lista = v;
            // });
        }
    }

    recalcularValorSelecionado() {
        console.log(this.selected)
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
