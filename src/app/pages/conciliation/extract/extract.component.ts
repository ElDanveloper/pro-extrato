import { qtdLinhas, getUrlReport } from './../../../controller/staticValues';
import { opcoesLinhas, getUrlPro } from '../../../controller/staticValues';
import { DadosDefaultService } from '../../../services/dados-default.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { map } from "rxjs/operators";
import { NetworkService } from "../../../services/network.service";
import { Subscription } from "rxjs";
import { Util } from "../../../controller/Util";
import { ActivatedRoute, Router } from "@angular/router";
import { ConfirmationService, MessageService } from "primeng/api";

@Component({
    selector: 'app-extract',
    templateUrl: './extract.component.html',
    styleUrls: ['./extract.component.css']
})
export class ExtractComponent implements OnInit, OnDestroy {

    $subscription: Subscription;
    $subscriptionExtratobanco: Subscription;
    extratoContaBanco = []
    opcoesLinhas = opcoesLinhas()
    qtdLinhas = qtdLinhas()

    id
    dataInicial
    dataFinal
    jaPesquisou = false
    public loading: boolean
    public top: number = 7

    totalItens;

    itemsRow = [
        {
            label: 'Desconciliar', icon: 'pi pi-refresh', command: (e) => {
                this.dadosDefault.exibirLoader.next(true)
                this.networkService.getSimples(getUrlPro(), `Desconciliate?Id=${e.Id}`).subscribe(v => {
                    this.messageService.add(Util.pushSuccessMsg('Desconciliado com Sucesso!'))
                    this.carregaDados()
                }).add(this.dadosDefault.exibirLoader.next(false))
            }
        }, {
            label: 'Excluir', icon: 'fa fa-trash', command: (e) => {
                this.confirmationService.confirm({
                    message: `Você tem certeza que deseja deletar?`,
                    acceptLabel: `Sim`,
                    rejectLabel: `Não`,
                    accept: () => {
                        this.dadosDefault.exibirLoader.next(true)
                        this.networkService.getSimples(getUrlPro(), `ExcludeTransection?Id=${e.Id}`).subscribe(v => {
                            this.messageService.add(Util.pushSuccessMsg('Item Excluido com Sucesso!'))
                            this.carregaDados()
                        }).add(this.dadosDefault.exibirLoader.next(false))
                    }
                })
            }
        },
    ];

    constructor(private networkService: NetworkService, private route: ActivatedRoute, private router: Router, private messageService: MessageService, public confirmationService: ConfirmationService, private dadosDefault: DadosDefaultService) { }

    ngOnInit() {

        this.$subscription = this.route.parent.paramMap.subscribe((parametros: any) => {
            const param = parametros.params
            this.id = param.id
            this.dataInicial = param.dataInicial
            this.dataFinal = param.dataFinal
        })
        //   setTimeout(() => {
        this.carregaDados()
        // },500)
    }

    carregaDados(page = 1, top = 7) {
        this.networkService.exibirLoader.next(true)
        this.$subscriptionExtratobanco = this.networkService.getSimplesComHeaders(getUrlPro(), `StatementItems?AccountId=${this.id}&DateIni=${this.dataInicial}&DateEnd=${this.dataFinal}`, page, top).subscribe((x: any) => {
            this.totalItens = x.headers.get('total')
            this.extratoContaBanco = x.body['value']
            this.jaPesquisou = true
        }).add(() => this.networkService.exibirLoader.next(false));
    }

    public lazyLoad(event): void {        
        if (!this.jaPesquisou) return;
        this.loading = true
        if (this.extratoContaBanco) {
            if (this.top !== event.rows && event.rows !== undefined) {
                this.top = event.rows
                event.first = 0
            }

            this.carregaDados((event.first / this.top) + 1, this.top)
            this.loading = false
        }
    }

    report(type) {
        let body = {
            type: type,
            date_ini: this.dataInicial,
            date_end: this.dataFinal,
            account_id: this.id,
        }

        if (type === 'pdf') {
            this.dadosDefault.exibirLoader.next(true)
            this.networkService.salvarEBaixarArquivo(getUrlReport(), 'DetailExtract', body).subscribe(v => {
                Util.savePdf(v, 'Extrato Detalhado')
            }).add(() => this.dadosDefault.exibirLoader.next(false))
        }
        if (type === 'xls') {
            this.dadosDefault.exibirLoader.next(true)
            this.networkService.baixarXls(getUrlReport(), 'DetailExtract', body).subscribe(v => {
                console.log('teste')
                Util.saveXls(v, 'Extrato Detalhado.xls')
            }).add(() => this.dadosDefault.exibirLoader.next(false))
        }

    }

    ngOnDestroy(): void {
        if (this.$subscription) this.$subscription.unsubscribe();
        if (this.$subscriptionExtratobanco) this.$subscriptionExtratobanco.unsubscribe();
    }

    status(v) {        
        switch (v) {
            case 'N': {
                return 'Não'
            }
            case 'S': {
                return 'Sim'
            }
            case 'P': {
                return 'Pendente'
            }
        }
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
