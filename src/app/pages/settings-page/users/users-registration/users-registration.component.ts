import { PessoaContractor } from './../../../../model/pessoa-contractor.model';
import { Pessoa } from './../../../../model/pessoa.model';
import { getUrlPro } from './../../../../controller/staticValues';
import { Contractor } from './../../../../model/contractor.model';
import { Users } from './../../../../model/users.model';
import { Formulario } from '../../../../controller/Formulario';
import { autoCompleteDelayTime, getUrlCad, SERVERLESS_URL } from '../../../../controller/staticValues';
import { hasValue, Util } from '../../../../controller/Util';
import { DadosDefaultService } from '../../../../services/dados-default.service';
import { NetworkService } from '../../../../services/network.service';
import { getEstados } from '../../../../controller/staticValues';
import { BaseFormPost } from '../../../../controller/BaseFormPost';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MessageService, SelectItem } from "primeng/api";
import { ActivatedRoute, Router } from "@angular/router";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Endereco, ErroCep, NgxViacepService } from "@brunoc/ngx-viacep";
import { Subscription } from "rxjs";
import { Dimensions, ImageCroppedEvent } from "ngx-image-cropper";
import { Company } from '../../../../model/company.model';

@Component({
    selector: 'app-users-registration',
    templateUrl: './users-registration.component.html',
    styleUrls: ['./users-registration.component.css']
})

export class UsersRegistrationComponent extends BaseFormPost implements OnInit, OnDestroy {

    $subscription1: Subscription;
    $subscription2: Subscription;
    $subscription3: Subscription;

    entidade = 'Usuário';
    id;
    form: FormGroup;

    selectType = [
        { label: 'Usuário Empresa', value: 'E' },
        { label: 'Usuário Contabilidade', value: 'C' },
      ]
      selectPerfil = [
        { label: 'Analista', value: 'A' },
        { label: 'Supervisor', value: 'S' },
        { label: 'Gerente', value: 'G' },
        { label: 'Diretor', value: 'D' },
      ]

      typeAccounting = 'E'  

    constructor(public networkService: NetworkService, public dadosDefault: DadosDefaultService, private route: ActivatedRoute, private fb: FormBuilder, public router: Router, public messageService: MessageService,
        private viaCep: NgxViacepService) {
        super(networkService, dadosDefault, router, 'Users', messageService);
        this.form = Formulario.createForm(new Users(), this.fb);
        this.form.addControl("PessoaForm", Formulario.createForm(new Pessoa(), this.fb));
    }



    ngOnInit() {
        this.$subscription2 = this.route.paramMap.subscribe(params => {
            this.id = params.get('id')
        })

        if (this.id) {
            this.dadosDefault.exibirLoader.next(true)
            this.$subscription1 = this.networkService.buscar('Users', this.id, Util.expandedQuery(Users.expanded())).subscribe((value: any) => {                
                const data = Formulario.prepareValueToForm(new Users(), value, null, Users.relacionamentos(), Users.checkbox());
                Object.keys(data).forEach(key => this.form.controls[key].setValue(data[key]));

                const dataPessoa = Formulario.prepareValueToForm(new Pessoa(), value.PersonId, Pessoa.datas(), Pessoa.relacionamentos(), Pessoa.checkbox());
                Object.keys(dataPessoa).forEach(key => this.form.get('PessoaForm').get(key).setValue(dataPessoa[key]))

            }).add(() => this.dadosDefault.exibirLoader.next(false))
        } else {
            this.form.get('DataCadastro').setValue(new Date())
        }


    }

    selectedType(event){
        this.typeAccounting = event
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

        const data = Object.assign({}, this.form.value)

        let value: any = { ...Formulario.parseForm(new Users(), data, Users.referencias(), null, null, null, Contractor.checkbox()) };

        this.dadosDefault.exibirLoader.next(true);
        this.$subscription3 = this.networkService.salvarPost(getUrlPro(), 'user', value).subscribe((v: any) => {
            this.messageService.add(Util.pushSuccessMsg('Usuário alterado com Sucesso!'))
            this.router.navigate(['settings/users-list'])
        }).add(() => this.networkService.exibirLoader.next(false))

    }



    cancelarLocal() {
        this.router.navigate(['/settings/users-list'])
    }

    ngOnDestroy() {
        super.ngOnDestroy()
        if (this.$subscription1) this.$subscription1.unsubscribe()
        if (this.$subscription2) this.$subscription2.unsubscribe()
        if (this.$subscription3) this.$subscription3.unsubscribe()
    }

}
