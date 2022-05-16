import { LoginGuard } from './auth/service/login.guard';
import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {AppMainComponent} from './app.main.component';
import {LoginComponent} from './auth/login/login.component'
import {SelecaoEmpresaComponent} from './auth/selecao-empresa/selecao-empresa.component';
import { AuthGuard } from './auth/service/auth-guard';
import { VisaoGeralComponent } from './pages/dashboard/visao-geral/visao-geral.component';

const routes: Routes = [
    {path: 'login', component: LoginComponent, canActivate: [LoginGuard]},
    {path: 'selecao-empresa/:value', component: SelecaoEmpresaComponent},

    {                 
        path: '', component: AppMainComponent, canActivate: [AuthGuard],
         children: [
             {path: 'home', component: VisaoGeralComponent},
            //  {path: 'empregador/cadastro/:id', component: EmpregadorCadastroComponent},
                   
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
