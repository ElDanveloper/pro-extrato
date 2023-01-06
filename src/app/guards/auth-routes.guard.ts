import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { PERMISSOES } from '../controller/staticValues'

@Injectable(
    {providedIn: 'root'}
)
export class AuthRoutesGuard implements CanActivate {



    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ) : Observable<boolean> | boolean{
        let rotaAtual = state.url
        // array.findIndex(e => e.rotas.some(v => new RegExp(`\^/${v}`, 'i').test(rotaAtual)))                
        let permissao = localStorage.getItem('counter');    
        let posicao = (permissao = 'true') ? 1 : 0        
        return  array[posicao].couter === permissao;
    }
}

let array = [
    {
        label: "menu empresa",
        couter: 'false',
        rotas: [
            "dashboard-company",
            "home",
            "account",
            "account-launch",
            "conciliation",
            "natureza-financeira",
            "person",
            "memorized-histories",
            "key-word",
            "parameters-company",
            "user-company-list",
            "user-company-registration",              
        ]
    },
    {
        label: "menu contador",
        couter: 'true',
        rotas: [
            "dashboard-home",
            "home",
            "account",
            "account-launch",
            "conciliation",
            "natureza-financeira",
            "person",
            "memorized-histories",
            "key-word",
            "parameters",
            "users-list",
            "users-registration",              
        ]
    },
    // {
    //     label: "compras",
    //     position: 2,
    //     rotas: ["compras","contrato","estoque"]
    // },
    // {
    //     label: "financeiro",
    //     position: 3,
    //     rotas: [
    //         "contacaixa",
    //         "financeiro",
    //         "talonariocheque",
    //         "lancamento-programado",
    //         "compensacao",
    //         "planocontas",
    //         "naturezafinanceira",
    //         "conciliacao-cartao",
    //         "planoscontasnatureza",            
    //     ]
    // },
    // {
    //     label: "relatorios",
    //     position: 4,
    //     rotas: ["relatorio-notas","relatorio-compras","relatorio-contas"]
    // },
    // {
    //     label: "cadastros",
    //     position: 5,
    //     rotas: ["produto", "pessoa", "auxiliares", "produtopromocao"]
    // },
    // {
    //     label: "contabil",
    //     position: 6,
    //     rotas: ["lancamentos-contabeis","livro-caixa","despesas-recorrentes", "planocontas","naturezafinanceira","contabeis"]
    // },
    // {
    //     label: "produção",
    //     position: 7,
    //     rotas: ["consumo", "producao", "transferencia-interna", "ordem-producao","ficha-tecnica"]
    // },
    // {
    //     label: "patrimonio",
    //     position: 8,
    //     rotas: ["bem","auxiliares"]
    // }
]