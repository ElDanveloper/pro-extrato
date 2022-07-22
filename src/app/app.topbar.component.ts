import { Router } from '@angular/router';
import { DadosDefaultService } from './services/dados-default.service';
import { Component, ViewChild, ElementRef } from '@angular/core';
import {AppMainComponent} from './app.main.component';
import { EMPRESA_STORAGE_KEY } from './controller/staticValues';

@Component({
    selector: 'app-topbar',
    templateUrl: `./app.toqbar.component.html`
})
export class AppTopbarComponent {

    public empresa = ''

    public counter = ''

    @ViewChild('trocarempresa') trocarEmpresa: ElementRef;

    constructor(public app: AppMainComponent, public dadosDefault: DadosDefaultService, public router: Router) {}

    ngOnInit(): void {     
        this.counter = localStorage.getItem('counter')
        
        if(!this.counter) {
            this.empresa = JSON.parse(sessionStorage.getItem(EMPRESA_STORAGE_KEY))['nome']
        }
        // if(JSON.parse(sessionStorage.getItem(EMPRESA_STORAGE_KEY))['Nome'])
        //     this.empresa = JSON.parse(sessionStorage.getItem(EMPRESA_STORAGE_KEY))['Nome']
    }

    deslogar() {
        
        sessionStorage.clear()
        localStorage.clear()
        this.dadosDefault.counterEnvironment.next(false)
        this.router.navigate(['/login']);
    }

    abrirModalTrocarEmpresa(){
        this.trocarEmpresa.nativeElement.click();
    }

    navegar(pagina) {        
        switch(pagina){
        case 1:            
            this.router.navigate([`users-list`]);
        }
    }

}












// import {Component} from '@angular/core';
// import {AppMainComponent} from './app.main.component';

// @Component({
//     selector: 'app-topbar',
//     template: `
//         <div class="topbar clearfix">
//             <div class="topbar-left" routerLink="/">
//                 <div class="logo"></div>
//             </div>

//             <div class="topbar-right">
//                 <a id="menu-button" href="#" (click)="app.onMenuButtonClick($event)">
//                     <i class="pi pi-angle-left"></i>
//                 </a>

//                 <a id="rightpanel-menu-button" href="#" (click)="app.onRightPanelButtonClick($event)">
//                     <i class="pi pi-ellipsis-v"></i>
//                 </a>

//                 <a id="topbar-menu-button" href="#" (click)="app.onTopbarMenuButtonClick($event)">
//                     <i class="pi pi-bars"></i>
//                 </a>

//                 <ul class="topbar-items animated fadeInDown" [ngClass]="{'topbar-items-visible': app.topbarMenuActive}">
//                     <li #profile class="profile-item" *ngIf="app.profileMode==='top'||app.isHorizontal()"
//                         [ngClass]="{'active-top-menu':app.activeTopbarItem === profile}">

//                         <a href="#" (click)="app.onTopbarItemClick($event,profile)">
//                             <img class="profile-image" src="assets/layout/images/avatar.png" />
//                             <span class="topbar-item-name">Jane Williams</span>
//                         </a>

//                         <ul class="ultima-menu animated fadeInDown">
//                             <li role="menuitem">
//                                 <a href="#" (click)="app.onTopbarSubItemClick($event)">
//                                     <i class="pi pi-user"></i>
//                                     <span>Profile</span>
//                                 </a>
//                             </li>
//                             <li role="menuitem">
//                                 <a href="#" (click)="app.onTopbarSubItemClick($event)">
//                                     <i class="pi pi-lock"></i>
//                                     <span>Privacy</span>
//                                 </a>
//                             </li>
//                             <li role="menuitem">
//                                 <a href="#" (click)="app.onTopbarSubItemClick($event)">
//                                     <i class="pi pi-cog"></i>
//                                     <span>Settings</span>
//                                 </a>
//                             </li>
//                             <li role="menuitem">
//                                 <a href="#" (click)="app.onTopbarSubItemClick($event)">
//                                     <i class="pi pi-power-off"></i>
//                                     <span>Logout</span>
//                                 </a>
//                             </li>
//                         </ul>
//                     </li>
//                     <li #settings [ngClass]="{'active-top-menu':app.activeTopbarItem === settings}">
//                         <a href="#" (click)="app.onTopbarItemClick($event,settings)">
//                             <i class="topbar-icon pi pi-cog"></i>
//                             <span class="topbar-item-name">Settings</span>
//                         </a>
//                         <ul class="ultima-menu animated fadeInDown">
//                             <li role="menuitem">
//                                 <a href="#" (click)="app.onTopbarSubItemClick($event)">
//                                     <i class="pi pi-palette"></i>
//                                     <span>Change Theme</span>
//                                 </a>
//                             </li>
//                             <li role="menuitem">
//                                 <a href="#" (click)="app.onTopbarSubItemClick($event)">
//                                     <i class="pi pi-heart"></i>
//                                     <span>Favorites</span>
//                                 </a>
//                             </li>
//                             <li role="menuitem">
//                                 <a href="#" (click)="app.onTopbarSubItemClick($event)">
//                                     <i class="pi pi-lock"></i>
//                                     <span>Lock Screen</span>
//                                 </a>
//                             </li>
//                             <li role="menuitem">
//                                 <a href="#" (click)="app.onTopbarSubItemClick($event)">
//                                     <i class="pi pi-image"></i>
//                                     <span>Wallpaper</span>
//                                 </a>
//                             </li>
//                         </ul>
//                     </li>
//                     <li #messages [ngClass]="{'active-top-menu':app.activeTopbarItem === messages}">
//                         <a href="#" (click)="app.onTopbarItemClick($event,messages)">
//                             <i class="topbar-icon pi pi-envelope animated swing"></i>
//                             <span class="topbar-badge animated rubberBand">5</span>
//                             <span class="topbar-item-name">Messages</span>
//                         </a>
//                         <ul class="ultima-menu animated fadeInDown">
//                             <li role="menuitem">
//                                 <a href="#" class="topbar-message" (click)="app.onTopbarSubItemClick($event)">
//                                     <img src="assets/layout/images/avatar1.png" width="35"/>
//                                     <span>Give me a call</span>
//                                 </a>
//                             </li>
//                             <li role="menuitem">
//                                 <a href="#" class="topbar-message" (click)="app.onTopbarSubItemClick($event)">
//                                     <img src="assets/layout/images/avatar2.png" width="35"/>
//                                     <span>Sales reports attached</span>
//                                 </a>
//                             </li>
//                             <li role="menuitem">
//                                 <a href="#" class="topbar-message" (click)="app.onTopbarSubItemClick($event)">
//                                     <img src="assets/layout/images/avatar3.png" width="35"/>
//                                     <span>About your invoice</span>
//                                 </a>
//                             </li>
//                             <li role="menuitem">
//                                 <a href="#" class="topbar-message" (click)="app.onTopbarSubItemClick($event)">
//                                     <img src="assets/layout/images/avatar2.png" width="35"/>
//                                     <span>Meeting today at 10pm</span>
//                                 </a>
//                             </li>
//                             <li role="menuitem">
//                                 <a href="#" class="topbar-message" (click)="app.onTopbarSubItemClick($event)">
//                                     <img src="assets/layout/images/avatar4.png" width="35"/>
//                                     <span>Out of office</span>
//                                 </a>
//                             </li>
//                         </ul>
//                     </li>
//                     <li #notifications [ngClass]="{'active-top-menu':app.activeTopbarItem === notifications}">
//                         <a href="#" (click)="app.onTopbarItemClick($event,notifications)">
//                             <i class="topbar-icon pi pi-bell"></i>
//                             <span class="topbar-badge animated rubberBand">4</span>
//                             <span class="topbar-item-name">Notifications</span>
//                         </a>
//                         <ul class="ultima-menu animated fadeInDown">
//                             <li role="menuitem">
//                                 <a href="#" (click)="app.onTopbarSubItemClick($event)">
//                                     <i class="pi pi-sliders-h"></i>
//                                     <span>Pending tasks</span>
//                                 </a>
//                             </li>
//                             <li role="menuitem">
//                                 <a href="#" (click)="app.onTopbarSubItemClick($event)">
//                                     <i class="pi pi-calendar"></i>
//                                     <span>Meeting today at 3pm</span>
//                                 </a>
//                             </li>
//                             <li role="menuitem">
//                                 <a href="#" (click)="app.onTopbarSubItemClick($event)">
//                                     <i class="pi pi-download"></i>
//                                     <span>Download documents</span>
//                                 </a>
//                             </li>
//                             <li role="menuitem">
//                                 <a href="#" (click)="app.onTopbarSubItemClick($event)">
//                                     <i class="pi pi-ticket"></i>
//                                     <span>Book flight</span>
//                                 </a>
//                             </li>
//                         </ul>
//                     </li>
//                     <li #search class="search-item" [ngClass]="{'active-top-menu':app.activeTopbarItem === search}"
//                         (click)="app.onTopbarItemClick($event,search)">
//                         <span class="p-input-icon-left">
//                             <i class="topbar-icon pi pi-search"></i>
//                             <input type="text" pInputText placeholder="Search">
//                         </span>
//                     </li>
//                 </ul>
//             </div>
//         </div>
//     `
// })
// export class AppTopbarComponent {

//     constructor(public app: AppMainComponent) {}

// }
