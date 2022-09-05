import { AppComponent } from './app.component';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AppMainComponent } from './app.main.component';

@Component({
    selector: 'app-menu',
    // templateUrl: './app.menu.component.html'
    template: `<ul class="ultima-menu ultima-main-menu clearfix">
                    <li app-menuitem *ngFor="let item of model; let i = index;" [item]="item" [index]="i" [root]="true"></li>
              </ul>`
})
export class AppMenuComponent implements OnInit {

    model: any[];
    accessMenu = localStorage.getItem('counter');

    constructor(public app: AppMainComponent, private router: Router) { }


    arrayStatic = [
        {
            label: 'Contas', icon: 'fa fa-university', routerLink: ['account']
            // items: []
        },
        {
            label: 'Relatórios', icon: 'fa fa-print', routerLink: ['development']
            // items: []
        },
        {
            label: 'Cadastros', icon: 'fa fa-cog',
            items: [
                {
                    label: 'Categoria Financeira', icon: 'fa fa-building-o', routerLink: ['natureza-financeira']
                    // items: []
                },
                {
                    label: 'Pessoas', icon: 'fa fa-users', routerLink: ['person']
                    // items: []
                },
                {
                    label: 'Historicos Memorizados', icon: 'fa fa-history', routerLink: ['memorized-histories']
                },
                {
                    label: 'Palavras Chaves', icon: 'fa fa-key', routerLink: ['key-word']
                },
                {
                    label: 'Parametros', icon: 'fa fa-cogs', routerLink: ['parameters-company']
                },
                {
                    label: 'Usuarios', icon: 'fa fa-user', routerLink: ['user-company-list']
                }
            ]
        },
        {
            label: 'Empresas', icon: 'fa fa-building', routerLink: ['company']
            // items: []
        },        
        {
            label: 'Relatório - Contador', icon: 'fa fa-print', routerLink: ['development']
        }
    ]
    ngOnInit() {
        this.model = this.menuDynamic();
    }

    menuDynamic(){
        let menuNew = []
        if(this.accessMenu === 'false') {            
            menuNew = this.arrayStatic.filter((item) => item.label !== 'Relatório - Contador')
        } else {
            menuNew = this.arrayStatic
        }

        return menuNew
    }




}