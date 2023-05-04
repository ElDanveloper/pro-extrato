import { BaseListSimplesHeaders } from './../../../../controller/BaseListSimplesHeaders';
import { getUrlPro, qtdLinhas, opcoesLinhas } from './../../../../controller/staticValues';
import { Router } from '@angular/router';
import { NetworkService } from './../../../../services/network.service';
import { MessageService, ConfirmationService, SelectItem } from 'primeng/api';
import { BaseListSimples } from './../../../../controller/BaseListSimples';
import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from "@angular/core";

@Component({
  selector: 'app-departments-list',
  templateUrl: './departments-list.component.html',
  styleUrls: ['./departments-list.component.css']
})
export class DepartmentsListComponent extends BaseListSimplesHeaders implements OnInit, OnDestroy {

    @ViewChild('registrationDepartments') registrationDepartments: ElementRef;
   
    jaPesquisou = false
    pagina = 0;
    public first: number = 0
    public loading: boolean
    public top: number = qtdLinhas()
    qtdLinhas = qtdLinhas()
    opcoesLinhas = opcoesLinhas()
    public totalItens: number
    

    constructor(public messageService: MessageService, public confirmationService: ConfirmationService, public networkService: NetworkService, public router: Router) {
        super(networkService, getUrlPro(), 'department', null)
        
    }

    ngOnInit() {        
        this.carregarDados()
    }

    pressionaEnter(e) {
        if (e.key === 'Enter') this.carregarLista()
    }

    

    linkPessoa(v) {
        // this.router.navigate([`/historico-pessoa/${v.Id}/pedido`])
    }

    getActive(active){        
        if(active === true) {            
            return 'S'
        } else {            
            return 'N'
        }
    }

    registration() {
        this.registrationDepartments.nativeElement.click();
    }


    ngOnDestroy(): void {
        // if(this.$subscriptionListar) this.$subscriptionListar.unsubscribe()
        // if(this.$subscriptionDeletar) this.$subscriptionDeletar.unsubscribe()
    }

}