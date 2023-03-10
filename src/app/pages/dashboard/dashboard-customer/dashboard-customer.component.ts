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

import {CarouselModule} from 'primeng/carousel';

import {Router} from "@angular/router";

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

    revenues: any = null
    expenses: any = null

    /* Carroussel */
    /* products: []; */
    responsiveOptions;
    accounts: []

    BankImage = ''

    Historic: ''
    ReleaseBalance: 0
    //releaseData: any[] = []

    constructor( private networkService: NetworkService, public router: Router, public dadosDefault: DadosDefaultService, public messageService: MessageService, private http: HttpClient ) {
        this.responsiveOptions = [
            {
                breakpoint: '1024px',
                numVisible: 5,
                numScroll: 3
            },
            {
                breakpoint: '768px',
                numVisible: 2,
                numScroll: 2
            },
            {
                breakpoint: '560px',
                numVisible: 1,
                numScroll: 1
            }
        ];
    }
    // private carService: CarService

    ngOnInit() {
        this.loadAll()

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

    loadAll() {
        this.updateData()
        this.labelData()
        this.loadBarChart()
        this.loadExpensesDonutChart()
        this.loadCards()
        //this.loadAccounts()
    }

    seeBalance() {
        console.log('fechar olho')
    }

    reconciliations() {
        console.log('reconciliations')
    }

    // QUANDO CLICAR NO BOTAO VER MAIS DO CARD IRÁ REDIRECIONAR PARA UMA PÁGINA
    viewAccountPage(bankCode) {
        this.router.navigate([`/account-launch/${bankCode}`])
    }

    labelData() {
        let Month = this.dataFim.getMonth() + 1
        let Year = this.dataFim.getFullYear()
        this.dadosDefault.exibirLoader.next(true);
        this.networkService.getSimples(getUrlPro(), `Dash1?Month=${Month}&Year=${Year}`).subscribe(v => {
            this.data = v
        }).add(() => this.dadosDefault.exibirLoader.next(false))
    }

    // PASSANDO DADOS PARA O CARD DE GRAFICO DE BARRAS
    loadBarChart() {
        let dataStart = Util.dataParaStringComZero(this.dateStart)
        let dataEnd = Util.dataParaStringComZero(this.dateEnd)
        this.dadosDefault.exibirLoader.next(true);
        this.$subscription3 = this.networkService.getSimples(getUrlPro(), `SumaryByCategory?DateIni=${dataStart}&DateEnd=${dataEnd}&Specie=R`).subscribe((v: any) => {
            this.revenues = v['value']
        }, e => {
            this.messageService.add(Util.pushErrorMsg(e))
        }).add(() => this.dadosDefault.exibirLoader.next(false))

        this.dadosDefault.exibirLoader.next(true);
        this.$subscription3 = this.networkService.getSimples(getUrlPro(), `SumaryByCategory?DateIni=${dataStart}&DateEnd=${dataEnd}&Specie=D`).subscribe((v: any) => {
            this.expenses = v['value']
            this.barChart(this.revenues, this.expenses)
        }, e => {
            this.messageService.add(Util.pushErrorMsg(e))
        }).add(() => this.dadosDefault.exibirLoader.next(false))
    }

    // PASSANDO DADOS PARA O CARD DE PRINCIPAIS DESPESAS
    loadExpensesDonutChart() {
        let dataStart = Util.dataParaStringComZero(this.dateStart)
        let dataEnd = Util.dataParaStringComZero(this.dateEnd)
        this.dadosDefault.exibirLoader.next(true);
        this.$subscription3 = this.networkService.getSimples(getUrlPro(), `SumaryByCategory?DateIni=${dataStart}&DateEnd=${dataEnd}&Specie=D`).subscribe((v: any) => {
            this.expenseDonutChart(v['value'])
        }, e => {
            this.messageService.add(Util.pushErrorMsg(e))
        }).add(() => this.dadosDefault.exibirLoader.next(false))
    }

    loadCards() {
        this.networkService.getSimples(getUrlPro(), 'ProAccount').subscribe((v: any) => {
            /* console.log('DADOS DOS CARDS')
            console.log(v['value']) */
            this.accounts = v['value']

            v['value'].map(v => {
                if(v.ContractorId) this.loadAccounts(v.Id, v.ContractorId)
            })

        }, e => {
            this.messageService.add(Util.pushErrorMsg(e))
        }).add(() => this.dadosDefault.exibirLoader.next(false))
    }

    // CARREGA OS LANCAMENTOS DA CONTA QUE TEM NO CARD EM CARROUSSEL
    loadAccounts(Id, ContractorId) {
        this.dadosDefault.exibirLoader.next(true);
        this.$subscription3 = this.networkService.getSimples(getUrlPro(), `ProStatementItem?24filter=AccountId3D${Id}&24orderby=DateMovement&24top=3`).subscribe((v: any) => {
            /* console.log('CARREGANDO LANCAMENTOS')
            console.log(v['value'].slice(0, 3)) */

            v['value'].slice(0, 3).map(v => {
                if(ContractorId === v.ContractorId) {
                    this.Historic = v.Historic
                    this.ReleaseBalance = v.Amount

                    //this.releaseData = v
                    // verifica se o lancamentos é da conta que está sendo exibida em tela
                    //this.ContractorIdLanc = v.ContractorId
                }
            })

        }, e => {
            this.messageService.add(Util.pushErrorMsg(e))
        }).add(() => this.dadosDefault.exibirLoader.next(false))
    }

    // DADOS DO CARD DO GRAFICO DE BARRAS
    barChart(revenues, expenses){
        let r = revenues.map(v => v.Amount)
        let d = expenses.map(v => v.Amount)

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
        let label = monthLabel.map(m => `${m}`)
        this.dataBar = {
            labels: label,
            datasets: [
                {
                    label: 'Receitas',
                    data: r,
                    backgroundColor: [
                        "#12D90B",
                        "#12D90B",
                        "#12D90B",
                        "#12D90B",
                        "#12D90B",
                        "#12D90B",
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
                    data: d,
                    backgroundColor: [
                        "#282FF0",
                        "#282FF0",
                        "#282FF0",
                        "#282FF0",
                        "#282FF0",
                        "#282FF0",
                        "#282FF0",
                        "#282FF0",
                        "#282FF0",
                        "#282FF0",
                        "#282FF0",
                        "#282FF0",
                    ],
                }
            ]
        };
    }

    // DADOS DO CARD DE PRINCIPAIS DESPESAS
    expenseDonutChart(value) {
        let labels = value.map(v => v.Description).slice(3)
        let data = value.map(v => v.Amount).slice(3)

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
                        "#12D90B",
                        "#00bb7e",
                        "#191970",
                        "#87CEFA",
                        "#282FF0",
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
                        "#12D90B",
                        "#00bb7e",
                        "#191970",
                        "#87CEFA",
                        "#282FF0",
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
        this.dateStart = new Date(e.dataInicial.getFullYear(), e.dataInicial.getMonth(), e.dataInicial.getDate())
        this.dateEnd = new Date(e.dataFinal.getFullYear(), e.dataFinal.getMonth(), e.dataFinal.getDate())
        this.loadAll()
        this.updateData()
    }

    updateData(){
        let Month = this.dataFim.getMonth() + 1
        let Year = this.dataFim.getFullYear()
        this.dadosDefault.exibirLoader.next(true);
        this.networkService.getSimples(getUrlPro(), `Dash1?Month=${Month}&Year=${Year}`).subscribe(v => {
            // console.log(v)
        }).add(() => this.dadosDefault.exibirLoader.next(false))
    }

    colorValue(v) {
        const classes = {
            'texto-verde': false,
            'texto-vermelho': false,
        }
        return Util.isNegative(v) ? { ...classes, 'texto-vermelho': true } : { ...classes, 'texto-verde': true }
    }

    get Balance() {
        if (!this.data.Balance) return 0
        return this.data.Balance
    }

    // VERIFICAR PARA TIRAR ALGUNS DESSES
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
