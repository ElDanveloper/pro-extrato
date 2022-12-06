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


    arrayStatic = []

    ngOnInit() {
        this.model = this.menuDynamic();
    }

    public menuDynamic() {
        let menuNew = []
        if (this.accessMenu === 'false') {
            menuNew = [
                {
                    label: 'Contas', icon: 'fa fa-university', routerLink: ['account']
                },
                {
                    label: 'Relatórios', icon: 'fa fa-print',
                    items: [
                        {
                            label: 'D.R.E', icon: 'fa fa-line-chart', routerLink: ['report-dre']
                            // routerLink: ['development']
                        },
                        {
                            label: 'Fluxo de Caixa', icon: 'fa fa-line-chart', routerLink: ['report-cash-flow']
                        },
                        {
                            label: 'Atualizar Código', icon: 'fa fa-pencil', routerLink: ['update-code']
                        },
                        {
                            label: 'Exportação Contabil', icon: 'fa fa-upload', routerLink: ['development']
                        }

                    ]
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
            ]
        } else {
            menuNew = [
                {
                    label: 'Empresas', icon: 'fa fa-building', routerLink: ['company']
                },
                {
                    label: 'Relatório - Contador', icon: 'fa fa-print', routerLink: ['development']
                }
            ]
        }

        return menuNew
    }




}