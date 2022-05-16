import { Util } from '../../controller/Util';
import { Component, OnInit, AfterViewInit, EventEmitter, Output, Input } from '@angular/core';
import { DateTopbarService } from '../../services/date-topbar.service';

@Component({
    selector: 'app-date-navigator',
    templateUrl: './date-navigator.component.html',
    styleUrls: ['./date-navigator.component.css']
})
export class DateNavigatorComponent implements OnInit, AfterViewInit {

    @Output() alterouData = new EventEmitter()
    @Input() colorFont = 0;

    dataInit = Util.getDateComUmMesAntes();
    dataFim = Util.getLastDayDate();
    Init;
    Fim;
    dataLabel = ''
    anosOptions = [
        // {label: '2015', value: 2015},
        // {label: '2016', value: 2016},
        {label: '2017', value: 2017},
        {label: '2018', value: 2018},
        {label: '2019', value: 2019},
        {label: '2020', value: 2020},
        {label: '2021', value: 2021},
        {label: '2022', value: 2022},
        {label: '2023', value: 2023},
        // {label: '2024', value: 2024},
        // {label: '2025', value: 2025},
    ];
    exibirOpcoesMes = false;

    constructor(public dateTopbar: DateTopbarService) {

    }

    ngOnInit(): void {
        this.dateTopbar.dateInit.asObservable().subscribe(valueInit => {
            this.dataInit = valueInit
            this.dateTopbar.dateFim.asObservable().subscribe(valueFim => {
                this.dataFim = valueFim
            })
        })

        this.dateTopbar.emitirDateTopbar.subscribe(date => {
            this.dataInit = date.dateInicial
            this.dataFim = date.dateFinal
            this.defineLabelData();
        })
    }
    
    get yearValueToDropdown() {
        return this.dataInit.getFullYear()
    }

    defineLabelData() {
        const monthLabel = ['Janeiro', 'Fevereiro', 'Marco', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']
        this.dataLabel = `${monthLabel[this.dataInit.getMonth()]} - ${this.dataInit.getFullYear()}`
    }

    nextDate() {
        this.dataInit = new Date(this.dataInit.getFullYear(), this.dataInit.getMonth() + 1, 1)
        this.dataFim = new Date(this.dataInit.getFullYear(), this.dataInit.getMonth() + 1, 0)
        this.defineLabelData()
        this.notificarAlteracaoData()
    }

    backDate() {
        this.dataInit = new Date(this.dataInit.getFullYear(), this.dataInit.getMonth() - 1, 1)
        this.dataFim = new Date(this.dataInit.getFullYear(), this.dataInit.getMonth() + 1, 0)
        this.defineLabelData()
        this.notificarAlteracaoData()
    }

    ngAfterViewInit(): void {
        setTimeout(() => {
            this.defineLabelData()
        }, 50)
    }

    notificarAlteracaoData() {
        this.alterouData.emit({
            dataInicial: this.dataInit,
            dataFinal: this.dataFim,
        });
    }

    setMonth(mes: number) {
        this.dataInit = new Date(this.dataInit.getFullYear(), mes, 1)
        this.dataFim = new Date(this.dataInit.getFullYear(), mes + 1, 0)
        this.defineLabelData()
        this.notificarAlteracaoData()
        this.exibirOpcoesMes = false;
    }

    clickOutside() {
        if(this.exibirOpcoesMes) this.exibirOpcoesMes = false;
    }

    openCloseOpcoes(event) {
        this.exibirOpcoesMes = !this.exibirOpcoesMes
        event.stopPropagation()
    }

    setYear(e: any) {
        this.dataInit = new Date(e.value, this.dataInit.getMonth(), 1)
        this.dataFim = new Date(e.value, this.dataInit.getMonth() + 1, 0)
        this.defineLabelData()
        this.notificarAlteracaoData()
    }
}