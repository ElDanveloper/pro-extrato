import { Formulario } from 'src/app/controller/Formulario';
import { ProParameter } from './../../../model/pro-parameter.model';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { DadosDefaultService } from './../../../services/dados-default.service';
import { NetworkService } from './../../../services/network.service';
import { SelectItem, MessageService } from 'primeng/api';
import { FormGroup } from '@angular/forms';
import { BaseFormPost } from './../../../controller/BaseFormPost';
import { Component, OnDestroy, OnInit } from "@angular/core";

@Component({
    selector: 'app-parameters',
    templateUrl: './parameters.component.html',
    styleUrls: ['./parameters.component.css']
})

export class ParametersComponent extends BaseFormPost implements OnInit, OnDestroy {

    selectNatureza = []
    form: FormGroup;
    

    constructor(public networkService: NetworkService, public dadosDefault: DadosDefaultService, public router: Router, public messageService: MessageService,private fb: FormBuilder) {
        super(networkService, dadosDefault, router, 'ProParameter', messageService);     
        this.form = Formulario.createForm(new ProParameter(), this.fb);   
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
