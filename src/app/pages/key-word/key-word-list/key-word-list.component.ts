import { BaseListSimplesHeaders } from 'src/app/controller/BaseListSimplesHeaders';
import { ProKeyWord } from './../../../model/pro-key-word.model';
import { Util } from 'src/app/controller/Util';
import { NetworkService } from './../../../services/network.service';
import { qtdLinhas, getUrlPro, opcoesLinhas } from './../../../controller/staticValues';
import { BaseListSimples } from 'src/app/controller/BaseListSimples';
import { Router } from '@angular/router';
import { MessageService, ConfirmationService, SelectItem } from 'primeng/api';
import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from "@angular/core";

@Component({
  selector: 'app-key-word-list',
  templateUrl: './key-word-list.component.html',
  styleUrls: ['./key-word-list.component.css']
})
export class KeyWordListComponent extends BaseListSimplesHeaders implements OnInit, OnDestroy {

    @ViewChild('registrationKeyWord') registrationKeyWord: ElementRef;
   
    jaPesquisou = false
    pagina = 0;
    public first: number = 0
    public loading: boolean
    public top: number = qtdLinhas()
    qtdLinhas = qtdLinhas()
    opcoesLinhas = opcoesLinhas()
    public totalItens: number

    opcoesTable = [
        {label: 'Alterar', icon: 'fa fa-edit', command: (e) => {            
            this.router.navigate([`/key-word/registration/${e.Id}`])
        }},
        {
            label: 'Excluir', icon: 'fa fa-close', command: (e) => {}
        }
    ]    

    constructor(public messageService: MessageService, public confirmationService: ConfirmationService, public networkService: NetworkService, public router: Router) {
        super(networkService, getUrlPro(), 'ProKeyWord', Util.expandedQuery(ProKeyWord.expanded()))
        
    }

    ngOnInit() {        
        this.carregarLista()
    }

    pressionaEnter(e) {
        if (e.key === 'Enter') this.carregarLista()
    }
   
    registration() {
        this.registrationKeyWord.nativeElement.click();
    }


    ngOnDestroy(): void {
        // if(this.$subscriptionListar) this.$subscriptionListar.unsubscribe()
        // if(this.$subscriptionDeletar) this.$subscriptionDeletar.unsubscribe()
    }

}