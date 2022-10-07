import { Category } from './../../../model/category.model';
import { qtdLinhas, getUrlReport } from './../../../controller/staticValues';
import { ProStatementItem } from './../../../model/pro-statement-item.model';
import { opcoesLinhas, getUrlPro } from '../../../controller/staticValues';
import { DadosDefaultService } from '../../../services/dados-default.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NetworkService } from "../../../services/network.service";
import { ActivatedRoute, Router } from "@angular/router";
import { map } from "rxjs/operators";
import { Subscription } from "rxjs";
import { Util } from "../../../controller/Util";
import { ConfirmationService, MessageService } from "primeng/api";

@Component({
    selector: 'app-not-reconciled',
    templateUrl: './not-reconciled.component.html',
    styleUrls: ['./not-reconciled.component.css']
})
export class NotReconciledComponent implements OnInit, OnDestroy {

    $subscription: Subscription;
    $subscriptionContabilNaoConciliado: Subscription;
    contabilNaoConciliados = []
    opcoesLinhas = opcoesLinhas()
    qtdLinhas = qtdLinhas()

    idContaCaixa

    id
    dataInicial
    dataFinal

    public loading: boolean
    public top: number = 7
    jaPesquisou = false

    totalItens;

    lista = []
    selected = [];
    filterCategory = false
    category: any;

    itemsRowConciliacao = [
        // {
        //     label: 'Editar', icon: 'pi pi-pencil', command: (e) => {
        //         // this.router.navigate([`lancamentos-contabeis/cadastro/${e.idlanccontabil}`])
        //     }
        // },
        {
            label: 'Excluir', icon: 'pi pi-trash', command: (e) => {
                this.confirmationService.confirm({
                    message: `Você tem certeza que deseja deletar?`,
                    acceptLabel: `Sim`,
                    rejectLabel: `Não`,
                    accept: () => {
                        // this.networkService.salvarPost(getUrlFinanceiro(), 'contabil/ExcluirLancamento', {IdLanc: e.idlanccontabil}).subscribe(res => {
                        //         this.carregarLista()
                        //     })
                    }
                })
            }
        },
        {
            label: 'Conciliar', icon: 'pi pi-refresh', command: (e) => {
                // this.networkService.salvarPost(getUrlFinanceiro(), 'fin/ConciliaDesconciliaContabil', {
                //     IdLancContabil: e.Id,
                //     tipo: 'S',
                // }).subscribe(() => {
                //     this.carregarLista()
                // })
            }
        },
    ];

    constructor(public confirmationService: ConfirmationService, private networkService: NetworkService, private route: ActivatedRoute, private router: Router, public messageService: MessageService, private dadosDefault: DadosDefaultService) { }

    ngOnInit() {
        this.$subscription = this.route.parent.paramMap.subscribe((parametros: any) => {
            const param = parametros.params
            this.id = param.id
            this.dataInicial = param.dataInicial
            this.dataFinal = param.dataFinal
        })
        this.carregarLista()
    }

    ngOnDestroy(): void {
        if (this.$subscription) this.$subscription.unsubscribe();
        if (this.$subscriptionContabilNaoConciliado) this.$subscriptionContabilNaoConciliado.unsubscribe();
    }

    report(type) {             
        let body = {
            type: type,
            date_ini: this.dataInicial,
            date_end: this.dataFinal,
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

    descriptionSpecie(v) {
        switch (v) {
            case 'C':
                return 'Crédito'
            case 'D':
                return 'Débito'
        }
    }

    colorValue(v) {
        const classes = {
            'texto-verde': false,
            'texto-vermelho': false,
        }
        return Util.isNegative(v) ? { ...classes, 'texto-vermelho': true } : { ...classes, 'texto-verde': true }
    }

    private carregarLista(page = 1, top = 7) {
        // if (this.filterCategory) {
        //     this.dadosDefault.exibirLoader.next(true)
        //     this.networkService.getSimplesComHeaders(getUrlPro(), `StatementItems?AccountId=${this.id}&DateIni=${this.dataInicial}&DateEnd=${this.dataFinal}&Reconciled='N'${Util.expandedQuery(ProStatementItem.expanded(), true)}`, page, top).subscribe((x: any) => {
        //         this.totalItens = x.headers.get('total')
        //         this.lista = x.body['value']
        //     }).add(() => this.dadosDefault.exibirLoader.next(false));
        // } else {
            this.dadosDefault.exibirLoader.next(true)
            // ${Util.expandedQuery(ProStatementItem.expanded(), true)}
            this.networkService.getSimplesComHeaders(getUrlPro(), `StatementItems?AccountId=${this.id}&DateIni=${this.dataInicial}&DateEnd=${this.dataFinal}&Reconciled='N'${Util.expandedQuery(ProStatementItem.expanded(), true)}`, page, top).subscribe((x: any) => {
                this.totalItens = x.headers.get('total')
                this.lista = x.body['value']
                this.jaPesquisou = true
                // this.lista = x
            }).add(() => this.dadosDefault.exibirLoader.next(false));
        // }
    }

    selectedCategory(event) {
        this.category = event        
        this.filterCategory = true
        // this.carregarLista()
    }

    public lazyLoad(event): void {
        if (!this.jaPesquisou) return
        this.loading = true
        if (this.lista) {
            if (this.top !== event.rows && event.rows !== undefined) {
                this.top = event.rows
                event.first = 0
            }

            this.carregarLista((event.first / this.top) + 1, this.top)
            this.loading = false
        }
    }

    reconcileSelected() {
        if (this.selected.length < 1) {
            this.messageService.add(Util.pushInfoMessage('Favor selecionar uma conta para conciliação!'))
            return
        }

        let listIds = this.selected.map(v => v.Id.toString())

        let body = {
            ListIds: listIds,
            FinancialId: this.category.Id
        }

        this.dadosDefault.exibirLoader.next(true)
        this.networkService.salvarPost(getUrlPro(), 'UpdateStatementItems', body).subscribe(v => {
            this.messageService.add(Util.pushSuccessMsg('Conciliação feita com sucesso!'))
            this.carregarLista()
            listIds = []
            body.FinancialId = 0
            body.ListIds = []
            this.selected = []
        }).add(this.dadosDefault.exibirLoader.next(false))
                
    }

    processConciliation() {
        this.dadosDefault.exibirLoader.next(true)
        this.networkService.getSimples(getUrlPro(), `ProcessConciliate?DateIni=${this.dataInicial}&DateEnd=${this.dataFinal}&AccountId=${this.id}`).subscribe(v => {
            this.messageService.add(Util.pushSuccessMsg('Processo Realizado com Sucesso!'))
        }).add(this.dadosDefault.exibirLoader.next(false))
    }

}
