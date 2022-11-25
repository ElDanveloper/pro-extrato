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
        this.dataInit = new Date(e.dataInicial.getFullYear(), e.dataInicial.getMonth(), e.dataInicial.getDate())
        this.dataFim = new Date(e.dataFinal.getFullYear(), e.dataFinal.getMonth(), e.dataFinal.getDate())
        this.loaddata()
    }

    loaddata() {
        let dataIni = Util.dataParaStringComZero(this.dataInit)
        let dataFim = Util.dataParaStringComZero(this.dataFim)
        this.dadosDefault.exibirLoader.next(true)
        this.networkService.getSimples(getUrlPro(), `SumaryDRE?DateIni=${dataIni}&DateEnd=${dataFim}`).subscribe(v => {
            this.data = v['value'][0]
        }).add(() => this.dadosDefault.exibirLoader.next(false))
    }

    get PercentageDeductions() {
        if (this.data.Deductions === 0){
            return 0
        }
        // return mul6(sub6(this.data.Revenue, Util.toNumber2('160.217,55')), 100)
        return (Util.toNumber(this.data.Revenue) / Util.toNumber(this.data.Deductions)) * 100;
    }

    get PercentageNetRevenue(){
        if (this.data.NetRevenue === 0){
            return 0
        }        
        return ((Util.toNumber(this.data.Revenue) / Util.toNumber(this.data.NetRevenue)) * 100).toFixed(2);
    }

    get PercentageCostOfSold(){
        if (this.data.CostOfSold === 0){
            return 0
        }        
        return ((Util.toNumber(this.data.Revenue) / Util.toNumber(this.data.CostOfSold)) * 100).toFixed(2);
    }

    get PercentageVariableExpense() {
        if (this.data.VariableExpense === 0){
            return 0
        }        
        return ((Util.toNumber(this.data.Revenue) / Util.toNumber(this.data.VariableExpense)) * 100).toFixed(2);
    }

    get PercentageGrossProfit() {
        if (this.data.GrossProfit === 0){
            return 0
        }        
        return ((Util.toNumber(this.data.Revenue) / Util.toNumber(this.data.GrossProfit)) * 100).toFixed(2);
    }

    get PercentageOperationalExpense() {
        if (this.data.OperationalExpense === 0){
            return 0
        }        
        return ((Util.toNumber(this.data.Revenue) / Util.toNumber(this.data.OperationalExpense)) * 100).toFixed(2);
    }

    get PercentagePartnerExpense() {
        if (this.data.PartnerExpense === 0){
            return 0
        }        
        return ((Util.toNumber(this.data.Revenue) / Util.toNumber(this.data.PartnerExpense)) * 100).toFixed(2);
    }

    get PercentageNetProfit() {
        if (this.data.NetProfit === 0){
            return 0
        }        
        return ((Util.toNumber(this.data.Revenue) / Util.toNumber(this.data.NetProfit)) * 100).toFixed(2);
    }

    get PercentageBreakEven(){
        if (this.data.BreakEven === 0){
            return 0
        }        
        return ((Util.toNumber(this.data.Revenue) / Util.toNumber(this.data.BreakEven)) * 100).toFixed(2);
    }

    get PercentageEbitda(){
        if (this.data.Ebitda === 0){
            return 0
        }        
        return ((Util.toNumber(this.data.Revenue) / Util.toNumber(this.data.Ebitda)) * 100).toFixed(2);
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
