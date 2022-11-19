import { ProMonthlyClose } from './../../model/pro-monthly-close.model';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import {BaseFormPost} from "../../controller/BaseFormPost";
import {FormBuilder, FormGroup} from "@angular/forms";
import {NetworkService} from "../../services/network.service";
import {DadosDefaultService} from "../../services/dados-default.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MessageService} from "primeng/api";
import {Formulario} from "../../controller/Formulario";
import {Util} from "../../controller/Util";
import { getUrlPro } from 'src/app/controller/staticValues';

@Component({
  selector: 'app-modal-opening-balance',
  templateUrl: './modal-opening-balance.component.html',
  styleUrls: ['./modal-opening-balance.component.css']
})
export class ModalOpeningBalanceComponent extends BaseFormPost implements OnInit {

    entidade = 'Saldo Inicial'
    entObj = new ProMonthlyClose()
    id;
    form: FormGroup;
    @Input() data;
    @Output() closeModal = new EventEmitter()
    selectContaCaixa = [];

    constructor(public networkService: NetworkService, public dadosDefault: DadosDefaultService, public router: Router, private route: ActivatedRoute, private fb: FormBuilder, public messageService: MessageService) {
        super(networkService, dadosDefault, router, 'IncludeBalance', messageService);

        this.form = Formulario.createForm(this.entObj, this.fb)        

        this.form.get('DateBalance').setValue(new Date());
        // this.form.get('AccountId').setValue(this.data.Id)
    }

    ngOnInit() {
        // this.dadosDefault.modalOpeningbalance().subscribe(v => {
        //     const defaultValue = {label: '-', value: null}
        //     this.selectContaCaixa = v[0]
        //     this.selectContaCaixa.unshift(defaultValue)
        // })
        
    }

    public processarFormulario(modal?) {
        if(this.form.get('Balance').value === '' || this.form.get('Balance').value === null) {
            this.messageService.add(Util.pushErrorMsg('Favor informar o valor a ser lançado.'))
            return
        }

        const value = Formulario.parseForm(this.entObj, Object.assign({}, this.form.value), ProMonthlyClose.referencias(), null, ProMonthlyClose.datas(), null, null, null)
        this.dadosDefault.exibirLoader.next(true)
        this.networkService.salvarPost(getUrlPro(), 'IncludeBalance', value).subscribe(v => {
            this.messageService.add(Util.pushSuccessMsg('Valor Lançado com Sucesso!'))
            this.fecharModal()
        }).add(this.dadosDefault.exibirLoader.next(false))

    }

    fecharModal() {
        this.dadosDefault.closeModal(this.hash)
        this.form.reset()        
      }

}
