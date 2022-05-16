import { Color, Label } from "ng2-charts";
import { AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { ChartDataSets, ChartOptions } from "chart.js";

@Component({
    selector: 'app-geral-evolucao-saldo-livro-caixa-chart',
    templateUrl: './geral-evolucao-saldo-livro-caixa-chart.component.html',
    styleUrls: ['./geral-evolucao-saldo-livro-caixa-chart.component.css']
})
export class GeralEvolucaoSaldoLivroCaixaChartComponent implements AfterViewInit, OnChanges {

    @Input() container: HTMLDivElement;

    @ViewChild('canvass') canvas;

    width = '800'
    height = '100'

    viewInit = false

    lineData: any;

    @Input() dataChart = []
    lineChartData: ChartDataSets[] = [];
    @Input() lineChartLabels: Label[] = [];


    public lineChartColors: Color[] = [
        {
            borderColor: '#F3CC22',
        },
    ];

    public lineChartLegend = true;
    public lineChartType = 'line';
    public lineChartPlugins = [];

    options: ChartOptions = {
        // tooltips: {enabled: false},
        hover: { mode: null },
        responsive: true,
        legend: {
            display: false
        },
        elements: {
            line: {
                fill: false,
                tension: 0,
            },
            point: {
                radius: 5,
                borderColor: '#F3CC22',
                backgroundColor: 'transparent',
                borderWidth: 3,
            }
        },
    }


    constructor() { }

    ngAfterViewInit(): void {
        this.viewInit = true
    }

    ngOnChanges(changes: SimpleChanges): void {
        // if (this.dataChart.length) {
            this.lineData = {
                labels: this.lineChartLabels,
                datasets: [
                    { data: [100], fill: false, backgroundColor: this.lineChartColors, label: "teste" },
                ]
            };
        // }
    }
    
}
