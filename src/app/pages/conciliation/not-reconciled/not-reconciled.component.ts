import { ProStatementItem } from './../../../model/pro-statement-item.model';
import { opcoesLinhas, getUrlPro } from '../../../controller/staticValues';
import { DadosDefaultService } from '../../../services/dados-default.service';
import {Component, OnDestroy, OnInit} from '@angular/core';
import {NetworkService} from "../../../services/network.service";
import {ActivatedRoute, Router} from "@angular/router";
import {map} from "rxjs/operators";
import {Subscription} from "rxjs";
import {Util} from "../../../controller/Util";
import {ConfirmationService, MessageService} from "primeng/api";

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

    idContaCaixa

    id
    dataInicial
    dataFinal

    lista = []

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
        if(this.$subscription) this.$subscription.unsubscribe();
        if(this.$subscriptionContabilNaoConciliado) this.$subscriptionContabilNaoConciliado.unsubscribe();
    }

    downloadPdf() {
        this.dadosDefault.exibirLoader.next(true)
        // this.networkService.baixarPdf(getUrlFinanceiro(), `contabil/ExtratoPDF?DataIni=${this.dataInicial}&DataFim=${this.dataFinal}&IdConta=${Number(this.id)}&tipo=1`).subscribe(v => {
        //     Util.savePdf(v)
        // }).add(() => this.dadosDefault.exibirLoader.next(false))
    }

    colorValue(v) {
        const classes = {
            'texto-verde': false,
            'texto-vermelho': false,
        }
        return Util.isNegative(v) ? {...classes, 'texto-vermelho': true} : {...classes, 'texto-verde': true}
    }

    private carregarLista() {       
            this.dadosDefault.exibirLoader.next(true)
            this.networkService.getSimples(getUrlPro(), `StatementItems?AccountId=${this.id}&DateIni=${this.dataInicial}&DateEnd=${this.dataFinal}&Reconciled='N'${Util.expandedQuery(ProStatementItem.expanded(), true)}`).pipe(map((x: any) => x.value)).subscribe(x => {                     
                this.lista = x                
            }).add(() => this.dadosDefault.exibirLoader.next(false));
    }

    processConciliation() {
        this.dadosDefault.exibirLoader.next(true)
        this.networkService.getSimples(getUrlPro(), `ProcessConciliate?DateIni=${this.dataInicial}&DateEnd=${this.dataFinal}&AccountId=${this.id}`).subscribe(v => {
            this.messageService.add(Util.pushSuccessMsg('Processo Realizado com Sucesso!'))
        }).add(this.dadosDefault.exibirLoader.next(false))        
    }

}
