import { mul6, div6, sum6, sub6 } from './../../../controller/Util';
import { getUrlPro } from './../../../controller/staticValues';
import { NetworkService } from './../../../services/network.service';
import { Util } from 'src/app/controller/Util';

import { Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { AppBreadcrumbService } from 'src/app/app.breadcrumb.service';


@Component({
    selector: 'app-dashboard-company',
    templateUrl: './dashboard-company.component.html',
    styleUrls: ['./dashboard-company.component.css']
})
export class DashboardCompanyComponent implements OnInit {

    data

    dataDoughnut

    donutChartExpenseData
    optionsDoughnutExpense: any

    dataBar

    chartOptions: any;

    optionsBar: any;

    optionsDoughnut: any;

    subscription: Subscription;

    // config: AppConfig; // - nao tem

    // private configService: AppConfigService // -  nao tem

    basicData: any;

    multiAxisData: any;

    multiAxisOptions: any;

    lineStylesData: any;

    basicOptions: any;

    horizontalOptions: any;

    dateStart = Util.getDateComUmMesAntes()
    dateEnd = Util.getLastDayDate()

    pendentes = 0
    Expenses = 0
    Revenues = 0

    constructor(private networkService: NetworkService,private breadcrumbService: AppBreadcrumbService) {
        this.breadcrumbService.setItems([
            { label: 'Dashboard', routerLink: ['home'] }
        ]);
    }



    ngOnInit() {
        this.loadAll()
        // grafico de barra



        // grafico de ciclo



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

    loadAll(){
        this.valueGrafic()
        this.loadDonutChart()
        this.loadExpensesDonutChart() // DESPESAS
        this.loadBarChart()
        this.loadPorcentageBar()
        this.loadhorizontalChart()
    }

    loadDonutChart() {
        let dataStart = Util.dataParaStringComZero(this.dateStart)
        let dataEnd = Util.dataParaStringComZero(this.dateEnd)
        this.networkService.exibirLoader.next(true)
        this.networkService.getSimples(getUrlPro(), `SumaryByCategory?DateIni=${dataStart}&DateEnd=${dataEnd}&Specie=R`).subscribe(v => {
            this.donutChart(v['value'])
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

    loadBarChart() {
        let dataStart = Util.dataParaStringComZero(Util.getDatefrom6Month())
        let dataEnd = Util.dataParaStringComZero(Util.getLastDateFrom6Month())
        this.networkService.exibirLoader.next(true)
        this.networkService.getSimples(getUrlPro(), `MonthlyEvolution?DateIni=${dataStart}&DateEnd=${dataEnd}`).subscribe(v => {
            this.barChart(v['value'])
        }).add(() => this.networkService.exibirLoader.next(false))
    }

    loadPorcentageBar(){
        let month = this.dateStart.getMonth() + 1
        let year = this.dateEnd.getFullYear()

        this.networkService.exibirLoader.next(true)
        this.networkService.getSimples(getUrlPro(), `Dash1?Month=${month}&Year=${year}`).subscribe((v: any) => {
            this.data = v
            let porcentage = sum6(v.Expenses,v.Revenues).toFixed(2)

            if (v.Expenses) this.Expenses = Util.toNumber(div6(porcentage, mul6(v.Expenses, 100)),2)
            if (v.Revenues) this.Revenues = Util.toNumber(div6(porcentage, mul6(v.Revenues, 100)),2)
            // Util.toNumber(div6(sub6(v.Expenses, porcentage), 100), 2)
        }).add(() => this.networkService.exibirLoader.next(false))
    }

    loadhorizontalChart() {
        this.horizontalChart()
    }

    horizontalChart() {
        this.basicData = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [
                {
                    label: 'My First dataset',
                    backgroundColor: '#42A5F5',
                    data: [65, 59, 80, 81, 56, 55, 40]
                },
                {
                    label: 'My Second dataset',
                    backgroundColor: '#FFA726',
                    data: [28, 48, 40, 19, 86, 27, 90]
                }
            ]
        };

        this.horizontalOptions = {
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
        };
    }

    donutChart(value) {
        let labels = value.map(v => v.Description)
        let data = value.map(v => v.Amount)

        console.log('receita')
        console.log(value)

        this.optionsDoughnut = {
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

        this.dataDoughnut = {
            labels: labels,
            datasets: [
                {
                    label: '1',
                    data: data,
                    backgroundColor: [
                        "#FF6384",
                        "#36A2EB",
                        "#FFCE56",
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
                        "#FF6384",
                        "#36A2EB",
                        "#FFCE56",
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
                        "#FF6384",
                        "#36A2EB",
                        "#FFCE56",
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
                        "#FF6384",
                        "#36A2EB",
                        "#FFCE56",
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
                        "#FF6384",
                        "#FF6384",
                        "#FF6384",
                        "#FF6384",
                        "#FF6384",
                        "#FF6384",
                    ],
                },
                {
                    label: 'Despesas',
                    data: debits,
                    backgroundColor: [
                        "#36A2EB",
                        "#36A2EB",
                        "#36A2EB",
                        "#36A2EB",
                        "#36A2EB",
                        "#36A2EB",
                    ],
                },
                {
                    label: 'Saldo',
                    data: inicialBalance,
                    backgroundColor: [
                        "#00bb7e",
                        "#00bb7e",
                        "#00bb7e",
                        "#00bb7e",
                        "#00bb7e",
                        "#00bb7e",
                    ],
                }
            ]
        };
    }

    /*
    updateChartOptions() {
        if (this.config.themeColor) {
            this.applyDarkTheme();
        }else{
            this.applyLightTheme();
        }
    }
    */

    valueGrafic() {
        // this.data = {
        //     labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        //     datasets: [{
        //         type: 'line',
        //         label: 'Dataset 1',
        //         borderColor: '#42A5F5',
        //         borderWidth: 2,
        //         fill: false,
        //         data: [
        //             50,
        //             25,
        //             12,
        //             48,
        //             56,
        //             76,
        //             42
        //         ]
        //     }, {
        //         type: 'bar',
        //         label: 'Dataset 2',
        //         backgroundColor: '#66BB6A',
        //         data: [
        //             21,
        //             84,
        //             24,
        //             75,
        //             37,
        //             65,
        //             34
        //         ],
        //         borderColor: 'white',
        //         borderWidth: 2
        //     }, {
        //         type: 'bar',
        //         label: 'Dataset 3',
        //         backgroundColor: '#FFA726',
        //         data: [
        //             41,
        //             52,
        //             24,
        //             74,
        //             23,
        //             21,
        //             32
        //         ]
        //     }]
        // };

        /* this.donutChartExpenseData = {


            labels: ['A', 'B', 'C'],
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
        }; */




    }

    alterouData(e) {
        this.dateStart = new Date(e.dataInicial.getFullYear(), e.dataInicial.getMonth(), e.dataInicial.getDate())
        this.dateEnd = new Date(e.dataFinal.getFullYear(), e.dataFinal.getMonth(), e.dataFinal.getDate())
        this.loadAll()
        // this.carregarLista()
    }

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

    get Balance() {
        if (!this.data.Balance) return 0
        return this.data.Balance
    }

    colorValue(v) {
        const classes = {
            'texto-verde': false,
            'texto-vermelho': false,
        }
        return Util.isNegative(v) ? { ...classes, 'texto-vermelho': true } : { ...classes, 'texto-verde': true }
    }

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
