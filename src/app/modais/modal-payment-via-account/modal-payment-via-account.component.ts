import { getUrlCad } from './../../controller/staticValues';
import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {BaseFormPost} from "../../controller/BaseFormPost";
import {FormBuilder, FormGroup} from "@angular/forms";
import {NetworkService} from "../../services/network.service";
import {DadosDefaultService} from "../../services/dados-default.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MessageService} from "primeng/api";
import {Formulario} from "../../controller/Formulario";
import {Util} from "../../controller/Util";

@Component({
  selector: 'app-modal-payment-via-account',
  templateUrl: './modal-payment-via-account.component.html',
  styleUrls: ['./modal-payment-via-account.component.css']
})
export class ModalPaymentViaAccountComponent extends BaseFormPost implements OnInit {

    entidade = 'Pagamento Via Conta'
    // entObj = new LancamentoCaixaVO()
    id;
    form: FormGroup;
    @Input() data;
    selectNaturezaFinanceira = [];
    @ViewChild('data') public dataSelect
    livroCaixa: boolean = false

    vencimento = false
    natureza = false
    historico = false

    constructor(public networkService: NetworkService, public dadosDefault: DadosDefaultService, public router: Router, private route: ActivatedRoute, private fb: FormBuilder, public messageService: MessageService) {
        super(networkService, dadosDefault, router, '/lancamento-conta-caixa', messageService);

        // this.form = Formulario.createForm(this.entObj, this.fb, LancamentoSimplesVO.validacoes())
        this.naoBuscar = true

        // this.form.get('Data').setValue(new Date());
    }

    ngOnInit() {
        // this.dadosDefault.pagamentoViaConta().subscribe(v => {
        //     this.selectNaturezaFinanceira = v[0]
        // })
    }

    ngOnChanges(){
        const tipo = this.data.tipo === 'P' ? 'Pagamento' : 'Recebimento'
        this.entidade = this.data.conta + ' - ' + tipo
    }

    selecionouNatureza(e){                
        // this.form.get('IdNaturezaFin').setValue(e.Id)
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
        
        // this.livroCaixa = this.form.get('LivroCaixa').value        
        // const IdPessoa = Object.assign({}, this.form.get('IdPessoa').value).Id
        // const value = Formulario.parseForm(this.entObj, Object.assign({}, {...this.form.value, IdPessoa, IdCaixa: this.data.idConta}), null, null, LancamentoCaixaVO.datas(), null, LancamentoCaixaVO.checkbox())
        // // this.save(this.data.tipo === 'P' ? 'fin/saidacaixa' : 'fin/entradacaixa', value, false, getUrlFinanceiro())
        // this.dadosDefault.exibirLoader.next(true)
        // this.networkService.salvarPost(getUrlFinanceiro(), this.data.tipo === 'P' ? 'fin/saidacaixa' : 'fin/entradacaixa', value).subscribe(v => {
        //     this.messageService.add(Util.pushSuccessMsgSemDelay('Realizado com Sucesso!'))
        //     this.verifcarLivroCaixa(this.livroCaixa)
        //     if(!this.vencimento) this.form.get('Data').setValue(new Date())
        //     // this.dataSelect.focus()
        // }).add(() => this.dadosDefault.exibirLoader.next(false))
        
    }

    verifcarLivroCaixa(livro){
           // if(livro){
            // this.form.get('IdPessoa').setValue(null)
            // this.form.get('Documento').setValue('')
            // if(!this.natureza) this.form.get('IdNaturezaFin').setValue(null)
            // if(!this.historico) this.form.get('Historico').setValue('')
            // if(!livro) this.form.get('Valor').setValue('0,00') 
        // } else {
            
        // }
    }

    pessoaSelecionada(e: any) {            
        if(e === null || e.IdNatureza === 0 || e.IdNatureza === null) return        
        this.dadosDefault.exibirLoader.next(true)
        this.networkService.getSimples(getUrlCad(), `NaturezaFinanceira(${e.IdNatureza})`).subscribe(v => {
            // this.form.get('IdNaturezaFin').setValue(v)
            this.selecionouNatureza(v)
        }).add(() => this.dadosDefault.exibirLoader.next(false))        
    }
}
