import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'CommaPipeZero'
})
export class CommaPipeZeroPipe implements PipeTransform {

    transform(value: any, args?: any): any {
        if (value === undefined || value == null || value === '') {
            return ''
        } else {
            let data: any = '' + value
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
