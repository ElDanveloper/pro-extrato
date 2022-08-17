import { BaseFormPost } from 'src/app/controller/BaseFormPost';
import { getUrlPro } from './../../../controller/staticValues';
import { Util } from 'src/app/controller/Util';
import { FinancialCategory } from './../../../model/financial-category.model';
import { DadosDefaultService } from './../../../services/dados-default.service';
import { NetworkService } from './../../../services/network.service';
import { getEstados } from 'src/app/controller/staticValues';
import { Formulario } from './../../../controller/Formulario';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxViacepService } from '@brunoc/ngx-viacep';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-natureza-financeira-cadastro',
    templateUrl: './natureza-financeira-cadastro.component.html',
    styleUrls: ['./natureza-financeira-cadastro.component.css']
})

export class NaturezaFinanceiraCadastroComponent extends BaseFormPost implements OnInit, OnDestroy {

    $subscription1: Subscription;
    $subscription2: Subscription;
    $subscription3: Subscription;
    $subscription4: Subscription;
    $subscription5: Subscription;
    $subscription6: Subscription;
    $subscription7: Subscription;
    $subscription8: Subscription;
    $subscription9: Subscription;
    $subscription10: Subscription;
    $subscription11: Subscription;
    $subscription12: Subscription;

    entidade = 'financialCategory';
    id;
    form: FormGroup;
    selectEstado = getEstados();
    modalCepVisible = false;
    onLabel = 'Sim'
    offLabel = 'Não'

    idNatureza = undefined;
    classificacao = undefined

    selectGrupoNatureza = []
    selectListaNatureza = []
    selectSpecie = []

    selectSpecieFlow = [
        {label: 'Saida', value: 'S'},
        {label: 'Entrada', value: 'E'}
    ]

    selectLevel = [
        {label: '1', value: 1},
        {label: '2', value: 2},
        {label: '3', value: 3},

    ]

    constructor(public networkService: NetworkService, public dadosDefault: DadosDefaultService, private route: ActivatedRoute, private fb: FormBuilder, public router: Router, public messageService: MessageService, private viaCep: NgxViacepService) {
        super(networkService, dadosDefault, router, 'financialCategory', messageService);
        this.form = Formulario.createForm(new FinancialCategory(), this.fb);        
        // this.form.addControl("PessoaContractorForm", Formulario.createForm(new PessoaContractor(), this.fb));
        // this.form.addControl("PessoaForm", Formulario.createForm(new Pessoa(), this.fb));
    }

    ngOnInit() {
        this.dadosDefault.modalNaturezaFinanceira().subscribe(values => {
            this.selectGrupoNatureza = values[0]
            this.selectListaNatureza = values[1]      
            this.selectSpecie = values[4]
          })

        this.$subscription5 = this.route.paramMap.subscribe(params => {
            this.id = params.get('id')
        })

        if (this.id) {
            this.dadosDefault.exibirLoader.next(true)
            this.$subscription2 = this.networkService.buscar('financialCategory', this.id, Util.expandedQuery(FinancialCategory.expanded()) ).subscribe((value: any) => {                
                const data = Formulario.prepareValueToForm(new FinancialCategory(), value, null, FinancialCategory.relacionamentos(), null);                
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

        let value = Formulario.parseForm(new FinancialCategory(), data, FinancialCategory.referencias(), null, null, null, FinancialCategory.checkbox());

        this.networkService.exibirLoader.next(true);
        this.$subscription6 = this.networkService.salvarPost(getUrlPro(), 'InsertCategory', value).subscribe((v: any) => {
            this.messageService.add(Util.pushSuccessMsg('Atualização feita com sucesso!'))
            this.router.navigate(['natureza-financeira'])
        }).add(() => this.networkService.exibirLoader.next(false))
    }

    cancelarLocal() {        
        this.router.navigate(['natureza-financeira'])
    }

    ngOnDestroy() {
        super.ngOnDestroy()
        if (this.$subscription1) this.$subscription1.unsubscribe()
        if (this.$subscription2) this.$subscription2.unsubscribe()
        if (this.$subscription3) this.$subscription3.unsubscribe()
        if (this.$subscription4) this.$subscription4.unsubscribe()
        if (this.$subscription5) this.$subscription5.unsubscribe()
        if (this.$subscription6) this.$subscription6.unsubscribe()
        if (this.$subscription7) this.$subscription7.unsubscribe()
        if (this.$subscription8) this.$subscription8.unsubscribe()
        if (this.$subscription9) this.$subscription9.unsubscribe()
        if (this.$subscription10) this.$subscription10.unsubscribe()
        if (this.$subscription11) this.$subscription11.unsubscribe()
        if (this.$subscription12) this.$subscription12.unsubscribe()
    }

    gerarClassificacao() {
        let id = this.idNatureza;
        if (id === undefined) {
            id = this.classificacao.Id;
        }
        this.dadosDefault.exibirLoader.next(true)
        this.networkService.getSimples(getUrlPro(), `GenerateClassificateCategory?CategoryId=${id}`).subscribe((v: any) => {
            this.form.get('Classificate').setValue(v.value)
        }).add(this.dadosDefault.exibirLoader.next(false))
    }

}