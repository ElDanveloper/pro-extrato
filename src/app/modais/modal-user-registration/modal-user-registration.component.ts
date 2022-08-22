import { Pessoa } from './../../model/pessoa.model';
import { Formulario } from './../../controller/Formulario';
import { Contractor } from './../../model/contractor.model';
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
   
    @Input() modalVisible = false;
    @Output() closeModal = new EventEmitter()
    @Input() hash = ''
        
    //novos
    form: FormGroup;
    selectType = [
        {label: 'Usuário Empresa', value: 'E'},
        {label: 'Usuário Contabilidade', value: 'C'},
    ]

    primeiraEtapa = true

    constructor(public http: HttpClient, public networkService: NetworkService, public dadosDefault: DadosDefaultService, public router: Router, private route: ActivatedRoute, private fb: FormBuilder, public messageService: MessageService, private authService: AuthService) {
        super(networkService, dadosDefault, router, 'InsertUser', messageService)
        this.form = Formulario.createForm(new Pessoa(), this.fb);
        
    }

    ngOnInit() {
        
    }


    processarFormulario(){}

    cancelarLocal() {        
        this.closeModal.emit(false)
        this.form.reset()
        this.dadosDefault.closeModal(this.hash)
        this.primeiraEtapa = true
      }

}