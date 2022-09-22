import { OneSignal } from 'onesignal-ngx';
import { NetworkService } from 'src/app/services/network.service';
import { Router } from '@angular/router';
import { DadosDefaultService } from './services/dados-default.service';
import {Component, OnInit} from '@angular/core';
import { MenuService } from './app.menu.service';
import { PrimeNGConfig, MessageService } from 'primeng/api';


@Component({
    selector: 'app-main',
    templateUrl: './app.main.component.html'
})
export class AppMainComponent implements OnInit {

    layoutMode = 'overlay';

    darkMenu = true;

    profileMode = 'top';

    rotateMenuButton: boolean;

    topbarMenuActive: boolean;

    overlayMenuActive: boolean;

    staticMenuDesktopInactive: boolean;

    staticMenuMobileActive: boolean;

    rightPanelActive: boolean;

    rightPanelClick: boolean;
    
    public menuActive = true;

    menuClick: boolean;

    resetMenu: boolean;

    topbarItemClick: boolean;

    activeTopbarItem: any;

    menuHoverActive: boolean;

    configActive: boolean;

    configClick: boolean;

    inputStyle = 'outlined';

    ripple = true;

    compactMode = true;

    constructor(private menuService: MenuService, private primengConfig: PrimeNGConfig, private dadosDefault: DadosDefaultService, private messageService: MessageService, private router: Router, private networkService: NetworkService, private oneSignal: OneSignal) {
          
    }

    exibirLoader = this.dadosDefault.exibirLoader
    exibirLoaderNetwork = this.networkService.exibirLoader

    onHandletTag(tag: string) {
        this.oneSignal.sendTag('Tech', tag).then(() => {
            console.log('Sent tag: ' + tag)
        })
    }

    ngOnInit() {
        this.oneSignal.init({
            appId: "8c39c189-54b0-4160-82c9-b9e7e4e2e0cb"
        })    
        // var oneSignal = window['OneSignal'] || [];
        // oneSignal.push(["init", {
        //     appId: "8c39c189-54b0-4160-82c9-b9e7e4e2e0cb",
        //     autoRegister: false,
        //     allowLocalhostAsSecureOrigin: true,
        //     notifyButton: {
        //         enable: false
        //     }
        // }]);
        // oneSignal.push(function () {
            this.oneSignal.on('subscriptionChange', function (isSubscribed) {
                console.log('Teste ----> ' + isSubscribed)
                this.oneSignal.getUserId().then(function (userId) {

                })
            })
        // })

        this.primengConfig.ripple = true;
    }

    onLayoutClick() {
        if (!this.topbarItemClick) {
            this.activeTopbarItem = null;
            this.topbarMenuActive = false;
        }

        if (!this.menuClick) {
            if (this.isHorizontal() || this.isSlim()) {
                this.menuService.reset();
            }

            if (this.overlayMenuActive || this.staticMenuMobileActive) {
                this.hideOverlayMenu();
            }

            this.menuHoverActive = false;
        }

        if (!this.rightPanelClick) {
            this.rightPanelActive = false;
        }

        if (this.configActive && !this.configClick) {
            this.configActive = false;
        }

        this.configClick = false;
        this.topbarItemClick = false;
        this.menuClick = false;
        this.rightPanelClick = false;
    }

    onMenuButtonClick(event) {
        this.menuClick = true;
        this.rotateMenuButton = !this.rotateMenuButton;
        this.topbarMenuActive = false;

        if (this.layoutMode === 'overlay') {
            this.overlayMenuActive = !this.overlayMenuActive;
        } else {
            if (this.isDesktop()) {
                this.staticMenuDesktopInactive = !this.staticMenuDesktopInactive;
            }
            else {
                this.staticMenuMobileActive = !this.staticMenuMobileActive;
            }
        }

        event.preventDefault();
    }

    onMenuClick() {        
        this.menuClick = true;
        this.resetMenu = false;        
    }

    onTopbarMenuButtonClick(event) {      
        this.topbarItemClick = true;
        this.topbarMenuActive = !this.topbarMenuActive;

        this.hideOverlayMenu();

        event.preventDefault();
    }

    onTopbarItemClick(event, item) {
        this.topbarItemClick = true;

        if (this.activeTopbarItem === item) {
            this.activeTopbarItem = null; } else {
            this.activeTopbarItem = item; }

        event.preventDefault();
    }

    onTopbarSubItemClick(event, route?) {        
        event.preventDefault();        
        this.router.navigate([`${route}`])
    }

    onRightPanelButtonClick(event) {
        this.rightPanelClick = true;
        this.rightPanelActive = !this.rightPanelActive;
        event.preventDefault();
    }

    onRightPanelClick() {
        this.rightPanelClick = true;
    }

    onRippleChange(event) {
        this.ripple = event.checked;
    }

    onConfigClick(event) {
        this.configClick = true;
    }

    hideOverlayMenu() {
        this.rotateMenuButton = false;
        this.overlayMenuActive = false;
        this.staticMenuMobileActive = false;
    }

    isTablet() {
        const width = window.innerWidth;
        return width <= 1024 && width > 640;
    }

    isDesktop() {
        return window.innerWidth > 1024;
    }

    isMobile() {
        return window.innerWidth <= 640;
    }

    isOverlay() {
        return this.layoutMode === 'overlay';
    }

    isStatic() {
        return this.layoutMode === 'static';
    }

    isHorizontal() {
        return this.layoutMode === 'horizontal';
    }

    isSlim() {
        return this.layoutMode === 'slim';
    }
    
}













// import {Component, OnInit} from '@angular/core';
// import { MenuService } from './app.menu.service';
// import { PrimeNGConfig } from 'primeng/api';

// @Component({
//     selector: 'app-main',
//     templateUrl: './app.main.component.html'
// })
// export class AppMainComponent implements OnInit {

//     layoutMode = 'slim';

//     darkMenu = false;

//     profileMode = 'inline';

//     rotateMenuButton: boolean;

//     topbarMenuActive: boolean;

//     overlayMenuActive: boolean;

//     staticMenuDesktopInactive: boolean;

//     staticMenuMobileActive: boolean;

//     rightPanelActive: boolean;

//     rightPanelClick: boolean;

//     menuClick: boolean;

//     topbarItemClick: boolean;

//     activeTopbarItem: any;

//     menuHoverActive: boolean;

//     configActive: boolean;

//     configClick: boolean;

//     inputStyle = 'outlined';

//     ripple = true;

//     compactMode = false;

//     constructor(private menuService: MenuService, private primengConfig: PrimeNGConfig) {}

//     ngOnInit() {
//         this.primengConfig.ripple = true;
//     }

//     onLayoutClick() {
//         if (!this.topbarItemClick) {
//             this.activeTopbarItem = null;
//             this.topbarMenuActive = false;
//         }

//         if (!this.menuClick) {
//             if (this.isHorizontal() || this.isSlim()) {
//                 this.menuService.reset();
//             }

//             if (this.overlayMenuActive || this.staticMenuMobileActive) {
//                 this.hideOverlayMenu();
//             }

//             this.menuHoverActive = false;
//         }

//         if (!this.rightPanelClick) {
//             this.rightPanelActive = false;
//         }

//         if (this.configActive && !this.configClick) {
//             this.configActive = false;
//         }

//         this.configClick = false;
//         this.topbarItemClick = false;
//         this.menuClick = false;
//         this.rightPanelClick = false;
//     }

//     onMenuButtonClick(event) {
//         this.menuClick = true;
//         this.rotateMenuButton = !this.rotateMenuButton;
//         this.topbarMenuActive = false;

//         if (this.layoutMode === 'overlay') {
//             this.overlayMenuActive = !this.overlayMenuActive;
//         } else {
//             if (this.isDesktop()) {
//                 this.staticMenuDesktopInactive = !this.staticMenuDesktopInactive;
//             }
//             else {
//                 this.staticMenuMobileActive = !this.staticMenuMobileActive;
//             }
//         }

//         event.preventDefault();
//     }

//     onMenuClick($event) {
//         this.menuClick = true;
//     }

//     onTopbarMenuButtonClick(event) {
//         this.topbarItemClick = true;
//         this.topbarMenuActive = !this.topbarMenuActive;

//         this.hideOverlayMenu();

//         event.preventDefault();
//     }

//     onTopbarItemClick(event, item) {
//         this.topbarItemClick = true;

//         if (this.activeTopbarItem === item) {
//             this.activeTopbarItem = null; } else {
//             this.activeTopbarItem = item; }

//         event.preventDefault();
//     }

//     onTopbarSubItemClick(event) {
//         event.preventDefault();
//     }

//     onRightPanelButtonClick(event) {
//         this.rightPanelClick = true;
//         this.rightPanelActive = !this.rightPanelActive;
//         event.preventDefault();
//     }

//     onRightPanelClick() {
//         this.rightPanelClick = true;
//     }

//     onRippleChange(event) {
//         this.ripple = event.checked;
//     }

//     onConfigClick(event) {
//         this.configClick = true;
//     }

//     hideOverlayMenu() {
//         this.rotateMenuButton = false;
//         this.overlayMenuActive = false;
//         this.staticMenuMobileActive = false;
//     }

//     isTablet() {
//         const width = window.innerWidth;
//         return width <= 1024 && width > 640;
//     }

//     isDesktop() {
//         return window.innerWidth > 1024;
//     }

//     isMobile() {
//         return window.innerWidth <= 640;
//     }

//     isOverlay() {
//         return this.layoutMode === 'overlay';
//     }

//     isStatic() {
//         return this.layoutMode === 'static';
//     }

//     isHorizontal() {
//         return this.layoutMode === 'horizontal';
//     }

//     isSlim() {
//         return this.layoutMode === 'slim';
//     }
// }
