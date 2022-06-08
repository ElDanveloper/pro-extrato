import { NaturezaFinanceira } from './../../model/natureza-financeira.model';
import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {NetworkService} from "../../services/network.service";
import {DadosDefaultService} from "../../services/dados-default.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MessageService} from "primeng/api";
import {Formulario} from "../../controller/Formulario";
import {Util} from "../../controller/Util";

import {getUrlCad} from "../../controller/staticValues";
import {Subscription} from "rxjs";
import {BaseFormPost} from "../../controller/BaseFormPost";

@Component({
  selector: 'app-modal-natureza-financeira',
  templateUrl: './modal-natureza-financeira.component.html',
  styleUrls: ['./modal-natureza-financeira.component.css']
})
export class ModalNaturezaFinanceiraComponent extends BaseFormPost implements OnInit, OnDestroy {

    entidade = 'naturezafinanceira'
    title = 'Natureza Financeira'
    labelModal = 'Natureza Financeira'
    entObj = new NaturezaFinanceira()
    @Input() id;
    @Input() idPai;
    @Output() closeModal = new EventEmitter();
    form: FormGroup;

    onLabel = 'Sim'
    offLabel = 'Nao'

    selectNatureza = []
    selectContaContabil = []
    selectCentroCustos = []
    selectTipoDocumentos = []
    selectProjeto = []
    selectMeioPagamento = [];

    $subscriptionBuscar: Subscription;
    $subscriptionClassificacao: Subscription;

    constructor(public networkService: NetworkService, public dadosDefault: DadosDefaultService, public router: Router, private route: ActivatedRoute, private fb: FormBuilder, public messageService: MessageService) {
        super(networkService, dadosDefault, router, 'naturezafinanceira', messageService);

        this.form = Formulario.createForm(this.entObj, this.fb)
    }

    ngOnInit() {
        this.dadosDefault.modalNaturezaFinanceira().subscribe(values => {
            this.selectCentroCustos = values[0]
            this.selectContaContabil = values[1]
            this.selectNatureza = values[2]
            this.selectTipoDocumentos = values[3]
            this.selectProjeto = values[4]
            this.selectMeioPagamento = values[5]
        })

            if (this.id) {
                this.$subscriptionBuscar = this.networkService.buscar(this.entidade, this.id, Util.expandedQuery(NaturezaFinanceira.expanded())).subscribe(value => {
                    const data = Formulario.prepareValueToForm(this.entObj, value, null, NaturezaFinanceira.relacionamentos(), NaturezaFinanceira.checkbox())
                    Object.keys(data).forEach(key => this.form.controls[key].setValue(data[key]))
                })
            } else {
                this.$subscriptionClassificacao = this.networkService.getSimples(getUrlCad(), `contas/classificacaoNatureza?IdNatureza=${this.idPai}`).subscribe((v: any) => {
                    this.form.get('Classificacao').setValue(v.value)
                })
            }
    }

    processarFormulario() {
        this.save('contas/naturezaFinanceira', Formulario.parseForm(this.entObj, Object.assign({}, this.form.value), NaturezaFinanceira.referencias(), null, null, null, NaturezaFinanceira.checkbox()), true)
    }

    changeSelect(value) {
        switch (value.type) {
            case 'centroresultado':
                this.selectCentroCustos.push(Util.valueToSelect(value.payload))
                this.form.get('IdCentroResultado').setValue(value.payload.Id)
                break
            case 'planocontas':
                /* this.selectPlanoConta.push(Util.valueToSelect(value.payload))
                   this.form.get('IdPlanoConta').setValue(value.payload.Id) */
                break
            case 'naturezafinanceira':
                this.selectNatureza.push(Util.valueToSelect(value.payload))
                this.form.get('IdNaturezaPai').setValue(value.payload.Id)
                break
            case 'projeto':
                this.selectProjeto.push(Util.valueToSelect(value.payload))
                this.form.get('IdProjeto').setValue(value.payload.Id)
                break
        }

    }

    ngOnDestroy() {
     super.ngOnDestroy()
        if(this.$subscriptionBuscar) this.$subscriptionBuscar.unsubscribe()
        if(this.$subscriptionClassificacao) this.$subscriptionClassificacao.unsubscribe()
    }

    gerarClassificacao() {
        const id = this.id ? this.id : this.idPai
        this.networkService.getSimples(getUrlCad(), `contas/classificacaoNatureza?IdNatureza=${id}`).subscribe((v: any) => {
            this.form.get('Classificacao').setValue(v.value)
        })
    }

    cancelarLocal() {
        this.closeModal.emit()
        this.cancelar();
    }

    salvarLocal() {
        this.closeModal.emit()
        this.cancelar();
    }

}
