import { getUrlPro } from './../../../controller/staticValues';
import { BaseListSimples } from '../../../controller/BaseListSimples';
import { NetworkService } from '../../../services/network.service';
import { qtdLinhas, } from '../../../controller/staticValues';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ConfirmationService, MessageService, SelectItem } from "primeng/api";
import { Router } from "@angular/router";


@Component({
    selector: 'app-account-list',
    templateUrl: './account-list.component.html',
    styleUrls: ['./account-list.component.css']
})
export class AccountListComponent extends BaseListSimples implements OnInit, OnDestroy {

    // @ViewChild('cadastrarPessoa') cadastrarPessoa: ElementRef;

    // modalCadastrarPessoa = false

    // public entidade: string = 'empregador'
    // jaPesquisou = false
    // pagina = 0;
    // public first: number = 0
    // public loading: boolean
    // public top: number = qtdLinhas()
    qtdLinhas = qtdLinhas()
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
        { label: 'Atualizar Extrato', icon: 'fa fa-refresh', command: (e) => { } },
    ]

    filtro = ''

    constructor(public messageService: MessageService, public confirmationService: ConfirmationService, public networkService: NetworkService, public router: Router) {
        super(networkService, getUrlPro(), 'proaccount')
    }

    ngOnInit() {
        this.carregarDados()
    }

    pressionaEnter(e) {
        if (e.key === 'Enter') this.carregarLista()
    }



    linkLaunch(v) {
        this.router.navigate([`/account-launch/${v.Id}`])
    }


    get account() {
        return this.lista.filter(v => {
            if (v.Name === null) {
                v.Name = ''
            }
            return v.Name.toLowerCase().includes(this.filtro.toLowerCase()) || v.Name.toString().includes(this.filtro)
        })

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

    // public navegar() {
    //     this.cadastrarPessoa.nativeElement.click()        
    // }

    ngOnDestroy(): void {
        // if(this.$subscriptionListar) this.$subscriptionListar.unsubscribe()
        // if(this.$subscriptionDeletar) this.$subscriptionDeletar.unsubscribe()
    }

}
