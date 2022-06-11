import { NaturezaFinanceira } from './../../model/natureza-financeira.model';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BaseFormPost } from "../../controller/BaseFormPost";
import { FormBuilder, FormGroup } from "@angular/forms";
import { NetworkService } from "../../services/network.service";
import { DadosDefaultService } from "../../services/dados-default.service";
import { ActivatedRoute, Router } from "@angular/router";
import { MessageService } from "primeng/api";
import { Formulario } from "../../controller/Formulario";
import { getUrlCad } from "../../controller/staticValues";
import { Util } from '../../controller/Util';
import { Subscription } from 'rxjs';


@Component({
    selector: 'app-modal-natureza-financeira-cadastro',
    templateUrl: './modal-natureza-financeira-cadastro.component.html',
    styleUrls: ['./modal-natureza-financeira-cadastro.component.css']
})
export class ModalNaturezaFinanceiraCadastroComponent extends BaseFormPost implements OnInit {

    // @ViewChild('conteudo') public content
    entidade = 'Cadastro de Natureza Financeira'
    form: FormGroup;
    @Input() modalVisible = false
    @Output() dadosSalvos = new EventEmitter()
    @Output() closeModal = new EventEmitter()

    categories: any[] = [{ name: 'Sim', key: true }, { name: 'Não', key: false }];
    idNatureza = undefined;

    selectOperacaoFiscal;
    sintetico: any = null;

    onLabel = 'Sim'
    offLabel = 'Não'

    booleanInsc = false

    enderecosTable = [];
    contatosTable = [];



    $subscription6: Subscription
    $subscription7: Subscription
    $subscription8: Subscription
    $subscription9: Subscription

    terceiraEtapaSintetico = false

    selectCentroCustos;
    selectContaContabil;
    selectNatureza;
    selectTipoDocumentos;
    selectProjeto;
    selectMeioPagamento;
    selectNaturezaFinanceira;

    selectListaNatureza;
    classificacao = undefined

    primeiraEtapa = false
    segundaEtapa = true
    terceiraEtapa = false
    quartaEtapa = false
    quintaEtapa = false
    sextaEtapa = false
    setimaEtapa = false

    constructor(public networkService: NetworkService, public dadosDefault: DadosDefaultService, public router: Router, private route: ActivatedRoute, private fb: FormBuilder, public messageService: MessageService) {
        super(networkService, dadosDefault, router, 'pessoa', messageService);
        this.form = Formulario.createForm(new NaturezaFinanceira(), this.fb);
    }

    ngOnInit() {
        //this.sintetico = this.categories[0];
        // this.dadosDefault.modalNaturezaFinanceira().subscribe(values => {
        //     this.selectCentroCustos = values[0]
        //     this.selectContaContabil = values[1]
        //     this.selectNatureza = values[2]
        //     this.selectTipoDocumentos = values[3]
        //     this.selectProjeto = values[4]
        //     this.selectMeioPagamento = values[5]
        // })

        // this.networkService.salvarPost(getUrlCad(), 'Contas/ListaNaturezas', {Nivel: 1}).subscribe((v: any) => {
        //     this.selectListaNatureza = []
        //     v.map(value => {
        //         this.selectListaNatureza.push({label: value.Descricao, value: {Classificacao: value.Classificacao, Id: value.Id}})
        //     })
        // })
    }

    setarClassificacao(event) {
        this.classificacao = event
    }

    changeSelect(value) {
        switch (value.type) {
            case 'projeto':
                this.selectProjeto.push(Util.valueToSelect(value.payload))
                this.form.get('IdProjeto').setValue(value.payload.Id)
                break
        }
    }

    processarFormulario() {
        console.log(this.form.getRawValue());
        this.networkService.salvarPost(getUrlCad(), 'contas/naturezafinanceira', Formulario.parseForm(new NaturezaFinanceira(), Object.assign({}, this.form.value), NaturezaFinanceira.referencias(), null, null, null, NaturezaFinanceira.checkbox(), false)).subscribe(v => {
            this.messageService.add(Util.pushSuccessMsg('Cadastro realizado com sucesso'));
            this.fecharModal();
        })
    }

    setarValue(value) {
        this.idNatureza = value;
    }

    avancarSegundaEtapa() {
        if (this.form.get('Sintetico').value == null) {
            this.messageService.add(Util.pushErrorMsg('Selecione o Sintético'))
            return;
        }
        let descricao = this.form.get('Descricao').value;
        let sinte = this.form.get('Sintetico').value.key
        this.form.get('Sintetico').setValue(sinte);

        if (this.classificacao === undefined) {
            this.messageService.add(Util.pushErrorMsg('Selecione a Natureza'))
            return;
        }
        if (descricao === "") {
            this.messageService.add(Util.pushErrorMsg('Digite a Descrição'))
            return;
        }

        if (sinte === true) {
            this.avancarOuVoltar(3);
            this.terceiraEtapaSintetico = true;
        }
        if (sinte === false) {
            let value = { Sintetico: true, Classificacao: `${this.classificacao.Classificacao}%`, Nivel: 2 }
            this.networkService.salvarPost(getUrlCad(), 'Contas/ListaNaturezas', value).subscribe((v: any) => {
                this.selectNaturezaFinanceira = [];
                v.map((value) => {
                    this.selectNaturezaFinanceira.push({ label: value.Descricao, value: value.Id });
                })
                this.form.get('IndicaPermuta').setValue(true);
                this.form.get('ApareceAPagar').setValue(true);
                this.form.get('ApareceAReceber').setValue(true);
                this.form.get('ApareceProduto').setValue(true);
                this.form.get('ApareceEntrada').setValue(true);
                this.form.get('ApareceTesouraria').setValue(true);
                this.form.get('ApareceTesouraria').setValue(true);
                this.form.get('ApareceCaixa').setValue(true);
                this.form.get('LivroCaixa').setValue(true);
                this.avancarOuVoltar(2);
            })
        }
    }

    avancarTerceiraEtapa() {
        if (this.idNatureza === undefined) {
            this.messageService.add(Util.pushErrorMsg('Selecione a Natureza Financeira'))
            return;
        }
        let sinte = this.form.get('Sintetico').value
        if (sinte === true) {
            this.terceiraEtapaSintetico = true
            this.avancarOuVoltar(3);
        }
        if (sinte === false) {
            this.terceiraEtapaSintetico = false
            this.avancarOuVoltar(3);
        }
    }

    gerarClassificacao() {
        let id = this.idNatureza;
        if (id === undefined) {
            id = this.classificacao.Id;
        }
        this.networkService.getSimples(getUrlCad(), `contas/classificacaoNatureza?IdNatureza=${id}`).subscribe((v: any) => {
            this.form.get('Classificacao').setValue(v.value)
        })
    }

    false() {
        this.primeiraEtapa = false
        this.segundaEtapa = false
        this.terceiraEtapa = false
        this.quartaEtapa = false
        this.quintaEtapa = false
        this.sextaEtapa = false
        this.setimaEtapa = false
    }

    avancarOuVoltar(value: number) {
        this.booleanInsc = false
        this.false()
        switch (value) {
            case 1:
                let sinte = this.form.get('Sintetico').value;
                if (sinte == true) {
                    this.form.get('Sintetico').setValue(this.categories[0])
                    this.sintetico = this.categories[0]
                };
                if (sinte == false) {
                    this.form.get('Sintetico').setValue(this.categories[1])
                    this.sintetico = this.categories[1]
                }
                this.primeiraEtapa = true
                break
            case 2: this.segundaEtapa = true
                break
            case 3: this.terceiraEtapa = true
                break
            case 4:
                if (this.form.get('IdNaturezaFinGrupo').value === "") {
                    this.messageService.add(Util.pushErrorMsg('É necessário selecionar o Grupo da Natureza'))
                    this.terceiraEtapa = true
                    return;
                }
                if (this.form.get('Classificacao').value === "") {
                    this.messageService.add(Util.pushErrorMsg('É necessário gerar a Classificação'))
                    this.terceiraEtapa = true
                    return;
                }
                if (this.form.get('Historico').value === "") {
                    this.messageService.add(Util.pushErrorMsg('Preencha o Histórico'))
                    this.terceiraEtapa = true
                    return;
                }
                this.quartaEtapa = true
                break
            case 5: this.quintaEtapa = true
                break
            case 6: this.sextaEtapa = true
                break
            case 7: this.setimaEtapa = true
                break
        }
    }

    avancar() {
        if (this.form.get('Cep').value === undefined || this.form.get('Cep').value === null || this.form.get('Cep').value === '') {
            this.avancarOuVoltar(3)
        } else {
            this.avancarOuVoltar(4)
        }
    }

    avancarInsc() {
        if (this.form.get('PessoaForm').get('ContribuinteIcms').value === 1) {
            this.false()
            this.booleanInsc = true;
            return;
        }
        this.false()
        this.sextaEtapa = true;
    }

    voltarInsc() {
        if (this.form.get('PessoaForm').get('ContribuinteIcms').value === 1) {
            this.false()
            this.booleanInsc = true;
            return;
        }
        this.false()
        this.quintaEtapa = true;
    }

    fecharModal() {
        this.false();
        this.form.reset();
        this.dadosDefault.closeModal(this.hash);
        this.modalVisible = false
    }
}