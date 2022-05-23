import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cpfCnpj'
})
export class CpfCnpjPipe implements PipeTransform {

  transform(value: any, args?: any): any {
      if(value === undefined || value === null) return  ''
      const valor = value.toString().match(/\d/g)
      if(!valor) return ''
      if(valor.length === 11) {
          valor.splice(3, 0, '.')
          valor.splice(7, 0, '.')
          valor.splice(11, 0, '-')
      } else if(valor.length === 14) {
          valor.splice(2, 0, '.')
          valor.splice(6, 0, '.')
          valor.splice(10, 0, '/')
          valor.splice(15, 0, '-')
      }
      return valor.join('').replace(',','')
  }

}
