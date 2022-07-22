import { opcoesLinhas, getUrlPro } from '../../../controller/staticValues';
import { DadosDefaultService } from '../../../services/dados-default.service';
import {Component, OnDestroy, OnInit} from '@angular/core';
import {map} from "rxjs/operators";
import {NetworkService} from "../../../services/network.service";
import {Subscription} from "rxjs";
import {Util} from "../../../controller/Util";
import {ActivatedRoute, Router} from "@angular/router";
import {ConfirmationService, MessageService} from "primeng/api";

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

    id
    dataInicial
    dataFinal

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
      this.$subscriptionExtratobanco = this.networkService.getSimples(getUrlPro(), `StatementItems?AccountId=${this.id}&DateIni=${this.dataInicial}&DateEnd=${this.dataFinal}`).pipe(map((x: any) => x.value)).subscribe(x => {
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

    processConciliation() {
        this.dadosDefault.exibirLoader.next(true)
        this.networkService.getSimples(getUrlPro(), `ProcessConciliate?DateIni=${this.dataInicial}&DateEnd=${this.dataFinal}&AccountId=${this.id}`).subscribe(v => {
            this.messageService.add(Util.pushSuccessMsg('Processo Realizado com Sucesso!'))
        }).add(this.dadosDefault.exibirLoader.next(false))        
    }
    
}
