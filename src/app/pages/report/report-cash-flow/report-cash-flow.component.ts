import { Util, sub6, mul6 } from './../../../controller/Util';
import { DadosDefaultService } from 'src/app/services/dados-default.service';
import { NetworkService } from './../../../services/network.service';
import { qtdLinhas, getUrlClient, getUrlPro, getUrlReport, opcoesLinhas } from './../../../controller/staticValues';
import { BaseListSimples } from 'src/app/controller/BaseListSimples';
import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, Message, MessageService, SelectItem } from "primeng/api";
import { Router } from "@angular/router";


@Component({
    selector: 'app-report-cash-flow',
    templateUrl: './report-cash-flow.component.html',
    styleUrls: ['./report-cash-flow.component.css']
})
export class ReportCashFlowComponent implements OnInit, OnDestroy {

    exibirLoader = this.dadosDefault.exibirLoader
    exibirLoaderNetwork = this.networkService.exibirLoader

    dataInit = Util.getDateComUmMesAntes();
    dataFim = Util.getLastDayDate();

    itemsReport = []

    data;

    constructor(public messageService: MessageService, public confirmationService: ConfirmationService, public networkService: NetworkService, public router: Router, public dadosDefault: DadosDefaultService) { }

    ngOnInit() {
        setTimeout(() => {
            this.loaddata()
        }, 1000)

    }

    alterouData(e) {
        this.data = {}
        this.dataInit = new Date(e.dataInicial.getFullYear(), e.dataInicial.getMonth(), e.dataInicial.getDate())
        this.dataFim = new Date(e.dataFinal.getFullYear(), e.dataFinal.getMonth(), e.dataFinal.getDate())
        this.loaddata()
    }

    loaddata() {
        this.dadosDefault.exibirLoader.next(true)
        let dataIni = Util.dataParaStringComZero(this.dataInit)
        let dataFim = Util.dataParaStringComZero(this.dataFim)
        this.networkService.getSimples(getUrlPro(), `MonthlyCloseCash?DateIni=${dataIni}&DateEnd=${dataFim}`).subscribe(v => {
            this.data = v['value'][0]
        }).add(() => this.dadosDefault.exibirLoader.next(false))
    }
   
    get Income() {
        if(!this.data.Income) return 0
        return this.data.Income
    }

    get Deduction() {
        if(!this.data.Deduction) return 0
        return this.data.Deduction
    }

    get CostOfSold(){
        if(!this.data.CostOfSold) return 0
        return this.data.CostOfSold
    }

    get VariableExpense(){
        if(!this.data.VariableExpense) return 0
        return this.data.VariableExpense
    }

    get OperationalExpense(){
        if(!this.data.OperationalExpense) return 0
        return this.data.OperationalExpense
    }

    get ParthnerExpense(){
        if(!this.data.ParthnerExpense) return 0
        return this.data.ParthnerExpense
    }

    get OperationalFlow() {
        if(!this.data.OperationalFlow) return 0
        return this.data.OperationalFlow
    }

    get InvestmentFlow(){
        if(!this.data.InvestmentFlow) return 0
        return this.data.InvestmentFlow
    }

    get FinancingFlow(){
        if(!this.data.FinancingFlow) return 0
        return this.data.FinancingFlow
    }

    get TotalCashFlow(){
        if(!this.data.TotalCashFlow) return 0
        return this.data.TotalCashFlow
    }

    get InicialBalance(){
        if(!this.data.InicialBalance) return 0
        return this.data.InicialBalance
    }

    get FinalBalance(){
        if(!this.data.FinalBalance) return 0
        return this.data.FinalBalance
    }

        
    report(type) {
        let body = {
            type: type,
        }

        this.dadosDefault.exibirLoader.next(true)
        if (type === 'pdf') {
            this.networkService.salvarEBaixarArquivo(getUrlReport(), 'listCategoryFinance', body).subscribe(v => {
                Util.savePdf(v)
            }).add(this.dadosDefault.exibirLoader.next(false))
        }
        if (type === 'xls') {
            this.networkService.baixarXls(getUrlReport(), 'listCategoryFinance', body).subscribe(v => {
                Util.saveXls(v)
            }).add(this.dadosDefault.exibirLoader.next(false))
        }
    }

    filtrarEPesquisar(e?, page = 0) {
        if (e && e.key !== 'Enter') return
    }

    ngOnDestroy(): void {

    }

}
