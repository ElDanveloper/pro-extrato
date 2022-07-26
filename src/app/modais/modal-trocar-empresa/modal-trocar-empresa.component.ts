import { Util } from './../../controller/Util';
import { getUrlClient, getUrlPro, getUrlToken } from './../../controller/staticValues';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

import { FormBuilder, FormGroup } from "@angular/forms";
import { NetworkService } from "../../services/network.service";
import { DadosDefaultService } from "../../services/dados-default.service";
import { ActivatedRoute, Router } from "@angular/router";
import { MessageService } from "primeng/api";
import { HttpResponse, HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { TOKEN_STORAGE_KEY, EMPRESA_COMPLETA_STORAGE_KEY, qtdLinhas, opcoesLinhas, EMPRESA_STORAGE_KEY } from '../../controller/staticValues'
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
    @Output() closeModal = new EventEmitter()
    lista;
    totalItens
    count = opcoesLinhas()
    qtdLinhas = qtdLinhas()
    page = 0
    public top: number = qtdLinhas()
    filtro = '';
    jaPesquisou = false
    public loading: boolean

    $buscarTokenSelectSubscribe: Subscription;
    $segundaEtapaSubscribe: Subscription;
    $listarEmpresaSubscribe: Subscription;

    constructor(public http: HttpClient, public networkService: NetworkService, public dadosDefault: DadosDefaultService, public router: Router, private route: ActivatedRoute, private fb: FormBuilder, public messageService: MessageService, private authService: AuthService) {
        super(networkService, dadosDefault, router, '', messageService)
    }

    ngOnInit() {
        this.carregarDados(this.count, this.page)
    }

    carregarDados(count, page) {
        this.dadosDefault.exibirLoader.next(true)
        this.$listarEmpresaSubscribe = this.authService.segundaAuthenticacao().subscribe((res: any) => {
            this.lista = res
            this.totalItens = res.length
        }).add(() => this.dadosDefault.exibirLoader.next(false))
    }

    public trocarEmpresa(v) {
        let client_id = this.lista.find(x => x['id'] === v.id)
        sessionStorage.setItem(EMPRESA_STORAGE_KEY, JSON.stringify(client_id))
        // sessionStorage.removeItem(TOKEN_TEMP_STORAGE_KEY)
        this.$buscarTokenSelectSubscribe = this.authService.selectAuthenticacao({ client_id: client_id.id }).subscribe(res => {
            sessionStorage.setItem(TOKEN_STORAGE_KEY, res["token"])
            this.fecharModal()
            this.router.navigate(['/home'], { replaceUrl: true })
        })
        
    }

    fecharModal() {
        this.closeModal.emit()
        this.dadosDefault.closeModal(this.data)
        this.lista = []
    }

    get empresas() {

        return this.lista.filter(v => {
            if (v.nome === null) {
                v.nome = ''
            }
            if (v.concat === null) {
                v.concat = ''
            }
            if (v.cpf_cnpj === null) {
                v.cpf_cnpj = ''
            }
            return v.nome.toLowerCase().includes(this.filtro.toLowerCase()) || v.concat.toLowerCase().includes(this.filtro.toLowerCase()) || v.cpf_cnpj.toString().includes(this.filtro)
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
