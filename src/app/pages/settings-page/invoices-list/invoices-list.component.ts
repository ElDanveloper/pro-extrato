import { Router } from '@angular/router';
import { NetworkService } from './../../../services/network.service';
import { SelectItem, MessageService, ConfirmationService } from 'primeng/api';
import { qtdLinhas, getUrlPro } from './../../../controller/staticValues';
import { BaseListSimples } from './../../../controller/BaseListSimples';
import { Component, OnDestroy, OnInit } from "@angular/core";

@Component({
  selector: 'app-invoices-list',
  templateUrl: './invoices-list.component.html',
  styleUrls: ['./invoices-list.component.css']
})
export class InvoicesListComponent extends BaseListSimples implements OnInit, OnDestroy {

    jaPesquisou = false
    pagina = 0;
    public first: number = 0
    public loading: boolean
    public top: number = qtdLinhas()
    qtdLinhas = qtdLinhas()
    public totalItens: number   
    opcoesTable = [        
        {label: 'Boleto', icon: 'fa fa-edit', command: (e) => {}},
        {label: 'Pdf', icon: 'fa fa-close', command: (e) => {}},        
    ]

    

    constructor(public messageService: MessageService, public confirmationService: ConfirmationService, public networkService: NetworkService, public router: Router) {
        super(networkService, getUrlPro(), 'contractor')
    }

    ngOnInit() {        
        // this.carregarDados()
    }

    pressionaEnter(e) {
        if (e.key === 'Enter') this.carregarLista()
    }

    

    linkPessoa(v) {
        this.router.navigate([`/historico-pessoa/${v.Id}/pedido`])
    }


    ngOnDestroy(): void {
        // if(this.$subscriptionListar) this.$subscriptionListar.unsubscribe()
        // if(this.$subscriptionDeletar) this.$subscriptionDeletar.unsubscribe()
    }

}
