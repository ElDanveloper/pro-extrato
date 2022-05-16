import { Util } from './../../controller/Util';
import { MessageService } from 'primeng/api';
import { Router, ActivatedRoute } from '@angular/router';
import { TOKEN_TEMP_STORAGE_KEY, USUARIO_STORAGE_KEY } from './../../controller/staticValues';
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

  constructor(private route: ActivatedRoute, private authService: AuthService, private fb: FormBuilder, private router: Router, private messageService: MessageService) {
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
      this.modalEmpresa = true;
    })
    if(!this.$primeiraEtapaSubscription){
      Util.pushErrorMsg('Login ou Senha Incorreta!')
      return
    }
  }

  ngOnDestroy(): void {
    if (this.$primeiraEtapaSubscription) this.$primeiraEtapaSubscription.unsubscribe()
    if (this.$segundaEtapaSubscription) this.$segundaEtapaSubscription.unsubscribe()
    if (this.$terceiraEtapaSubscription) this.$terceiraEtapaSubscription.unsubscribe()
  }

}