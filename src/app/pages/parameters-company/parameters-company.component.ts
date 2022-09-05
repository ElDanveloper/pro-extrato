import { Formulario } from 'src/app/controller/Formulario';
import { DadosDefaultService } from 'src/app/services/dados-default.service';
import { NetworkService } from 'src/app/services/network.service';
import { BaseFormPost } from 'src/app/controller/BaseFormPost';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { SelectItem, MessageService } from 'primeng/api';
import { FormGroup } from '@angular/forms';
import { Component, OnDestroy, OnInit } from "@angular/core";
import { ProParameter } from '../../model/pro-parameter.model';

@Component({
    selector: 'app-parameters-company',
    templateUrl: './parameters-company.component.html',
    styleUrls: ['./parameters-company.component.css']
})

export class ParametersCompanyComponent extends BaseFormPost implements OnInit, OnDestroy {

    selectNatureza = []
    form: FormGroup;
    

    constructor(public networkService: NetworkService, public dadosDefault: DadosDefaultService, public router: Router, public messageService: MessageService,private fb: FormBuilder) {
        super(networkService, dadosDefault, router, 'ProParameter', messageService);     
        this.form = Formulario.createForm( new ProParameter(), this.fb);   
    }

    ngOnInit() {
        this.dadosDefault.parameter().subscribe(value => {
            const defaultValue = {label: '-', value: null}
            this.selectNatureza = value[0]
            this.selectNatureza.unshift(defaultValue)
        })

    }

    processarFormulario() {

    }



    ngOnDestroy() {
        super.ngOnDestroy()
    }    

}
