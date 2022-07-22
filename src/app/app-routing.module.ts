import { AccountRegisterComponent } from './pages/account/account-register/account-register.component';
import { CompanyRegistrationComponent } from './pages/company/company-registration/company-registration.component';
import { CompanyListComponent } from './pages/company/company-list/company-list.component';
import { AccountStatusComponent } from './pages/settings-page/account-status/account-status.component';
import { ParametersComponent } from './pages/settings-page/parameters/parameters.component';
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

const routes: Routes = [
    { path: 'login', component: LoginComponent, canActivate: [LoginGuard] },
    { path: 'selecao-empresa/:value', component: SelecaoEmpresaComponent },

    {
        path: '', component: AppMainComponent, canActivate: [AuthGuard],
        children: [
            { path: 'home', component: VisaoGeralComponent },
            { path: 'company', component: CompanyListComponent },            
            { path: 'person', component: PersonListComponent },
            { path: 'natureza-financeira', component: NaturezaFinanceiraListaComponent },            
            { path: 'users/registration/:id', component: UsersRegistrationComponent },
            { path: 'company-registration/:id', component: CompanyRegistrationComponent },
            { path: 'person/registration/:id', component: PersonRegistrationComponent },
            { path: 'natureza-financeira/cadastro/:id', component: NaturezaFinanceiraCadastroComponent },
            { path: 'account', component: AccountListComponent },
            { path: 'account-launch/:id', component: AccountLaunchComponent},
            { path: 'account/register/:id', component: AccountRegisterComponent},
            //  {path: 'empregador/cadastro/:id', component: EmpregadorCadastroComponent},

            {
                path: 'conciliation/:id/:dataInicial/:dataFinal', component: ConciliationComponent, children: [
                    { path: 'extract', component: ExtractComponent },
                    { path: 'reconciled', component: ReconciledComponent },
                    { path: 'conciliator', component: conciliatorComponent },
                    { path: 'not-reconciled', component: NotReconciledComponent },                    
                    {path: '', pathMatch: 'full', redirectTo: 'extract'},
                ]
            },

            {
                path: 'settings', component: SettingsPageComponent, children: [
                    { path: 'main-accountant', component: MainAccountantComponent },
                    { path: 'users-list', component: UsersListComponent },
                    { path: 'departments-list', component: DepartmentsListComponent },
                    { path: 'invoices-list', component: InvoicesListComponent },                    
                    { path: 'parameters', component: ParametersComponent },
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
