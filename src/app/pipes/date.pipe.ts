import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'date'
})
export class DatePipe implements PipeTransform {
    transform(value: any, args?: any): any {
        if (value === undefined || value === null) return ''

        if(value.toString().includes('T')) {
            value = value.replace(/T.+/, '')
        }

        if (value.toString().length === 10)
            return value.toString().split('-').reverse().join('/')
        if (value.toString().length === 23)
            return value.toString().substring(0, 10).split('-').reverse().join('/')
        if (value.toString().length === 19) {
            return value.toString().substring(0, 10).split('-').reverse().join('/')
        } else {
            return value
        }
    }
}
