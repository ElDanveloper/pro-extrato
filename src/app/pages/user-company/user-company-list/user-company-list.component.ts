import { NetworkService } from 'src/app/services/network.service';
import { BaseListSimplesHeaders } from 'src/app/controller/BaseListSimplesHeaders';
import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ConfirmationService, Message, MessageService, SelectItem} from "primeng/api";
import {Router} from "@angular/router";
import { EMPRESA_STORAGE_KEY, getUrlUser, qtdLinhas } from 'src/app/controller/staticValues';


@Component({
  selector: 'app-user-company-list',
  templateUrl: './user-company-list.component.html',
  styleUrls: ['./user-company-list.component.css']
})
export class UserCompanyListComponent extends BaseListSimplesHeaders implements OnInit, OnDestroy {

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
        let empresa = JSON.parse(sessionStorage.getItem(EMPRESA_STORAGE_KEY))['id']        
        this.networkService.getSimples(getUrlUser(), `client/${empresa}`).subscribe((v: any) => {
            this.lista = v
        })
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
