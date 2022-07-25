import {Component, Input, OnInit} from '@angular/core';
import {BaseFormPost} from "../../controller/BaseFormPost";
import {FormBuilder, FormGroup} from "@angular/forms";
import {NetworkService} from "../../services/network.service";
import {DadosDefaultService} from "../../services/dados-default.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MessageService} from "primeng/api";
import {Formulario} from "../../controller/Formulario";
import {Util} from "../../controller/Util";

@Component({
  selector: 'app-modal-opening-balance',
  templateUrl: './modal-opening-balance.component.html',
  styleUrls: ['./modal-opening-balance.component.css']
})
export class ModalOpeningBalanceComponent extends BaseFormPost implements OnInit {

    entidade = 'Saldo Inicial'
    // entObj = new TransferenciaCaixaVO()
    id;
    form: FormGroup;
    @Input() data;
    selectContaCaixa = [];

    constructor(public networkService: NetworkService, public dadosDefault: DadosDefaultService, public router: Router, private route: ActivatedRoute, private fb: FormBuilder, public messageService: MessageService) {
        super(networkService, dadosDefault, router, '/lancamento-conta-caixa', messageService);

        // this.form = Formulario.createForm(this.entObj, this.fb, TransferenciaCaixaVO.validacoes())
        this.naoBuscar = true

        // this.form.get('Data').setValue(new Date());
    }

    ngOnInit() {
        this.dadosDefault.modalOpeningbalance().subscribe(v => {
            this.selectContaCaixa = v[0]
        })
    }

    public processarFormulario(modal?) {

        let inv = false
        if(this.form.invalid) {
            Object.keys(this.form.controls).forEach(c => {
                // if (this.form.get(c).invalid) {
                //     let v = LancamentoSimplesVO.validacoes().filter(x => x.campo === c)
                //     this.messageService.add(Util.pushErrorMsg(`O campo ${v.length && v[0].nome ? v[0].nome : c} e obrigatório`))
                //     inv = true
                // }
            })
            if (inv) return
        }

        // const value = Formulario.parseForm(this.entObj, Object.assign({}, {...this.form.value, IdCaixaOrigem: this.data}), null, null, TransferenciaCaixaVO.datas(), null, null)
        // this.save('fin/transferenciacaixa', value, true, getUrlFinanceiro())
    }

}
