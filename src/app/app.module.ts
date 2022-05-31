import { EmpresasCadastroComponent } from './pages/empresas/empresas-cadastro/empresas-cadastro.component';
import { EmpresasCadastro3Component } from './pages/empresas/empresas-cadastro3/empresas-cadastro3.component';
import { UsuariosCadastroComponent } from './pages/usuarios/usuarios-cadastro/usuarios-cadastro.component';
import { ParametrosComponent } from './pages/parametros/parametros.component';
import { UsuariosListaComponent } from './pages/usuarios/usuarios-lista/usuarios-lista.component';
import { EmpresasListaComponent } from './pages/empresas/empresas-lista/empresas-lista.component';
import { VisaoGeralComponent } from './pages/dashboard/visao-geral/visao-geral.component';
import { GeralLivroCaixaXNotasChartComponent } from './pages/dashboard/geral-livro-caixa-x-notas-chart/geral-livro-caixa-x-notas-chart.component';
import { GeralEvolucaoSaldoLivroCaixaChartComponent } from './pages/dashboard/geral-evolucao-saldo-livro-caixa-chart/geral-evolucao-saldo-livro-caixa-chart.component';
import {ErrorHandler, NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HashLocationStrategy, LocationStrategy} from '@angular/common';
import {AppRoutingModule} from './app-routing.module';
import { SentryErrorHandler } from './auth/service/sentry-error-handler'
import { ConfirmationService, MessageService } from 'primeng/api'
import { AuthInterceptor } from './auth/service/auth-interceptor';
import { ErrorInterceptor } from './auth/service/error-interceptor';

// Application Components
import {AppCodeModule} from './app.code.component';
import {AppComponent} from './app.component';
import {AppMainComponent} from './app.main.component';
import {AppMenuComponent} from './app.menu.component';
import {AppMenuitemComponent} from './app.menuitem.component';
import {AppInlineProfileComponent} from './app.profile.component';
import {AppBreadcrumbComponent} from './app.breadcrumb.component';
import {AppConfigComponent} from './app.config.component';
import {AppRightpanelComponent} from './app.rightpanel.component';
import {AppTopbarComponent} from './app.topbar.component';
import {AppFooterComponent} from './app.footer.component';
import {LoginComponent} from './auth/login/login.component';
import {SelecaoEmpresaComponent} from './auth/selecao-empresa/selecao-empresa.component';
import {ModaisModule} from './modais/modais.module';
import {DiretivasModule} from './diretivas/diretivas.module';
import {ComponentsModule} from './components/components.module';
import {PipesModule} from './pipes/pipes.module';
// Application services
import {AppBreadcrumbService} from './app.breadcrumb.service';
import {MenuService} from './app.menu.service';

import {TemaModule} from './tema.module';
import { LayoutsModule } from './layout/layouts.module';
import { ImageCropperModule } from 'ngx-image-cropper';
import { NgxViacepModule } from '@brunoc/ngx-viacep';

@NgModule({
    imports: [BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        AppRoutingModule,
        HttpClientModule,
        BrowserAnimationsModule,
        AppCodeModule,
        TemaModule,
        DiretivasModule,
        ComponentsModule,
        PipesModule,
        ModaisModule,   
        LayoutsModule, 
        ImageCropperModule,  
        NgxViacepModule,        
        
    ],
    declarations: [
        AppComponent,
        AppMainComponent,
        AppMenuComponent,
        AppMenuitemComponent,
        AppInlineProfileComponent,
        AppTopbarComponent,
        AppFooterComponent,
        AppRightpanelComponent,
        AppConfigComponent,
        AppBreadcrumbComponent,
        LoginComponent,
        SelecaoEmpresaComponent,
        GeralEvolucaoSaldoLivroCaixaChartComponent,
        GeralLivroCaixaXNotasChartComponent,
        VisaoGeralComponent,        
        EmpresasListaComponent,
        UsuariosListaComponent,        
        ParametrosComponent,
        UsuariosCadastroComponent,
        EmpresasCadastro3Component,
        EmpresasCadastroComponent
    ],
    providers: [
        {provide: LocationStrategy, useClass: HashLocationStrategy},
        {provide: ErrorHandler, useClass: SentryErrorHandler},
        MenuService, AppBreadcrumbService,
        MessageService,
        ConfirmationService,

        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: ErrorInterceptor,
            multi: true,
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
