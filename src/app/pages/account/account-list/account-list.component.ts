import { DadosDefaultService } from './../../../services/dados-default.service';
import { Util } from './../../../controller/Util';
import { BaseListSimplesHeaders } from './../../../controller/BaseListSimplesHeaders';
import { getUrlPro, getUrlClient, getUrlApiPro, getUrlPluggy } from './../../../controller/staticValues';
import { BaseListSimples } from '../../../controller/BaseListSimples';
import { NetworkService } from '../../../services/network.service';
import { qtdLinhas, } from '../../../controller/staticValues';
import { Component, OnDestroy, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ConfirmationService, MessageService, SelectItem } from "primeng/api";
import { Router } from "@angular/router";
import { BaseListCompleta } from 'src/app/controller/base-list-completa';


@Component({
    selector: 'app-account-list',
    templateUrl: './account-list.component.html',
    styleUrls: ['./account-list.component.css']
})
export class AccountListComponent extends BaseListCompleta implements OnInit, OnDestroy {

    @ViewChild('registrationAccount') registrationAccount: ElementRef;

    @ViewChild('openingbalance') openingbalance: ElementRef;

    // modalCadastrarPessoa = false

    // public entidade: string = 'empregador'
    // jaPesquisou = false
    // pagina = 0;
    // public first: number = 0
    // public loading: boolean
    // public top: number = qtdLinhas()
    qtdLinhas = qtdLinhas()
    data;
    // public totalItens: number
    // lista2 = []
    // @ViewChild('inputPesquisa') public inputPesquisa
    // @ViewChild('selectValue') public selectValue
    public selectSort: SelectItem[] = [{ label: 'ID', value: 'ID' }, { label: 'NOME', value: 'Name' }, { label: 'Conta', value: 'AccountNumber' }]
    opcoesTable = [
        {
            label: 'Alterar', icon: 'fa fa-edit', command: (e) => {
                this.router.navigate([`account/register/${e.Id}`])
            }
        },
        { label: 'Excluir', icon: 'fa fa-close', command: (e) => { } },
        { label: 'Atualizar Extrato', icon: 'fa fa-refresh', command: (e) => {
            if(e.ItemId === null) {
                this.messageService.add(Util.pushErrorMsg('O ID do Item está NULO... Verifique com o suporte.'))
                return
            }
            this.networkService.exibirLoader.next(true)
            this.networkService.getSimples(getUrlPro(), `GetTransactions?ItemId=${e.ItemId}`).subscribe(v => {
                this.messageService.add(Util.pushSuccessMsg('Extrato Atualizado com Sucesso!'))
                this.carregarLista()
            }).add(this.networkService.exibirLoader.next(false))
         } },
         {
            label: 'Saldo Inicial', icon: 'fa fa-money', command: (e) => {
                this.data = e
                this.openingbalance.nativeElement.click();
            }
         },
         {
            label: 'Copiar ID', icon: 'pi pi-copy', command: (e) => {
                if(e.AccountId) {
                    navigator.clipboard.writeText(e.AccountId);
                    this.messageService.add(Util.pushSuccessMsg('ID copiado para área de transferência! Use Ctrl+V para colar'))
                } else {
                    this.messageService.add(Util.pushErrorMsg('ID não foi copiado para área de transferência! Veja com o suporte a falta do ID'))
                }
            }
         }
    ]

    filtro = ''

    constructor(public messageService: MessageService, public confirmationService: ConfirmationService, public networkService: NetworkService, public router: Router, public dadosDefault: DadosDefaultService) {
        super(messageService, confirmationService, networkService, router, 'proaccount', getUrlPro(), null, [{ campo: 'Name', tipo: 'string' },])
        this.sortField = 'Name'
        this.sortOrder = 'desc'
        // this.atributoFiltroComData = 'Datacadastro'
        // this.filtroCampo = 'Status'

    }

    ngOnInit() {
        this.carregarLista()
    }

    pressionaEnter(e) {
        if (e.key === 'Enter') this.carregarLista()
    }

    typeAccount(value) {
        switch (value) {
            case 1:
                return 'Conta Corrente'
            case 2:
                return 'Poupança'
            case 3:
                return 'Aplicação'
            case 4:
                return 'Garantia'
            case 5:
                return 'Cartão de Crédito'
            case 6:
                return 'Crediario'
            case 7:
                return 'Empréstimo'
            case 8:
                return 'Carteira Virtual'
            case 9:
                return 'Mutuo'
            case 10:
                return 'Caixa Interno'
        }

    }

    updateItens(){
        this.dadosDefault.exibirLoader.next(true)
        this.networkService.getSimples(getUrlApiPro(), 'update/items').subscribe(v => {
            this.messageService.add(Util.pushSuccessMsg('Extrato Atualizado com Sucesso!'))
            this.carregarLista()
        }).add(() => this.dadosDefault.exibirLoader.next(false))
    }

    dadosSalvos() {
        this.carregarLista()
    }

    linkLaunch(v) {
        this.router.navigate([`/account-launch/${v.Id}`])
    }


    // get account() {
    //     return this.lista.filter(v => {
    //         if (v.Name === null) {
    //             v.Name = ''
    //         }
    //         return v.Name.toLowerCase().includes(this.filtro.toLowerCase()) || v.Name.toString().includes(this.filtro)
    //     })

    // }



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

    public newAccount() {
        this.dadosDefault.exibirLoader.next(true)
        this.networkService.getSimples('https://app.hunno.com.br/api/proextrato', 'apikey').subscribe(v => {
            this.networkService.postPluggy(getUrlPluggy(), 'connect_token', v['apiKey']).subscribe(value => {
                console.log('Teste 2 -----> ' + value)
            })
        }).add(() => this.dadosDefault.exibirLoader.next(false))
        // this.registrationAccount.nativeElement.click()
    }

    ngOnDestroy(): void {
        // if(this.$subscriptionListar) this.$subscriptionListar.unsubscribe()
        // if(this.$subscriptionDeletar) this.$subscriptionDeletar.unsubscribe()
    }

}
