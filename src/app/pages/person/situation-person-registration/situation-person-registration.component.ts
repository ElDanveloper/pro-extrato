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

    entidade = 'situacaopessoa'
    entObj = new SituacaoPessoa()
    id;
    form: FormGroup;

    constructor(public networkService: NetworkService, public dadosDefault: DadosDefaultService, public router: Router, private route: ActivatedRoute, private fb: FormBuilder, public messageService: MessageService) {
        super(networkService, dadosDefault, router, 'situacaopessoa', messageService);

        this.form = Formulario.createForm(this.entObj, this.fb)
    }

    ngOnInit() {
        this.route.paramMap.subscribe(params => {
            this.id = params.get('id')

            if (this.id) {
                this.dadosDefault.exibirLoader.next(true)
                this.networkService.buscar(this.entidade, this.id).subscribe(value => {
                    const data = Formulario.prepareValueToForm(this.entObj, value)
                    Object.keys(data).forEach(key => this.form.controls[key].setValue(data[key]))
                }).add(() => this.dadosDefault.exibirLoader.next(false))
            }
        })
    }

    processarFormulario() {
        this.save(SituacaoPessoa.salveUrl(), Formulario.parseForm(this.entObj, Object.assign({}, this.form.value)))
    }

}
