import { opcoesLinhas } from './../../../controller/staticValues';
import { DadosDefaultService } from './../../../services/dados-default.service';
import {Component, OnDestroy, OnInit} from '@angular/core';
import {NetworkService} from "../../../services/network.service";
import {ActivatedRoute, Router} from "@angular/router";
import {map} from "rxjs/operators";
import {Subscription} from "rxjs";
import {Util} from "../../../controller/Util";
import {ConfirmationService, MessageService} from "primeng/api";

@Component({
  selector: 'app-unreconciled-accounting',
  templateUrl: './unreconciled-accounting.component.html',
  styleUrls: ['./unreconciled-accounting.component.css']
})
export class UnreconciledAccountingComponent implements OnInit, OnDestroy {

    $subscription: Subscription;
    $subscriptionContabilNaoConciliado: Subscription;
    contabilNaoConciliados = []
    opcoesLinhas = opcoesLinhas()

    idContaCaixa

    id
    dataInicial
    dataFinal

    itemsRowConciliacao = [
        {
            label: 'Editar', icon: 'pi pi-refresh', command: (e) => {
                this.router.navigate([`lancamentos-contabeis/cadastro/${e.idlanccontabil}`])
            }
        },
        {
            label: 'Excluir', icon: 'pi pi-refresh', command: (e) => {
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

        this.$subscription = this.route.parent.paramMap.subscribe((parametros: any) => {
            const param = parametros.params
            this.id = param.id
            this.dataInicial = param.dataInicial
            this.dataFinal = param.dataFinal

            // this.$subscriptionContabilNaoConciliado = this.networkService.getSimples(getUrlFinanceiro(), `fin/contabilNaoConciliados?IdContaCaixa=${this.id}&DataInicial=${this.dataInicial}&DataFinal=${this.dataFinal}&$orderby=Data&$orderby=Historico`).pipe(map((x: any) => x.value)).subscribe((x: any) => {
            //     this.contabilNaoConciliados = x
            // });
        })
    }

    processarConciliacao() {
        this.dadosDefault.exibirLoader.next(true)
        // this.networkService.salvarPost(getUrlFinanceiro(), 'fin/processarConciliacao', {IdContaCaixa: Number(this.id), DataIni: this.dataInicial, DataFim: this.dataFinal}).subscribe(x => {
        //     this.messageService.add(Util.pushSuccessMsgSemDelay('Conciliações Processadas!'))
        //     this.carregarLista();
        // }).add(() => this.dadosDefault.exibirLoader.next(false))
    }

}
