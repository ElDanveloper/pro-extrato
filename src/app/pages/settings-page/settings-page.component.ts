import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {MenuItem, MessageService} from "primeng/api";
import {Util} from "../../controller/Util";
import {NetworkService} from "../../services/network.service";

@Component({
    selector: 'app-settings-page',
    templateUrl: './settings-page.component.html',
    styleUrls: ['./settings-page.component.css']
})
export class SettingsPageComponent implements OnInit {

    itemsTabMenu = [
        {label: 'Principal', icon: 'fa fa-fw fa-id-card'},
        {label: 'Usuarios', icon: 'fa fa-fw fa-users'},
        {label: 'Departamento', icon: 'fa fa-fw fa-bars'},
        {label: 'Faturas', icon: 'fa fa-fw fa-university'},
        {label: 'Parametros', icon: 'fa fa-cogs'},
        {label: 'Status Conta', icon: 'fa fa-bars'},
    ];

    currentIndex = 0
    activeItem: MenuItem;

    tabIndex = 0;

    dataLabel = '';
    id;
    dataInicial;
    dataFinal;
    @Output() dataAlterada = new EventEmitter()

    constructor(private router: Router, private route: ActivatedRoute, private messageService: MessageService, private networkService: NetworkService) { }

    ngOnInit() {        
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
        if (v.toString().match(/\/main-accountant$/)) {
            this.currentIndex = 0
            this.activeItem = this.itemsTabMenu[0];
        } else if (v.toString().match(/\/users-list$/)) {
            this.currentIndex = 1
            this.activeItem = this.itemsTabMenu[1];
        } else if (v.toString().match(/\/departments-list$/)) {
            this.currentIndex = 2
            this.activeItem = this.itemsTabMenu[2];
        } else if (v.toString().match(/\/invoices-list$/)) {
            this.currentIndex = 3
            this.activeItem = this.itemsTabMenu[3];
        } else if (v.toString().match(/\/parameters$/)) {
            this.currentIndex = 4
            this.activeItem = this.itemsTabMenu[4];
        } else if (v.toString().match(/\/account-status$/)) {
            this.currentIndex = 5
            this.activeItem = this.itemsTabMenu[5];
        }
    }

    setActiveItem(e) {
        this.currentIndex = this.itemsTabMenu.findIndex(v => v === e.activeItem)
        let r = ''
        
        if (this.currentIndex === 0) r = 'main-accountant'
        if (this.currentIndex === 1) r = 'users-list'
        if (this.currentIndex === 2) r = 'departments-list'
        if (this.currentIndex === 3) r = 'invoices-list'
        if (this.currentIndex === 4) r = 'parameters'
        if (this.currentIndex === 5) r = 'account-status'
       
        this.router.navigate([`settings/${r}`])
    }
    
}
