import {Injectable, EventEmitter} from '@angular/core'
import { BehaviorSubject} from 'rxjs';
import { Util } from '../controller/Util';

@Injectable({
    providedIn: 'root'
})
export class DateTopbarService {

    emitirDateTopbar = new EventEmitter();
    currentDate = new Date()
    public dateInit = new BehaviorSubject(new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() -1, 1));
    public dateFim = new BehaviorSubject(new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), 0));

    constructor(){
    }
    
    dateTopbar(){
        console.log(this.dateInit, this.dateFim)
        let date1
        let date2
        
        this.dateInit.asObservable().subscribe(valueInit => {
            date1 = valueInit
        })
        this.dateFim.asObservable().subscribe(valueFim => {
            date2 = valueFim
        })

        this.emitirDateTopbar.emit({
            dateInicial: date1,
            dateFinal: date2
        })
    }
}