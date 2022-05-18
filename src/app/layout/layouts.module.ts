import { PageHeaderComponent } from './page-header/page-header.component';
import { PageDividedComponent } from './page-divided/page-divided.component';
import { FooterPageComponent } from './footer-page/footer-page.component';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { RouterModule } from '@angular/router';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { NgModule } from "@angular/core";


@NgModule({
    declarations: [
        FooterPageComponent,
        PageDividedComponent,
        PageHeaderComponent,
    ],
    imports: [
        CommonModule,
        ButtonModule,
        ScrollPanelModule,
        RouterModule,
        DialogModule,
        TableModule,
    ],
    exports: [
        FooterPageComponent,
        PageDividedComponent,
        PageHeaderComponent,
    ],    
})
export class LayoutsModule { }