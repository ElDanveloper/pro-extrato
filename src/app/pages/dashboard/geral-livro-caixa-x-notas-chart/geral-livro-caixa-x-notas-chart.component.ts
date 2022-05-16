import { sub } from '../../../controller/Util';
import {AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ChartDataSets, ChartOptions, ChartType} from "chart.js";

@Component({
  selector: 'app-geral-livro-caixa-x-notas-chart',
  templateUrl: './geral-livro-caixa-x-notas-chart.component.html',
  styleUrls: ['./geral-livro-caixa-x-notas-chart.component.css']
})
export class GeralLivroCaixaXNotasChartComponent implements AfterViewInit, OnChanges {

    @Input() container: HTMLDivElement;

    public options: any = {
        // tooltips: {enabled: false},
        hover: {mode: null},
        responsive: true,
        legend: {
            // display: false
        },
        elements: {
            line: {
                fill: false,
                tension: 0,
            },
            point: {
                radius: 0,
            }
        },
        scales: {
            xAxes: [{
            }]
        }
    };
    public barChartType: ChartType = 'bar';
    public barChartLegend = true;

    @Input() compras = []
    @Input() recebimentos = []
    @Input() vendas = []
    @Input() pagamentos = []

    lineData: any;

    public barChartData: ChartDataSets[]

    @Input() barChartLabels: string[] = [];
    width = 0;
    height = 0;
    viewInit = false;

    constructor() { }

    ngOnInit() {      
    }

    ngAfterViewInit(): void {

        if(this.width === 0) {
            this.width = this.container.offsetWidth
        }

        if(this.height === 0) {
            this.height = this.container.offsetHeight
        }

        if(!this.viewInit) this.viewInit = true

    }

    ngOnChanges(changes: SimpleChanges): void {
        if(this.compras.length && this.pagamentos.length && this.vendas.length && this.recebimentos.length) {
            let media = this.recebimentos.map((v, idx) => sub(v, Math.abs(this.pagamentos[idx])))
            const pag = [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100]
            this.lineData = {
                labels : this.barChartLabels,
                datasets : [
                { data: this.vendas, fill: false, backgroundColor: '#17b29d', label: 'Vendas'},
                { data: this.recebimentos, fill: false,  backgroundColor: '#4F7B9F', label: 'Recebimentos'},
                { data: this.compras,  fill: false, backgroundColor: '#e5d379', label: 'Compras'},
                { data: this.pagamentos, fill: false,  backgroundColor: '#FB5A56', label: 'Pagamentos'},
                { data: media, fill: false, type: 'line',  backgroundColor: 'black', label: 'Diferença'},
            ]};
        }
    }

}
