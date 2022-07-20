import { ProStatementItem } from './../../../model/pro-statement-item.model';
import { getUrlPro } from './../../../controller/staticValues';
import { Component, OnDestroy, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Subscription } from "rxjs";
import { NetworkService } from "../../../services/network.service";
import { DadosDefaultService } from "../../../services/dados-default.service";
import { ActivatedRoute, Router } from "@angular/router";
import { filter, map } from "rxjs/operators";
import { Util } from "../../../controller/Util";
import { MessageService } from "primeng/api";


@Component({
    selector: 'app-unreconciled-extracts',
    templateUrl: './unreconciled-extracts.component.html',
    styleUrls: ['./unreconciled-extracts.component.css']
})
export class UnreconciledExtractsComponent implements OnInit, OnDestroy {

    $subscription: Subscription;
    $subscriptionDadosDefault: Subscription;
    $subscriptionPreConciliadoNaoConciliado: Subscription;
    $subscriptionPreConciliadoNaoConciliadoQTD: Subscription;
    lista = []

    selectContaCaixa = []
    selectNaturezaFinanceira = []

    dataPesquisa

    dataIni;
    dataFim;
    id;

    top = 10
    skip = 0

    // @ViewChildren(ConciliadoTransferenciaComponent) itens: QueryList<ConciliadoTransferenciaComponent>;

    acoes = [
        {
            label: 'Marcar Todos', icon: 'fa fa-arrow-circle-right', command: (e) => {
                // this.itens.toArray().forEach(x => {
                //     x.form.get('selecionar').setValue(true)
                // })
            }
        }, {
            label: 'Confirmar Selecionados', icon: 'fa fa-arrow-circle-right', command: (e) => { }
        }, {
            label: 'Ordernar por Data', icon: 'fa fa-arrow-circle-right', command: (e) => {
                // this.lista = this.lista.slice(0).sort((arg1, arg2) => arg1.DataExtrato > arg2.DataExtrato ? 1 : -1)
            }
        }, {
            label: 'Ordenar por Valor', icon: 'fa fa-arrow-circle-right', command: (e) => {
                // this.lista = this.lista.slice(0).sort((arg1, arg2) => arg1.Valor > arg2.Valor ? 1 : -1)
            }
        }, {
            label: 'Ordenar por Histórico', icon: 'fa fa-arrow-circle-right', command: (e) => {
                // this.lista = this.lista.slice(0).sort((arg1, arg2) => arg1.Historico > arg2.Historico ? 1 : -1)
            }
        },
    ];
    totalItens;

    constructor(private networkService: NetworkService, private dadosDefault: DadosDefaultService, private route: ActivatedRoute, private messageService: MessageService, private router: Router) { }

    
    ngOnInit() {
        setTimeout(() => {
            // this.$subscriptionDadosDefault = this.dadosDefault.dadosSelectConciliacao().subscribe(v => {
            //     this.selectContaCaixa = v[0]
            //     this.selectNaturezaFinanceira = v[1]
            // })

            this.$subscription = this.route.parent.paramMap.subscribe((parametros: any) => {
                const param = parametros.params

                let value: any = {}
                value.idContaCaixa = param.id
                value.dataInicial = param.dataInicial
                value.dataFinal = param.dataFinal

                this.dataIni = param.dataInicial
                this.dataFim = param.dataFinal
                this.id = param.id

                this.dataPesquisa = value
                this.loadData()
            })
        }, 500)
    }

    ngOnDestroy(): void {
        if (this.$subscription) this.$subscription.unsubscribe();
        if (this.$subscriptionDadosDefault) this.$subscriptionDadosDefault.unsubscribe();
        if (this.$subscriptionPreConciliadoNaoConciliado) this.$subscriptionPreConciliadoNaoConciliado.unsubscribe();
        if (this.$subscriptionPreConciliadoNaoConciliadoQTD) this.$subscriptionPreConciliadoNaoConciliadoQTD.unsubscribe();
    }

    downloadPdf() {
        // this.dadosDefault.exibirLoader.next(true)
        // this.networkService.baixarPdf(getUrlFinanceiro(), `contabil/ExtratoPDF?DataIni=${this.dataIni}&DataFim=${this.dataFim}&IdConta=${Number(this.id)}&tipo=0`).subscribe(v => {
        //     Util.savePdf(v)
        // }).add(() => this.dadosDefault.exibirLoader.next(false))
    }

    loadData() {
        this.networkService.exibirLoader.next(true)

        // this.$subscriptionPreConciliadoNaoConciliadoQTD = this.networkService.getSimplesQtd(getUrlFinanceiro(),
        //     `LancamentoPreConciliado?$filter=(IdContaCaixa eq ${this.dataPesquisa.idContaCaixa} and DataExtrato ge ${this.dataPesquisa.dataInicial} and DataExtrato le ${this.dataPesquisa.dataFinal} and (Conciliado eq 'N' or Conciliado eq 'P'))&$inlinecount=allpages&$top=0${Util.expandedQuery(LancamentoPreConciliado.expanded(), true)}`).subscribe(qtd => {
        //         this.totalItens = qtd
        this.$subscriptionPreConciliadoNaoConciliado = this.networkService.getSimples(getUrlPro(), `StatementItems?AccountId=${this.dataPesquisa.idContaCaixa}&DateIni=${this.dataPesquisa.dataInicial}&DateEnd=${this.dataPesquisa.dataFinal}&Reconciled='N'${Util.expandedQuery(ProStatementItem.expanded(), true)}`).pipe(map((x: any) => x.value)).subscribe(x => {                     
            this.lista = x
            this.skip = this.skip + this.top
        }).add(() => this.networkService.exibirLoader.next(false));
        // })

    }

    recarregar() {
        // this.networkService.exibirLoader.next(true)

        // this.$subscriptionPreConciliadoNaoConciliadoQTD = this.networkService.getSimplesQtd(getUrlFinanceiro(),
        //     `LancamentoPreConciliado?$filter=(IdContaCaixa eq ${this.dataPesquisa.idContaCaixa} and DataExtrato ge ${this.dataPesquisa.dataInicial} and DataExtrato le ${this.dataPesquisa.dataFinal} and Conciliado eq 'N')&$inlinecount=allpages&$top=0`).subscribe(qtd => {
        //         this.totalItens = qtd
        //         this.$subscriptionPreConciliadoNaoConciliado = this.networkService.getSimples(getUrlFinanceiro(),
        //             `LancamentoPreConciliado?$filter=(IdContaCaixa eq ${this.dataPesquisa.idContaCaixa} and DataExtrato ge ${this.dataPesquisa.dataInicial} and DataExtrato le ${this.dataPesquisa.dataFinal} and Conciliado eq 'N')&$top=${this.skip + this.top}&$skip=${0}${Util.expandedQuery(LancamentoPreConciliado.expanded(), true)}&$orderby=Conciliado desc&$orderby=HistoricoBanco&$orderby=DataExtrato`).pipe(map((x: any) => x.value)).subscribe(x => {
        //                 this.lista = x
        //             }).add(() => this.networkService.exibirLoader.next(false));
        //     })

    }

    removerItem(index) {
        this.lista.splice(index, 1)
    }

    processarConciliacao() {
        // this.networkService.salvarPost(getUrlFinanceiro(), 'fin/processarConciliacao', { IdContaCaixa: Number(this.dataPesquisa.idContaCaixa), DataIni: this.dataPesquisa.dataInicial, DataFim: this.dataPesquisa.dataFinal }).subscribe(x => {
        //     this.messageService.add(Util.pushSuccessMsgSemDelay('Conciliações Processadas!'))
        //     this.skip = 0
        //     this.recarregar();
        // })
    }

}
