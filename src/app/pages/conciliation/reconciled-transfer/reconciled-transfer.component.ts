import { getUrlPro } from './../../../controller/staticValues';
import { map } from 'rxjs/operators';
import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { NetworkService } from "../../../services/network.service";
import { Util } from "../../../controller/Util";
import { Router } from "@angular/router";
import { DadosDefaultService } from "../../../services/dados-default.service";
import { MessageService } from "primeng/api";
import { Subscription } from "rxjs";


@Component({
    selector: 'app-reconciled-transfer',
    templateUrl: './reconciled-transfer.component.html',
    styleUrls: ['./reconciled-transfer.component.css']
})
export class ReconciledTransferComponent implements OnInit, OnChanges, OnDestroy {

    @Input() data;
    @Input() dataPesquisa;
    @Input() type;
    @Input() optionsConta;
    @Input() optionsNaturezaFinanceira;
    @Output() recarregarDados = new EventEmitter<any>();
    form: FormGroup
    selectContaDestino = [];
    selectNaturezaFinanceira = [];
    modalConciliarContabil = false;
    modalConciliarParcela = false;
    dataConciliarContabil;
    dataConciliarParcela;

    $buscarPessoaSubscription: Subscription;
    $processarConciliacaoSubscription: Subscription;
    $conciliarParaUnicoSubscription: Subscription;
    $memorizarSubscription: Subscription;
    $buscarNaturezaSubscription: Subscription;
    index = 0;
    IdParcela = null


    acoes = [
        {
            label: 'Marcar Todos', icon: 'fa fa-arrow-circle-right', command: (e) => {

            }
        }, {
            label: 'Confirmar Selecionados', icon: 'fa fa-arrow-circle-right', command: (e) => {
            }
        }, {
            label: 'Ordernar por Data', icon: 'fa fa-arrow-circle-right', command: (e) => {

            }
        }, {
            label: 'Ordenar por Valor', icon: 'fa fa-arrow-circle-right', command: (e) => {

            }
        }, {
            label: 'Ordenar por Histórico', icon: 'fa fa-arrow-circle-right', command: (e) => {

            }
        },
    ];
    pessoa = null;
    naturezaFinanceira = null;

    constructor(private fb: FormBuilder, private networkService: NetworkService, private router: Router, private dadosDefault: DadosDefaultService, private messageService: MessageService) {
        this.form = fb.group({
            IdContaCaixaDestino: '',
            IdNatureza: '',
            IdNaturezaInput: '',
            Historico: '',
            IdPessoa: '',
            Documento: '',
            selecionar: '',
            memorizar: '',
            memorizarPessoa: '',
        })
    }

    get getData() {

        if (!this.data) return
        switch (this.type) {
            case 'extratoNaoConciliado':
                return this.data.DateMovement
            case 'contabilNaoConciliado':
            case 'contabilConciliado':
                return this.data.Data
        }

    }

    get getValor() {
        return this.data.Amount
    }

    ngOnInit() {
        if (this.data) {
            if (this.data.Reconciled === "P") {
                this.index = 1
            }
            this.form.get('IdContaCaixaDestino').setValue(this.data.AccountId.Id)
            this.form.get('IdNatureza').setValue(this.data.IdNatureza?.Id)
            this.form.get('Historico').setValue(this.data.Historic)
            this.form.get('Documento').setValue(this.data.Document)
            this.IdParcela = this.data.IdParcela

            this.pessoa = this.data.PersonId
            if (this.pessoa) {
                this.form.get('IdNatureza').setValue(this.pessoa.CodNatFinanceira)
                this.form.get('IdPessoa').setValue(this.data.IdPessoa)
            }

            if (this.data.FinancialCategoryId) {
                const index = this.selectNaturezaFinanceira.findIndex(x => x.value == this.data.FinancialCategoryId.Id)
                this.form.get('IdNatureza').setValue(this.data.FinancialCategoryId.Id)
                if (index > 0) {
                    this.naturezaFinanceira = this.data.FinancialCategoryId
                    this.form.get('IdNaturezaInput').setValue(this.form.get('IdNatureza').value + this.naturezaFinanceira.Historico)

                    this.form.get('IdNaturezaInput').setValue(this.selectNaturezaFinanceira[index].label)
                }
            }
        }
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (this.optionsConta) this.selectContaDestino = this.optionsConta
        if (this.optionsNaturezaFinanceira) this.selectNaturezaFinanceira = this.optionsNaturezaFinanceira
    }

    ngOnDestroy(): void {
        if (this.$buscarPessoaSubscription) this.$buscarPessoaSubscription.unsubscribe();
        if (this.$processarConciliacaoSubscription) this.$processarConciliacaoSubscription.unsubscribe();
        if (this.$conciliarParaUnicoSubscription) this.$conciliarParaUnicoSubscription.unsubscribe();
        if (this.$memorizarSubscription) this.$memorizarSubscription.unsubscribe();
        if (this.$buscarNaturezaSubscription) this.$buscarNaturezaSubscription.unsubscribe();
    }

    openModalConciliarContabil() {
        this.router.navigate(['/conciliado/conciliar-contabil'])
        // this.dadosDefault.conciliarContabilParams.next({data: this.data, params: this.dataPesquisa})

    }

    openModalConciliarParcela() {
        this.router.navigate(['/conciliado/conciliar-parcela'])
        // this.dadosDefault.conciliarParcelaParams.next({data: this.data, params: this.dataPesquisa})
    }


    reconcileSingle() {
        let body = {
            Id: this.data.AccountId.Id,
            FinancialId: this.form.get('IdNatureza').get('Id').value,
            PersonId: this.form.get('IdPessoa').get('Id').value,
            Obs: this.form.get('Historico').value,
            SavePerson: this.form.get('memorizarPessoa').value,
            SaveHistoric: this.form.get('memorizar').value
        }

        this.dadosDefault.exibirLoader.next(true)
        this.networkService.atualizarPost(getUrlPro(), 'UpdateStatementItem', body).subscribe(v => {
            Util.pushSuccessMsg('Conciliado com Sucesso!')
        }).add(this.dadosDefault.exibirLoader.next(false))
    }

    colorValue(v) {
        const classes = {
            'texto-verde': false,
            'texto-vermelho': false,
        }
        return Util.isNegative(v) ? { ...classes, 'texto-vermelho': true } : { ...classes, 'texto-verde': true }
    }

    getNomePessoa(data: any) {
        if (this.pessoa && typeof this.pessoa === 'object') {
            return this.pessoa.Nome
        }
        return ''
    }

    getNomeNatureza(data: any) {
        if (this.naturezaFinanceira && typeof this.naturezaFinanceira === 'object') {
            return this.naturezaFinanceira.Descricao
        }
        return ''
    }

    alterarCard(n) {
        this.index = n
    }

    selecionouNaturezaFinanceira(e) {
        this.form.get('Historico').setValue(this.data.HistoricoBanco + '  ' + e.Historico)
    }

    selecionouPessoa(e) {
        const { IdNatureza } = e
        if (IdNatureza.toString().match(/^\d+$/)) {
            // this.networkService.getSimples(getUrlCad(), `naturezaFinanceira?$filter=CodControle eq ${IdNatureza}`).subscribe((v: any) => {
            //     if (v.value.length) {
            //         this.form.get('IdNatureza').setValue(v.value[0])
            //     }
            // }, error => this.messageService.add(Util.pushErrorMsg(error)))
        }
    }
}
