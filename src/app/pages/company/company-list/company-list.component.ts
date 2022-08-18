import { BaseListSimplesHeaders } from './../../../controller/BaseListSimplesHeaders';
import { NetworkService } from '../../../services/network.service';
import { qtdLinhas, getUrlClient } from '../../../controller/staticValues';
import { BaseListSimples } from 'src/app/controller/BaseListSimples';
import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, Message, MessageService, SelectItem } from "primeng/api";
import { Router } from "@angular/router";


@Component({
    selector: 'app-company-list',
    templateUrl: './company-list.component.html',
    styleUrls: ['./company-list.component.css']
})
export class CompanyListComponent extends BaseListSimplesHeaders implements OnInit, OnDestroy {

    @ViewChild('cadastrarEmpresa') cadastrarEmpresa: ElementRef;

    // modalCadastrarPessoa = false

    // public entidade: string = 'empregador'
    // jaPesquisou = false
    // pagina = 0;
    // public first: number = 0
    // public loading: boolean
    public top: number = qtdLinhas()
    qtdLinhas = qtdLinhas()
    public totalItens2: number
    modalCadastrarEmpresa = false
    // lista2 = []
    @ViewChild('inputPesquisa') public inputPesquisa
    @ViewChild('selectValue') public selectValue
    public selectSort: SelectItem[] = [{ label: 'ID', value: 'ID' }, { label: 'NOME', value: 'NOME' }]
    cadastrar = false
    opcoesTable = [
        {
            label: 'Alterar', icon: 'fa fa-edit', command: (e) => {
                this.router.navigate([`/company-registration/${e.id}`])
            }
        },
        { label: 'Excluir', icon: 'fa fa-close', command: (e) => { } },
        {
            label: 'Ver Histórico', icon: 'fa fa-eye', command: (e) => {
                this.router.navigate([`/historico-pessoa/${e.Id}`])
            }
        },
    ]

    filtro = '';

    constructor(public messageService: MessageService, public confirmationService: ConfirmationService, public networkService: NetworkService, public router: Router) {
        super(networkService, getUrlClient(), 'deleted/false', null)
    }

    ngOnInit() {
        this.carregarDados()
        this.totalItens2 = this.lista.length

    }

    pressionaEnter(e?) {    
        if (e.key === 'Enter') this.carregarLista()
    }



    linkPessoa(v) {
        this.router.navigate([`/historico-pessoa/${v.Id}/pedido`])
    }


    public navegar() {
        // this.router.navigate([`/cadastro`])
        // this.cadastrarEmpresa.nativeElement.click()   
        this.modalCadastrarEmpresa = true
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
