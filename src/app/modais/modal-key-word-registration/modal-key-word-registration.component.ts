import { ProKeyWord } from './../../model/pro-key-word.model';
import { ProMonthlyClose } from './../../model/pro-monthly-close.model';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import {BaseFormPost} from "../../controller/BaseFormPost";
import {FormBuilder, FormGroup} from "@angular/forms";
import {NetworkService} from "../../services/network.service";
import {DadosDefaultService} from "../../services/dados-default.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MessageService} from "primeng/api";
import {Formulario} from "../../controller/Formulario";
import {Util} from "../../controller/Util";
import { getUrlPro } from 'src/app/controller/staticValues';

@Component({
  selector: 'app-modal-key-word-registration',
  templateUrl: './modal-key-word-registration.component.html',
  styleUrls: ['./modal-key-word-registration.component.css']
})
export class ModalKeyWordRegistrationComponent extends BaseFormPost implements OnInit {

    entidade = 'Cadastro da Palavra Chave'
    entObj = new ProKeyWord()
    id;
    form: FormGroup;
    @Input() hash = ''
    @Output() closeModal = new EventEmitter()
    selectCategory = [];

    constructor(public networkService: NetworkService, public dadosDefault: DadosDefaultService, public router: Router, private route: ActivatedRoute, private fb: FormBuilder, public messageService: MessageService) {
        super(networkService, dadosDefault, router, 'IncludeKeyWord', messageService);

        this.form = Formulario.createForm(this.entObj, this.fb)        
        
    }

    ngOnInit() {
        this.dadosDefault.pessoa().subscribe(v => {
            const defaultValue = {label: '-', value: null}
            this.selectCategory = v[0]
            this.selectCategory.unshift(defaultValue)
        })
    }

    public processarFormulario(modal?) {
        const value = Formulario.parseForm(this.entObj, Object.assign({}, this.form.value), ProKeyWord.referencias(), null, null, null, null, null)
        this.dadosDefault.exibirLoader.next(true)
        this.networkService.salvarPost(getUrlPro(), 'IncludeKeyWord', value).subscribe(v => {
            this.messageService.add(Util.pushSuccessMsg('Cadastrado com Sucesso!'))
            this.fecharModal()
        }).add(this.dadosDefault.exibirLoader.next(false))

    }

    fecharModal() {
        this.closeModal.emit(false)
        this.dadosDefault.closeModal(this.hash)
        this.form.reset()        
      }

}
