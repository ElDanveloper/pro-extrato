import { Util } from '../controller/Util';
import {Pipe, PipeTransform} from '@angular/core';


@Pipe({
    name: 'virgulaPipe'
})
export class VirgulaPipe implements PipeTransform {

    transform(value: any, args?: any): any {
        //TODO verificar se os valores sao somente numeros
        if (value === undefined || value === null || value === '') {
            return '0,00'
        } else {
            let data: any = '' + Util.toNumber(value)
            data = data.replace('.', ',');
            data = data.match(/,\d{1}$/g) ? data + '0' : data.match(/,\d{2}/g) ? data : data + ',00'
            let index = data.indexOf(',')

            while (index > 3) {
                let temp = data.split('')
                temp.splice(index - 3, 0, '.')
                data = temp.join('')
                index = data.indexOf('.')
            }
            if(data.match(/^-\./)) {
                data = data.split('')
                data.splice(1, 1)
                data = data.join('')
            }
            return data
        }
    }

}
