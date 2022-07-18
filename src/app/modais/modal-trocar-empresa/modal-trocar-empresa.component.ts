import { Util } from './../../controller/Util';
import { getUrlClient, getUrlPro, getUrlToken } from './../../controller/staticValues';
import {Component, Input, OnInit} from '@angular/core';

import {FormBuilder, FormGroup} from "@angular/forms";
import {NetworkService} from "../../services/network.service";
import {DadosDefaultService} from "../../services/dados-default.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MessageService} from "primeng/api";
import { HttpResponse, HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { TOKEN_STORAGE_KEY, EMPRESA_COMPLETA_STORAGE_KEY, qtdLinhas, opcoesLinhas, EMPRESA_STORAGE_KEY} from '../../controller/staticValues'
import { AuthService } from 'src/app/auth/service/auth.service';
import { BaseFormPost } from 'src/app/controller/BaseFormPost';

@Component({
  selector: 'app-modal-trocar-empresa',
  templateUrl: './modal-trocar-empresa.component.html',
  styleUrls: ['./modal-trocar-empresa.component.css']
})
export class ModalTrocarEmpresaComponent extends BaseFormPost implements OnInit {

    entidade = 'Trocar de Empresa'
    @Input() data;
    lista;
    totalItens
    count = opcoesLinhas()
    qtdLinhas = qtdLinhas()
    page = 0
    public top: number = qtdLinhas()
    filtro = '';
    jaPesquisou = false 
    public loading: boolean

    $primeiraEtapaSubscribe: Subscription;
    $segundaEtapaSubscribe: Subscription;
    $listarEmpresaSubscribe: Subscription;

    constructor(public http: HttpClient, public networkService: NetworkService, public dadosDefault: DadosDefaultService, public router: Router, private route: ActivatedRoute, private fb: FormBuilder, public messageService: MessageService, private authService: AuthService) {
        super(networkService, dadosDefault, router, '', messageService)
    }

    ngOnInit() {
        this.carregarDados(this.count, this.page)
    }

    carregarDados(count, page){
        this.dadosDefault.exibirLoader.next(true)
        this.$listarEmpresaSubscribe = this.authService.segundaAuthenticacao().subscribe((res: any) => {                
            this.lista = res
            this.totalItens = res.length
        }).add(() => this.dadosDefault.exibirLoader.next(false))
        // this.dadosDefault.exibirLoader.next(true)
        // this.http.get('https://api.toqweb.com.br:2004/hunnocont/maxus/apura/EmpresasContador', {headers: {
        //     Accept: 'application/json',
        //     'Content-Type': 'application/json',
        // }, responseType: 'blob', observe: 'response'}).pipe().subscribe({
        //     next: (response: any) => {
        //         this.totalItens = response.headers.get('count')

        //         this.networkService.getSimplesFromHeader(getUrlHunnoCont(), `apura/EmpresasContador`, count, page).subscribe((v: any) => {
        //             this.lista = v.value;
        //             this.jaPesquisou = true
        //         })
        //     }
        // }).add(() => this.dadosDefault.exibirLoader.next(false))
    }

    public trocarEmpresa(v) {
        console.log(v)
        this.dadosDefault.exibirLoader.next(true)
        this.$primeiraEtapaSubscribe = this.networkService.salvarPost(getUrlToken(), `selected`, {client_id: v.id}).subscribe((res: any) => { 
            console.log(res)           
            sessionStorage.setItem(TOKEN_STORAGE_KEY, res.token)
            // this.$segundaEtapaSubscribe = this.networkService.buscar('Empresa', v.Id, '', getUrlClient()).subscribe(emp => {               
            //     sessionStorage.setItem(EMPRESA_STORAGE_KEY, JSON.stringify(this.lista.find(x => x['Id'] === v.Id)))
            //     sessionStorage.setItem(EMPRESA_COMPLETA_STORAGE_KEY, JSON.stringify(emp))
            //     window.location.reload()
            // })
        }).add(this.dadosDefault.exibirLoader.next(false))
    }

    filtrar(count, page){
        this.http.get(`https://api.toqweb.com.br:2004/hunnocont/maxus/apura/EmpresasContador?Texto=${this.filtro}`, {headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        }, responseType: 'blob', observe: 'response'}).pipe().subscribe({
            next: (response: any) => {
                this.totalItens = response.headers.get('count')
                this.networkService.getSimplesFromHeader(getUrlClient(), `apura/EmpresasContador?Texto=${this.filtro}`, count, page).subscribe((v: any) => {
                    this.lista = v.value;
                    this.jaPesquisou = true
                })
            }
        })
    }

    lazyLoad(event): void {
        if (!this.jaPesquisou) return
        this.loading = true
        if (this.lista) {
            if (this.top !== event.rows && event.rows !== undefined) {
                this.top = event.rows
                event.first = 0
            }
            this.carregarDados(this.top, event.first)
            this.loading = false
        }
    }

}
