import { Util } from 'src/app/controller/Util';
import { getUrlPro } from 'src/app/controller/staticValues';
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

        let value: any = {...Formulario.parseForm(new ProParameter(), this.form.value, ProParameter.referencias(), null, ProParameter.datas(), null, null)};

        this.dadosDefault.exibirLoader.next(true)
        this.networkService.salvarPost(getUrlPro(), 'Parameter', value).subscribe(v => {
            this.messageService.add(Util.pushSuccessMsg('Configurações salvas com sucesso!'))
            this.router.navigate(['home'])
        }).add(this.dadosDefault.exibirLoader.next(false))        

    }

    cancelarLocal() {
        this.router.navigate(['home'])
    }

    ngOnDestroy() {
        super.ngOnDestroy()
    }    

}
