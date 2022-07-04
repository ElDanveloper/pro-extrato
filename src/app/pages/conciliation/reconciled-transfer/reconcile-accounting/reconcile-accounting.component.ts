import { Component, OnDestroy, OnInit } from '@angular/core';
import { NetworkService } from "../../../../services/network.service";
import { DadosDefaultService } from "../../../../services/dados-default.service";
import { ActivatedRoute, Router } from "@angular/router";
import { MessageService } from "primeng/api";
import { Formulario } from "../../../../controller/Formulario";
import { Util } from "../../../../controller/Util";
import { map } from "rxjs/operators";
import { Subscription } from "rxjs";
import { Location } from '@angular/common';

@Component({
    selector: 'app-reconcile-accounting',
    templateUrl: './reconcile-accounting.component.html',
    styleUrls: ['./reconcile-accounting.component.css']
})
export class ReconcileAccountingComponent implements OnInit, OnDestroy {
    lista = [];
    selected = [];
    valorSelecionado = 0;
    data
    params
    valor = 0

    $subscriptionDadosDefault: Subscription;
    $subscriptionLista: Subscription;
    $subscriptionSalvar: Subscription;

    constructor(public networkService: NetworkService, public dadosDefault: DadosDefaultService, public router: Router, private route: ActivatedRoute, public messageService: MessageService, private location: Location) {
    }

    ngOnInit() {

        // this.$subscriptionDadosDefault = this.dadosDefault.conciliarContabil.subscribe(v => {
        //     this.data = v.data;
        //     this.valor = v.data.Valor;
        //     this.params = v.params;
        // })
        // setTimeout(() => {
        //     this.carregarLista()
        // }, 500)
    }

    carregarLista() {          
        this.dadosDefault.exibirLoader.next(true)
        let idContaCaixa = `IdContaCaixa=${this.params.idContaCaixa}`
        let DataInit = `DataInicial=${this.params.dataInicial}`
        let DataFinal = `DataFinal=${this.params.dataFinal}`
        let Valor = `Valor=${Util.toNumber2(this.valor)}`
        // this.$subscriptionLista = this.networkService.getSimples(getUrlFinanceiro(), `fin/contabilNaoConciliados?${idContaCaixa}&${DataInit}&${DataFinal}&${Valor}&$orderby=Data`).pipe(map((x: any) => x.value)).subscribe((x: any) => {
        //     this.lista = x;
        // }).add(() => this.dadosDefault.exibirLoader.next(false));
    }

    pressionaEnter(e){
        if(e.key === 'Enter') this.carregarLista();
    }

    public processarFormulario(modal?) {
        if (this.data.Valor !== Util.toNumber(this.valorSelecionado)) {
            this.messageService.add(Util.pushErrorMsg('O valor selecionado deve ser igual ao valor total'))
            return
        }
        // const data = Formulario.parseForm(new LancamentoPreConciliado(), this.data, LancamentoPreConciliado.referencias(), null, LancamentoPreConciliado.datas())
        // this.$subscriptionSalvar = this.networkService.salvarPost(getUrlFinanceiro(), 'fin/conciliarParaListaLancContabil', { Ext: { ...data, TIpoConciliacao: '3' }, Lista: this.selected.map(v => v.idlanccontabil.toString()) }).subscribe(v => {
        //     this.location.back();
        // }, e => this.messageService.add(Util.pushErrorMsg(e)));
    }

    recalcularValorSelecionado() {
        this.valorSelecionado = this.selected.reduce((accum, val) => accum + val.Valor, 0);
    }

    trackTarget(item, index) {
        return item.Id
    }

    cancelarLocal() {
        this.location.back();
    }

    ngOnDestroy(): void {
        if (this.$subscriptionDadosDefault) this.$subscriptionDadosDefault.unsubscribe()
        if (this.$subscriptionLista) this.$subscriptionLista.unsubscribe()
        if (this.$subscriptionSalvar) this.$subscriptionSalvar.unsubscribe()
    }

    colorValue(v) {
        const classes = {
            'texto-verde': false,
            'texto-vermelho': false,
        }
        return Util.isNegative(v) ? { ...classes, 'texto-vermelho': true } : { ...classes, 'texto-verde': true }
    }

}
