import { URL_BANCO_STORAGE_KEY, VERSAO_SISTEMA, URL_API_STORAGE_KEY, EMPRESA_STORAGE_KEY, TOKEN_STORAGE_KEY, EMPRESA_COMPLETA_STORAGE_KEY, API_AUTH, PERMISSOES, qtdLinhas, opcoesLinhas } from './../../controller/staticValues';
import { DadosDefaultService } from './../../services/dados-default.service';
import { NetworkService } from './../../services/network.service';
import { MessageService } from 'primeng/api';
import { Router, ActivatedRoute } from '@angular/router';
import { TOKEN_TEMP_STORAGE_KEY, USUARIO_STORAGE_KEY } from '../../controller/staticValues';
import { AuthService } from '../service/auth.service';
import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-selecao-empresa',
  templateUrl: './selecao-empresa.component.html',
  styleUrls: ['./selecao-empresa.component.scss']
})
export class SelecaoEmpresaComponent implements OnInit, OnDestroy {

  public first: number = 0
    public top: number = qtdLinhas()
    qtdLinhas = qtdLinhas();
    public totalItens: number
    public lista: any[] = []
    usuario;
    opcoesLinhas = opcoesLinhas()

    modalVisible = false

    opcoesTable = [
        {label: 'Mais Opcoes', icon: 'pi pi-check', command: (e) => {}},
    ]
    filtro = '';

    $listarEmpresaSubscribe: Subscription;
    $quartaEtapaSubscribe: Subscription;
    $buscarClienteSubscribe: Subscription;
    $buscarEmpresaSubscribe: Subscription;
    $buscarTokenSelectSubscribe: Subscription;

  constructor(public route: ActivatedRoute, private authService: AuthService, private networkService: NetworkService, private router: Router, private messageService: MessageService, private dadosDefaultService: DadosDefaultService) {

  }

  ngOnInit() {
    this.route.paramMap.subscribe((param: any) => {
        //this.usuario = JSON.parse(sessionStorage.getItem(USUARIO_STORAGE_KEY))
        if(Number(param.get('value')) === 1){
            this.dadosDefaultService.exibirLoader.next(true)
            this.$listarEmpresaSubscribe = this.authService.segundaAuthenticacao().subscribe((res: any) => {      
                this.lista = res
                this.totalItens = res.length
            }).add(() => this.dadosDefaultService.exibirLoader.next(false))
        }
        if(Number(param.get('value')) === 2){
            this.dadosDefaultService.exibirLoader.next(true)
            this.$listarEmpresaSubscribe = this.authService.terceiraAuthenticacao().subscribe((res: any) => {                                
                this.lista = res
                this.totalItens = res.length
            }).add(() => this.dadosDefaultService.exibirLoader.next(false))
        }
    })
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

    home(v){                 
        let contractor_id = this.lista.find(x => x['id'] === v.id)
        sessionStorage.setItem(EMPRESA_STORAGE_KEY, JSON.stringify(contractor_id))
        // sessionStorage.removeItem(TOKEN_TEMP_STORAGE_KEY)
        this.$buscarTokenSelectSubscribe = this.authService.selectAuthenticacao({contractor_id: contractor_id.id}).subscribe(res => {
            sessionStorage.setItem(TOKEN_STORAGE_KEY, res["token"])
        })
        this.router.navigate(['/home'], {replaceUrl: true})
    }

    quartaAuthenticacao(v) {
        this.$quartaEtapaSubscribe = this.authService.quartaAuthenticacao({Usuario: this.usuario, IdCli: v.ID}).subscribe(res => {
            sessionStorage.setItem(URL_BANCO_STORAGE_KEY, v['NOME_BANCO'])
            sessionStorage.setItem(VERSAO_SISTEMA,v['VERSAO_SISTEMA'])
            sessionStorage.setItem(URL_API_STORAGE_KEY, v['URI'])
            sessionStorage.setItem('time', new Date().toString())
            sessionStorage.setItem(EMPRESA_STORAGE_KEY, JSON.stringify(this.lista.find(x => x['ID'] === v.ID)))
            sessionStorage.setItem(TOKEN_STORAGE_KEY, res)
            sessionStorage.removeItem(TOKEN_TEMP_STORAGE_KEY)
            this.$buscarClienteSubscribe = this.networkService.buscar('cliente_toqsys',  JSON.parse(sessionStorage.getItem(EMPRESA_STORAGE_KEY)).ID, null, API_AUTH + '/security').subscribe(val => {
                this.$buscarEmpresaSubscribe = this.networkService.buscar('empresa',  JSON.parse(sessionStorage.getItem(EMPRESA_STORAGE_KEY)).ID_EMPRESA).subscribe((res: any) => {
                    sessionStorage.setItem(EMPRESA_COMPLETA_STORAGE_KEY, JSON.stringify(val))
                    this.networkService.salvarPost(
                        API_AUTH,
                        "/security/SecurityUserService/UsuarioAcesso/", 
                        {IdCli: JSON.parse(sessionStorage.getItem(EMPRESA_COMPLETA_STORAGE_KEY)).ID, 
                        IdUsr: JSON.parse(sessionStorage.getItem(USUARIO_STORAGE_KEY)).ID}).subscribe((e: string) => {
                            sessionStorage.setItem(PERMISSOES, e);
                            this.authService.usuarioLogado.next(true)
                            if(res.IndicadorSegmento === null || res.IndicadorSegmento === 0) {
                                this.router.navigate(['/indicadorsegmento'], {replaceUrl: true})
                                return
                            } else if(res.ParametroSegmento === null || res.ParametroSegmento < 1) {
                                this.router.navigate(['/parametrizarsegmento'], {replaceUrl: true})
                                return
                            } else {
                                this.router.navigate(['/home'], {replaceUrl: true})
                            }
                        })
                })
            })
        })
    }

    fecharModal() {
        this.modalVisible = false
    }

    ngOnDestroy() {
        if(this.$listarEmpresaSubscribe) this.$listarEmpresaSubscribe.unsubscribe()
        if(this.$quartaEtapaSubscribe) this.$quartaEtapaSubscribe.unsubscribe()
        if(this.$buscarClienteSubscribe) this.$buscarClienteSubscribe.unsubscribe()
        if(this.$buscarEmpresaSubscribe) this.$buscarEmpresaSubscribe.unsubscribe()
    }

}