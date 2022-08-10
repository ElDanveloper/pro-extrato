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

    // modalCadastrarPessoa = false

    // public entidade: string = 'empregador'
    // jaPesquisou = false
    // pagina = 0;
    // public first: number = 0
    // public loading: boolean
    // public top: number = qtdLinhas()
    qtdLinhas = qtdLinhas()
    public totalItens2: number
    modalCadastrarPessoa = false
    // lista2 = []
    @ViewChild('inputPesquisa') public inputPesquisa
    @ViewChild('selectValue') public selectValue
    public selectSort: SelectItem[] = [{label: 'ID', value: 'ID'}, {label: 'NOME', value: 'NOME'}]
    cadastrar = false
    opcoesTable = [
        {label: 'Alterar', icon: 'fa fa-edit', command: (e) => {            
            this.router.navigate([`/person/registration/${e.Id}`])
        }},
        {label: 'Excluir', icon: 'fa fa-close', command: (e) => {}},
        {label: 'Ver Histórico', icon: 'fa fa-eye', command: (e) => {
                this.router.navigate([`/historico-pessoa/${e.Id}`])
            }},
    ]

    // filtro = ''

    constructor(public messageService: MessageService, public confirmationService: ConfirmationService, public networkService: NetworkService, public router: Router, public dadosDefault: DadosDefaultService) {
        super(networkService, getUrlPro(), 'GetPersonClient',null)
    }

    ngOnInit() {        
        this.carregarLista()
        // this.totalItens2 = this.lista.length
    }

    pressionaEnter(e) {
        if (e.key === 'Enter') this.carregarLista()
    }

//     get pessoas () {               
//         return this.lista.filter(v => {            
//             if (v.PersonId.Nome === null) {
//                 v.PersonId.Nome = ''
//             }               
//             if (v.PersonId.CpfCnpj === null) {
//                 v.PersonId.CpfCnpj = ''
//             }
//             return v.PersonId.Nome.toLowerCase().includes(this.filtro.toLowerCase()) || v.PersonId.CpfCnpj.toString().includes(this.filtro)
//         })
    
// }

    

    linkPessoa(v) {
        this.router.navigate([`/historico-pessoa/${v.Id}/pedido`])
    }

    
    public navegar() {               
        // this.router.navigate([`/cadastro`])
        // this.cadastrarEmpresa.nativeElement.click()   
        this.modalCadastrarPessoa = true     
    }
    

    


    // public deletar(rowData) {
    //     this.confirmationService.confirm({
    //         message: `Você tem certeza que deseja deletar?`,
    //         acceptLabel: `Sim`,
    //         rejectLabel: `Não`,
    //         accept: () => {
    //             this.$subscriptionDeletar = this.networkService.deletar('', this.entidade, rowData.IdPessoaEmpresa).subscribe(res => {
    //                     this.carregarLista()
    //                 })
    //         }
    //     })
    // }

    // public editar(rowData) {
    //     this.router.navigate([`/${this.entidade}/${Util.cadastroRoute()}/${rowData.IdPessoaEmpresa}`])
    // }

    

    ngOnDestroy(): void {
        // if(this.$subscriptionListar) this.$subscriptionListar.unsubscribe()
        // if(this.$subscriptionDeletar) this.$subscriptionDeletar.unsubscribe()
    }

}
