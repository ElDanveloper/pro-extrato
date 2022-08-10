import { getUrlPro } from './../../../controller/staticValues';
import { Util } from './../../../controller/Util';
import { Subscription } from 'rxjs';
import { Pessoa } from './../../../model/pessoa.model';
import { PersonClient } from './../../../model/person-client.model';
import { Formulario } from '../../../controller/Formulario';
import { DadosDefaultService } from '../../../services/dados-default.service';
import { NetworkService } from '../../../services/network.service';
import { SituacaoPessoa } from '../../../model/situacao-pessoa.model';
import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {MessageService} from "primeng/api";
import { BaseFormPost } from 'src/app/controller/BaseFormPost';


@Component({
  selector: 'app-situation-person-registration',
  templateUrl: './situation-person-registration.component.html',
  styleUrls: ['./situation-person-registration.component.css']
})
export class SituationPersonRegistrationComponent extends BaseFormPost implements OnInit {

    entidade = 'Pessoa'
    entObj = new PersonClient()
    id;
    form: FormGroup;

    $subscription1: Subscription;
    $subscription2: Subscription;

    constructor(public networkService: NetworkService, public dadosDefault: DadosDefaultService, public router: Router, private route: ActivatedRoute, private fb: FormBuilder, public messageService: MessageService) {
        super(networkService, dadosDefault, router, 'Person', messageService);
        this.form = Formulario.createForm(this.entObj, this.fb)
        this.form.addControl("PessoaForm", Formulario.createForm(new Pessoa(), this.fb));
    }

    ngOnInit() {
        // this.route.paramMap.subscribe(params => {
        //     this.id = params.get('id')

        //     if (this.id) {
        //         this.dadosDefault.exibirLoader.next(true)
        //         this.networkService.buscar(this.entidade, this.id).subscribe(value => {
        //             const data = Formulario.prepareValueToForm(this.entObj, value)
        //             Object.keys(data).forEach(key => this.form.controls[key].setValue(data[key]))
        //         }).add(() => this.dadosDefault.exibirLoader.next(false))
        //     }
        // })
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

    const {PessoaForm, ...data } = this.form.getRawValue()
    let value = Formulario.parseForm(new PersonClient(), data, PersonClient.referencias(), null, null, null, null);

    value.PersonId = Formulario.parseForm(new Pessoa(), PessoaForm, Pessoa.referencias(), Pessoa.mascaras(), Pessoa.datas(), null, Pessoa.checkbox());
    
    this.networkService.exibirLoader.next(true);
    this.$subscription2 = this.networkService.salvarPost(getUrlPro(), 'person', value).subscribe((v: any) => {
        this.messageService.add(Util.pushSuccessMsg('Cadastro Realizado com Sucesso!'))
      this.cancelar()
    //   this.router.navigate(['/pessoas'])
    }).add(() => this.networkService.exibirLoader.next(false))
    }

    buscaCnpj() {    
        let cnpj = this.form.get('PessoaForm').get('CpfCnpj').value.toString().match(/\d/g);
        console.log(cnpj)
        if (cnpj === null || (cnpj.join('').length !== 11 && cnpj.join('').length !== 14)) {
          this.messageService.add(Util.pushErrorMsg('Cnpj Invalido'))
          return;
        }
        
        cnpj = cnpj.join('')
    
        this.buscarCnpjReceitaWs(cnpj)
        
      }
    
      buscarCnpjReceitaWs(cnpj) {    
        this.dadosDefault.exibirLoader.next(true)
        this.$subscription1 = this.dadosDefault.buscarCnpj(cnpj).subscribe((v: any) => {
          this.form.get('PessoaForm').get('Nome').setValue(v['nome']);
          this.form.get('PessoaForm').get('Fantasia').setValue(v['fantasia']);
          this.form.get('PessoaForm').get('Cep').setValue(v['cep']);
          this.form.get('PessoaForm').get('Logradouro').setValue(v['logradouro']);
          this.form.get('PessoaForm').get('Numero').setValue(v['numero']);
          this.form.get('PessoaForm').get('Complemento').setValue(v['complemento']);
          this.form.get('PessoaForm').get('Bairro').setValue(v['bairro']);
          this.form.get('PessoaForm').get('Cidade').setValue(v['municipio']);
          this.form.get('PessoaForm').get('Uf').setValue(v['uf'])
          this.form.get('PessoaForm').get('Celular').setValue(v['telefone'])
          this.form.get('PessoaForm').get('Email').setValue(v['email'])
          // this.verificaCepValido(true)
        }).add(() => this.dadosDefault.exibirLoader.next(false))

      }

}
