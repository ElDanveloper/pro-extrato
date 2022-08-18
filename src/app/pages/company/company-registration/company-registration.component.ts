import { Pessoa } from '../../../model/pessoa.model';
import { PessoaContractor } from '../../../model/pessoa-contractor.model';
import { ContractorClient } from '../../../model/contractor-client.model';
import { Util, hasValue } from '../../../controller/Util';
import { SERVERLESS_URL, getUrlClient, getUrlPro } from '../../../controller/staticValues';
import { Formulario } from '../../../controller/Formulario';
import { Company } from '../../../model/company.model';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Endereco, ErroCep, NgxViacepService } from '@brunoc/ngx-viacep';
import { MessageService, SelectItem } from 'primeng/api';
import { Subscription } from 'rxjs';
import { BaseFormPost } from 'src/app/controller/BaseFormPost';
import { getEstados } from 'src/app/controller/staticValues';
import { DadosDefaultService } from 'src/app/services/dados-default.service';
import { NetworkService } from 'src/app/services/network.service';
import { Dimensions, ImageCroppedEvent } from 'ngx-image-cropper';

@Component({
    selector: 'app-comapany-registration',
    templateUrl: './company-registration.component.html',
    styleUrls: ['./company-registration.component.css']
})

export class CompanyRegistrationComponent extends BaseFormPost implements OnInit, OnDestroy {

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

    entidade = 'empresas';
    id;
    form: FormGroup;
    selectEstado = getEstados();
    modalCepVisible = false;
    onLabel = 'Sim'
    offLabel = 'Não'

    empresas = []
    segmento = []
    responsavel = []

    constructor(public networkService: NetworkService, public dadosDefault: DadosDefaultService, private route: ActivatedRoute, private fb: FormBuilder, public router: Router, public messageService: MessageService, private viaCep: NgxViacepService) {
        super(networkService, dadosDefault, router, 'contractorclient', messageService);
        this.form = Formulario.createForm(new ContractorClient(), this.fb); this.form = Formulario.createForm(new ContractorClient(), this.fb);
        this.form.addControl("PessoaContractorForm", Formulario.createForm(new PessoaContractor(), this.fb));
        this.form.addControl("PessoaForm", Formulario.createForm(new Pessoa(), this.fb));
    }

    ngOnInit() {
        this.dadosDefault.empresa().subscribe(values => {
            const defaultValue = {label: '-', value: null}
            this.empresas = values[0]
            this.empresas.unshift(defaultValue)
            this.segmento = values[1]
            this.segmento.unshift(defaultValue)
            this.responsavel = values[2]      
            this.responsavel.unshift(defaultValue)      
          })

        this.$subscription5 = this.route.paramMap.subscribe(params => {
            this.id = params.get('id')
        })

        if (this.id) {
            this.dadosDefault.exibirLoader.next(true)
            this.$subscription2 = this.networkService.buscar('contractorclient', this.id, Util.expandedQuery(ContractorClient.expanded()) ).subscribe((value: any) => {

                const data = Formulario.prepareValueToForm(new ContractorClient(), value, null, null, ContractorClient.checkbox());
                Object.keys(data).forEach(key => this.form.controls[key].setValue(data[key]));

                if (value.PersonContractorId) {
                    const dataPessoaFisica = Formulario.prepareValueToForm(new PessoaContractor(), value.PersonContractorId, PessoaContractor.datas(), PessoaContractor.relacionamentos(), PessoaContractor.checkbox());
                    Object.keys(dataPessoaFisica).forEach(key => this.form.get('PessoaContractorForm').get(key).setValue(dataPessoaFisica[key]))
                }
                
                if (value.PersonContractorId.PessoaId) {                    
                    const dataPessoa = Formulario.prepareValueToForm(new Pessoa(), value.PersonContractorId.PessoaId, Pessoa.datas(), null, Pessoa.checkbox());
                    Object.keys(dataPessoa).forEach(key => this.form.get('PessoaForm').get(key).setValue(dataPessoa[key]))
                }

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

        let value = Formulario.parseForm(new ContractorClient(), data, ContractorClient.referencias(), null, ContractorClient.datas(), null, ContractorClient.checkbox());

        value.PersonContractorId = Formulario.parseForm(new PessoaContractor(), PessoaContractorForm, PessoaContractor.referencias(), null, PessoaContractor.datas(), null, PessoaContractor.checkbox());
        value.PersonContractorId.PessoaId = Formulario.parseForm(new Pessoa(), PessoaForm, Pessoa.referencias(), Pessoa.mascaras(), PessoaContractor.datas(), null, PessoaContractor.checkbox());

        this.networkService.exibirLoader.next(true);
        this.$subscription6 = this.networkService.atualizarPost(getUrlPro(), 'Company', value).subscribe((v: any) => {
            this.messageService.add(Util.pushSuccessMsgSemDelay('Atualização Realizada com Sucesso!'))
            this.router.navigate(['/company'])
        }).add(() => this.networkService.exibirLoader.next(false))
    }

    buscaCnpj(e) {
        if (e.type === 'keypress' && e.key !== 'Enter') return;

        let cnpj = this.form.get('PessoaForm').get('CpfCnpj').value.toString().match(/\d/g);

        if (cnpj === null || (cnpj.join('').length !== 11 && cnpj.join('').length !== 14)) {
            this.messageService.add(Util.pushErrorMsg('Cpf/Cnpj Invalido'))
            return;
        }
        cnpj = cnpj.join('')

        if (cnpj.length === 11) {
            this.$subscription7 = this.networkService.getSimples(getUrlClient(), `pessoa?$filter=cpfcnpj eq '${cnpj}'`).subscribe((v: any) => {
                this.form.get('PessoaForm').get('Tipo').setValue('F')
                const vApi = v.value
                if (vApi && vApi.length === 1) {
                    this.form.get('Nome').setValue(vApi[0].Nome)
                    this.form.get('Fantasia').setValue(vApi[0].Fantasia)
                    // this.form.get('PessoaForm').get('Id').setValue(vApi[0].Id)
                    this.form.get('Logradouro').setValue(vApi[0].Logradouro)
                    this.form.get('Complemento').setValue(vApi[0].Complemento)
                    this.form.get('Contato').setValue(vApi[0].Contato)
                    this.form.get('Email').setValue(vApi[0].Email)
                    this.form.get('Numero').setValue(vApi[0].Numero)
                    this.form.get('CodigoIbge').setValue(vApi[0].CodigoIbge)
                    // this.form.get('Fone1').setValue(vApi[0].Fone1)
                    // this.form.get('Fone2').setValue(vApi[0].Fone2)
                    this.form.get('Celular').setValue(vApi[0].Celular)
                    this.form.get('Bairro').setValue(vApi[0].Bairro)
                    this.form.get('Uf').setValue(vApi[0].Uf)
                    this.form.get('Cep').setValue(vApi[0].Cep)
                    this.form.get('Cidade').setValue(vApi[0].Cidade)
                    // this.form.get('IdCondPagamento').setValue(vApi[0].IdCondPagamento)
                    // this.form.get('PessoaForm').get('ContribuinteIcms').setValue(vApi[0].ContribuinteIcms)
                }
                return
            })
        }

        if (cnpj.length === 14) {
            this.$subscription8 = this.networkService.getSimples(getUrlClient(), `pessoa?$filter=cpfcnpj eq '${cnpj}'`).subscribe((v: any) => {
                this.form.get('PessoaForm').get('Tipo').setValue('J')
                const vApi = v.value
                if (vApi && vApi.length === 1) {
                    this.form.get('Nome').setValue(vApi[0].Nome)
                    this.form.get('Fantasia').setValue(vApi[0].Fantasia)
                    // this.form.get('PessoaForm').get('Id').setValue(vApi[0].Id)
                    this.form.get('Contato').setValue(vApi[0].Contato)
                    this.form.get('Complemento').setValue(vApi[0].Complemento)
                    this.form.get('Logradouro').setValue(vApi[0].Logradouro)
                    this.form.get('Celular').setValue(vApi[0].Celular)
                    this.form.get('Numero').setValue(vApi[0].Numero)
                    this.form.get('Uf').setValue(vApi[0].UF)
                    this.form.get('Bairro').setValue(vApi[0].Bairro)
                    this.form.get('CodigoIbge').setValue(vApi[0].CodigoIbge)
                    // this.form.get('Fone1').setValue(vApi[0].Fone1)
                    // this.form.get('Fone2').setValue(vApi[0].Fone2)
                    this.form.get('Email').setValue(vApi[0].Email)
                    this.form.get('Cep').setValue(vApi[0].Cep)
                    this.form.get('Cidade').setValue(vApi[0].Cidade)
                    // this.form.get('IdCondPagamento').setValue(vApi[0].IdCondPagamento)
                    // this.form.get('PessoaForm').get('ContribuinteIcms').setValue(vApi[0].ContribuinteIcms)
                } else if (cnpj.length === 14) {
                    this.buscarCnpjReceitaWs(cnpj)
                }
            })
        }
    }

    buscarCnpjReceitaWs(cnpj) {
        this.$subscription9 = this.dadosDefault.buscarCnpj(cnpj).subscribe((v: any) => {
            this.form.get('Nome').setValue(v['nome']);
            this.form.get('Fantasia').setValue(v['fantasia']);
            this.form.get('Cep').setValue(v['cep']);
            this.form.get('Logradouro').setValue(v['logradouro']);
            this.form.get('Numero').setValue(v['numero']);
            this.form.get('Complemento').setValue(v['complemento']);
            this.form.get('Bairro').setValue(v['bairro']);
            this.form.get('Cidade').setValue(v['municipio']);
            this.form.get('Uf').setValue(v['uf'])
            this.form.get('Celular').setValue(v['telefone'])
            this.form.get('Email').setValue(v['email'])
            this.verificaCepValido(true)
        })
    }

    verificaCepValido(event) {
        if (event === true || (event.key === 'Enter' || event.type === 'blur') && this.form.get('Cep').value !== null) {
            let cep = this.form.get('Cep').value.toString().match(/\d/g)
            if (cep === null) return
            cep = cep.join('');
            if (cep.length === 8) {
                this.viaCep.buscarPorCep(cep)
                    .then((endereco: Endereco) => {
                        if (event === true) {
                            this.form.get('CodigoIbge').setValue(endereco.ibge)
                            return
                        }
                        console.log(endereco);
                        this.form.get('Logradouro').setValue(endereco.logradouro);
                        this.form.get('Complemento').setValue(endereco.complemento);
                        this.form.get('Bairro').setValue(endereco.bairro);
                        this.form.get('Cidade').setValue(endereco.localidade);
                        this.form.get('Uf').setValue(endereco.uf)
                        this.form.get('CodigoIbge').setValue(endereco.ibge)
                    }).catch((error: ErroCep) => {
                        this.messageService.add({ severity: 'error', summary: 'Cep Nao Encontrado' })
                    })
            }
        }
    }

    cepPesquisado(value) {
        if (typeof value !== 'object') return;
        this.modalCepVisible = false;
        console.log(Object.assign({}, value))
        this.form.get('Cep').setValue(value['Cep']);
        this.form.get('Uf').setValue(value['Uf']);
        this.form.get('Cidade').setValue(value['Cidade']);
        this.form.get('Logradouro').setValue(value['Logradouro'])
        this.form.get('CodigoIbge').setValue(value['ibge'])
    }

    cancelarLocal() {
        this.router.navigate(['company'])
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

}