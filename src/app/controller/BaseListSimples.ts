import { DadosDefaultService } from './../services/dados-default.service';
import { NetworkService } from './../services/network.service';

import { Subscription } from 'rxjs';
import { qtdLinhas, opcoesLinhas, getUrlPro } from './staticValues';
import { OnDestroy, ViewChild } from '@angular/core';

export class BaseListSimples implements OnDestroy {

    entidade
    pagina = 1
    jaPesquisou = false
    loading = false
    public lista: any[] = []
    public top: number = qtdLinhas()
    @ViewChild('inputPesquisa') public inputPesquisa
    public totalItens: number

    $subscriptionListar: Subscription
    $subscriptionDeletar: Subscription

    opcoesTable = [
        // {label: 'Alterar', icon: 'fa fa-edit', command: (e) => this.editar(e)},
        // {label: 'Excluir', icon: 'fa fa-close', command: (e) => this.deletar(e)},
    ]
    private expanded;
    private ordeBy;
    private campoPesquisa;


    subscriptionQtd: Subscription;
    subscriptionLista: Subscription;
    subscriptionDeletar: Subscription;

    constructor(public networkService: NetworkService, public url = getUrlPro(), entidad, expanded = null, ordeBy = 'Nome', campoPesquisa = 'Name') {
        this.expanded = expanded
        this.entidade = entidad
        this.ordeBy = ordeBy
        this.campoPesquisa = campoPesquisa

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
            parametro = `?filter=${this.campoPesquisa} eq ${v}&orderby=${this.ordeBy}&top=${this.top}&skip=${this.pagina}`
        }

        if (this.expanded) {
            parametro = parametro + `${this.expanded}`
        }

        this.carregarDados(parametro)
    }

    public carregarDados(parametros = ''): void {
        this.$subscriptionListar = this.networkService.getSimples(this.url, `${this.entidade}${parametros}`).subscribe((listaSec: any) => {
            if (listaSec[0]) {
                this.totalItens = listaSec[0] ? listaSec[0]['QtdReg'] : 0;
            } else {
                this.totalItens = listaSec.length
            }
            this.lista = listaSec.value ? listaSec.value : listaSec

        })

    }

    ngOnDestroy() {
        if (this.subscriptionQtd) this.subscriptionQtd.unsubscribe()
        if (this.subscriptionLista) this.subscriptionLista.unsubscribe()
        if (this.subscriptionDeletar) this.subscriptionDeletar.unsubscribe()
    }



}
