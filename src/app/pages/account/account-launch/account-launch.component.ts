import { Util } from './../../../controller/Util';
import { qtdLinhas, opcoesLinhas, getUrlPro } from './../../../controller/staticValues';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, Message, MessageService } from "primeng/api";
import { ActivatedRoute, Router } from "@angular/router";
import { NetworkService } from 'src/app/services/network.service';
import { DadosDefaultService } from 'src/app/services/dados-default.service';

@Component({
    selector: 'app-account-launch',
    templateUrl: './account-launch.component.html',
    styleUrls: ['./account-launch.component.css']
})
export class AccountLaunchComponent implements OnInit {

    dataInit = Util.getDateComUmMesAntes();
    dataFim = Util.getLastDayDate();
    dataLabel = '';
    selectedRow = [];
    lista = [];
    lista2 = [];
    id;
    data;
    dadosEdit;
    contaCaixa;
    nome;
    qtdLinhas = qtdLinhas()
    opcoesLinhas = opcoesLinhas()
    modalTrocarConta = false
    modalEditStatementItems = false

    dados = null

    classificacao = '3.07.02'

    @ViewChild('paymentviaaccount') paymentviaaccount: ElementRef;
    @ViewChild('openingbalance') openingbalance: ElementRef;
    @ViewChild('uploadInput') uploadInput: ElementRef;
    @ViewChild('editstatementitems') editstatementitems: ElementRef;

    itemsReport = [
        {}
    ];


    constructor(public confirmationService: ConfirmationService, public networkService: NetworkService, public router: Router, public messageService: MessageService, private dadosDefault: DadosDefaultService, private route: ActivatedRoute) { }

    ngOnInit() {
        this.defineLabelData();

        this.route.params.subscribe(v => {
            this.id = v.id
        });
        if (this.contaCaixa === undefined) {
            this.nome = sessionStorage.getItem('caixaBanco')
        }

        this.networkService.buscar('ProAccount', this.id, null, getUrlPro()).subscribe(v => {
            this.contaCaixa = v
            // this.carregarLista()
        })

    }

    contaTrocada() {
        this.networkService.buscar('ProAccount', this.id, null, getUrlPro()).subscribe(v => {
            this.contaCaixa = v
            // this.carregarLista()
        })
        this.modalTrocarConta = false
    }

    defineLabelData() {
        const monthLabel = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
        this.dataLabel = `${monthLabel[this.dataInit.getMonth()]} - ${this.dataInit.getFullYear()}`
    }

    nextDate() {
        this.dataInit = new Date(this.dataInit.getFullYear(), this.dataInit.getMonth() + 1, 1);
        this.dataFim = new Date(this.dataInit.getFullYear(), this.dataInit.getMonth() + 1, 0);
        this.defineLabelData()
        // this.carregarLista()
    }

    backDate() {
        this.dataInit = new Date(this.dataInit.getFullYear(), this.dataInit.getMonth() - 1, 1);
        this.dataFim = new Date(this.dataInit.getFullYear(), this.dataInit.getMonth() + 1, 0);
        this.defineLabelData()
        // this.carregarLista()
    }

    getSituacao(value) {
        const v = value.Vencimento;
        const rowDate = new Date(v.substring(0, 4), v.substring(5, 7), v.substring(8, 10), 0, 0, 0, 0);
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);
        return rowDate.getTime() >= currentDate.getTime() ? 'a Vencer' : 'Vencido'
    }

    calcLinhas(e: any) {
    }

    getTotalSelecionados() {
        // return this.selectedRow.reduce((acumulate, value) => acumulate + value.Valor, 0)
    }

    dadosSalvos() {
        this.carregarLista()
    }

    addZero = v => v.toString().length === 1 ? '0' + v : v;

    itemsRow = [
        {
            label: 'Editar', icon: 'fa fa-edit', command: (e) => {
                this.dadosEdit = e
                this.editstatementitems.nativeElement.click();                
            }
        }, {
            label: 'Excluir', icon: 'fa fa-trash', command: (e) => {
                this.confirmationService.confirm({
                    message: `Você tem certeza que deseja deletar?`,
                    acceptLabel: `Sim`,
                    rejectLabel: `Não`,
                    accept: () => {
                        this.dadosDefault.exibirLoader.next(true)
                        this.networkService.getSimples(getUrlPro(), `ExcludeTransection?Id=${e.Id}`).subscribe(v => {
                            this.messageService.add(Util.pushSuccessMsg('Item Excluido com Sucesso!'))
                            this.update()
                            this.tableExpand(this.dados, false)
                        }).add(this.dadosDefault.exibirLoader.next(false))
                    }
                })
            }
        }, {
            label: 'Recibo', icon: 'fa fa-arrow-circle-right', command: (e) => { }
        },
    ];


    update() {
        let DataIni = Util.dataParaStringComZero(this.dataInit)
        let DataFim = Util.dataParaStringComZero(this.dataFim)
        this.dadosDefault.exibirLoader.next(true)
        this.networkService.getSimples(getUrlPro(), `StatementDiary?DateIni=${DataIni}&DateEnd=${DataFim}&AccountId=${this.id}`).subscribe((v: any) => {
            this.lista = v.value
        }).add(() => this.dadosDefault.exibirLoader.next(false))
    }

    carregarLista() {

        const ini = this.dataInit.getFullYear() + '-' + this.addZero(this.dataInit.getMonth() + 1) + '-' + this.addZero(this.dataInit.getDate());
        const fim = this.dataFim.getFullYear() + '-' + this.addZero(this.dataFim.getMonth() + 1) + '-' + this.addZero(this.dataFim.getDate());

        // this.networkService.exibirLoader.next(true);
        // this.networkService.getSimples(getUrlFinanceiro(), `fin/movimentoconta?IdConta=${this.contaCaixa.IdPlanoConta}&Limit=1000&pagina=0&DataIni=${ini}&DataFim=${fim}&$expand=Lancamentos`).subscribe((v: any) => {
        //     this.lista = v.value;
        // }).add(() => this.networkService.exibirLoader.next(false))

    }

    tableExpand(v, expanded) {        
        if (expanded) return
        if (!v) return       
        this.dados = v

        // const filtro = `IdPlanoConta=${v.IdPlanoConta}&Limit=50&pagina=0&Data=${v.Data}`

        this.dadosDefault.exibirLoader.next(true)
        this.networkService.getSimples(getUrlPro(), `StatementItems?DateIni=${v.DateBalance}&DateEnd=${v.DateBalance}&AccountId=${this.id}${Util.expandedQuery(['FinancialCategoryId'], true)}`).subscribe((v: any) => {
            this.lista2 = v.value;
        }).add(() => this.dadosDefault.exibirLoader.next(false))

        // this.networkService.salvarPost(getUrlRelatorio(), 'Contas/RelBoletosReceber', filtro).subscribe((v: any) => {
        //     this.jaPesquisou = true
        //     this.lista2 = v
        // }).add(() => this.dadosDefault.exibirLoader.next(false))
    }

    pressionaEnter($event: KeyboardEvent) {

    }


    get getTotalSaldoAnterior() {
        if (!this.lista.length) return 0
        // return this.lista[0].SaldoAnterior
    }

    get getTotalEntradas() {
        return
        // return this.lista.reduce((accum, current) => Util.toNumber((accum + current.Debitos).toFixed(2)), 0)
    }

    get getTotalSaidas() {
        return
        // return this.lista.reduce((accum, current) => Util.toNumber((accum + current.Creditos).toFixed(2)), 0)
    }

    get getTotalSaldoAtual() {
        if (!this.lista.length) return 0
        // return this.lista[this.lista.length - 1].SaldoAtual
    }

    abrirModalPagamentoViaConta(value) {
        // const nomeConta = this.contaCaixa ? this.contaCaixa.Nome : this.nome
        this.data = { idConta: this.id, tipo: value};
        this.paymentviaaccount.nativeElement.click();
    }

    openModalOpeningBalance() {        
        this.openingbalance.nativeElement.click();
    }

    conciliacao() {
        const ini = this.dataInit.getFullYear() + '-' + this.addZero(this.dataInit.getMonth() + 1) + '-' + this.addZero(this.dataInit.getDate());
        const fim = this.dataFim.getFullYear() + '-' + this.addZero(this.dataFim.getMonth() + 1) + '-' + this.addZero(this.dataFim.getDate());

        this.router.navigate([`/conciliation/${this.id}/${ini}/${fim}`]);
    }

    colorValue(v) {
        const classes = {
            'texto-verde': false,
            'texto-vermelho': false,
        }
        return Util.isNegative(v) ? { ...classes, 'texto-vermelho': true } : { ...classes, 'texto-verde': true }
    }

    getValor(v) {
        if (Util.toNumber(v) === 0) return ''
        return v
    }

    downloadPdf() {
        // this.dadosDefault.exibirLoader.next(true)
        // this.networkService.visualizarPdf(getUrlRelatorio(), `contabil/RazaoPDF?DataIni=${Util.dataParaStringComZero(this.dataInit)}&DataFim=${Util.dataParaStringComZero(this.dataFim)}&IdCaixa=${this.id}`).subscribe(v => {
        //     Util.savePdf(v);
        // }).add(() => this.dadosDefault.exibirLoader.next(false))
    }

    downloadCsv() {
        // this.dadosDefault.exibirLoader.next(true)
        // this.networkService.visualizarPdf(getUrlRelatorio(), `contabil/RazaoCSV?DataIni=${Util.dataParaStringComZero(this.dataInit)}&DataFim=${Util.dataParaStringComZero(this.dataFim)}&IdCaixa=${this.id}`).subscribe(v => {
        //     Util.saveExcelFile(v);
        // }).add(() => this.dadosDefault.exibirLoader.next(false))
    }

    choseUploadOfx() {
        this.uploadInput.nativeElement.click()
    }

    bin2String(array) {
        let result = "";
        for (let i = 0; i < array.length; i++) {
            result += String.fromCharCode(parseInt(array[i], 2));
        }
        return result;
    }

    uploadOfx(e) {        
        const hoje = new Date()
        if (!e.target.files) return
        const reader = new FileReader();
        reader.onload = async evt => {
            this.dadosDefault.exibirLoader.next(true)
            // @ts-ignore
            this.networkService.salvarPost(getUrlPro(), 'importaOFX', { Arquivo: evt.target.result.split(',')[1], AccountId: Number(this.id) }).subscribe(v => {
                this.messageService.add(Util.pushSuccessMsgSemDelay('OFX Importada!'))
            }, e3 => this.messageService.add(Util.pushErrorMsg(e3))).add(() => this.dadosDefault.exibirLoader.next(false));
        };
        reader.readAsDataURL(e.target.files[0])
    }

    importarRetorno(e) {
        if (!e.target.files) return
        const reader = new FileReader();
        reader.onload = async evt => {
            // @ts-ignore
            this.networkService.atualizarPost(getUrlFinanceiro(), 'fin/UpArquivoRetorno', { IdContaCobranca: Number(this.id), Arquivo: evt.target.result.split(',')[1] }).subscribe(v => {
                this.messageService.add(Util.pushSuccessMsgSemDelay('Arquivo Importado!'))
            }, e3 => this.messageService.add(Util.pushErrorMsg(e3)));
        };
        reader.readAsDataURL(e.target.files[0])
    }

    alterouData(e) {
        this.dataInit = new Date(e.dataInicial.getFullYear(), e.dataInicial.getMonth(), e.dataInicial.getDate())
        this.dataFim = new Date(e.dataFinal.getFullYear(), e.dataFinal.getMonth(), e.dataFinal.getDate())
        // this.carregarLista()
    }

}
