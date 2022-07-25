import { NetworkService } from '../../../../services/network.service';
import { qtdLinhas, getUrlClient, getUrlUser } from '../../../../controller/staticValues';
import { BaseListSimples } from 'src/app/controller/BaseListSimples';
import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ConfirmationService, Message, MessageService, SelectItem} from "primeng/api";
import {Router} from "@angular/router";


@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent extends BaseListSimples implements OnInit, OnDestroy {

    @ViewChild('registrationUser') registrationUser: ElementRef;

    modalRegistrationUser = false

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
    opcoesTable = [
        {label: 'Alterar', icon: 'fa fa-edit', command: (e) => {}},
        {label: 'Excluir', icon: 'fa fa-close', command: (e) => {}},
        {label: 'Ver Histórico', icon: 'fa fa-eye', command: (e) => {}},
    ]

    

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

    getActive(active){        
        if(active === true) {            
            return 'S'
        } else {            
            return 'N'
        }
    }

    registration(){
        this.registrationUser.nativeElement.click();
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
