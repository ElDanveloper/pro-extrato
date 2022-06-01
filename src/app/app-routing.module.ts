import { EmpresasCadastroComponent } from './pages/empresas/empresas-cadastro/empresas-cadastro.component';
import { UsuariosCadastroComponent } from './pages/usuarios/usuarios-cadastro/usuarios-cadastro.component';
import { ParametrosComponent } from './pages/parametros/parametros.component';
import { UsuariosListaComponent } from './pages/usuarios/usuarios-lista/usuarios-lista.component';
import { EmpresasListaComponent } from './pages/empresas/empresas-lista/empresas-lista.component';
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
             {path: 'empresas', component: EmpresasListaComponent},           
             {path: 'usuarios', component: UsuariosListaComponent},
             {path: 'empresa', component: ParametrosComponent},             
             {path: 'usuario-cadastro', component: UsuariosCadastroComponent},
             {path: 'cadastro', component: EmpresasCadastroComponent}
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
