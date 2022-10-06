import { getUrlReport } from './../../../controller/staticValues';
import { ProStatementItem } from '../../../model/pro-statement-item.model';
import { getUrlPro } from '../../../controller/staticValues';
import { Component, OnDestroy, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Subscription } from "rxjs";
import { NetworkService } from "../../../services/network.service";
import { DadosDefaultService } from "../../../services/dados-default.service";
import { ActivatedRoute, Router } from "@angular/router";
import { filter, map } from "rxjs/operators";
import { Util } from "../../../controller/Util";
import { MessageService } from "primeng/api";


@Component({
    selector: 'app-conciliator',
    templateUrl: './conciliator.component.html',
    styleUrls: ['./conciliator.component.css']
})
export class conciliatorComponent implements OnInit, OnDestroy {

    $subscription: Subscription;
    $subscriptionDadosDefault: Subscription;
    $subscriptionPreConciliadoNaoConciliado: Subscription;
    $subscriptionPreConciliadoNaoConciliadoQTD: Subscription;
    lista = []

    selectNaturezaFinanceira = []
    selectAccount = []

    dataPesquisa

    dataIni;
    dataFim;
    id;

    top = 10
    skip = 0
    

    totalItens;

    constructor(private networkService: NetworkService, private dadosDefault: DadosDefaultService, private route: ActivatedRoute, private messageService: MessageService, private router: Router) { }

    
    ngOnInit() {
        this.dadosDefault.conciliator().subscribe(value => {
            this.selectAccount = value[0]
        })
        setTimeout(() => {

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

    report(type) {             
        let body = {
            type: type,
            date_ini: this.dataIni,
            date_end: this.dataFim,
            account_id: this.id,
            reconcilied: "N"
        }

        this.dadosDefault.exibirLoader.next(true)
        if (type === 'pdf') {
            this.networkService.salvarEBaixarArquivo(getUrlReport(), 'DetailExtract', body).subscribe(v => {                
                Util.savePdf(v)
            }).add(this.dadosDefault.exibirLoader.next(false))
        }
        if (type === 'xls') {
            this.networkService.baixarXls(getUrlReport(), 'DetailExtract', body).subscribe(v => {                
                Util.saveXls(v)
            }).add(this.dadosDefault.exibirLoader.next(false))
        }
    }

    loadData() {
        this.dadosDefault.exibirLoader.next(true)

        // this.$subscriptionPreConciliadoNaoConciliadoQTD = this.networkService.getSimplesQtd(getUrlFinanceiro(),
        //     `LancamentoPreConciliado?$filter=(IdContaCaixa eq ${this.dataPesquisa.idContaCaixa} and DataExtrato ge ${this.dataPesquisa.dataInicial} and DataExtrato le ${this.dataPesquisa.dataFinal} and (Conciliado eq 'N' or Conciliado eq 'P'))&$inlinecount=allpages&$top=0${Util.expandedQuery(LancamentoPreConciliado.expanded(), true)}`).subscribe(qtd => {
        //         this.totalItens = qtd
        this.$subscriptionPreConciliadoNaoConciliado = this.networkService.getSimples(getUrlPro(), `StatementItems?AccountId=${this.dataPesquisa.idContaCaixa}&DateIni=${this.dataPesquisa.dataInicial}&DateEnd=${this.dataPesquisa.dataFinal}&Reconciled='N'&Pendentes=true${Util.expandedQuery(ProStatementItem.expanded(), true)}`).pipe(map((x: any) => x.value)).subscribe(x => {                     
            this.lista = x
            this.skip = this.skip + this.top
        }).add(() => this.dadosDefault.exibirLoader.next(false));
        // })

    }
   
    removeItem(index) {        
        this.lista.splice(index, 1)
    }

    processConciliation() {
        this.dadosDefault.exibirLoader.next(true)
        this.networkService.getSimples(getUrlPro(), `ProcessConciliate?DateIni=${this.dataIni}&DateEnd=${this.dataFim}&AccountId=${this.id}`).subscribe(v => {
            this.messageService.add(Util.pushSuccessMsg('Processo Realizado com Sucesso!'))
        }).add(this.dadosDefault.exibirLoader.next(false))        
    }

}
