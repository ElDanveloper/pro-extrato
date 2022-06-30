import { BaseListSimples } from './../../../controller/BaseListSimples';
import { NetworkService } from './../../../services/network.service';
import { qtdLinhas, getUrlClient, getUrlUser } from './../../../controller/staticValues';
import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ConfirmationService, Message, MessageService, SelectItem} from "primeng/api";
import {Router} from "@angular/router";


@Component({
  selector: 'app-contas-lista',
  templateUrl: './contas-lista.component.html',
  styleUrls: ['./contas-lista.component.css']
})
export class ContasListaComponent extends BaseListSimples implements OnInit, OnDestroy {

    // @ViewChild('cadastrarPessoa') cadastrarPessoa: ElementRef;

    // modalCadastrarPessoa = false

    // public entidade: string = 'empregador'
    jaPesquisou = false
    pagina = 0;
    public first: number = 0
    public loading: boolean
    public top: number = qtdLinhas()
    qtdLinhas = qtdLinhas()
    public totalItens: number
    lista2 = []
    @ViewChild('inputPesquisa') public inputPesquisa
    @ViewChild('selectValue') public selectValue
    public selectSort: SelectItem[] = [{label: 'ID', value: 'ID'}, {label: 'NOME', value: 'NOME'}]
    // opcoesTable = [
    //     {label: 'Alterar', icon: 'fa fa-edit', command: (e) => this.editar(e)},
    //     {label: 'Excluir', icon: 'fa fa-close', command: (e) => this.deletar(e)},
    //     {label: 'Ver Histórico', icon: 'fa fa-eye', command: (e) => {
    //             this.router.navigate([`/historico-pessoa/${e.Id}`])
    //         }},
    // ]

    

    constructor(public messageService: MessageService, public confirmationService: ConfirmationService, public networkService: NetworkService, public router: Router) {
        super(networkService, getUrlUser(), 'contractor')
    }

    ngOnInit() {        
        this.carregarDados()
    }

    pressionaEnter(e) {
        if (e.key === 'Enter') this.carregarLista()
    }

    

    linkPessoa(v) {
        this.router.navigate([`/historico-pessoa/${v.Id}/pedido`])
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
