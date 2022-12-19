import { Department } from './../../../model/department.model';
import { Util } from './../../../controller/Util';
import { API_AUTH_HUNNO } from './../../../controller/staticValues';
import { Formulario } from './../../../controller/Formulario';
import { FormBuilder } from '@angular/forms';
import { DadosDefaultService } from './../../../services/dados-default.service';
import { BaseFormPost } from './../../../controller/BaseFormPost';
import { FormGroup } from '@angular/forms';
import { NetworkService } from './../../../services/network.service';
import { MessageService } from 'primeng/api';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from "@angular/core";
import { Subscription } from "rxjs";

@Component({
    selector: 'app-accounting-parameters',
    templateUrl: './accounting-parameters.component.html',
    styleUrls: ['./accounting-parameters.component.css']
})

export class AccountingParametersComponent extends BaseFormPost implements OnInit {

    form: FormGroup;
    $subscription3: Subscription;

    constructor(public router: Router, private route: ActivatedRoute, public messageService: MessageService, public networkService: NetworkService, public dadosDefault: DadosDefaultService,private fb: FormBuilder) {
        super(networkService, dadosDefault, router, 'departament', messageService);
        this.form = Formulario.createForm(new Department, this.fb);
    }

    ngOnInit() {

    }

    // para os dados dos selects
    takeParameters() {
        if(!this.form.get('Departament').value){
            this.messageService.add(Util.pushErrorMsg('Favor informar o Departamento!'))
            return
        }
        // const departament = this.form.get('Departament').value
        this.dadosDefault.exibirLoader.next(true);
        this.$subscription3 = this.networkService.getSimples(API_AUTH_HUNNO, 'ContactorParams').subscribe((v: any) => {
            this.form.get('DeparmentConciliateId').setValue(v.DeparmentConciliateId)
            this.form.get('DeparmentAccountingId').setValue(v.DeparmentAccountingId)
            this.form.get('DeparmentFiscalId').setValue(v.DeparmentFiscalId)
            this.form.get('DeparmentRhId').setValue(v.DeparmentRhId)
            this.form.get('DeparmentCorpoateId').setValue(v.DeparmentCorpoateId)
            this.form.get('DeparmentCommercialId').setValue(v.DeparmentCommercialId)
            this.form.get('DeparmentAdmId').setValue(v.DeparmentAdmId)
            this.form.get('DeparmentBPOId').setValue(v.DeparmentBPOId)
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

        let value: any = { ...Formulario.parseForm(new Department(), data, Department.referencias(), null, data, null, null) };

        this.dadosDefault.exibirLoader.next(true);
        this.$subscription3 = this.networkService.salvarPost(API_AUTH_HUNNO, 'ParamsAccounting', value).subscribe((v: any) => {
            this.messageService.add(Util.pushSuccessMsg('Alteração salva!'))
            this.router.navigate(['settings/accounting-parameters'])
        }).add(() => this.dadosDefault.exibirLoader.next(false))
    }

    cancelarLocal() {
        this.router.navigate(['/settings/accounting-parameters'])
    }
}
