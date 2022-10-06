import { opcoesLinhas } from './../../../controller/staticValues';
import { BaseListSimplesHeaders } from './../../../controller/BaseListSimplesHeaders';
import { DadosDefaultService } from '../../../services/dados-default.service';
import { PersonClient } from '../../../model/person-client.model';
import { Util } from '../../../controller/Util';
import { BaseListCompleta } from '../../../controller/base-list-completa';
import { NetworkService } from '../../../services/network.service';
import { qtdLinhas, getUrlClient, getUrlPro } from '../../../controller/staticValues';
import { BaseListSimples } from 'src/app/controller/BaseListSimples';
import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ConfirmationService, Message, MessageService, SelectItem} from "primeng/api";
import {Router} from "@angular/router";


@Component({
  selector: 'app-person-list',
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.css']
})
export class PersonListComponent extends BaseListSimplesHeaders implements OnInit, OnDestroy {

    @ViewChild('cadastrarPessoa') cadastrarPessoa: ElementRef;
    
    qtdLinhas = qtdLinhas()
    opcoesLinhas = opcoesLinhas()
    modalCadastrarPessoa = false
    totalItens2: number = 0
    // lista2 = []
    @ViewChild('inputPesquisa') public inputPesquisa
    @ViewChild('selectValue') public selectValue
    cadastrar = false
    opcoesTable = [
        {label: 'Alterar', icon: 'fa fa-edit', command: (e) => {            
            this.router.navigate([`/person/registration/${e.Id}`])
        }},
        {label: 'Excluir', icon: 'fa fa-close', command: (e) => {}},    
    ]

    // filtro = ''

    constructor(public messageService: MessageService, public confirmationService: ConfirmationService, public networkService: NetworkService, public router: Router, public dadosDefault: DadosDefaultService) {
        super(networkService, getUrlPro(), 'GetPersonClient',null)
    }

    ngOnInit() {        
        this.carregarLista()
        setTimeout(() => {
            this.totalItens2 = this.totalItens
        }, 1000)
        
        // this.totalItens2 = this.lista.length
    }

    pressionaEnter(e) {
        if (e.key === 'Enter') this.carregarLista()
    }
       
    
    public navegar() {         
        this.modalCadastrarPessoa = true     
    }
        
    ngOnDestroy(): void {
        // if(this.$subscriptionListar) this.$subscriptionListar.unsubscribe()
        // if(this.$subscriptionDeletar) this.$subscriptionDeletar.unsubscribe()
    }

}
