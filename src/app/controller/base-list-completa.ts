import { ConfirmationService, Message, MessageService } from "primeng/api";
import { Router } from "@angular/router";
import { OnDestroy, ViewChild, Directive } from "@angular/core";
import { NetworkService } from "../services/network.service";
import { getUrlCad, opcoesLinhas, qtdLinhas } from "./staticValues";
import { Util } from "./Util";
import { map } from "rxjs/operators";
import { Subscription } from "rxjs";

export class BaseListCompleta implements OnDestroy {

    entidade
    jaPesquisou = false
    public first: number = 0
    public loading: boolean
    public top: number = qtdLinhas()
    qtdLinhas = qtdLinhas()
    opcoesLinhas = opcoesLinhas()
    public totalItens: number
    public lista: any[] = []
    @ViewChild('inputPesquisa') public inputPesquisa
    public sortField: string = 'Nome'
    public sortField2: string = null
    public sortOrder: string = 'desc'
    atributoFiltroComData = undefined
    @ViewChild('dataInicial') public dataInicial
    @ViewChild('dataFinal') public dataFinal
    filtroFixo = undefined
    camposFiltro
    exibirLoader = false
    filtroCampo = 'Statusparcela'
    replaceSort

    opcoesTable = [
        { label: 'Alterar', icon: 'fa fa-edit', command: (e) => this.editar(e) },
        { label: 'Excluir', icon: 'fa fa-close', command: (e) => this.deletar(e) },
    ]
    private expanded;

    subscriptionQtd: Subscription;
    subscriptionLista: Subscription;
    subscriptionDeletar: Subscription;

    constructor(public messageService: MessageService, public confirmationService: ConfirmationService, public networkService: NetworkService, public router: Router, entidad, public url = getUrlCad(), expanded = null, camposFiltro) {
        this.expanded = expanded
        this.entidade = entidad
        this.camposFiltro = camposFiltro
    }

    public lazyLoad(event): void {
        if (!this.jaPesquisou) return
        this.loading = true
        if (this.lista) {
            if (this.top !== event.rows && event.rows !== undefined) {
                this.top = event.rows
                event.first = 0
            }
            this.carregarDados(event.first)
            this.loading = false
        }
    }

    addZero = v => v.toString().length === 1 ? '0' + v : v


    public carregarLista(): void {
        let filter = this.getFilter()
        this.subscriptionQtd = this.networkService.getSimples(this.url, `${this.entidade}?$inlinecount=allpages&$top=0&${filter})`).pipe(map((res: Response) => res['@xdata.count'])).subscribe(itens => {
            this.totalItens = itens
            this.carregarDados(0)
            this.loading = false
            this.jaPesquisou = true

            // @ts-ignore
            if (this.mudouDataLocal) {
                // @ts-ignore
                this.mudouDataLocal()
            }

            // @ts-ignore
            if (this.selectedRow) {
                // @ts-ignore
                this.selectedRow = []
            }

            // @ts-ignore
            if (this.selectedRows) {
                // @ts-ignore
                this.selectedRows = []
            }
            this.first = 0;
        })

    }

    public carregarDados(skip): void {

        let filter = this.getFilter()

        let order = `&$orderby=${this.sortField} ${this.sortOrder} `

        if (this.sortField2) {
            order = order + `&$orderby=${this.sortField2} ${this.sortOrder} `
        }

        filter = filter + ')'

        if (this.expanded) {
            filter = filter + this.expanded
        }

        if (this.replaceSort) order = this.replaceSort

        this.subscriptionLista = this.networkService.getSimples(this.url, `${this.entidade}?${filter}${order}&$top=${this.top}&$skip=${skip}`).pipe(map((res: Response) => res['value'])).subscribe(itens => {
            this.lista = itens

            // @ts-ignore
            if (this.pesquisarLocal) {
                // @ts-ignore
                this.pesquisarLocal(itens.slice(0))
            }

        })

    }

    getFiltrosSelecionados() {
        // @ts-ignore
        const s = this.filtrosStatusSelecionados

        let filter = ''

        s.forEach((v, i) => {
            if (i === 0 && s.length === 1) {
                filter = filter + ` and ${this.filtroCampo} eq '${v}'`
            } else if (i === 0 && s.length > 1) {
                filter = filter + ` and (${this.filtroCampo} eq '${v}'`
            } else {
                filter = filter + ` or ${this.filtroCampo} eq '${v}'`
            }

            if (i === (s.length - 1) && s.length > 1) {
                filter = filter + ')'
            }
        })
        return filter
    }

    getFilter() {

        const v = this.inputPesquisa === undefined ? '' : this.inputPesquisa.nativeElement.value

        let dataInicial
        let dataFinal
        // try {
        if (this.dataInicial && this.dataFinal) {
            dataInicial = new Date(this.dataInicial.value)
            dataFinal = new Date(this.dataFinal.value)
        } else {
            // } catch (e) {
            // @ts-ignore
            dataInicial = this.dataInit
            // @ts-ignore
            dataFinal = this.dataFim
            // }
        }

        const dataIni = dataInicial.getFullYear() + '-' + this.addZero(dataInicial.getMonth() + 1) + '-' + this.addZero(dataInicial.getDate()) + 'T00:00:00'
        const dataFim = dataFinal.getFullYear() + '-' + this.addZero(dataFinal.getMonth() + 1) + '-' + this.addZero(dataFinal.getDate()) + 'T23:59:59'

             
       let filter = `$filter=(${this.atributoFiltroComData} ge ${dataIni} and ${this.atributoFiltroComData} le ${dataFim}`
        
        if (this.filtroFixo) filter = filter + this.filtroFixo

        // @ts-ignore
        if (this.filtrosStatusSelecionados !== undefined && this.filtrosStatusSelecionados.length) {
            // @ts-ignore
            if (this.getFiltrosSelecionadosLocal) {
                // @ts-ignore
                filter = filter + this.getFiltrosSelecionadosLocal()
            } else {
                filter = filter + this.getFiltrosSelecionados()
            }
        }

        if (this.camposFiltro && this.camposFiltro.length) {
            let notFirst = false
            this.camposFiltro.forEach((campo, i2) => {
                if (notFirst) {
                    filter = filter + ' or '
                } else if (v !== '' && !filter.match(/ and $/)) {
                    //filter = filter + ' and '
                }
                if (campo.tipo === 'string' && v !== '') {
                    if (!notFirst) filter = filter + ' and('
                    filter = filter + `contains(lower(${campo.campo}), '${Util.lower(v)}')`
                    console.log(filter);
                    notFirst = true
                } else if (campo.tipo === 'number' && v !== '' && v.toString().match(/^\d+$/)) {
                    if (!notFirst) filter = filter + ' and('
                    filter = filter + `(${campo.campo} eq ${Number(v)})`
                    notFirst = true
                }
                if (notFirst && i2 === this.camposFiltro.length - 1) {
                    filter = filter + ')'
                }

            })
        }


        if (filter.match(/.+\sor\s\)$/)) {
            filter = filter.replace(' or )', ')')
        }
        return filter
    }

    public deletar(rowData) {
        console.log("entrou", rowData);
        this.confirmationService.confirm({
            message: `Você tem certeza que deseja deletar?`,
            acceptLabel: `Sim`,
            rejectLabel: `Não`,
            accept: () => {
                this.subscriptionDeletar = this.networkService.deletar(this.url, this.entidade, rowData.Id).subscribe(res => {
                    this.carregarLista()
                })
            }
        })
    }

    public editar(rowData) {
        this.router.navigate([`/${this.entidade}/${Util.cadastroRoute()}/${rowData.Id}`])
    }

    public navegar(entidade?, rowData?) {
        this.router.navigate([`/${this.entidade}/${Util.cadastroRoute()}`])
    }

    pressionaEnter(e?: KeyboardEvent) {
        if (e && e.key !== 'Enter') return
        this.carregarLista()
    }

    dataInit = Util.getDateComUmMesAntes();
    dataFim = Util.getLastDayDate();


    alterouData(e) {
        this.dataInit = new Date(e.dataInicial.getFullYear(), e.dataInicial.getMonth(), e.dataInicial.getDate())
        this.dataFim = new Date(e.dataFinal.getFullYear(), e.dataFinal.getMonth(), e.dataFinal.getDate())
        this.carregarLista()
    }

    ngOnDestroy() {
        if (this.subscriptionQtd) this.subscriptionQtd.unsubscribe()
        if (this.subscriptionLista) this.subscriptionLista.unsubscribe()
        if (this.subscriptionDeletar) this.subscriptionDeletar.unsubscribe()
    }


}
