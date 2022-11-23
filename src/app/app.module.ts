import { ReportDreComponent } from './pages/report/report-DRE/report-dre.component';
import { UserCompanyListComponent } from './pages/user-company/user-company-list/user-company-list.component';
import { ParametersCompanyComponent } from './pages/parameters-company/parameters-company.component';
import { NgxViacepModule } from '@brunoc/ngx-viacep';
import { MemorizedHistoriesListComponent } from './pages/memorized-histories/memorized-histories-list/memorized-histories-list.component';
import { OutstandingComponent } from './pages/conciliation/outstanding/outstanding.component';
import { KeyWordRegistrationComponent } from './pages/key-word/key-word-registration/key-word-registration.component';
import { KeyWordListComponent } from './pages/key-word/key-word-list/key-word-list.component';
import { AppNotfoundComponent } from './pages/not-found/app.notfound.component';
import { AccountRegisterComponent } from './pages/account/account-register/account-register.component';
import { CompanyRegistrationComponent } from './pages/company/company-registration/company-registration.component';
import { CompanyListComponent } from './pages/company/company-list/company-list.component';
import { AccountStatusComponent } from './pages/settings-page/account-status/account-status.component';
import { InvoicesListComponent } from './pages/settings-page/invoices-list/invoices-list.component';
import { DepartmentsListComponent } from './pages/settings-page/departments/departments-list/departments-list.component';
import { UsersListComponent } from './pages/settings-page/users/users-list/users-list.component';
import { UsersRegistrationComponent } from './pages/settings-page/users/users-registration/users-registration.component';
import { MainAccountantComponent } from './pages/settings-page/main-accountant/main-accountant.component';
import { SettingsPageComponent } from './pages/settings-page/settings-page.component';
import { AccountListComponent } from './pages/account/account-list/account-list.component';
import { AccountLaunchComponent } from './pages/account/account-launch/account-launch.component';
import { ReconcileInstallmentComponent } from './pages/conciliation/reconciled-transfer/reconcile-installment/reconcile-installment.component';
import { ReconcileAccountingComponent } from './pages/conciliation/reconciled-transfer/reconcile-accounting/reconcile-accounting.component';
import { ReconciledTransferComponent } from './pages/conciliation/reconciled-transfer/reconciled-transfer.component';
import { NotReconciledComponent } from './pages/conciliation/not-reconciled/not-reconciled.component';
import { conciliatorComponent } from './pages/conciliation/conciliator/conciliator.component';
import { ReconciledComponent } from './pages/conciliation/reconciled/reconciled.component';
import { ExtractComponent } from './pages/conciliation/extract/extract.component';
import { ConciliationComponent } from './pages/conciliation/conciliation.component';
import { NaturezaFinanceiraCadastroComponent } from './pages/natureza-financeira/natureza-financeira-cadastro/natureza-financeira-cadastro.component';
import { NaturezaFinanceiraListaComponent } from './pages/natureza-financeira/natureza-financeira-lista/natureza-financeira-lista.component';
import { PainelPageComponent } from './painel-page-component/painel-page.component';
import { SituationPersonRegistrationComponent } from './pages/person/situation-person-registration/situation-person-registration.component';
import { PersonRegistrationComponent } from './pages/person/person-registration/person-registration.component';
import { PersonListComponent } from './pages/person/person-list/person-list.component';
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
        CompanyListComponent,
        UsersListComponent,                
        UsersRegistrationComponent,        
        CompanyRegistrationComponent,
        PersonListComponent,
        PersonRegistrationComponent,
        // SituationPersonRegistrationComponent,
        PainelPageComponent,
        NaturezaFinanceiraListaComponent,
        NaturezaFinanceiraCadastroComponent,
        ConciliationComponent,
        ExtractComponent,
        ReconciledComponent,
        conciliatorComponent,
        NotReconciledComponent,
        ReconciledTransferComponent,
        ReconcileAccountingComponent,
        ReconcileInstallmentComponent,
        AccountLaunchComponent,
        AccountListComponent,
        SettingsPageComponent,
        MainAccountantComponent,
        DepartmentsListComponent,
        InvoicesListComponent,
        ParametersCompanyComponent,
        AccountStatusComponent,
        AccountRegisterComponent,
        AppNotfoundComponent,
        KeyWordListComponent,
        KeyWordRegistrationComponent,
        OutstandingComponent,
        MemorizedHistoriesListComponent,
        UserCompanyListComponent,
        ReportDreComponent,
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
