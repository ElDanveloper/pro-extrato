import { Util, sub6, mul6 } from './../../../controller/Util';
import { DadosDefaultService } from 'src/app/services/dados-default.service';
import { NetworkService } from './../../../services/network.service';
import { qtdLinhas, getUrlClient, getUrlPro, getUrlReport, opcoesLinhas } from './../../../controller/staticValues';
import { BaseListSimples } from 'src/app/controller/BaseListSimples';
import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, Message, MessageService, SelectItem } from "primeng/api";
import { Router } from "@angular/router";
import { ComponentsModule } from 'src/app/components/components.module';


@Component({
    selector: 'app-update-code-list',
    templateUrl: './update-code-list.component.html',
    styleUrls: ['./update-code-list.component.css']
})

export class UpdateCodeListComponent implements OnInit, OnDestroy {

    exibirLoader = this.dadosDefault.exibirLoader
    exibirLoaderNetwork = this.networkService.exibirLoader

    dataInit = Util.getDateComUmMesAntes();
    dataFim = Util.getLastDayDate();

    qtdLinhas = qtdLinhas()
    totalItens;
    lista = []
    jaPesquisou = false
    first = false
    loading = false
    top = qtdLinhas()
    opcoesLinhas = opcoesLinhas()

    opcoesTable = [
        {
            label: 'Atualizar Categoria', icon: 'fa fa-refresh', command: (e) => {
             this.dadosDefault.exibirLoader.next(true)
             this.networkService.salvarPost(getUrlPro(), 'UpdateCategories', [e]).subscribe(v => {
                this.messageService.add(Util.pushSuccessMsg('Atualizado com Sucesso!'))
             }).add(() => this.dadosDefault.exibirLoader.next(false))
            }
        },
    ]

    clonedProducts: { [s: string]: []; } = {};

    constructor(public messageService: MessageService, public confirmationService: ConfirmationService, public networkService: NetworkService, public router: Router, public dadosDefault: DadosDefaultService) { }

    ngOnInit() {
        this.loadList()

        let dateIni = Util.dataParaStringComZero(this.dataInit)
        let dateEnd = Util.dataParaStringComZero(this.dataFim)

        this.networkService.getSimples(getUrlPro(), `GetCategoriesMoviment?DateIni=${dateIni}&DateEnd=${dateEnd}`).subscribe((v: any) => {
            this.lista = v.value
            this.totalItens = this.lista.length
            this.jaPesquisou = true

        }).add(this.networkService.exibirLoader.next(false))

        //then(data => this.products1 = data);
    }

    onRowEditSave(lista: []) {
        console.log(lista)
        /*
        if (product > 0) {
            delete this.clonedProducts[product.id];
            this.messageService.add({severity:'success', summary: 'Success', detail:'Product is updated'});
        }
        else {
            this.messageService.add({severity:'error', summary: 'Error', detail:'Invalid Price'});
        }
        */
    }

    alterouData(e) {
        this.dataInit = new Date(e.dataInicial.getFullYear(), e.dataInicial.getMonth(), e.dataInicial.getDate())
        this.dataFim = new Date(e.dataFinal.getFullYear(), e.dataFinal.getMonth(), e.dataFinal.getDate())

    }

    loadList(page?, top?) {
        let dateIni = Util.dataParaStringComZero(this.dataInit)
        let dateEnd = Util.dataParaStringComZero(this.dataFim)

        this.networkService.exibirLoader.next(true)
        this.networkService.getSimples(getUrlPro(), `GetCategoriesMoviment?DateIni=${dateIni}&DateEnd=${dateEnd}`).subscribe((v: any) => {
            this.lista = v.value
            this.totalItens = this.lista.length
            this.jaPesquisou = true

            for(let i = 0; i < this.totalItens; i++) {
                let CodeAccountPlan: string[] = this.lista[i].CodeAccountPlan
                let CodeIntegration: string[] = this.lista[i].CodeIntegration

                console.log(this.lista[i].Description, '-', CodeAccountPlan, '-', CodeIntegration)
            }
            console.log(this.lista)

        }).add(this.networkService.exibirLoader.next(false))
    }

    public lazyLoad(event): void {
        if (!this.jaPesquisou) return
        this.loading = true
        if (this.lista) {
            if (this.top !== event.rows && event.rows !== undefined) {
                this.top = event.rows
                event.first = 0
            }

            // this.loadList((event.first / this.top) + 1, this.top)
            this.loading = false
        }
    }

    ngOnDestroy(): void {

    }

}
