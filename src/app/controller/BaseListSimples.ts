import { NetworkService } from './../services/network.service';

import { Subscription } from 'rxjs';
import { qtdLinhas, opcoesLinhas, getUrlHunnoRh } from './staticValues';
import { OnDestroy, ViewChild} from '@angular/core';

export class BaseListSimples implements OnDestroy {

   entidade 
   pagina = 0
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

    subscriptionQtd: Subscription;
    subscriptionLista: Subscription;
    subscriptionDeletar: Subscription;

    constructor(public networkService: NetworkService, public url = getUrlHunnoRh(), entidad) {
        this.entidade = entidad
    }

    public lazyLoad(event): void {        
        this.pagina = event.first /event.rows
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
        this.carregarDados(`?Texto=${v}&CampoOrdem=Nome&Limite=${this.top}&Pagina=${this.pagina}`)
    }

    public carregarDados(parametros?): void {
        this.$subscriptionListar = this.networkService.getSimples(this.url, this.entidade).subscribe((listaSec: any) => {
            // this.totalItens = listaSec[0]? listaSec[0]['QtdReg'] : 0;       
            this.totalItens = listaSec.length     
            this.lista = listaSec            
        })

    }

    ngOnDestroy() {
        if (this.subscriptionQtd) this.subscriptionQtd.unsubscribe()
        if (this.subscriptionLista) this.subscriptionLista.unsubscribe()
        if (this.subscriptionDeletar) this.subscriptionDeletar.unsubscribe()
    }
    


}
