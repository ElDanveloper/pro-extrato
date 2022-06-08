import { NetworkService } from './../../../services/network.service';
import { qtdLinhas, getUrlClient, getUrlPro } from './../../../controller/staticValues';
import { BaseListSimples } from 'src/app/controller/BaseListSimples';
import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ConfirmationService, Message, MessageService, SelectItem} from "primeng/api";
import {Router} from "@angular/router";


@Component({
  selector: 'app-pessoas-lista',
  templateUrl: './pessoas-lista.component.html',
  styleUrls: ['./pessoas-lista.component.css']
})
export class PessoasListaComponent extends BaseListSimples implements OnInit, OnDestroy {

    @ViewChild('cadastrarPessoa') cadastrarPessoa: ElementRef;

    // modalCadastrarPessoa = false

    // public entidade: string = 'empregador'
    // jaPesquisou = false
    // pagina = 0;
    // public first: number = 0
    // public loading: boolean
    public top: number = qtdLinhas()
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
            console.log('Teste ---> ')
            this.router.navigate([`/pessoas/cadastro`])
        }},
        {label: 'Excluir', icon: 'fa fa-close', command: (e) => {}},
        {label: 'Ver Histórico', icon: 'fa fa-eye', command: (e) => {
                this.router.navigate([`/historico-pessoa/${e.Id}`])
            }},
    ]

    

    constructor(public messageService: MessageService, public confirmationService: ConfirmationService, public networkService: NetworkService, public router: Router) {
        super(networkService, getUrlPro(), 'pessoa')
    }

    ngOnInit() {        
        this.carregarLista()
        // this.totalItens2 = this.lista.length
    }

    pressionaEnter(e) {
        if (e.key === 'Enter') this.carregarLista()
    }

    

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
