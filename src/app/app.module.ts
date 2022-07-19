import { AccountStatusComponent } from './pages/settings-page/account-status/account-status.component';
import { ParametersComponent } from './pages/settings-page/parameters/parameters.component';
import { InvoicesListComponent } from './pages/settings-page/invoices-list/invoices-list.component';
import { DepartmentsListComponent } from './pages/settings-page/departments/departments-list/departments-list.component';
import { UsersListComponent } from './pages/settings-page/users/users-list/users-list.component';
import { UsersRegistrationComponent } from './pages/settings-page/users/users-registration/users-registration.component';
import { MainAccountantComponent } from './pages/settings-page/main-accountant/main-accountant.component';
import { SettingsComponent } from './pages/settings-page/Settings.component';
import { AccountListComponent } from './pages/account/account-list/account-list.component';
import { AccountLaunchComponent } from './pages/account/account-launch/account-launch.component';
import { ReconcileInstallmentComponent } from './pages/conciliation/reconciled-transfer/reconcile-installment/reconcile-installment.component';
import { ReconcileAccountingComponent } from './pages/conciliation/reconciled-transfer/reconcile-accounting/reconcile-accounting.component';
import { ReconciledTransferComponent } from './pages/conciliation/reconciled-transfer/reconciled-transfer.component';
import { UnreconciledAccountingComponent } from './pages/conciliation/unreconciled-accounting/unreconciled-accounting.component';
import { UnreconciledExtractsComponent } from './pages/conciliation/unreconciled-extracts/unreconciled-extracts.component';
import { ReconciledComponent } from './pages/conciliation/reconciled/reconciled.component';
import { ReconciledExtractComponent } from './pages/conciliation/reconciled-extract/reconciled-extract.component';
import { ConciliationComponent } from './pages/conciliation/conciliation.component';
import { NaturezaFinanceiraCadastroComponent } from './pages/natureza-financeira/natureza-financeira-cadastro/natureza-financeira-cadastro.component';
import { NaturezaFinanceiraListaComponent } from './pages/natureza-financeira/natureza-financeira-lista/natureza-financeira-lista.component';
import { PainelPageComponent } from './painel-page-component/painel-page.component';
import { SituacaoPessoaCadastroComponent } from './pages/pessoas/situacao-pessoa-cadastro/situacao-pessoa-cadastro.component';
import { PessoasCadastroComponent } from './pages/pessoas/pessoas-cadastro/pessoas-cadastro.component';
import { PessoasListaComponent } from './pages/pessoas/pessoas-lista/pessoas-lista.component';
import { EmpresasCadastroComponent } from './pages/empresas/empresas-cadastro/empresas-cadastro.component';
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
        UsersListComponent,                
        UsersRegistrationComponent,        
        EmpresasCadastroComponent,
        PessoasListaComponent,
        PessoasCadastroComponent,
        SituacaoPessoaCadastroComponent,
        PainelPageComponent,
        NaturezaFinanceiraListaComponent,
        NaturezaFinanceiraCadastroComponent,
        ConciliationComponent,
        ReconciledExtractComponent,
        ReconciledComponent,
        UnreconciledExtractsComponent,
        UnreconciledAccountingComponent,
        ReconciledTransferComponent,
        ReconcileAccountingComponent,
        ReconcileInstallmentComponent,
        AccountLaunchComponent,
        AccountListComponent,
        SettingsComponent,
        MainAccountantComponent,
        DepartmentsListComponent,
        InvoicesListComponent,
        ParametersComponent,
        AccountStatusComponent,
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
