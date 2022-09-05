import { ProKeyWord } from '../../../model/pro-key-word.model';
import { Util } from 'src/app/controller/Util';
import { NetworkService } from '../../../services/network.service';
import { qtdLinhas, getUrlPro } from '../../../controller/staticValues';
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
export class MemorizedHistoriesListComponent extends BaseListSimples implements OnInit, OnDestroy {

    @ViewChild('registrationMemorize') registrationMemorize: ElementRef;
   
    jaPesquisou = false
    pagina = 0;
    public first: number = 0
    public loading: boolean
    public top: number = qtdLinhas()
    qtdLinhas = qtdLinhas()
    public totalItens: number

    opcoesTable = [        
        {
            label: 'Excluir', icon: 'fa fa-close', command: (e) => {}
        }
    ]    

    constructor(public messageService: MessageService, public confirmationService: ConfirmationService, public networkService: NetworkService, public router: Router) {
        super(networkService, getUrlPro(), 'ProBankHistoric', Util.expandedQuery(ProKeyWord.expanded(), ''))
        
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