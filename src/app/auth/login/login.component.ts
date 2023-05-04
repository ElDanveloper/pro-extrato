import { EMPRESA_STORAGE_KEY } from 'src/app/controller/staticValues';
import { DadosDefaultService } from 'src/app/services/dados-default.service';
import { Util } from './../../controller/Util';
import { MessageService } from 'primeng/api';
import { Router, ActivatedRoute } from '@angular/router';
import { TOKEN_TEMP_STORAGE_KEY, USUARIO_STORAGE_KEY, TOKEN_STORAGE_KEY } from './../../controller/staticValues';
import { AuthService } from './../service/auth.service';
import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  public form: FormGroup
  private loginUser = {}
  modalEmpresa = false;

  $primeiraEtapaSubscription: Subscription;
  $segundaEtapaSubscription: Subscription;
  $terceiraEtapaSubscription: Subscription;
  $listarEmpresaSubscribe: Subscription;
  $buscarTokenSelectSubscribe: Subscription;

  lista = []
  totalItens = 0

  constructor(private route: ActivatedRoute, private authService: AuthService, private fb: FormBuilder, private router: Router, private messageService: MessageService, private dadosDefaultService: DadosDefaultService) {
    this.form = fb.group({
      email: ['', Validators.compose([Validators.required])],
      password: ['', Validators.compose([Validators.required])],
    })
  }

  ngOnInit(): void {

  }

  logarUsuario() {
    this.primeiraEtapa()
  }

  primeiraEtapa() {
    sessionStorage.clear()
    this.loginUser = { email: this.form.controls['email'].value, password: this.form.controls['password'].value }
    this.$primeiraEtapaSubscription = this.authService.primeiraAuthenticacao(this.loginUser).subscribe((res1: any) => {
      sessionStorage.setItem(TOKEN_TEMP_STORAGE_KEY, res1.token);
      sessionStorage.setItem(USUARIO_STORAGE_KEY, res1);
      console.log('Rest ---> ' + res1.type_user)
      if (res1.type_user === 'E') {
        this.UserCompany(res1.id)
      } else {
        this.modalEmpresa = true;
      }
    })
    if (!this.$primeiraEtapaSubscription) {
      Util.pushErrorMsg('Login ou Senha Incorreta!')
      return
    }
  }

  //Caso seja usuario com acesso só o ambiente empresa
  UserCompany(idClient) {

    this.dadosDefaultService.exibirLoader.next(true)
    this.$listarEmpresaSubscribe = this.authService.secondAuthenticationForEnterprise(idClient).subscribe((res: any) => {
      this.lista = res
      this.totalItens = res.length
      localStorage.setItem('counter', 'false')
      //se tiver só uma empresa na autorização do usuario, vai direto para o sistema, caso contrario passar para selecionar a lista de empresa
      if (res.length === 1) {
        this.onlyCompany(this.lista[0])
      }else{
        this.router.navigate(['selecao-empresa/1']);
      }
    }).add(() => this.dadosDefaultService.exibirLoader.next(false))

  }
  //usuario com autorização de uma unica empresa
  onlyCompany(v) {
    console.log('Objeto ---> ' + JSON.stringify(v))
    let client_id = this.lista.find(x => x['id'] === v.id)
    console.log('Cliente_id ---> ' + JSON.stringify(client_id))
    sessionStorage.setItem(EMPRESA_STORAGE_KEY, JSON.stringify(client_id))    

    let body = { client_id: client_id.id }
        
    this.dadosDefaultService.exibirLoader.next(true)
    this.$buscarTokenSelectSubscribe = this.authService.selectAuthenticacao(body).subscribe(res => {
      console.log('Token ----> ' + res["token"])
      sessionStorage.setItem(TOKEN_STORAGE_KEY, res["token"])
      setTimeout(() => {
        this.router.navigate(['/dashboard-company'], { replaceUrl: true })      
      },500)
      
    }).add(() => this.dadosDefaultService.exibirLoader.next(false))
  }

  ngOnDestroy(): void {
    if (this.$primeiraEtapaSubscription) this.$primeiraEtapaSubscription.unsubscribe()
    if (this.$segundaEtapaSubscription) this.$segundaEtapaSubscription.unsubscribe()
    if (this.$terceiraEtapaSubscription) this.$terceiraEtapaSubscription.unsubscribe()
    if (this.$listarEmpresaSubscribe) this.$listarEmpresaSubscribe.unsubscribe()
    if (this.$buscarTokenSelectSubscribe) this.$buscarTokenSelectSubscribe.unsubscribe()
  }

}