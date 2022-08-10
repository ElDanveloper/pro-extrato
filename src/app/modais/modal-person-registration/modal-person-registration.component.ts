import { Pessoa } from './../../model/pessoa.model';
import { PersonClient } from './../../model/person-client.model';
import { Company } from './../../model/company.model';
import { Formulario } from './../../controller/Formulario';
import { Util } from './../../controller/Util';
import { getUrlClient, getUrlCnpj, getUrlPro } from './../../controller/staticValues';
import { AuthService } from './../../auth/service/auth.service';
import { BaseFormPost } from './../../controller/BaseFormPost';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { NetworkService } from "../../services/network.service";
import { DadosDefaultService } from "../../services/dados-default.service";
import { ActivatedRoute, Router } from "@angular/router";
import { MessageService } from "primeng/api";
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { TOKEN_STORAGE_KEY, EMPRESA_COMPLETA_STORAGE_KEY, qtdLinhas, opcoesLinhas, EMPRESA_STORAGE_KEY } from '../../controller/staticValues'

@Component({
  selector: 'app-modal-person-registration',
  templateUrl: './modal-person-registration.component.html',
  styleUrls: ['./modal-person-registration.component.css']
})
export class ModalPersonRegistrationComponent extends BaseFormPost implements OnInit {

  @Input() modalVisible = false
  @Output() dadosSalvos = new EventEmitter()
  @Output() closeModal = new EventEmitter()
  form: FormGroup

  $subscription1: Subscription;
  $subscription2: Subscription;
  $subscription3: Subscription;
  $subscription4: Subscription;

  primeiraEtapa = true
  categoria = []

  exibirLoader = this.dadosDefault.exibirLoader
  exibirLoaderNetwork = this.networkService.exibirLoader

  constructor(public http: HttpClient, public networkService: NetworkService, public dadosDefault: DadosDefaultService, public router: Router, private route: ActivatedRoute, private fb: FormBuilder, public messageService: MessageService, private authService: AuthService) {
    super(networkService, dadosDefault, router, 'person', messageService)
    this.form = Formulario.createForm(new PersonClient(), this.fb);
    this.form.addControl("PessoaForm", Formulario.createForm(new Pessoa(), this.fb));
    // this.form.addControl("NaturezaForm", Formulario.createForm(new NaturezaFinanceira(), this.fb));
  }

  ngOnInit() {

  }

  ngOnChanges() {
    if (this.modalVisible) {
      this.dadosDefault.pessoa().subscribe(values => {
        this.categoria = values[0]
      })      
    }    
  }

  buscaCnpj() {    
    let cnpj = this.form.get('PessoaForm').get('CpfCnpj').value.toString().match(/\d/g);
    
    if (cnpj === null || (cnpj.join('').length !== 11 && cnpj.join('').length !== 14)) {
      this.messageService.add(Util.pushErrorMsg('Cnpj Invalido'))
      return;
    }
    
    cnpj = cnpj.join('')

    this.buscarCnpjReceitaWs(cnpj)

    //   if (cnpj.length === 11) {
    //     this.$subscription1 = this.networkService.getSimples(getUrlCnpj(), `pessoa?$filter=cpfcnpj eq '${cnpj}'`).subscribe((v: any) => {
    //       // this.form.get('PessoaForm').get('Tipo').setValue('F')
    //       const vApi = v.value
    //       if (vApi && vApi.length === 1) {
    //         this.form.get('Nome').setValue(vApi[0].Nome)
    //         this.form.get('Fantasia').setValue(vApi[0].Fantasia)
    //         // this.form.get('PessoaForm').get('Id').setValue(vApi[0].Id)
    //         this.form.get('Logradouro').setValue(vApi[0].Logradouro)
    //         this.form.get('Complemento').setValue(vApi[0].Complemento)
    //         this.form.get('Contato').setValue(vApi[0].Contato)
    //         this.form.get('Email').setValue(vApi[0].Email)
    //         this.form.get('Numero').setValue(vApi[0].Numero)
    //         this.form.get('CodigoIbge').setValue(vApi[0].CodigoIbge)
    //         // this.form.get('Fone1').setValue(vApi[0].Fone1)
    //         // this.form.get('Fone2').setValue(vApi[0].Fone2)
    //         this.form.get('Celular').setValue(vApi[0].Celular)
    //         this.form.get('Bairro').setValue(vApi[0].Bairro)
    //         this.form.get('Uf').setValue(vApi[0].Uf)
    //         this.form.get('Cep').setValue(vApi[0].Cep)
    //         this.form.get('Cidade').setValue(vApi[0].Cidade)
    //         // this.form.get('IdCondPagamento').setValue(vApi[0].IdCondPagamento)
    //         // this.form.get('PessoaForm').get('ContribuinteIcms').setValue(vApi[0].ContribuinteIcms)
    //       }
    //       return
    //     })
    //   }

    //   if (cnpj.length === 14) {
    //     this.$subscription2 = this.networkService.getSimples(getUrlCnpj(), `pessoa?$filter=cpfcnpj eq '${cnpj}'`).subscribe((v: any) => {
    //       // this.form.get('PessoaForm').get('Tipo').setValue('J')
    //       const vApi = v.value
    //       if (vApi && vApi.length === 1) {
    //         this.form.get('Nome').setValue(vApi[0].Nome)
    //         this.form.get('Fantasia').setValue(vApi[0].Fantasia)
    //         // this.form.get('PessoaForm').get('Id').setValue(vApi[0].Id)
    //         this.form.get('Contato').setValue(vApi[0].Contato)
    //         // this.form.get('Complemento').setValue(vApi[0].Complemento)
    //         // this.form.get('Logradouro').setValue(vApi[0].Logradouro)
    //         this.form.get('Celular').setValue(vApi[0].Celular)
    //         // this.form.get('Numero').setValue(vApi[0].Numero)
    //         // this.form.get('Uf').setValue(vApi[0].UF)
    //         // this.form.get('Bairro').setValue(vApi[0].Bairro)
    //         // this.form.get('CodigoIbge').setValue(vApi[0].CodigoIbge)
    //         // this.form.get('Fone1').setValue(vApi[0].Fone1)
    //         // this.form.get('Fone2').setValue(vApi[0].Fone2)
    //         this.form.get('Email').setValue(vApi[0].Email)
    //         // this.form.get('Cep').setValue(vApi[0].Cep)
    //         // this.form.get('Cidade').setValue(vApi[0].Cidade)
    //         // this.form.get('IdCondPagamento').setValue(vApi[0].IdCondPagamento)
    //         // this.form.get('PessoaForm').get('ContribuinteIcms').setValue(vApi[0].ContribuinteIcms)
    //       } else if (cnpj.length === 14) {
    //         this.buscarCnpjReceitaWs(cnpj)
    //       }
    //     })
    //   }
  }

  buscarCnpjReceitaWs(cnpj) {    
    this.dadosDefault.exibirLoader.next(true)
    this.$subscription3 = this.dadosDefault.buscarCnpj(cnpj).subscribe((v: any) => {
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
    this.primeiraEtapa = false
  }

  avancar() {
    this.buscaCnpj()
    // this.primeiraEtapa = false

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

  //   const nfe = {
  //     ...Formulario.parseForm(new NfeCabecalho(), {
  //         ...cab, IdPessoa: this.form.get("IdClienteForm").value.Nome.Id,
  //         CpfCnpj: this.form.get("IdClienteForm").value.Nome.CpfCnpj,
  //     }, NfeCabecalho.referencias(), null, NfeCabecalho.datas(), null, NfeCabecalho.checkbox()),
  //     "$id": 1,
  // };

    // value.NatureFinancialId = Formulario.parseForm(new NaturezaFinanceira(), NaturezaForm, NaturezaFinanceira.referencias(), null, null, null, NaturezaFinanceira.checkbox());
    value.PersonId = Formulario.parseForm(new Pessoa(), PessoaForm, Pessoa.referencias(), Pessoa.mascaras(), Pessoa.datas(), null, Pessoa.checkbox());

    // value.Cnpj = value.Cnpj.join('')

    // value.PessoaId.CpfCnpj = value.PessoaId.CpfCnpj.toString().replace(/[^\d]+/g, '')
    // this.form.get('Cnpj').value.toString().replace(/[^\d]+/g,'')
    this.networkService.exibirLoader.next(true);
    this.$subscription4 = this.networkService.salvarPost(getUrlPro(), 'person', value).subscribe((v: any) => {
      this.fecharModal()
      // this.router.navigate(['/pessoas'])
    }).add(() => this.networkService.exibirLoader.next(false))
  }

  fecharModal() {
    this.closeModal.emit(false)
    this.form.reset()
    this.primeiraEtapa = true
  }

}
