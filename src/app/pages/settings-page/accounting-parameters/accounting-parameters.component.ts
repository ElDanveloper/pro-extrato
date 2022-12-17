import { Department } from './../../../model/department.model';
import { Util, hasValue } from './../../../controller/Util';
import { Dimensions } from 'ngx-image-cropper';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { getCnpj, getEstados, getUrlCnpj, API_AUTH_HUNNO } from './../../../controller/staticValues';
import { ErroCep } from '@brunoc/ngx-viacep';
// import { Endereco } from '@brunoc/ngx-viacep';
import { NgxViacepService } from '@brunoc/ngx-viacep';
import { Formulario } from './../../../controller/Formulario';
import { FormBuilder } from '@angular/forms';
import { DadosDefaultService } from './../../../services/dados-default.service';
import { BaseFormPost } from './../../../controller/BaseFormPost';
import { FormGroup } from '@angular/forms';
import { NetworkService } from './../../../services/network.service';
import { MessageService } from 'primeng/api';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewChild } from "@angular/core";

import { Subscription } from "rxjs";

@Component({
    selector: 'app-accounting-parameters',
    templateUrl: './accounting-parameters.component.html',
    styleUrls: ['./accounting-parameters.component.css']
})

export class AccountingParametersComponent extends BaseFormPost implements OnInit {

    // @ViewChild('uploadImagem', {static: false}) uploadImagem

    form: FormGroup;

    // selectEstado = getEstados();
    // imageSize = {
    //     width: 0,
    //     height: 0,
    // };
    // croppedImage: any = '';
    // showCropper = false;
    // imageChangedEvent: any = '';

    $subscription3: Subscription;


    constructor(public router: Router, private route: ActivatedRoute, public messageService: MessageService, public networkService: NetworkService, public dadosDefault: DadosDefaultService,private fb: FormBuilder, private viaCep: NgxViacepService) {
        super(networkService, dadosDefault, router, 'departament', messageService);
        this.form = Formulario.createForm(new Department, this.fb);
    }

    ngOnInit() {

    }

    // para os dados dos selects
    takeParameters() {
        if(!this.form.get('Cnpj').value){
            this.messageService.add(Util.pushErrorMsg('Favor informar o CNPJ!'))
            return
        }
        const cnpj = this.form.get('Cnpj').value.toString().match(/\d/g);
        this.dadosDefault.exibirLoader.next(true);
        this.$subscription3 = this.networkService.getSimples(API_AUTH_HUNNO, 'ContactorParams').subscribe((v: any) => {

        }, e => {
            this.messageService.add(Util.pushErrorMsg(e))
        }).add(() => this.dadosDefault.exibirLoader.next(false))
    }

    processarFormulario() {
        let inv = false
        if (this.form.invalid) {
            Object.keys(this.form.controls).forEach(c => {
                if (this.form.get(c).invalid) {
                    this.messageService.add({ severity: 'error', summary: `O campo ${c} e obrigatorio` })
                    inv = true
                }
            })
            if (inv) return
        }

        const {Department, ...data} = Object.assign({}, this.form.value)

        let value: any = { ...Formulario.parseForm(new Department(), data, Department.referencias(), null, null, null, null) };

        this.dadosDefault.exibirLoader.next(true);
        this.$subscription3 = this.networkService.salvarPost(API_AUTH_HUNNO, 'ParamsAccounting', value).subscribe((v: any) => {
            // this.messageService.add(Util.pushSuccessMsg('Alteração salva!'))
            // this.router.navigate(['settings/accounting-parameters'])
        }).add(() => this.dadosDefault.exibirLoader.next(false))
    }

    cancelarLocal() {
        this.router.navigate(['/settings/accounting-parameters'])
    }
}
