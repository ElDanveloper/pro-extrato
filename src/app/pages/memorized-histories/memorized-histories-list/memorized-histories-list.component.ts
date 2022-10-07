import { ProBankHistoric } from './../../../model/pro-bank-historic.model';
import { ProKeyWord } from '../../../model/pro-key-word.model';
import { Util } from 'src/app/controller/Util';
import { NetworkService } from '../../../services/network.service';
import { qtdLinhas, getUrlPro, opcoesLinhas } from '../../../controller/staticValues';
import { BaseListSimples } from 'src/app/controller/BaseListSimples';
import { Router } from '@angular/router';
import { MessageService, ConfirmationService, SelectItem } from 'primeng/api';
import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { BaseListSimplesHeaders } from 'src/app/controller/BaseListSimplesHeaders';

@Component({
  selector: 'app-memorized-histories-list',
  templateUrl: './memorized-histories-list.component.html',
  styleUrls: ['./memorized-histories-list.component.css']
})
export class MemorizedHistoriesListComponent extends BaseListSimplesHeaders implements OnInit, OnDestroy {

    @ViewChild('registrationMemorize') registrationMemorize: ElementRef;
   
    jaPesquisou = false
    pagina = 0;
    public first: number = 0
    public loading: boolean
    public top: number = qtdLinhas()
    qtdLinhas = qtdLinhas()
    opcoesLinhas = opcoesLinhas()
    public totalItens: number

    opcoesTable = [        
        {
            label: 'Excluir', icon: 'fa fa-close', command: (e) => {
                this.confirmationService.confirm({
                    message: `Você tem certeza que deseja deletar?`,
                    acceptLabel: `Sim`,
                    rejectLabel: `Não`,
                    accept: () => {
                        // this.dadosDefault.exibirLoader.next(true)
                        this.networkService.getSimples(getUrlPro(), `DeleteCategory?CategoryId=${e.Id}`).subscribe(v => {
                            this.messageService.add(Util.pushSuccessMsg("Exclusão realizada com Sucesso!"))
                            this.lista = []
                            this.carregarLista()
                            // window.location.reload()
                        })
                        // .add(this.dadosDefault.exibirLoader.next(false))
                    }
                })
            }
        }
    ]    

    constructor(public messageService: MessageService, public confirmationService: ConfirmationService, public networkService: NetworkService, public router: Router) {
        super(networkService, getUrlPro(), 'ProBankHistoric', Util.expandedQuery(ProBankHistoric.expanded(), ''))
        
    }

    ngOnInit() {        
        this.carregarLista()
    }

    pressionaEnter(e) {
        if (e.key === 'Enter') this.carregarLista()
    }
   
    registration() {
        this.registrationMemorize.nativeElement.click();
    }


    ngOnDestroy(): void {
        // if(this.$subscriptionListar) this.$subscriptionListar.unsubscribe()
        // if(this.$subscriptionDeletar) this.$subscriptionDeletar.unsubscribe()
    }

}