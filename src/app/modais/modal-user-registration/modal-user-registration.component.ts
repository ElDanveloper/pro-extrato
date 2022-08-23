import { Util } from './../../controller/Util';
import { getUrlPro } from './../../controller/staticValues';
import { Pessoa } from './../../model/pessoa.model';
import { Formulario } from './../../controller/Formulario';
import { Contractor } from './../../model/contractor.model';
import { getUrlClient } from '../../controller/staticValues';
import { AuthService } from '../../auth/service/auth.service';
import { BaseFormPost } from '../../controller/BaseFormPost';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { NetworkService } from "../../services/network.service";
import { DadosDefaultService } from "../../services/dados-default.service";
import { ActivatedRoute, Router } from "@angular/router";
import { MessageService } from "primeng/api";
import { HttpResponse, HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { TOKEN_STORAGE_KEY, EMPRESA_COMPLETA_STORAGE_KEY, qtdLinhas, opcoesLinhas, EMPRESA_STORAGE_KEY } from '../../controller/staticValues'

@Component({
  selector: 'app-modal-user-registration',
  templateUrl: './modal-user-registration.component.html',
  styleUrls: ['./modal-user-registration.component.css']
})
export class ModalUserRegistrationComponent extends BaseFormPost implements OnInit {

  entidade = 'Usuário'

  @Input() modalVisible = false;
  @Output() closeModal = new EventEmitter()
  @Input() hash = ''

  //novos
  form: FormGroup;
  selectType = [
    { label: 'Usuário Empresa', value: 'E' },
    { label: 'Usuário Contabilidade', value: 'C' },
  ]
  selectPerfil = [
    { label: 'Analista', value: 'A' },
    { label: 'Supervisor', value: 'S' },
    { label: 'Gerente', value: 'G' },
    { label: 'Diretor', value: 'D' },
  ]

  typeAccounting = 'E'

  primeiraEtapa = true

  constructor(public http: HttpClient, public networkService: NetworkService, public dadosDefault: DadosDefaultService, public router: Router, private route: ActivatedRoute, private fb: FormBuilder, public messageService: MessageService, private authService: AuthService) {
    super(networkService, dadosDefault, router, 'InsertUser', messageService)
    this.form = Formulario.createForm(new Pessoa(), this.fb);
    this.form.addControl('aux', this.fb.group({
      TypeUser: '',
      Perfil: '',
      SimpleName: '',
    }))

  }

  ngOnInit() {

  }

  selectedType(event){
    this.typeAccounting = event
  }

  processarFormulario() {
    const aux = this.form.get('aux').value
    this.form.removeControl('aux')

    const data = Object.assign({}, this.form.value)

    let value: any = { ...Formulario.parseForm(new Pessoa(), data, Pessoa.referencias(), null, Pessoa.datas(), null, Pessoa.checkbox()) };

    const body = {
      value: value,
      TypeUser: aux.TypeUser,
      SimpleName: aux.SimpleName,
      Perfil: aux.Perfil
    }

    this.dadosDefault.exibirLoader.next(true)
    this.networkService.salvarPost(getUrlPro(), 'InsertUser', body).subscribe(v => {
      this.messageService.add(Util.pushSuccessMsg('Cadastro realizado com Sucesso!'))
      this.cancelarLocal()
    }).add(this.dadosDefault.exibirLoader.next(false))

  }

  cancelarLocal() {
    this.closeModal.emit(false)
    this.form.reset()
    this.dadosDefault.closeModal(this.hash)
    this.primeiraEtapa = true
  }

}