import { Component, OnDestroy, OnInit } from '@angular/core';
import { NetworkService } from "../../../../services/network.service";
import { DadosDefaultService } from "../../../../services/dados-default.service";
import { ActivatedRoute, Router } from "@angular/router";
import { MessageService } from "primeng/api";
import { map } from "rxjs/operators";
import { Util } from "../../../../controller/Util";
import { Formulario } from "../../../../controller/Formulario";
import { Subscription } from "rxjs";
import { Location } from '@angular/common';

@Component({
    selector: 'app-reconcile-installment',
    templateUrl: './reconcile-installment.component.html',
    styleUrls: ['./reconcile-installment.component.css']
})
export class ReconcileInstallmentComponent implements OnInit, OnDestroy {

    lista = [];
    selected = [];
    valorSelecionado = 0;
    valorPositivado = 0;
    encargos: any = 0;

    data
    params
    valor
    texto = ''
    $subscriptionDadosDefault: Subscription;
    $subscriptionLista: Subscription;
    $subscriptionSalvar: Subscription;

    constructor(public networkService: NetworkService, public dadosDefault: DadosDefaultService, public router: Router, private route: ActivatedRoute, public messageService: MessageService, private location: Location) {
    }

    ngOnInit() {
        // this.$subscriptionDadosDefault = this.dadosDefault.conciliarParcela.subscribe(v => {
        //     this.data = v.data;
        //     this.valor = v.data.Valor
        //     this.params = v.params;
        //     this.valorPositivado = Math.abs(v.data.Valor)
            // this.$subscriptionLista = this.networkService.getSimples(getUrlFinanceiro(), `RelParcelasVo?$filter=(Tipo eq '${v.data.Valor < 0 ? 'P': 'R'}' and (Statusparcela eq 'A' or Statusparcela eq 'P' or Statusparcela eq 'U') and Conciliado eq 'N' and Vencimento ge ${v.params.dataInicial} and Vencimento le ${v.params.dataFinal})&$orderby=Vencimento`).pipe(map((x: any) => x.value)).subscribe((x: any) => {
            //     this.lista = x;
            // });
        // })
        // setTimeout(() => {
        //     this.carregarLista()
        // }, 500)
    }

    carregarLista() {       
        let DataIni = `DataIni=${this.params.dataInicial}`
        let DataFim = `DataFim=${this.params.dataFinal}`
        let Tipo = `Tipo=${this.data.Valor < 0 ? 'P' : 'R'}`
        let Texto = `Texto=${this.texto ? this.texto : ''}`
        let Valor = `Valor=${Util.toNumber2(this.valor)}`
        this.dadosDefault.exibirLoader.next(true)
        // this.$subscriptionLista = this.networkService.getSimples(getUrlFinanceiro(), `Fin/ListaParcelas?${DataIni}&${DataFim}&${Tipo}&${Texto}&${Valor}`).subscribe((v: any) => {
        //     this.lista = v.value
        // }).add(() => this.dadosDefault.exibirLoader.next(false))

    }

    pressionaEnter(e){
        if(e.key === 'Enter') this.carregarLista();
    }

    public processarFormulario(modal?) {
        // const data = Formulario.parseForm(new LancamentoPreConciliado(), this.data, LancamentoPreConciliado.referencias(), null, LancamentoPreConciliado.datas())
        // this.$subscriptionSalvar = this.networkService.salvarPost(getUrlFinanceiro(), 'fin/conciliarParaListaParcela', { Ext: { ...data, TIpoConciliacao: '1' }, Lista: this.selected.map(v => v.Id.toString()), Encargos: this.encargos }).subscribe(v => {
        //     this.location.back();
        // });
    }

    recalcularValorSelecionado() {
        // this.valorSelecionado = this.selected.reduce((accum, val) => accum + val.Valor, 0);
        // this.encargos = Util.toNumber((this.valorPositivado - this.valorSelecionado).toFixed(2));
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
