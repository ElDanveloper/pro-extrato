import { ProKeyWord } from './../../../model/pro-key-word.model';
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
    selector: 'app-key-word-registration',
    templateUrl: './key-word-registration.component.html',
    styleUrls: ['./key-word-registration.component.css']
})

export class KeyWordRegistrationComponent extends BaseFormPost implements OnInit, OnDestroy {
   
    $subscription1: Subscription
    $subscription2: Subscription
    
    form: FormGroup;

    id;

    selectCategory = []

    constructor(public networkService: NetworkService, public dadosDefault: DadosDefaultService, private route: ActivatedRoute, private fb: FormBuilder, public router: Router, public messageService: MessageService) {
        super(networkService, dadosDefault, router, 'ProKeyWord', messageService); 
        this.form = Formulario.createForm(new ProKeyWord(), this.fb);
    }

    ngOnInit() {    
        this.dadosDefault.pessoa().subscribe(value => {
            const defaultValue = {label: '-', value: null}
            this.selectCategory = value[0]
            this.selectCategory.unshift(defaultValue)
        })    
        this.$subscription1 = this.route.paramMap.subscribe(params => {
            this.id = params.get('id')
        })

        if (this.id) {
            this.dadosDefault.exibirLoader.next(true)
            this.$subscription1 = this.networkService.buscar('ProKeyWord', this.id, Util.expandedQuery(ProKeyWord.expanded())).subscribe((value: any) => {
                const data = Formulario.prepareValueToForm(new ProKeyWord(), value, null, ProKeyWord.relacionamentos(), null);
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

        const data = this.form.getRawValue()

        let value = Formulario.parseForm(new ProKeyWord(), data, ProKeyWord.referencias(), null, null, null, null);

        this.dadosDefault.exibirLoader.next(true);
        this.$subscription2 = this.networkService.salvarPost(getUrlPro(), 'IncludeKeyWord', value).subscribe((v: any) => {
            this.messageService.add(Util.pushSuccessMsg('Atualizado com Sucesso!'))
            this.router.navigate(['key-word'])
        }).add(() => this.dadosDefault.exibirLoader.next(false))
    }
    
    cancelarLocal() {
        this.router.navigate(['key-word'])
    }

    ngOnDestroy() {
        super.ngOnDestroy()
        if (this.$subscription1) this.$subscription1.unsubscribe()
        if (this.$subscription2) this.$subscription2.unsubscribe()
 
    }

}