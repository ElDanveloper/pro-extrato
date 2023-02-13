
import { Subscription } from 'rxjs';
import {Component, OnInit} from '@angular/core';
import { NetworkService } from 'src/app/services/network.service';
import { getUrlPro } from 'src/app/controller/staticValues';
import { DadosDefaultService } from 'src/app/services/dados-default.service';
import { Util } from 'src/app/controller/Util';
import { MessageService } from 'primeng/api';
// import {TableModule} from 'primeng/table';
import { HttpClient } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { Car } from '../domain/car';

@Component({
    selector: 'app-dashboard-customer',
    templateUrl: './dashboard-customer.component.html',
    styleUrls: ['./dashboard-customer.component.css']
})
export class DashboardCustomerComponent implements OnInit {

    dateStart = Util.getDateComUmMesAntes()
    dateEnd = Util.getLastDayDate()

    $subscription3: Subscription;

    data

    donutChartExpenseData
    optionsDoughnutExpense: any

    dataBar
    optionsBar: any;


    //barChartData
    //barChartOptions: any;


    chartOptions: any;

    subscription: Subscription;

    // config: AppConfig; // - nao tem
    // private configService: AppConfigService // -  nao tem

    basicData: any;

    multiAxisData: any;

    multiAxisOptions: any;

    lineStylesData: any;

    basicOptions: any;

    dataInit = Util.getDateComUmMesAntes();
    dataFim = Util.getLastDayDate();

    cars: Car[];

    value1: number;
    value2: number;
    value3: number;
    total: number;

    constructor( private networkService: NetworkService, public dadosDefault: DadosDefaultService, public messageService: MessageService, private http: HttpClient ) {}
    // private carService: CarService

    ngOnInit() {
        this.updateData()
        this.loadBarChart()
        this.loadExpensesDonutChart()
        //this.labelData()

        // this.carService.getCarsSmall().then(cars => this.cars = cars);

        // o grafico de barra e ciclo e onda usam isso
        /*
        this.config = this.configService.config;
        this.updateChartOptions();
        this.subscription = this.configService.configUpdate$.subscribe(config => {
            this.config = config;
            this.updateChartOptions();
        });
        */
    }

    labelData(Month, Year) {
        this.dadosDefault.exibirLoader.next(true);
            this.$subscription3 = this.networkService.getSimples(getUrlPro(), `DashAccountLabel?MonthEnd=${Month}&YearEnd=${Year}`).subscribe(v => {
                //console.log(v['value'])
                this.data = v['value'][v['value'].length - 1]
                // console.log(this.data[this.data.length - 1])
                this.total = this.data.AmountReconciled
                this.value1 = ( this.IaReconciled * 100 ) / this.total
                this.value2 = ( this.data.AnalistReconciled * 100 ) / this.total
                this.value3 = ( this.data.CostomerReconciled * 100 ) / this.total
            }, e => {
                this.messageService.add(Util.pushErrorMsg(e))
            }).add(() => this.dadosDefault.exibirLoader.next(false))
    }

    loadBarChart() {
        let dataStart = Util.dataParaStringComZero(Util.getDatefrom6Month())
        let dataEnd = Util.dataParaStringComZero(Util.getLastDateFrom6Month())
        this.networkService.exibirLoader.next(true)
        this.networkService.getSimples(getUrlPro(), `MonthlyEvolution?DateIni=${dataStart}&DateEnd=${dataEnd}`).subscribe(v => {
            this.barChart(v['value'])
        }).add(() => this.networkService.exibirLoader.next(false))
    }

    loadExpensesDonutChart() {
        let dataStart = Util.dataParaStringComZero(this.dateStart)
        let dataEnd = Util.dataParaStringComZero(this.dateEnd)
        this.networkService.exibirLoader.next(true)
        this.networkService.getSimples(getUrlPro(), `SumaryByCategory?DateIni=${dataStart}&DateEnd=${dataEnd}&Specie=D`).subscribe(v => {
            this.expenseDonutChart(v['value'])
        }).add(() => this.networkService.exibirLoader.next(false))
    }


    barChart(value){
        let credits = value.map(v => v.Credits)
        let debits = value.map(v => v.Debits)
        let inicialBalance = value.map(v => v.InicialBalance)

        this.optionsBar = {
            indexAxis: 'y',
            plugins: {
                legend: {
                    labels: {
                        color: '#495057'
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: '#495057'
                    },
                    grid: {
                        color: '#ebedef'
                    }
                },
                y: {
                    ticks: {
                        color: '#495057'
                    },
                    grid: {
                        color: '#ebedef'
                    }
                }
            }
        }

        const monthLabel = ['Janeiro', 'Fevereiro', 'Marco', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']
        let label = value.map(v => `${monthLabel[v.Month - 1]}`)
        this.dataBar = {
            labels: label,
            datasets: [
                {
                    label: 'Receita',
                    data: credits,
                    backgroundColor: [
                        "#12D90B",
                        "#12D90B",
                        "#12D90B",
                        "#12D90B",
                        "#12D90B",
                        "#12D90B",
                    ],
                },
                {
                    label: 'Despesas',
                    data: debits,
                    backgroundColor: [
                        "#282FF0",
                        "#282FF0",
                        "#282FF0",
                        "#282FF0",
                        "#282FF0",
                        "#282FF0",
                    ],
                },
            ]
        };
    }

    expenseDonutChart(value) {
        let labels = value.map(v => v.Description).slice(3)
        let data = value.map(v => v.Amount).slice(3)

        console.log('despesas')
        console.log(value.slice(3))

        this.optionsDoughnutExpense = {
            plugins: {
                legend: {
                    labels: {
                        color: '#495057'
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: '#495057'
                    },
                    grid: {
                        color: '#ebedef'
                    }
                },
                y: {
                    ticks: {
                        color: '#495057'
                    },
                    grid: {
                        color: '#ebedef'
                    }
                }
            }
        };

        this.donutChartExpenseData = {
            labels: labels,
            datasets: [
                {
                    label: '1',
                    data: data,
                    backgroundColor: [
                        "#09C395",
                        "#04B6EB",
                        "#3B4CC0",
                        "#66BB6A",
                        "#00bb7e",
                        "#191970",
                        "#87CEFA",
                        "#ADFF2F",
                        "#6B8E23",
                        "#FFFF00",
                        "#8B4513",
                        "#F4A460",
                        "#B22222",
                        "#FF0000",
                        "#FF00FF",
                        "#9400D3",
                    ],
                    hoverBackgroundColor: [
                        "#09C395",
                        "#04B6EB",
                        "#3B4CC0",
                        "#66BB6A",
                        "#00bb7e",
                        "#191970",
                        "#87CEFA",
                        "#ADFF2F",
                        "#6B8E23",
                        "#FFFF00",
                        "#8B4513",
                        "#F4A460",
                        "#B22222",
                        "#FF0000",
                        "#FF00FF",
                        "#9400D3",
                    ]
                }
            ]
        };

    }

    alterouData(e) {
        this.dataInit = new Date(e.dataInicial.getFullYear(), e.dataInicial.getMonth(), e.dataInicial.getDate())
        this.dataFim = new Date(e.dataFinal.getFullYear(), e.dataFinal.getMonth(), e.dataFinal.getDate())
        this.updateData()
    }

    updateData(){
        let Month = this.dataFim.getMonth() + 1
        let Year = this.dataFim.getFullYear()
        this.dadosDefault.exibirLoader.next(true);
        this.$subscription3 = this.networkService.getSimples(getUrlPro(), `UpdatePanel?MonthEnd=${Month}&YearEnd=${Year}`).subscribe(v => {
            //console.log(v['value'])
            this.labelData(Month, Year)
        }, e => {
            this.messageService.add(Util.pushErrorMsg(e))
        }).add(() => this.dadosDefault.exibirLoader.next(false))
    }

    colorValue(v) {
        const classes = {
            'texto-verde': false,
            'texto-vermelho': false,
        }
        return Util.isNegative(v) ? { ...classes, 'texto-vermelho': true } : { ...classes, 'texto-verde': true }
    }

    get Value1(){
        if (!this.value1 || this.value1 <= 0) return 0
        return Util.toNumber(this.value1);
    }

    get Value2(){
        if (!this.value2 || this.value2 <= 0) return 0
        return Util.toNumber(this.value2);
    }

    get Value3(){
        if (!this.value3 || this.value3 <= 0) return 0
        return Util.toNumber(this.value3);
    }

    get Amount(){
        if (!this.data.Amount || this.data.Amount <= 0) return 0
        return Util.toNumber(this.data.Amount);
    }

    get AnalistPending() {
        if (!this.data.AnalistPending || this.data.AnalistPending <= 0) return 0
        return Util.toNumber(this.data.AnalistPending);
    }

    get CompanyPendingAnalist() {
        if (!this.data.CompanyPendingAnalist || this.data.CompanyPendingAnalist <= 0) return 0
        return Util.toNumber(this.data.CompanyPendingAnalist);
    }

    get CostomerPending() {
        if (!this.data.CostomerPending || this.data.CostomerPending <= 0) return 0
        return Util.toNumber(this.data.CostomerPending);
    }

    get CompanyPendingCostomer() {
        if (!this.data.CompanyPendingCostomer || this.data.CompanyPendingCostomer <= 0) return 0
        return Util.toNumber(this.data.CompanyPendingCostomer);
    }

    get AmountReconciled() {
        if (!this.data.AmountReconciled || this.data.AmountReconciled <= 0) return 0
        return Util.toNumber(this.data.AmountReconciled);
    }

    get IaReconciled() {
        if (!this.data.IaReconciled || this.data.IaReconciled <= 0) return 0
        return Util.toNumber(this.data.IaReconciled);
    }

    get AnalistReconciled() {
        if (!this.data.AnalistReconciled || this.data.AnalistReconciled <= 0) return 0
        return Util.toNumber(this.data.AnalistReconciled);
    }

    get CostomerReconciled() {
        if (!this.data.CostomerReconciled || this.data.CostomerReconciled <= 0) return 0
        return Util.toNumber(this.data.CostomerReconciled);
    }

    get ActiveAccount() {
        if (!this.data.ActiveAccount || this.data.ActiveAccount <= 0) return 0
        return Util.toNumber(this.data.ActiveAccount);
    }

    get ActiveCompany() {
        if (!this.data.ActiveCompany || this.data.ActiveCompany <= 0) return 0
        return Util.toNumber(this.data.ActiveCompany);
    }

    // COMPONENTE TABLE DE ANALISTA
    /*
    getCarsSmall() {
        return this.http.get('/showcase/resources/data/cars-small.json')
                    .toPromise()
                    // .then(res => <Car[]> res.data)
                    .then(data => { return data; });
    }

    valueGrafic() {
        this.data = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [{
                type: 'line',
                label: 'Dataset 1',
                borderColor: '#42A5F5',
                borderWidth: 2,
                fill: false,
                data: [
                    50,
                    25,
                    12,
                    48,
                    56,
                    76,
                    42
                ]
            }, {
                type: 'bar',
                label: 'Dataset 2',
                backgroundColor: '#66BB6A',
                data: [
                    21,
                    84,
                    24,
                    75,
                    37,
                    65,
                    34
                ],
                borderColor: 'white',
                borderWidth: 2
            }, {
                type: 'bar',
                label: 'Dataset 3',
                backgroundColor: '#FFA726',
                data: [
                    41,
                    52,
                    24,
                    74,
                    23,
                    21,
                    32
                ]
            }]
        };

        this.chartOptions =  {
            plugins: {
                legend: {
                    labels: {
                        color: '#495057'
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: '#495057'
                    },
                    grid: {
                        color: '#ebedef'
                    }
                },
                y: {
                    ticks: {
                        color: '#495057'
                    },
                    grid: {
                        color: '#ebedef'
                    }
                }
            }
        };

        // grafico de ciclo
        this.data = {
            labels: ['A','B','C'],
            datasets: [
                {
                    data: [300, 50, 100],
                    backgroundColor: [
                        "#FF6384",
                        "#36A2EB",
                        "#FFCE56"
                    ],
                    hoverBackgroundColor: [
                        "#FF6384",
                        "#36A2EB",
                        "#FFCE56"
                    ]
                }
            ]
        };
    }
    */

    /*
    updateChartOptions() {
        if (this.config.themeColor) {
            this.applyDarkTheme();
        }else{
            this.applyLightTheme();
        }
    }
    */

    applyLightTheme() {
        this.chartOptions = {
            plugins: {
                legend: {
                    labels: {
                        color: '#495057'
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: '#495057'
                    },
                    grid: {
                        color: '#ebedef'
                    }
                },
                y: {
                    ticks: {
                        color: '#495057'
                    },
                    grid: {
                        color: '#ebedef'
                    }
                }
            }
        }
    }

    applyDarkTheme() {
        this.chartOptions = {
            plugins: {
                legend: {
                    labels: {
                        color: '#ebedef'
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: '#ebedef'
                    },
                    grid: {
                        color: 'rgba(255,255,255,0.2)'
                    }
                },
                y: {
                    ticks: {
                        color: '#ebedef'
                    },
                    grid: {
                        color: 'rgba(255,255,255,0.2)'
                    }
                }
            }
        }
    }

    // do grafico de ciclo
    /*
    updateChartOptions() {
        this.chartOptions = this.config && this.config.dark ? this.getDarkTheme() : this.getLightTheme();
    }
    */

    // grafico de ciclo
    /*
    getLightTheme() {
        return {
            plugins: {
                legend: {
                    labels: {
                        color: '#495057'
                    }
                }
            }
        }
    }

    getDarkTheme() {
        return {
            plugins: {
                legend: {
                    labels: {
                        color: '#ebedef'
                    }
                }
            }
        }
    }
    */

    // grafico de onda
    /*
    this.basicData = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
            {
                label: 'First Dataset',
                data: [65, 59, 80, 81, 56, 55, 40],
                fill: false,
                borderColor: '#42A5F5',
                tension: .4
            },
            {
                label: 'Second Dataset',
                data: [28, 48, 40, 19, 86, 27, 90],
                fill: false,
                borderColor: '#FFA726',
                tension: .4
            }
        ]
    };

    this.multiAxisData = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [{
            label: 'Dataset 1',
            fill: false,
            borderColor: '#42A5F5',
            yAxisID: 'y',
            tension: .4,
            data: [65, 59, 80, 81, 56, 55, 10]
        }, {
            label: 'Dataset 2',
            fill: false,
            borderColor: '#00bb7e',
            yAxisID: 'y1',
            tension: .4,
            data: [28, 48, 40, 19, 86, 27, 90]
        }]
    };

    this.multiAxisOptions = {
        stacked: false,
        plugins: {
            legend: {
                labels: {
                    color: '#495057'
                }
            }
        },
        scales: {
            x: {
                ticks: {
                    color: '#495057'
                },
                grid: {
                    color: '#ebedef'
                }
            },
            y: {
                type: 'linear',
                display: true,
                position: 'left',
                ticks: {
                    color: '#495057'
                },
                grid: {
                    color: '#ebedef'
                }
            },
            y1: {
                type: 'linear',
                display: true,
                position: 'right',
                ticks: {
                    color: '#495057'
                },
                grid: {
                    drawOnChartArea: false,
                    color: '#ebedef'
                }
            }
        }
    };

    this.lineStylesData = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
            {
                label: 'First Dataset',
                data: [65, 59, 80, 81, 56, 55, 40],
                fill: false,
                tension: .4,
                borderColor: '#42A5F5'
            },
            {
                label: 'Second Dataset',
                data: [28, 48, 40, 19, 86, 27, 90],
                fill: false,
                borderDash: [5, 5],
                tension: .4,
                borderColor: '#66BB6A'
            },
            {
                label: 'Third Dataset',
                data: [12, 51, 62, 33, 21, 62, 45],
                fill: true,
                borderColor: '#FFA726',
                tension: .4,
                backgroundColor: 'rgba(255,167,38,0.2)'
            }
        ]
    };

    updateChartOptions() {
        if (this.config.dark)
            this.applyDarkTheme();
        else
            this.applyLightTheme();
    }

    applyLightTheme() {
        this.basicOptions = {
            plugins: {
                legend: {
                    labels: {
                        color: '#495057'
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: '#495057'
                    },
                    grid: {
                        color: '#ebedef'
                    }
                },
                y: {
                    ticks: {
                        color: '#495057'
                    },
                    grid: {
                        color: '#ebedef'
                    }
                }
            }
        };

        this.multiAxisOptions = {
            stacked: false,
            plugins: {
                legend: {
                    labels: {
                        color: '#495057'
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: '#495057'
                    },
                    grid: {
                        color: '#ebedef'
                    }
                },
                y: {
                    type: 'linear',
                    display: true,
                    position: 'left',
                    ticks: {
                        color: '#495057'
                    },
                    grid: {
                        color: '#ebedef'
                    }
                },
                y1: {
                    type: 'linear',
                    display: true,
                    position: 'right',
                    ticks: {
                        color: '#495057'
                    },
                    grid: {
                        drawOnChartArea: false,
                        color: '#ebedef'
                    }
                }
            }
        };
    }
    */

    /*
    applyDarkTheme() {
        this.basicOptions = {
            plugins: {
                legend: {
                    labels: {
                        color: '#ebedef'
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: '#ebedef'
                    },
                    grid: {
                        color: 'rgba(255,255,255,0.2)'
                    }
                },
                y: {
                    ticks: {
                        color: '#ebedef'
                    },
                    grid: {
                        color: 'rgba(255,255,255,0.2)'
                    }
                }
            }
        };
        */

        /*
        this.multiAxisOptions = {
            stacked: false,
            plugins: {
                legend: {
                    labels: {
                        color: '#ebedef'
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: '#ebedef'
                    },
                    grid: {
                        color: 'rgba(255,255,255,0.2)'
                    }
                },
                y: {
                    type: 'linear',
                    display: true,
                    position: 'left',
                    ticks: {
                        color: '#ebedef'
                    },
                    grid: {
                        color: 'rgba(255,255,255,0.2)'
                    }
                },
                y1: {
                    type: 'linear',
                    display: true,
                    position: 'right',
                    ticks: {
                        color: '#ebedef'
                    },
                    grid: {
                        drawOnChartArea: false,
                        color: 'rgba(255,255,255,0.2)'
                    }
                }
            }
        };
        */
}

// exportando classe da tabela de analista
export interface Car {
    vin;
    year;
    brand;
    color;
}
