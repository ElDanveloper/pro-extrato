import { getUrlClient } from '../../controller/staticValues';
import { AuthService } from '../../auth/service/auth.service';
import { BaseFormPost } from '../../controller/BaseFormPost';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {NetworkService} from "../../services/network.service";
import {DadosDefaultService} from "../../services/dados-default.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MessageService} from "primeng/api";
import { HttpResponse, HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { TOKEN_STORAGE_KEY, EMPRESA_COMPLETA_STORAGE_KEY, qtdLinhas, opcoesLinhas, EMPRESA_STORAGE_KEY} from '../../controller/staticValues'

@Component({
  selector: 'app-modal-user-registration',
  templateUrl: './modal-user-registration.component.html',
  styleUrls: ['./modal-user-registration.component.css']
})
export class ModalUserRegistrationComponent extends BaseFormPost implements OnInit {

    entidade = 'Usuário'
    @Input() data;
    @Input() modalVisible = false;
    @Output() closeModal = new EventEmitter()
    @Input() hash = ''
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
    //novos
    form: FormGroup;


    primeiraEtapa = true

    constructor(public http: HttpClient, public networkService: NetworkService, public dadosDefault: DadosDefaultService, public router: Router, private route: ActivatedRoute, private fb: FormBuilder, public messageService: MessageService, private authService: AuthService) {
        super(networkService, dadosDefault, router, '', messageService)
        // this.form = Formulario.createForm(new PessoaContractor(), this.fb);
        // this.form.addControl("PessoaFisicaForm", Formulario.createForm(new PersonFisical(), this.fb));
        // this.form.addControl("PessoaForm", Formulario.createForm(new Pessoa(), this.fb));

        // this.form.get('PessoaForm').get('Tipo').setValue('F');
        // this.form.get('Ativo').setValue(true)
        // this.form.get('Cliente').setValue(true)
        // this.form.get('CodContaContabil').setValue(1)
    }

    ngOnInit() {
        
    }

    carregarDados(count, page){
        this.dadosDefault.exibirLoader.next(true)
        this.$listarEmpresaSubscribe = this.authService.segundaAuthenticacao().subscribe((res: any) => {                
            this.lista = res
            this.totalItens = res.length
        }).add(() => this.dadosDefault.exibirLoader.next(false))      
    }

    public trocarEmpresa(v) {
        this.$primeiraEtapaSubscribe = this.networkService.getSimples(getUrlClient(), `acesso/ChangeToken?IdEmpresa=${v.Id}`).subscribe((res: any) => {
            console.log(res.value);
            sessionStorage.setItem(TOKEN_STORAGE_KEY, res.value)
            this.$segundaEtapaSubscribe = this.networkService.buscar('Empresa', v.Id, '', getUrlClient()).subscribe(emp => {               
                sessionStorage.setItem(EMPRESA_STORAGE_KEY, JSON.stringify(this.lista.find(x => x['Id'] === v.Id)))
                sessionStorage.setItem(EMPRESA_COMPLETA_STORAGE_KEY, JSON.stringify(emp))
                window.location.reload()
            })
        })
    }

    processarFormulario(){}

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

    cancelarLocal() {        
        this.closeModal.emit(false)
        // this.form.reset()
        this.dadosDefault.closeModal(this.hash)
        this.primeiraEtapa = true
      }

}
