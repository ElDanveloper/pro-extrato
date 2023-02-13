import { UpdateCodeListComponent } from './pages/report/update-code/update-code-list.component';
import { ReportCashFlowComponent } from './pages/report/report-cash-flow/report-cash-flow.component';
import { ReportDreComponent } from './pages/report/report-DRE/report-dre.component';
import { UserCompanyListComponent } from './pages/user-company/user-company-list/user-company-list.component';
import { ParametersCompanyComponent } from './pages/parameters-company/parameters-company.component';
import { AuthRoutesGuard } from './guards/auth-routes.guard';
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
import { UsersRegistrationComponent } from './pages/settings-page/users/users-registration/users-registration.component';
import { UsersListComponent } from './pages/settings-page/users/users-list/users-list.component';
import { MainAccountantComponent } from './pages/settings-page/main-accountant/main-accountant.component';
import { SettingsPageComponent } from './pages/settings-page/settings-page.component';
import { AccountLaunchComponent } from './pages/account/account-launch/account-launch.component';
import { AccountListComponent } from './pages/account/account-list/account-list.component';
import { ReconcileInstallmentComponent } from './pages/conciliation/reconciled-transfer/reconcile-installment/reconcile-installment.component';
import { ReconcileAccountingComponent } from './pages/conciliation/reconciled-transfer/reconcile-accounting/reconcile-accounting.component';
import { NotReconciledComponent } from './pages/conciliation/not-reconciled/not-reconciled.component';
import { conciliatorComponent } from './pages/conciliation/conciliator/conciliator.component';
import { ReconciledComponent } from './pages/conciliation/reconciled/reconciled.component';
import { ExtractComponent } from './pages/conciliation/extract/extract.component';
import { ConciliationComponent } from './pages/conciliation/conciliation.component';
import { NaturezaFinanceiraCadastroComponent } from './pages/natureza-financeira/natureza-financeira-cadastro/natureza-financeira-cadastro.component';
import { NaturezaFinanceiraListaComponent } from './pages/natureza-financeira/natureza-financeira-lista/natureza-financeira-lista.component';
import { PersonRegistrationComponent } from './pages/person/person-registration/person-registration.component';
import { PersonListComponent } from './pages/person/person-list/person-list.component';
import { LoginGuard } from './auth/service/login.guard';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { AppMainComponent } from './app.main.component';
import { LoginComponent } from './auth/login/login.component'
import { SelecaoEmpresaComponent } from './auth/selecao-empresa/selecao-empresa.component';
import { AuthGuard } from './auth/service/auth-guard';
import { VisaoGeralComponent } from './pages/dashboard/visao-geral/visao-geral.component';
import { ProjetoCadastroComponent } from './pages/projeto-cadastro/projeto-cadastro.component';
import { DashboardHomeComponent } from '../app/pages/dashboard/dashboard-home/dashboard-home.component'
import { DashboardCompanyComponent } from './pages/dashboard/dashboard-company/dashboard-company.component'
import { AccountingParametersComponent } from './pages/settings-page/accounting-parameters/accounting-parameters.component';
import { SupportComponent } from './pages/settings-page/support/support.component';
import { DashboardTesteComponent } from './pages/dashboard/dashboard-teste/dashboard-teste.component';

import { DashboardCustomerComponent } from './pages/dashboard/dashboard-customer/dashboard-customer.component';

const routes: Routes = [
    { path: 'login', component: LoginComponent, canActivate: [LoginGuard] },
    { path: 'selecao-empresa/:value', component: SelecaoEmpresaComponent },
    { path: 'development', component: AppNotfoundComponent},

    {
        path: '', component: AppMainComponent, canActivate: [AuthGuard, AuthRoutesGuard],
        children: [
            { path: 'home', component: VisaoGeralComponent },
            { path: 'company', component: CompanyListComponent },
            { path: 'person', component: PersonListComponent },
            { path: 'natureza-financeira', component: NaturezaFinanceiraListaComponent },
            { path: 'natureza-financeira/cadasto/:id', component: NaturezaFinanceiraCadastroComponent},
            { path: 'users/registration/:id', component: UsersRegistrationComponent },
            { path: 'company-registration/:id', component: CompanyRegistrationComponent },
            { path: 'person/registration/:id', component: PersonRegistrationComponent },
            { path: 'natureza-financeira/cadastro/:id', component: NaturezaFinanceiraCadastroComponent },
            { path: 'account', component: AccountListComponent },
            { path: 'account-launch/:id', component: AccountLaunchComponent},
            { path: 'account/register/:id', component: AccountRegisterComponent},
            { path: 'key-word', component: KeyWordListComponent},
            { path: 'key-word/registration/:id', component: KeyWordRegistrationComponent},
            { path: 'memorized-histories', component: MemorizedHistoriesListComponent},
            { path: 'parameters-company', component: ParametersCompanyComponent },
            { path: 'user-company-list', component: UserCompanyListComponent },
            { path: 'report-dre', component: ReportDreComponent},
            { path: 'report-cash-flow', component: ReportCashFlowComponent},
            { path: 'update-code', component: UpdateCodeListComponent},
            { path: 'dashboard-home', component: DashboardHomeComponent },
            { path: 'dashboard-company', component: DashboardCompanyComponent },
            { path: 'dashboard-teste', component: DashboardTesteComponent },
            { path: 'dashboard-customer', component: DashboardCustomerComponent },


            //  {path: 'empregador/cadastro/:id', component: EmpregadorCadastroComponent},

            {
                path: 'conciliation/:id/:dataInicial/:dataFinal', component: ConciliationComponent, children: [
                    { path: 'extract', component: ExtractComponent },
                    { path: 'reconciled', component: ReconciledComponent },
                    { path: 'conciliator', component: conciliatorComponent },
                    { path: 'not-reconciled', component: NotReconciledComponent },
                    { path: 'outstanding', component: OutstandingComponent},
                    {path: '', pathMatch: 'full', redirectTo: 'extract'},
                ]
            },

            {
                path: 'settings', component: SettingsPageComponent, children: [
                    { path: 'main-accountant', component: MainAccountantComponent },
                    { path: 'users-list', component: UsersListComponent },
                    { path: 'users-registration/:id', component: UsersRegistrationComponent},
                    { path: 'departments-list', component: DepartmentsListComponent },
                    { path: 'invoices-list', component: InvoicesListComponent },
                    { path: 'accounting-parameters', component: AccountingParametersComponent },
                    { path: 'support', component: SupportComponent },

                    { path: 'account-status', component: AccountStatusComponent },
                    {path: '', pathMatch: 'full', redirectTo: 'main-accountant'},
                ]
            },

            {path: 'reconcile-accounting', component: ReconcileAccountingComponent},
            {path: 'reconcile-installment', component: ReconcileInstallmentComponent},

            { path: 'projeto', component: ProjetoCadastroComponent },

        ]
    },
];


@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule,
    ]
})
export class AppRoutingModule {
}
