import { Util } from 'src/app/controller/Util';
import { DadosDefaultService } from './../services/dados-default.service';
import { NetworkService } from './../services/network.service';

import { Subscription } from 'rxjs';
import { qtdLinhas, opcoesLinhas, getUrlPro } from './staticValues';
import { OnDestroy, ViewChild } from '@angular/core';

export class BaseListSimplesHeaders implements OnDestroy {

    entidade
    pagina = 0
    jaPesquisou = false
    loading = false
    public lista: any[] = []
    public top: number = qtdLinhas()
    public page: number = 1
    @ViewChild('inputPesquisa') public inputPesquisa
    public totalItens: number

    $subscriptionListar: Subscription
    $subscriptionDeletar: Subscription

    opcoesTable = [
        // {label: 'Alterar', icon: 'fa fa-edit', command: (e) => this.editar(e)},
        // {label: 'Excluir', icon: 'fa fa-close', command: (e) => this.deletar(e)},
    ]
    private expanded;

    subscriptionQtd: Subscription;
    subscriptionLista: Subscription;
    subscriptionDeletar: Subscription;

    constructor(public networkService: NetworkService, public url = getUrlPro(), entidad, expanded = null, top = 10, page = 1) {
        this.expanded = expanded
        this.entidade = entidad
        this.top = top
        this.page
    }

    public lazyLoad(event): void {
        this.pagina = event.first / event.rows
        if (!this.jaPesquisou) return
        this.loading = true
        if (this.lista) {
            if (this.top !== event.rows && event.rows !== undefined) {
                this.top = event.rows
                event.first = 0
            }
            this.carregarLista()
            this.loading = false
        }
    }

    public carregarLista(): void {
        this.loading = false
        this.jaPesquisou = true
        let v;
        try {
            v = this.inputPesquisa.nativeElement.value || ''
        } catch (e) {
            v = ''
        }

        let parametro = ''

        if (v !== '') {
            parametro = `?Texto=${v}`
        }
        
        if (this.expanded) {
            parametro = `?Texto=${v}&${this.expanded}`
        }

        this.carregarDados(parametro)
    }

    public carregarDados(parametros = ''): void {
        this.$subscriptionListar = this.networkService.getSimplesComHeaders(this.url, `${this.entidade}${parametros}`, this.page, this.top).subscribe((listaSec: any) => {
            if (listaSec[0]) {
                this.totalItens = listaSec[0] ? listaSec[0]['QtdReg'] : 0;
            } else {

            }
            this.lista = listaSec.value ? listaSec.value : listaSec
            this.pagina = listaSec.headers.get('pages')
            this.totalItens = Util.toNumber(this.pagina) * this.top

        })

    }

    ngOnDestroy() {
        if (this.subscriptionQtd) this.subscriptionQtd.unsubscribe()
        if (this.subscriptionLista) this.subscriptionLista.unsubscribe()
        if (this.subscriptionDeletar) this.subscriptionDeletar.unsubscribe()
    }



}
