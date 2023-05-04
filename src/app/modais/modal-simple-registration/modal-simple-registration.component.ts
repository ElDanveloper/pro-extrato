import { ProMonthlyClose } from './../../model/pro-monthly-close.model';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { BaseFormPost } from "../../controller/BaseFormPost";
import { FormBuilder, FormGroup } from "@angular/forms";
import { NetworkService } from "../../services/network.service";
import { DadosDefaultService } from "../../services/dados-default.service";
import { ActivatedRoute, Router } from "@angular/router";
import { MessageService } from "primeng/api";
import { Formulario } from "../../controller/Formulario";
import { Util } from "../../controller/Util";
import { getUrlPro } from 'src/app/controller/staticValues';

@Component({
    selector: 'app-modal-simple-registration',
    templateUrl: './modal-simple-registration.component.html',
    styleUrls: ['./modal-simple-registration.component.css']
})
export class ModalSimpleRegistrationComponent extends BaseFormPost implements OnInit {

    entidade = 'Saldo Inicial'
    id;
    form: FormGroup;
    @Input() data;
    @Output() closeModal = new EventEmitter()
    selectNatureza = [];
    nature;

    constructor(public networkService: NetworkService, public dadosDefault: DadosDefaultService, public router: Router, private route: ActivatedRoute, private fb: FormBuilder, public messageService: MessageService) {
        super(networkService, dadosDefault, router, 'IncludeBalance', messageService);

        this.form = Formulario.createForm(new Nature(), this.fb)
        
    }

    ngOnInit() {
        this.dadosDefault.registrationNatureza().subscribe(value => {
            this.selectNatureza = value[0]
        })

    }

    public processarFormulario(modal?) {
        if(this.form.get('FinancialId').value === null) {
            this.messageService.add(Util.pushErrorMsg('Selecione uma Categoria Pai'))
            return
        }

        if(this.form.get('Description').value === '') {
            this.messageService.add(Util.pushErrorMsg('Informe a descrição, por favor.'))
            return
        }

        this.dadosDefault.exibirLoader.next(true)
        
        const value = Formulario.parseForm(new Nature(), Object.assign(this.form.value))

        this.networkService.salvarPost(getUrlPro(), 'InsertCategory2', value).subscribe(v => {
            this.messageService.add(Util.pushSuccessMsg('Categoria atualizado com sucesso!'))
            this.fecharModal()
        }).add(() => this.dadosDefault.exibirLoader.next(false))

    }

    fecharModal() {
        this.dadosDefault.closeModal(this.hash)
        this.form.reset()
    }

}

class Nature {
    Id: number = 0
    FinancialId: number = 0
    Description: string = ''
}
