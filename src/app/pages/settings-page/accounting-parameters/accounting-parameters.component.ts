import { SelectItem } from 'primeng/api';
import { Department } from './../../../model/department.model';
import { Util } from './../../../controller/Util';
import { API_AUTH_HUNNO, getUrlPro } from './../../../controller/staticValues';
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

    public selectDepartament: SelectItem[] = []
    // [
    //     {label: 'Administrativo', value: 'A'},
    //     {label: 'Contabil', value: 'C'},
    //     {label: 'Fiscal', value: 'F'},
    //     {label: 'Pessoal', value: 'P'},
    //     {label: 'Marketing', value: 'M'},
    //     {label: 'Societario', value: 'S'},
    //     {label: 'ProExtrato', value: 'X'},
    //     {label: 'Consultoria Financeira', value: 'N'},

    // ]

    constructor(public router: Router, private route: ActivatedRoute, public messageService: MessageService, public networkService: NetworkService, public dadosDefault: DadosDefaultService, private fb: FormBuilder) {
        super(networkService, dadosDefault, router, 'ParamsAccounting', messageService);
        this.form = Formulario.createForm(new ParamsAccounting, this.fb);
        // this.form.addControl("Department", Formulario.createForm(new ParamsAccounting(), this.fb));

    }

    ngOnInit() {
        this.dadosDefault.typeDepartment().subscribe(value => {
            this.selectDepartament = value[0]
        })
        this.takeParameters()
    }

    // para os dados dos selects
    takeParameters() {
        // const departament = this.form.get('Departament').value
        this.dadosDefault.exibirLoader.next(true);
        this.$subscription3 = this.networkService.getSimples(getUrlPro(), 'ContractorParams').subscribe((v: any) => {
            const data = Formulario.prepareValueToForm(new ParamsAccounting(), v.value[0], ParamsAccounting.datas(), null, null);
            Object.keys(data).forEach(key => this.form.controls[key].setValue(data[key]));
        }, e => {
            this.messageService.add(Util.pushErrorMsg(e))
        }).add(() => this.dadosDefault.exibirLoader.next(false))
    }

    // ESSA FUNÇÃO NN ESTÁ SENDO EXECUTADA QUANDO É CLICADO O BOTÃO
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

        const { Department, ...data } = Object.assign({}, this.form.value)

        let value: any = { ...Formulario.parseForm(new Department(), data, Department.referencias(), null, null, null, null) };

        console.log(value)

        this.dadosDefault.exibirLoader.next(true);
        this.$subscription3 = this.networkService.salvarPost(API_AUTH_HUNNO, 'ParamsAccounting', value).subscribe((v: any) => {
            this.messageService.add(Util.pushSuccessMsg('Alteração salva!'))
            this.router.navigate(['settings/accounting-parameters'])
            console.log('----------------')
            console.log(v.value[0])
        }).add(() => this.dadosDefault.exibirLoader.next(false))
    }

    cancelarLocal() {
        this.router.navigate(['/settings/accounting-parameters'])
    }
}

class ParamsAccounting {
    Id: number = 0
    ContractorId: number = 0
    DateLastZap: any = ''
    DateLastEmailDoc: any = ''
    DeparmentAccountingId: number = 0
    DeparmentCorpoateId: number = 0
    DeparmentConciliateId: number = 0
    DeparmentCommercialId: number = 0
    DeparmentRhId: number = 0
    DeparmentFiscalId: number = 0
    DeparmentAdmId: number = 0
    DeparmentBPOId: number = 0

    static datas() {
        return ['DateLastZap', 'DateLastEmailDoc']
    }

}
