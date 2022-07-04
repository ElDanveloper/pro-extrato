import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {MenuItem, MessageService} from "primeng/api";
import {Util} from "../../controller/Util";
import {NetworkService} from "../../services/network.service";

@Component({
    selector: 'app-conciliation',
    templateUrl: './conciliation.component.html',
    styleUrls: ['./conciliation.component.css']
})
export class ConciliationComponent implements OnInit {

    itemsTabMenu = [
        {label: 'Extrato', icon: 'fa fa-fw fa-bar-chart'},
        {label: 'Conciliados', icon: 'fa fa-fw fa-bar-chart'},
        {label: 'Extrato não Conciliado', icon: 'fa fa-fw fa-calendar'},
        {label: 'Contabil não Conciliado', icon: 'fa fa-fw fa-calendar'},
    ];

    currentIndex = 0
    activeItem: MenuItem;

    classificacao = '3.07.03'

    tabIndex = 0;

    dataLabel = '';
    id;
    dataInicial;
    dataFinal;
    @Output() dataAlterada = new EventEmitter()

    constructor(private router: Router, private route: ActivatedRoute, private messageService: MessageService, private networkService: NetworkService) { }

    ngOnInit() {
        this.route.paramMap.subscribe(param => {
            this.id = param.get('id')
            this.dataInicial = param.get('dataInicial')
            this.dataFinal = param.get('dataFinal')
        })
        this.atualizaItemSelecionado(window.location.href)
        this.router.events.subscribe((v: any) => {
            if (v instanceof NavigationEnd) {
                this.atualizaItemSelecionado(v)
            }
        })
    }

    onTabChange(event) {
        this.tabIndex = event.index;
    }

    atualizaItemSelecionado(v) {
        if (typeof v === 'object') v = v.url
        if (v.toString().match(/\/extrato$/)) {
            this.currentIndex = 0
            this.activeItem = this.itemsTabMenu[0];
        } else if (v.toString().match(/\/conciliados$/)) {
            this.currentIndex = 1
            this.activeItem = this.itemsTabMenu[1];
        } else if (v.toString().match(/\/extratos-nao-conciliados$/)) {
            this.currentIndex = 2
            this.activeItem = this.itemsTabMenu[2];
        } else if (v.toString().match(/\/contabil-nao-conciliados$/)) {
            this.currentIndex = 3
            this.activeItem = this.itemsTabMenu[3];
        }
    }

    setActiveItem(e) {
        this.currentIndex = this.itemsTabMenu.findIndex(v => v === e.activeItem)
        let r = ''

        if (this.currentIndex === 0) r = 'extrato'
        if (this.currentIndex === 1) r = 'conciliados'
        if (this.currentIndex === 2) r = 'extratos-nao-conciliados'
        if (this.currentIndex === 3) r = 'contabil-nao-conciliados'

        this.router.navigate([`conciliado/${this.id}/${this.dataInicial}/${this.dataFinal}/${r}`])
    }

    processarConciliacao() {
        // this.networkService.salvarPost(getUrlFinanceiro(), 'fin/processarConciliacao', {IdContaCaixa: Number(this.id), DataIni: this.dataInicial, DataFim: this.dataFinal}).subscribe(x => {
        //     this.messageService.add(Util.pushSuccessMsgSemDelay('Conciliações Processadas!'))
        // })
    }

}
