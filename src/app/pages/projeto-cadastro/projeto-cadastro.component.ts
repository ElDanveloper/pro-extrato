import { Formulario } from './../../controller/Formulario';
import { DadosDefaultService } from 'src/app/services/dados-default.service';
import { NetworkService } from './../../services/network.service';
import { Projeto } from './../../model/projeto.model';
import { BaseFormPost } from './../../controller/BaseFormPost';
import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup} from "@angular/forms";
import {MessageService} from "primeng/api";
import {Subscription} from "rxjs";

@Component({
    selector: 'app-projeto-cadastro',
    templateUrl: './projeto-cadastro.component.html',
    styleUrls: ['./projeto-cadastro.component.css']
})
export class ProjetoCadastroComponent extends BaseFormPost implements OnInit, OnDestroy {

    entidade = 'projeto'
    entObj = new Projeto()
    id;
    form: FormGroup;
    onLabel = 'Sim'
    offLabel = 'Não'

    $subscriptionRoute: Subscription;
    $subscriptionBuscar: Subscription;

    constructor(public networkService: NetworkService, public dadosDefault: DadosDefaultService, public router: Router, private route: ActivatedRoute, private fb: FormBuilder, public messageService: MessageService) {
        super(networkService, dadosDefault, router, 'projeto', messageService);
        this.urlCadastro = 'auxiliares/projeto'
        this.form = Formulario.createForm(this.entObj, this.fb)
    }

    ngOnInit() {
        this.$subscriptionRoute = this.route.paramMap.subscribe(params => {
            this.id = params.get('id')

            if (this.id) {
                this.dadosDefault.exibirLoader.next(true)
                this.$subscriptionBuscar = this.networkService.buscar(this.entidade, this.id).subscribe(value => {
                    const data = Formulario.prepareValueToForm(this.entObj, value, null, null, Projeto.checkbox())
                    Object.keys(data).forEach(key => this.form.controls[key].setValue(data[key]))
                }).add(() => this.dadosDefault.exibirLoader.next(false))
            }
        })
    }

    public processarFormulario(modal?) {
        this.save(this.entidade, Formulario.parseForm(this.entObj, Object.assign({}, this.form.value), null, null, null, null, Projeto.checkbox()), modal)
    }

    ngOnDestroy() {
        super.ngOnDestroy();
        if(this.$subscriptionRoute) this.$subscriptionRoute.unsubscribe()
        if(this.$subscriptionBuscar) this.$subscriptionBuscar.unsubscribe()
    }

}
