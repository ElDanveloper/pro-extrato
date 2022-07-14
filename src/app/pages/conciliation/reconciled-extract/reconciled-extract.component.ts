import { opcoesLinhas, getUrlPro } from './../../../controller/staticValues';
import { DadosDefaultService } from './../../../services/dados-default.service';
import {Component, OnDestroy, OnInit} from '@angular/core';
import {map} from "rxjs/operators";
import {NetworkService} from "../../../services/network.service";
import {Subscription} from "rxjs";
import {Util} from "../../../controller/Util";
import {ActivatedRoute, Router} from "@angular/router";
import {ConfirmationService, MessageService} from "primeng/api";

@Component({
  selector: 'app-reconciled-extract',
  templateUrl: './reconciled-extract.component.html',
  styleUrls: ['./reconciled-extract.component.css']
})
export class ReconciledExtractComponent implements OnInit, OnDestroy {

    $subscription: Subscription;
    $subscriptionExtratobanco: Subscription;
    extratoContaBanco = []
    opcoesLinhas = opcoesLinhas()

    id
    dataInicial
    dataFinal

    itemsRow = [
        {
            label: 'Desconciliar', icon: 'pi pi-refresh', command: (e) => {
                // this.networkService.salvarPost(getUrlFinanceiro(), 'fin/ConciliaDesconciliaExtrato', {
                //     IdExtrato: e.Id,
                //     tipo: 'N',
                // }).subscribe(() => {
                //     this.carregaDados()
                // })
            }
        },{
            label: 'Conciliar', icon: 'pi pi-refresh', command: (e) => {
                // this.networkService.salvarPost(getUrlFinanceiro(), 'fin/ConciliaDesconciliaExtrato', {
                //     IdExtrato: e.Id,
                //     tipo: 'S',
                // }).subscribe(() => {
                //     this.carregaDados()
                // })
            }
        }, {
            label: 'Excluir', icon: 'fa fa-trash', command: (e) => {
                this.confirmationService.confirm({
                    message: `Você tem certeza que deseja deletar?`,
                    acceptLabel: `Sim`,
                    rejectLabel: `Não`,
                    accept: () => {
                        // this.networkService.salvarPost(getUrlFinanceiro(), 'contabil/ExcluirLancamentoExtrato', {IdExtra: e.Id}).subscribe(res => {
                        //     this.carregaDados()
                        // })
                    }
                })
            }
        },
    ];

  constructor(private networkService: NetworkService, private route: ActivatedRoute, private router: Router, private messageService: MessageService, public confirmationService: ConfirmationService, private dadosDefault: DadosDefaultService) { }

  ngOnInit() {
    setTimeout(() => {
      this.$subscription = this.route.parent.paramMap.subscribe((parametros: any) => {
          const param = parametros.params
          this.id = param.id
          this.dataInicial = param.dataInicial
          this.dataFinal = param.dataFinal
            this.carregaDados()
      })
    },500)
  }

  carregaDados() {
      this.networkService.exibirLoader.next(true)
      this.$subscriptionExtratobanco = this.networkService.getSimples(getUrlPro(), `StatementItems?AccountId=${this.id}&DateIni=${this.dataInicial}&DateEnd=${this.dataFinal}&Reconciled='S'`).pipe(map((x: any) => x.value)).subscribe(x => {
          this.extratoContaBanco = x
      }).add(() => this.networkService.exibirLoader.next(false));
  }

    ngOnDestroy(): void {
        if(this.$subscription) this.$subscription.unsubscribe();
        if(this.$subscriptionExtratobanco) this.$subscriptionExtratobanco.unsubscribe();
    }

    colorValue(v) {
        const classes = {
            'texto-verde': false,
            'texto-vermelho': false,
        }
        return Util.isNegative(v) ? {...classes, 'texto-vermelho': true} : {...classes, 'texto-verde': true}
    }

    downloadPdf() {
        // this.dadosDefault.exibirLoader.next(true)
        // this.networkService.baixarPdf(getUrlFinanceiro(), `contabil/ExtratoPDF?DataIni=${this.dataInicial}&DataFim=${this.dataFinal}&IdConta=${Number(this.id)}&tipo=2`).subscribe(v => {
        //     Util.savePdf(v)
        // }).add(() => this.dadosDefault.exibirLoader.next(false))
    }

    processarConciliacao() {
        // this.dadosDefault.exibirLoader.next(true)        
        // this.networkService.salvarPost(getUrlFinanceiro(), 'fin/processarConciliacao', {IdContaCaixa: Number(this.id), DataIni: this.dataInicial, DataFim: this.dataFinal}).subscribe(x => {
        //     this.messageService.add(Util.pushSuccessMsgSemDelay('Conciliações Processadas!'))
        //     this.carregaDados();
        // }).add(() => this.dadosDefault.exibirLoader.next(false))
    }

    reprocessarExtrato(){
        // this.dadosDefault.exibirLoader.next(true)
        // this.networkService.getSimples(getUrlFinanceiro(), `Fin/ProcessarConciliacaoInicial?DataIni=${this.dataInicial}&DataFim=${this.dataFinal}&IdContaCaixa=${this.id}`).subscribe(v => {
        //     this.carregaDados()
        //     this.messageService.add(Util.pushSuccessMsg("Processo Realizado com Sucesso!"))
        // }).add(() => this.dadosDefault.exibirLoader.next(false))
    }

}
