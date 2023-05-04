import { Subscription } from 'rxjs';
import {Component, OnInit} from '@angular/core';
import { NetworkService } from 'src/app/services/network.service';
import { getUrlPro } from 'src/app/controller/staticValues';
import { DadosDefaultService } from 'src/app/services/dados-default.service';
import { Util } from 'src/app/controller/Util';
import { MessageService } from 'primeng/api';
import { HttpClient } from '@angular/common/http';
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

    chartOptions: any;

    revenues: any = null
    expenses: any = null

    /* Carroussel */
    responsiveOptions;
    accounts: []
    proStatement: []
    Historic: string[]
    ReleaseBalance: 0

    Visible = 0
    Scroll = 0

    constructor( private networkService: NetworkService, public router: Router, public dadosDefault: DadosDefaultService, public messageService: MessageService, private http: HttpClient ) {
        this.responsiveOptions = [
            {
                breakpoint: '1920px',
                numVisible: 4,
                numScroll: 4
            },
            {
                breakpoint: '1440px',
                numVisible: 4,
                numScroll: 4
            },
            {
                breakpoint: '1366px',
                numVisible: 3,
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

    ngOnInit() {
        //pegar a quantidade de visualização e de scroll do carrosel de acordo com o width do monitor do cliente
        let resolution = this.responsiveOptions.find(x => x.breakpoint === window.innerWidth.toString()+'px');
        this.Visible = resolution.numVisible
        this.Scroll = resolution.numScroll

        this.loadAll()
    }

    loadAll() {
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

    // QUANDO CLICAR NO BOTAO VER MAIS DO CARD NO CARROUSSEL IRÁ REDIRECIONAR PARA UMA PÁGINA
    viewAccountPage(Id) {
        this.router.navigate([`/account-launch/${Id}`])
    }

    alterouData(e) {
        this.dateStart = new Date(e.dataInicial.getFullYear(), e.dataInicial.getMonth(), e.dataInicial.getDate())
        this.dateEnd = new Date(e.dataFinal.getFullYear(), e.dataFinal.getMonth(), e.dataFinal.getDate())
        this.loadAll()
    }

    labelData() {
        let Month = this.dateEnd.getMonth() + 1
        let dataFim = Util.getLastDayDate();
        let Year = dataFim.getFullYear()
        this.dadosDefault.exibirLoader.next(true);
        this.networkService.getSimples(getUrlPro(), `Dash1?Month=${Month}&Year=${Year}`).subscribe(v => {
            this.data = v
        }).add(() => this.dadosDefault.exibirLoader.next(false))
    }

    // PASSANDO DADOS PARA O CARD DE RECEITAS E DESPESAS - grafico de barras
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

    // PASSANDO DADOS PARA O CARD DE PRINCIPAIS DESPESAS - grafico de rosca
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
        this.dadosDefault.exibirLoader.next(true)
        this.networkService.getSimples(getUrlPro(), 'ProAccount').subscribe((v: any) => {
            this.accounts = v['value']
            // v['value'].map(v => {
            //     this.loadAccounts(v.Id)
            // })
            // this.loadAccounts(v['value'].Id)
        }, e => {
            this.messageService.add(Util.pushErrorMsg(e))
        }).add(() => this.dadosDefault.exibirLoader.next(false))
    }

    // CARREGA OS LANCAMENTOS DA CONTA NO CARD EM CARROUSSEL
    loadAccounts(Id) {
        this.dadosDefault.exibirLoader.next(true);
        this.$subscription3 = this.networkService.getSimples(getUrlPro(), `ProStatementItem?24filter=AccountId3D${Id}&24orderby=DateMovement&24top=3`).subscribe((v: any) => {            
            v['value'].map(v => {                
                this.Historic = v.Historic
                this.ReleaseBalance = v.Amount
            })
        }, e => {
            this.messageService.add(Util.pushErrorMsg(e))
        }).add(() => this.dadosDefault.exibirLoader.next(false))
    }

    // DADOS DO GRAFICO DE BARRAS
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

        /* const monthLabel = ['Janeiro', 'Fevereiro', 'Marco', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'] */
        const monthLabel = ['Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']
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

    // DADOS DO GRAFICO DE ROSCA
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

    /* colorValue(v) {
        const classes = {
            'texto-verde': false,
            'texto-vermelho': false,
        }
        return Util.isNegative(v) ? { ...classes, 'texto-vermelho': true } : { ...classes, 'texto-verde': true }
    } */

    get Balance() {
        if (!this.data.Balance) return 0
        return this.data.Balance
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
}

