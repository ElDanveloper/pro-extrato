import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DadosDefaultService } from '../../services/dados-default.service';
import { Router } from "@angular/router";
import { BehaviorSubject } from 'rxjs'
import { Util } from "../../controller/Util";


@Component({
    selector: 'app-browse-environment',
    templateUrl: './browse-environment.component.html',
    styleUrls: ['./browse-environment.component.css']
})
export class BrowseEnvironmentComponent implements OnInit {

    @Output() alterouData = new EventEmitter()
    @Output() ano = new EventEmitter();

    dataInit = Util.getDateComUmMesAntes();
    dataFim = Util.getLastDayDate();
    dashBoard = []
    dataLabel = 'Escolha o Ambiente'
    private cont = new BehaviorSubject(null)

    constructor(private dadosDefault: DadosDefaultService, public router: Router) {

    }

    ngOnInit(): void {
        // this.dadosDefault.dashBoard().subscribe(v => {
        //     this.dashBoard = v[0]
        //     this.cont.next(Number(sessionStorage.getItem(ID_DASHBOARD)));
        //     if(this.cont.getValue() === Number){
        //         this.dashBoard.forEach(v => {
        //             if(this.cont.getValue() === v.value){
        //                 this.dataLabel = v.label
        //             }
        //         })
        //     } else if(this.cont.getValue() !== Number){
        //         this.dataLabel = this.dashBoard[0].label
        //     }
        // })
    }

    defineLabel() {
        switch (this.cont.getValue()) {
            case 1: {
                'Ambiente Empresa'
                break;
            }
            case 2: {
                'Ambiente Contador'
                break;
            }
            default: {
                'Escolha o Ambiente'
                break;
            }
        }
    }

    nextDate() {
        let contador = 0
        console.log(this.cont.getValue());
        this.dashBoard.map((v, i) => {
            if (this.cont.getValue() === v.value && contador === 0) {
                if (this.dashBoard[i + 1] === undefined) {
                    contador = 1;
                    this.cont.next(this.dashBoard[0].value)
                    this.dataLabel = this.dashBoard[0].label
                    this.defineLabel()
                    return true
                };
                contador = 1;
                this.cont.next(this.dashBoard[i + 1].value)
                this.dataLabel = this.dashBoard[i + 1].label
                this.defineLabel()
                return true;
            }
        })
    }

    backDate() {
        let contador = 0
        console.log(this.cont.getValue());
        this.dashBoard.map((v, i) => {
            if (this.cont.getValue() === v.value && contador === 0) {
                if (i === 0) {
                    contador = 1;
                    this.cont.next(this.dashBoard[this.dashBoard.length - 1].value)
                    this.dataLabel = this.dashBoard[this.dashBoard.length - 1].label
                    this.defineLabel()
                    return true;
                }
                if (this.dashBoard[i - 1] === undefined) {
                    contador = 1;
                    this.cont.next(this.dashBoard[0].value)
                    this.dataLabel = this.dashBoard[0].label
                    this.defineLabel()
                    return true;
                };
                contador = 1;
                this.cont.next(this.dashBoard[i - 1].value)
                this.dataLabel = this.dashBoard[i - 1].label
                this.defineLabel()
                return true;
            }
        })
    }


}
