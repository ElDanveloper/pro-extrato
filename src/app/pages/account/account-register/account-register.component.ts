import { DatePipe } from './../../../pipes/date.pipe';
import { Util } from 'src/app/controller/Util';
import { getUrlPro } from './../../../controller/staticValues';
import { BaseFormPost } from './../../../controller/BaseFormPost';
import { ProAccount } from './../../../model/pro-account.model';
import { Formulario } from './../../../controller/Formulario';
import { FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DadosDefaultService } from './../../../services/dados-default.service';
import { NetworkService } from './../../../services/network.service';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';

@Component({
    selector: 'app-account-register',
    templateUrl: './account-register.component.html',
    styleUrls: ['./account-register.component.css']
})

export class AccountRegisterComponent extends BaseFormPost implements OnInit, OnDestroy {
   
    $subscription1: Subscription
    $subscription2: Subscription
    $subscription3: Subscription

    form: FormGroup;

    id;

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

    constructor(public networkService: NetworkService, public dadosDefault: DadosDefaultService, private route: ActivatedRoute, private fb: FormBuilder, public router: Router, public messageService: MessageService) {
        super(networkService, dadosDefault, router, 'Account', messageService); 
        this.form = Formulario.createForm(new ProAccount(), this.fb); this.form = Formulario.createForm(new ProAccount(), this.fb);       
    }

    ngOnInit() {
        this.dadosDefault.account().subscribe(values => {
            this.selectbank = values[0]
            this.selectCategory = values[1]
        })
        this.$subscription1 = this.route.paramMap.subscribe(params => {
            this.id = params.get('id')
        })

        if (this.id) {
            this.dadosDefault.exibirLoader.next(true)
            this.$subscription2 = this.networkService.buscar('ProAccount', this.id, Util.expandedQuery(ProAccount.expanded())).subscribe((value: any) => {

                const data = Formulario.prepareValueToForm(new ProAccount(), value, ProAccount.datas(), ProAccount.relacionamentos(), ProAccount.checkbox());
                Object.keys(data).forEach(key => this.form.controls[key].setValue(data[key]));
                
            }).add(() => this.dadosDefault.exibirLoader.next(false))

            
        }
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

        const { PessoaForm, PessoaContractorForm, ...data } = this.form.getRawValue()

        let value = Formulario.parseForm(new ProAccount(), data, ProAccount.referencias(), null, ProAccount.datas(), null, ProAccount.checkbox());

        this.dadosDefault.exibirLoader.next(true);
        this.$subscription3 = this.networkService.salvarPost(getUrlPro(), 'Account', value).subscribe((v: any) => {
            this.router.navigate(['/account'])
        }).add(() => this.dadosDefault.exibirLoader.next(false))
    }
    
    cancelarLocal() {
        this.router.navigate(['account'])
    }

    ngOnDestroy() {
        super.ngOnDestroy()
        if (this.$subscription1) this.$subscription1.unsubscribe()
        if (this.$subscription2) this.$subscription2.unsubscribe()
        if (this.$subscription3) this.$subscription3.unsubscribe()      
    }

}