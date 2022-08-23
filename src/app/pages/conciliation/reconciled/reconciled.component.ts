import { ProStatementItem } from 'src/app/model/pro-statement-item.model';
import { opcoesLinhas, getUrlPro } from './../../../controller/staticValues';
import { DadosDefaultService } from './../../../services/dados-default.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from "rxjs";
import { NetworkService } from "../../../services/network.service";
import { map } from "rxjs/operators";
import { ActivatedRoute, Router } from "@angular/router";
import { Util } from "../../../controller/Util";
import { ConfirmationService, MessageService } from "primeng/api";

@Component({
    selector: 'app-reconciled',
    templateUrl: './reconciled.component.html',
    styleUrls: ['./reconciled.component.css']
})

export class ReconciledComponent implements OnInit, OnDestroy {

    $subscription: Subscription;
    $subscriptionConciliados: Subscription;
    contabilConciliados = []
    opcoesLinhas = opcoesLinhas()

    lista = []
    selected = [];

    id
    dataInicial
    dataFinal

    itemsRowConciliacao = [       
        {
            label: 'Excluir', icon: 'fa fa-trash', command: (e) => {
                this.confirmationService.confirm({
                    message: `Você tem certeza que deseja deletar?`,
                    acceptLabel: `Sim`,
                    rejectLabel: `Não`,
                    accept: () => {
                        this.dadosDefault.exibirLoader.next(true)
                        this.networkService.getSimples(getUrlPro(), `ExcludeTransection?Id=${e.Id}`).subscribe(v => {
                            this.messageService.add(Util.pushSuccessMsg('Item Excluido com Sucesso!'))
                            this.carregarLista()
                        }).add(this.dadosDefault.exibirLoader.next(false))
                    }
                })
            }
        },
        {
            label: 'Desconciliar', icon: 'pi pi-refresh', command: (e) => {
                this.dadosDefault.exibirLoader.next(true)
                this.networkService.getSimples(getUrlPro(), `Desconciliate?Id=${e.Id}`).subscribe(v => {
                    this.messageService.add(Util.pushSuccessMsg('Desconciliado com Sucesso!'))
                    this.carregarLista()
                }).add(this.dadosDefault.exibirLoader.next(false))
            }
        },
    ];

    constructor(public confirmationService: ConfirmationService, public networkService: NetworkService, private route: ActivatedRoute, private router: Router, public messageService: MessageService, private dadosDefault: DadosDefaultService) { }

    ngOnInit() {
        this.carregarLista()
    }

    carregarLista(page = 1, top = 10) {
        this.$subscription = this.route.parent.paramMap.subscribe((parametros: any) => {
            const param = parametros.params
            this.id = param.id
            this.dataInicial = param.dataInicial
            this.dataFinal = param.dataFinal           
        })

        this.networkService.exibirLoader.next(true)
        // ${Util.expandedQuery(ProStatementItem.expanded(), true)}
        this.$subscriptionConciliados = this.networkService.getSimplesComHeaders(getUrlPro(), `StatementItems?AccountId=${this.id}&DateIni=${this.dataInicial}&DateEnd=${this.dataFinal}&Reconciled='S'`, page, top).pipe(map((x: any) => x.value)).subscribe(x => {
            this.lista = x
        }).add(() => this.networkService.exibirLoader.next(false));
    }

    ngOnDestroy(): void {
        if (this.$subscription) this.$subscription.unsubscribe();
        if (this.$subscriptionConciliados) this.$subscriptionConciliados.unsubscribe();
    }

    downloadPdf() {
        // this.dadosDefault.exibirLoader.next(true)
        // this.networkService.baixarPdf(getUrlFinanceiro(), `contabil/ExtratoPDF?DataIni=${this.dataInicial}&DataFim=${this.dataFinal}&IdConta=${Number(this.id)}&tipo=3`).subscribe(v => {
        //     Util.savePdf(v)
        // }).add(() => this.dadosDefault.exibirLoader.next(false))
    }

    colorValue(v) {
        const classes = {
            'texto-verde': false,
            'texto-vermelho': false,
        }
        return Util.isNegative(v) ? { ...classes, 'texto-vermelho': true } : { ...classes, 'texto-verde': true }
    }

    processConciliation() {
        this.dadosDefault.exibirLoader.next(true)
        this.networkService.getSimples(getUrlPro(), `ProcessConciliate?DateIni=${this.dataInicial}&DateEnd=${this.dataFinal}&AccountId=${this.id}`).subscribe(v => {
            this.messageService.add(Util.pushSuccessMsg('Processo Realizado com Sucesso!'))
        }).add(this.dadosDefault.exibirLoader.next(false))        
    }

}
