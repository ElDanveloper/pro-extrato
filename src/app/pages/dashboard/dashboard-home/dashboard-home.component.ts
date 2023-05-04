
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
    selector: 'app-dashboard-home',
    templateUrl: './dashboard-home.component.html',
    styleUrls: ['./dashboard-home.component.css']
})
export class DashboardHomeComponent implements OnInit {

    $subscription3: Subscription;

    data

    //barChartData
    //barChartOptions: any;

    stackedData: any;
    stackedOptions: any;

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
        this.loadStacked()
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

    loadStacked() {
        let Month = this.dataFim.getMonth() + 1
        let Year = this.dataFim.getFullYear()
        this.dadosDefault.exibirLoader.next(true);
            this.$subscription3 = this.networkService.getSimples(getUrlPro(), `DashAccountGraphic12Month?MonthEnd=${Month}&YearEnd=${Year}`).subscribe((v: any) => {
                this.stacked(v['value'])
            }, e => {
                this.messageService.add(Util.pushErrorMsg(e))
            }).add(() => this.dadosDefault.exibirLoader.next(false))
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

    stacked(value){
        console.log('stacked ---> ' + JSON.stringify(value))
        let Amount = value.map(v => v.Amount)
        let Pending = value.map(v => v.Pending)
        let Analist = value.map(v => v.Analist)
        let Ia = value.map(v => v.Ia)
        let Costomer = value.map(v => v.Costomer)

        /*
        this.barChartOptions = {
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
        */

        const monthLabel = ['Janeiro', 'Fevereiro', 'Marco', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']
        let label = value.map(v => `${monthLabel[v.Month-1]}`)
        this.stackedData = {
            labels: label,
            datasets: [{
                type: 'bar',
                label: 'Montante',
                backgroundColor: '#FF6384',
                data: Amount
            }, {
                type: 'bar',
                label: 'Pendente',
                backgroundColor: '#FFCE56',
                data: Pending
            }, {
                type: 'bar',
                label: 'Analista',
                backgroundColor: '#36A2EB',
                data: Analist
            }, {
                type: 'bar',
                label: 'IA',
                backgroundColor: '#00bb7e',
                data: Ia
            }, {
                type: 'bar',
                label: 'Cliente',
                backgroundColor: '#191970',
                data: Costomer
            }]
        };

        this.stackedOptions = {
            tooltips: {
                mode: 'index',
                intersect: false
            },
            responsive: true,
            scales: {
                xAxes: [{
                    stacked: true,
                }],
                yAxes: [{
                    stacked: true
                }]
            }
        };

        /*
        this.barChartData = {
            labels: label,
            datasets: [
                {
                    label: 'Montante',
                    data: Amount,
                    backgroundColor: [
                        "#FF6384",
                        "#FF6384",
                        "#FF6384",
                    ],
                },
                {
                    label: 'Pendente',
                    data: Pending,
                    backgroundColor: [
                        "#FFCE56",
                        "#FFCE56",
                        "#FFCE56",
                    ],
                },
                {
                    label: 'Analista',
                    data: Analist,
                    backgroundColor: [
                        "#36A2EB",
                        "#36A2EB",
                        "#36A2EB",
                    ],
                },
                {
                    label: 'IA',
                    data: Ia,
                    backgroundColor: [
                        "#00bb7e",
                        "#00bb7e",
                        "#00bb7e",
                    ],
                },
                {
                    label: 'Cliente',
                    data: Costomer,
                    backgroundColor: [
                        "#191970",
                        "#191970",
                        "#191970",
                    ],
                },
            ]
        };
        */
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
