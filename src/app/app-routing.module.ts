import { AccountLaunchComponent } from './pages/account/account-launch/account-launch.component';
import { AccountListComponent } from './pages/account/account-list/account-list.component';
import { ReconcileInstallmentComponent } from './pages/conciliation/reconciled-transfer/reconcile-installment/reconcile-installment.component';
import { ReconcileAccountingComponent } from './pages/conciliation/reconciled-transfer/reconcile-accounting/reconcile-accounting.component';
import { UnreconciledAccountingComponent } from './pages/conciliation/unreconciled-accounting/unreconciled-accounting.component';
import { UnreconciledExtractsComponent } from './pages/conciliation/unreconciled-extracts/unreconciled-extracts.component';
import { ReconciledComponent } from './pages/conciliation/reconciled/reconciled.component';
import { ReconciledExtractComponent } from './pages/conciliation/reconciled-extract/reconciled-extract.component';
import { ConciliationComponent } from './pages/conciliation/conciliation.component';
import { NaturezaFinanceiraCadastroComponent } from './pages/natureza-financeira/natureza-financeira-cadastro/natureza-financeira-cadastro.component';
import { NaturezaFinanceiraListaComponent } from './pages/natureza-financeira/natureza-financeira-lista/natureza-financeira-lista.component';
import { PessoasCadastroComponent } from './pages/pessoas/pessoas-cadastro/pessoas-cadastro.component';
import { PessoasListaComponent } from './pages/pessoas/pessoas-lista/pessoas-lista.component';
import { EmpresasCadastroComponent } from './pages/empresas/empresas-cadastro/empresas-cadastro.component';
import { UsuariosCadastroComponent } from './pages/usuarios/usuarios-cadastro/usuarios-cadastro.component';
import { ParametrosComponent } from './pages/parametros/parametros.component';
import { UsuariosListaComponent } from './pages/usuarios/usuarios-lista/usuarios-lista.component';
import { EmpresasListaComponent } from './pages/empresas/empresas-lista/empresas-lista.component';
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
            { path: 'empresas', component: EmpresasListaComponent },
            { path: 'usuarios', component: UsuariosListaComponent },
            { path: 'pessoas', component: PessoasListaComponent },
            { path: 'natureza-financeira', component: NaturezaFinanceiraListaComponent },
            { path: 'empresa', component: ParametrosComponent },
            { path: 'usuario-cadastro/:id', component: UsuariosCadastroComponent },
            { path: 'empresas-cadastro/:id', component: EmpresasCadastroComponent },
            { path: 'pessoas/cadastro/:id', component: PessoasCadastroComponent },
            { path: 'natureza-financeira/cadastro/:id', component: NaturezaFinanceiraCadastroComponent },
            { path: 'account', component: AccountListComponent },
            { path: 'account-launch/:id', component: AccountLaunchComponent},
            //  {path: 'empregador/cadastro/:id', component: EmpregadorCadastroComponent},

            {
                path: 'conciliation/:id/:dataInicial/:dataFinal', component: ConciliationComponent, children: [
                    { path: 'reconciled-extract', component: ReconciledExtractComponent },
                    { path: 'reconciled', component: ReconciledComponent },
                    { path: 'unreconciled-extracts', component: UnreconciledExtractsComponent },
                    { path: 'unreconciled-accounting', component: UnreconciledAccountingComponent },
                    {path: '', pathMatch: 'full', redirectTo: 'reconciled-extract'},
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
