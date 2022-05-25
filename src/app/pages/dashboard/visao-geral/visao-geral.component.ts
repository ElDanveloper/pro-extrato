import { Util, sub } from '../../../controller/Util';
import { NetworkService } from '../../../services/network.service';
import { AppBreadcrumbService } from '../../../app.breadcrumb.service';
import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-visao-geral',
    templateUrl: './visao-geral.component.html',
    styleUrls: ['./visao-geral.component.css']
})
export class VisaoGeralComponent implements OnInit {
    //teste
    vendas = [];
    recebimentos = [];
    compras = [];
    pagamentos = [];
    dataLabel = [];
    saldoFinal = [];

    posicaoLivroCaixa = null;
    posicaoLivroCaixaLista = [];

    dataInit = Util.getDateComUmMesAntes();
    dataFim = Util.getLastDayDate();


    lineData: any;

    barData: any;

    pieData: any;

    polarData: any;

    radarData: any;

    constructor(private breadcrumbService: AppBreadcrumbService, private networkService: NetworkService) {
        this.breadcrumbService.setItems([
            { label: 'Dashboard', routerLink: ['home'] }
        ]);
    }

    ngOnInit() {
        this.carregarLista();
        
        this.barData = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [
                {
                    label: 'My First dataset',
                    backgroundColor: '#03A9F4',
                    borderColor: '#03A9F4',
                    data: [65, 59, 80, 81, 56, 55, 40]
                },
                {
                    label: 'My Second dataset',
                    backgroundColor: '#FFC107',
                    borderColor: '#FFC107',
                    data: [28, 48, 40, 19, 86, 27, 90]
                }
            ]
        };

        this.pieData = {
            labels: ['A', 'B', 'C'],
            datasets: [
                {
                    data: [300, 50, 100],
                    backgroundColor: [
                        '#FFC107',
                        '#03A9F4',
                        '#4CAF50'
                    ],
                    hoverBackgroundColor: [
                        '#FFE082',
                        '#81D4FA',
                        '#A5D6A7'
                    ]
                }]
            };

        this.polarData = {
            datasets: [{
                data: [
                    11,
                    16,
                    7,
                    3,
                    14
                ],
                backgroundColor: [
                    '#FFC107',
                    '#03A9F4',
                    '#4CAF50',
                    '#E91E63',
                    '#9C27B0'
                ],
                label: 'My dataset'
            }],
            labels: [
                'Red',
                'Green',
                'Yellow',
                'Grey',
                'Blue'
            ]
        };

        this.radarData = {
            labels: ['Eating', 'Drinking', 'Sleeping', 'Designing', 'Coding', 'Cycling', 'Running'],
            datasets: [
                {
                    label: 'My First dataset',
                    backgroundColor: 'rgba(179,181,198,0.2)',
                    borderColor: 'rgba(179,181,198,1)',
                    pointBackgroundColor: 'rgba(179,181,198,1)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgba(179,181,198,1)',
                    data: [65, 59, 90, 81, 56, 55, 40]
                },
                {
                    label: 'My Second dataset',
                    backgroundColor: 'rgba(255,99,132,0.2)',
                    borderColor: 'rgba(255,99,132,1)',
                    pointBackgroundColor: 'rgba(255,99,132,1)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgba(255,99,132,1)',
                    data: [28, 48, 40, 19, 96, 27, 100]
                }
            ]
        };
    }
    //teste
    mudouData(e) {
        this.dataInit = new Date(e.dataInicial.getFullYear(), e.dataInicial.getMonth(), e.dataInicial.getDate())
        this.dataFim = new Date(e.dataFinal.getFullYear(), e.dataFinal.getMonth(), e.dataFinal.getDate())
        this.carregarLista()
    }

    get balancoMensal() {
        if(!this.posicaoLivroCaixa) return 0;
            return sub(this.posicaoLivroCaixa.Vendas, this.posicaoLivroCaixa.Compras)
    }

    get vendasAnual() {
        return this.posicaoLivroCaixa ? this.posicaoLivroCaixa.VendasNoAno : 0;
    }

    get comprasAnual() {
        return this.posicaoLivroCaixa ? this.posicaoLivroCaixa.ComprasNoAno : 0;
    }

    get balancoAnual() {
        if(!this.posicaoLivroCaixaLista.length) return 0;
        if(this.posicaoLivroCaixaLista.length === 1) return sub(this.posicaoLivroCaixaLista[0].Vendas, this.posicaoLivroCaixaLista[0].Compras)
        return sub(this.vendasAnual, Math.abs(this.comprasAnual))
    }

    carregarLista() {
        // this.networkService.getSimples(getUrlRelatorio(), `relatorio/PosicaoLivroCaixa?mes=${this.dataInit.getMonth() + 1}&ano=${this.dataInit.getFullYear()}`).subscribe((v: any) => {
        //     this.posicaoLivroCaixa = v
        // })
        // this.networkService.getSimples(getUrlRelatorio(), `relatorio/FluxoCaixaFiscal?mesFinal=${Util.addZero(this.dataInit.getMonth() + 1)}&anoFinal=${Util.addZero(this.dataInit.getFullYear())}&qtdMeses=12`).subscribe((v: any) => {
        //     this.posicaoLivroCaixaLista = v.value
        //     let vendas = []
        //     let recebimentos = []
        //     let compras = []
        //     let pagamentos = []
        //     let saldoFinal = []
        //     let labels = []
        //     let data = new Date()
        //     for (let i = 0; i <=12; i++) {
        //         data = Util.getDatePreviousMonth(data)
        //         const idx = v.value.findIndex(x => x.ano == data.getFullYear() && x.mes == data.getMonth() + 1)
        //         if(idx !== -1) {
        //             vendas.push(v.value[idx].Vendas)
        //             recebimentos.push(v.value[idx].RecebimentosCaixa)
        //             compras.push(-Math.abs(v.value[idx].Compras))
        //             pagamentos.push(-Math.abs(v.value[idx].PagamentosCaixa))
        //             saldoFinal.push(v.value[idx].SaldoFinal)
        //         } else {
        //             vendas.push(0)
        //             recebimentos.push(0)
        //             compras.push(0)
        //             pagamentos.push(0)
        //             saldoFinal.push(0)
        //         }
        //         labels.push(`${Util.getMonthLabel(data.getMonth())}/${data.getFullYear()}`)
        //     }
        //     this.vendas = vendas.reverse()
        //     this.recebimentos = recebimentos.reverse()
        //     this.compras = compras.reverse()
        //     this.pagamentos = pagamentos.reverse()
        //     this.saldoFinal = saldoFinal.reverse()
        //     this.dataLabel = labels.reverse()
        // })
    }
}
