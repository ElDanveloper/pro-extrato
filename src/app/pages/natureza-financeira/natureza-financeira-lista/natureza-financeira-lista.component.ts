import { Util } from './../../../controller/Util';
import { DadosDefaultService } from 'src/app/services/dados-default.service';
import { NetworkService } from './../../../services/network.service';
import { qtdLinhas, getUrlClient, getUrlPro } from './../../../controller/staticValues';
import { BaseListSimples } from 'src/app/controller/BaseListSimples';
import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, Message, MessageService, SelectItem } from "primeng/api";
import { Router } from "@angular/router";


@Component({
    selector: 'app-natureza-financeira-lista',
    templateUrl: './natureza-financeira-lista.component.html',
    styleUrls: ['./natureza-financeira-lista.component.css']
})
export class NaturezaFinanceiraListaComponent implements OnInit, OnDestroy {

    @ViewChild('cadastrarNatureza') cadastrarNatureza: ElementRef;

    exibirLoader = this.dadosDefault.exibirLoader
    exibirLoaderNetwork = this.networkService.exibirLoader

    // modalCadastrarPessoa = false

    // public entidade: string = 'empregador'
    jaPesquisou = false
    // pagina = 0;
    // public first: number = 0
    public loading: boolean
    public top: number = qtdLinhas()
    qtdLinhas = qtdLinhas()
    public totalItens2: number
    modalCadastrarNatureza = false
    totalItens = 0
    filtro = ''
    // lista2 = []
    @ViewChild('inputPesquisa') public inputPesquisa
    @ViewChild('selectValue') public selectValue
    public selectSort: SelectItem[] = [{ label: 'ID', value: 'ID' }, { label: 'NOME', value: 'NOME' }]
    cadastrar = false
    opcoesTable = [
        {
            label: 'Alterar', icon: 'fa fa-edit', command: (e) => {
                this.router.navigate([`/natureza-financeira/cadasto/${e.Id}`])
            }
        },
        {
            label: 'Excluir', icon: 'fa fa-close', command: (e) => {
                this.confirmationService.confirm({
                    message: `Você tem certeza que deseja deletar?`,
                    acceptLabel: `Sim`,
                    rejectLabel: `Não`,
                    accept: () => {
                        // this.dadosDefault.exibirLoader.next(true)
                        this.networkService.getSimples(getUrlPro(), `DeleteCategory?CategoryId=${e.Id}`).subscribe(v => {
                            this.messageService.add(Util.pushSuccessMsg("Exclusão realizada com Sucesso!"))
                            this.lista = []
                            this.loadList(1, 1000)
                            // window.location.reload()
                        })
                        // .add(this.dadosDefault.exibirLoader.next(false))
                    }
                })
            }
        },
        // {label: 'Ver Histórico', icon: 'fa fa-eye', command: (e) => {
        //         this.router.navigate([`/historico-pessoa/${e.Id}`])
        //     }},
    ]

    lista = []



    constructor(public messageService: MessageService, public confirmationService: ConfirmationService, public networkService: NetworkService, public router: Router, public dadosDefault: DadosDefaultService) { }

    ngOnInit() {
        this.loadList(1, 10)
        // this.totalItens2 = this.lista.length
    }

    pressionaEnter(e) {
        if (e.key === 'Enter') this.loadList(1, 1000)
    }

    loadList(page?, top?) {        
        let body = {}
        if (this.filtro !== '') {
            body = {
                Description: this.filtro
            }
        }
        this.networkService.exibirLoader.next(true)
        this.networkService.listarPost('FinancialCategories', body, page, top).subscribe((v: any) => {
            this.lista = v.body['value']
            let pagina = v.headers.get('pages')
            this.totalItens = Util.toNumber(pagina) * this.top
        }).add(this.networkService.exibirLoader.next(false))
    }

    public lazyLoad(event): void {        
        // if (!this.jaPesquisou) return
        this.loading = true
        if (this.lista) {
            if (this.top !== event.rows && event.rows !== undefined) {
                this.top = event.rows
                event.first = 0
            }
            this.loadList((event.first / 10) + 1, this.top)
            this.loading = false
        }
    }

    conclude() {
        this.modalCadastrarNatureza = false
        this.loadList(1, 1000)
    }

    linkPessoa(v) {
        this.router.navigate([`/historico-pessoa/${v.Id}/pedido`])
    }

    filtrarEPesquisar(e?, page = 0) {
        if (e && e.key !== 'Enter') return

        const filtro = {}

        // if (this.grupo) filtro.IdGrupo = this.grupo
        // if (this.vendedor) filtro.IdVendedor = this.vendedor
        // if (this.canal) filtro.IdCanal = this.canal
        // if (this.marca) filtro.IdMarca = this.marca
        // if (this.subcategoria) filtro.IdSubCategoria = this.subcategoria
        // if (this.secao) filtro.IdSecao = this.secao
        // if (this.tipoFiscal) filtro.TipoFiscal = this.tipoFiscal
        // if (this.pessoa) filtro.IdPessoa = this.pessoa.Id
        // if (this.textoPesquisa) filtro.Nome = "" + this.textoPesquisa
        // filtro.DataIni = Util.dataParaStringComZero(this.dataInit)
        // filtro.DataFim = Util.dataParaStringComZero(this.dataFim)
        // filtro.QtdRegistro = this.qtdLinhas
        // filtro.Pagina = page
        // filtro.Tipo = 'V or D'

        // this.filtro = filtro

    }


    public navegar() {
        // this.router.navigate([`/cadastro`])
        // this.cadastrarNatureza.nativeElement.click()   
        this.modalCadastrarNatureza = true
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
