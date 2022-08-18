import { Financial } from './../../model/financial.model';
import { getUrlPro } from './../../controller/staticValues';
import { FinancialCategory } from './../../model/financial-category.model';
import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
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
export class ModalNaturezaFinanceiraCadastroComponent extends BaseFormPost implements OnInit, OnChanges {

    // @ViewChild('conteudo') public content
    entidade = 'Cadastro de Natureza Financeira'
    form: FormGroup;
    @Input() modalVisible = false
    @Input() include = false
    @Input() data;
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
    selectGrupoNatureza;
    selectCostCenter;
    selectProject;
    classificacao = undefined

    primeiraEtapa = true
    segundaEtapa = false
    terceiraEtapa = false
    quartaEtapa = false
    quintaEtapa = false
    sextaEtapa = false
    setimaEtapa = false

    natureza = null

    selectSpecie = []

    selectLevel = [
        { label: '', value: null},
        { label: '1', value: 1 },
        { label: '2', value: 2 },
        { label: '3', value: 3 },

    ]

    selectSpecieFlow = [
        { label: '', value: null},
        { label: 'Saida', value: 'S' },
        { label: 'Entrada', value: 'E' }
    ]

    constructor(public networkService: NetworkService, public dadosDefault: DadosDefaultService, public router: Router, private route: ActivatedRoute, private fb: FormBuilder, public messageService: MessageService) {
        super(networkService, dadosDefault, router, 'InsertCategory', messageService);
        this.form = Formulario.createForm(new FinancialCategory(), this.fb);
        this.form.addControl('aux', this.fb.group({
            naturezaSuperior: '',
        }))

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


    }

    ngOnChanges() {
        if (this.modalVisible) {
            this.dadosDefault.modalNaturezaFinanceira().subscribe(values => {
                const defaultValue = {label: '-', value: null}
                this.selectGrupoNatureza = values[0]
                this.selectGrupoNatureza.unshift(defaultValue)
                this.selectListaNatureza = values[1]
                this.selectListaNatureza.unshift(defaultValue)
                this.selectCostCenter = values[2]
                this.selectCostCenter.unshift(defaultValue)
                this.selectProject = values[3]
                this.selectProject.unshift(defaultValue)
                this.selectSpecie = values[4]
                this.selectSpecie.unshift(defaultValue)



                if (this.data) {                    
                    this.natureza = this.selectListaNatureza.find(v => v.value === this.data.Id)
                    
                    this.form.get('aux').get('naturezaSuperior').setValue(this.natureza.value)

                    this.form.get('Classificate').setValue(this.data.Classificacao)
                }
            })

            // this.dadosDefault.exibirLoader.next(true)
            // this.networkService.listarPost('financialCategories', {Level: 1}).subscribe((v: any) => {
            //     this.selectListaNatureza = []
            //     v.value.map(value => {
            //         this.selectListaNatureza.push({ label: value.Description, value: { Classificacao: value.Classificate, Id: value.Id } })
            //     })
            // }).add(this.dadosDefault.exibirLoader.next(false))
        }
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
        this.form.removeControl('aux')
        this.dadosDefault.exibirLoader.next(true)
        this.networkService.salvarPost(getUrlPro(), 'InsertCategory', Formulario.parseForm(new FinancialCategory(), Object.assign({}, this.form.value), FinancialCategory.referencias(), null, null, null, Financial.checkbox(), false)).subscribe(v => {
            this.messageService.add(Util.pushSuccessMsg('Cadastro realizado com sucesso'));
            this.fecharModal();
        }).add(this.dadosDefault.exibirLoader.next(false))
    }

    setarValue(value) {
        this.idNatureza = value;
    }

    avancarSegundaEtapa() {
        if (!this.classificacao) {
            this.messageService.add(Util.pushInfoMessage('Selecione a Natureza Superios'))
            return
        }
        if (this.form.get('Description').value === '') {
            this.messageService.add(Util.pushInfoMessage('Informe a descrição da natureza'))
            return
        }

        this.gerarClassificacao()

        this.segundaEtapa = true
        this.primeiraEtapa = false
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
        let id;
        console.log(this.data)
        if (this.data) {
            console.log('Data')
            id = this.data.Id
        }
        if (id === undefined) {
            console.log('Id')
            id = this.classificacao;
        }
        this.dadosDefault.exibirLoader.next(true)
        this.networkService.getSimples(getUrlPro(), `GenerateClassificateCategory?CategoryId=${id}`).subscribe((v: any) => {
            this.form.get('Classificate').setValue(v.value)
        }).add(this.dadosDefault.exibirLoader.next(false))
    }

    false() {
        this.primeiraEtapa = true
        this.segundaEtapa = false
        this.include = false
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
        this.closeModal.emit(false)
        this.data = null
        // this.dadosDefault.closeModal(this.hash);
        // this.modalVisible = false
    }
}