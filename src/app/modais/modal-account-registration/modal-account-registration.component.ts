import { getUrlPro } from 'src/app/controller/staticValues';
import { getUrlCad } from './../../controller/staticValues';
import { Component, Input, OnInit, Output, ViewChild, EventEmitter } from '@angular/core';
import { BaseFormPost } from "../../controller/BaseFormPost";
import { FormBuilder, FormGroup } from "@angular/forms";
import { NetworkService } from "../../services/network.service";
import { DadosDefaultService } from "../../services/dados-default.service";
import { ActivatedRoute, Router } from "@angular/router";
import { MessageService } from "primeng/api";
import { Formulario } from "../../controller/Formulario";
import { Util } from "../../controller/Util";
import { ProStatementItem } from 'src/app/model/pro-statement-item.model';
import { timestamp } from 'rxjs/operators';
import { ProAccount } from 'src/app/model/pro-account.model';

@Component({
    selector: 'app-modal-account-registration',
    templateUrl: './modal-account-registration.component.html',
    styleUrls: ['./modal-account-registration.component.css']
})
export class ModalAccountRegistrationComponent extends BaseFormPost implements OnInit {

    entidade = 'Cadastro de Conta'
    // entObj = new LancamentoCaixaVO()
    id;
    form: FormGroup;    
    @Input() hash;    
    @Output() closeModal = new EventEmitter()
    selectbank = []
    selectCategory = []
    selectTypePro = [
        {label: 'Conta Corrente', value: 1},
        {label: 'Poupança', value: 2},
        {label: 'Aplicação', value: 3},
        {label: 'Garantida', value: 4},
        {label: 'Cartão de Crédito', value: 5},
        {label: 'Crediario', value: 6},
        {label: 'Empréstimo', value: 7},
        {label: 'Carteira Virtual', value: 8},
        {label: 'Mutuo', value: 9},
        {label: 'Caixa Interno', value: 10},
    ]
    
    constructor(public networkService: NetworkService, public dadosDefault: DadosDefaultService, public router: Router, private route: ActivatedRoute, private fb: FormBuilder, public messageService: MessageService) {
        super(networkService, dadosDefault, router, 'Account', messageService);
        this.form = Formulario.createForm(new ProAccount(), this.fb)        
        
        this.form.get('DateRegister').setValue(new Date());
        this.form.get('DateUpdate').setValue(new Date());
    }

    ngOnInit() {}

    ngOnChanges() {          
        this.dadosDefault.account().subscribe(value => {
            this.selectbank = value[0]
            this.selectCategory = value[1]            
        })
        
    }

    public processarFormulario(modal?) {

        const data = Object.assign({}, this.form.value)

        let value= {...Formulario.parseForm(new ProAccount(), data, ProAccount.referencias(), null, ProAccount.datas(), null, ProAccount.checkbox())};
        
        this.dadosDefault.exibirLoader.next(true)
        this.networkService.salvarPost(getUrlPro(), 'Account', value).subscribe(v => {
            this.messageService.add(Util.pushSuccessMsg("Salvo com Sucesso!"))
            this.fecharModal()
        }).add(this.dadosDefault.exibirLoader.next(false))
    }

  
    fecharModal() {
        this.dadosDefault.closeModal(this.hash)
        this.closeModal.emit(false)
        this.form.reset()
    }
    
}
