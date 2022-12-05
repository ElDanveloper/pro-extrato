import { Util, sub6, mul6 } from './../../../controller/Util';
import { DadosDefaultService } from 'src/app/services/dados-default.service';
import { NetworkService } from './../../../services/network.service';
import { qtdLinhas, getUrlClient, getUrlPro, getUrlReport, opcoesLinhas } from './../../../controller/staticValues';
import { BaseListSimples } from 'src/app/controller/BaseListSimples';
import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, Message, MessageService, SelectItem } from "primeng/api";
import { Router } from "@angular/router";


@Component({
    selector: 'app-report-dre',
    templateUrl: './report-dre.component.html',
    styleUrls: ['./report-dre.component.css']
})
export class ReportDreComponent implements OnInit, OnDestroy {

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
        console.log('Consulta ---> ' + dataIni + ' <----> ' + dataFim)
        this.networkService.getSimples(getUrlPro(), `SumaryDRE?DateIni=${dataIni}&DateEnd=${dataFim}`).subscribe(v => {
            this.data = v['value'][0]
        }).add(() => this.dadosDefault.exibirLoader.next(false))
    }

    get Revenue(){        
        if(!this.data.Revenue) return 0
        return this.data.Revenue
    }

    get Deductions() {
        if(!this.data.Deductions) return 0
        return this.data.Deductions
    }

    get NetRevenue() {
        if(!this.data.NetRevenue) return 0
        return this.data.NetRevenue
    }

    get CostOfSold() {
        if(!this.data.CostOfSold) return 0
        return this.data.CostOfSold
    }

    get VariableExpense() {
        if(!this.data.VariableExpense) return 0
        return this.data.VariableExpense
    }

    get GrossProfit(){
        if(!this.data.GrossProfit) return 0
        return this.data.GrossProfit
    }

    get OperationalExpense(){
        if(!this.data.OperationalExpense) return 0
        return this.data.OperationalExpense
    }

    get PartnerExpense(){
        if(!this.data.PartnerExpense) return 0
        return this.data.PartnerExpense
    }

    get NetProfit(){
        if(!this.data.NetProfit) return 0
        return this.data.NetProfit
    }

    get BreakEven() {
        if(!this.data.BreakEven) return 0
        return this.data.BreakEven
    }

    get Ebitda(){
        if(!this.data.Ebitda) return 0
        return this.data.Ebitda
    }

    get PercentageDeductions() {
        if (!this.data.Deductions || this.data.Revenue <= 0){
            return 0
        }        
        return (Util.toNumber(this.data.Deductions) / Util.toNumber(this.data.Revenue)) * 100;
    }

    get PercentageNetRevenue(){
        if (!this.data.NetRevenue || this.data.Revenue <= 0){
            return 0
        }        
        return ((Util.toNumber(this.data.NetRevenue) / Util.toNumber(this.data.Revenue)) * 100).toFixed(2);
    }

    get PercentageCostOfSold(){
        if (!this.data.CostOfSold || this.data.Revenue <= 0){
            return 0
        }        
        return ((Util.toNumber(this.data.CostOfSold) / Util.toNumber(this.data.Revenue)) * 100).toFixed(2);
    }

    get PercentageVariableExpense() {
        if (!this.data.VariableExpense || this.data.Revenue <= 0){
            return 0
        }        
        return ((Util.toNumber(this.data.VariableExpense) / Util.toNumber(this.data.Revenue)) * 100).toFixed(2);
    }

    get PercentageGrossProfit() {
        if (!this.data.GrossProfit || this.data.Revenue <= 0){
            return 0
        }        
        return ((Util.toNumber(this.data.GrossProfit) / Util.toNumber(this.data.Revenue)) * 100).toFixed(2);
    }

    get PercentageOperationalExpense() {
        if (!this.data.OperationalExpense || this.data.Revenue <= 0){
            return 0
        }        
        return ((Util.toNumber(this.data.OperationalExpense) / Util.toNumber(this.data.Revenue)) * 100).toFixed(2);
    }

    get PercentagePartnerExpense() {
        if (!this.data.PartnerExpense || this.data.Revenue <= 0){
            return 0
        }        
        return ((Util.toNumber(this.data.PartnerExpense) / Util.toNumber(this.data.Revenue)) * 100).toFixed(2);
    }

    get PercentageNetProfit() {
        if (!this.data.NetProfit || this.data.Revenue <= 0){
            return 0
        }   
                
        return ((Util.toNumber(this.data.NetProfit) / Util.toNumber(this.data.Revenue)) * 100).toFixed(2);
    }

    get PercentageBreakEven(){
        if (!this.data.BreakEven || this.data.Revenue <= 0){
            return 0
        }        
        return ((Util.toNumber(this.data.BreakEven) / Util.toNumber(this.data.Revenue)) * 100).toFixed(2);
    }

    get PercentageEbitda(){
        if (!this.data.Ebitda || this.data.Revenue <= 0){
            return 0
        }        
        return ((Util.toNumber(this.data.Ebitda) / Util.toNumber(this.data.Revenue)) * 100).toFixed(2);
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
