import { getUrlPro, qtdLinhas } from './../../../../controller/staticValues';
import { Router } from '@angular/router';
import { NetworkService } from './../../../../services/network.service';
import { MessageService, ConfirmationService, SelectItem } from 'primeng/api';
import { BaseListSimples } from './../../../../controller/BaseListSimples';
import { Component, OnDestroy, OnInit } from "@angular/core";

@Component({
  selector: 'app-departments-list',
  templateUrl: './departments-list.component.html',
  styleUrls: ['./departments-list.component.css']
})
export class DepartmentsListComponent extends BaseListSimples implements OnInit, OnDestroy {

    jaPesquisou = false
    pagina = 0;
    public first: number = 0
    public loading: boolean
    public top: number = qtdLinhas()
    qtdLinhas = qtdLinhas()
    public totalItens: number
    lista2 = []
   
   
    // opcoesTable = [
    //     {label: 'Alterar', icon: 'fa fa-edit', command: (e) => this.editar(e)},
    //     {label: 'Excluir', icon: 'fa fa-close', command: (e) => this.deletar(e)},
    //     {label: 'Ver Histórico', icon: 'fa fa-eye', command: (e) => {
    //             this.router.navigate([`/historico-pessoa/${e.Id}`])
    //         }},
    // ]

    

    constructor(public messageService: MessageService, public confirmationService: ConfirmationService, public networkService: NetworkService, public router: Router) {
        super(networkService, getUrlPro(), 'Department')
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


    ngOnDestroy(): void {
        // if(this.$subscriptionListar) this.$subscriptionListar.unsubscribe()
        // if(this.$subscriptionDeletar) this.$subscriptionDeletar.unsubscribe()
    }

}
