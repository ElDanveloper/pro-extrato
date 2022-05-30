import {FormBuilder, FormGroup} from "@angular/forms";
import * as moment from 'moment'

export class Formulario {

    static prepareValueToForm(model: any, value: {}, datas?, relacionamentos?, checkbox?, exclude?): any {
        let data = {}
        if(exclude) exclude.forEach(v => delete model[v])

        Object.keys(model).filter(key => {
            if (relacionamentos && relacionamentos.findIndex(v => v === key) !== -1 && value[key] !== null) {
                if(value[key] !== undefined) data[key] = value[key]['Id'] || null;
            } else if (value.hasOwnProperty(key)) {
                data[key] = value[key]
            }
            if (datas != null && datas.length > 0) {
                datas.forEach(v => {
                    if (value[v] != null) {
                        let myMoment: moment.Moment = moment(data[v])
                        data[v] = myMoment['_d']
                    }
                })
            }
            if (checkbox != null && checkbox.length > 0) {
                checkbox.forEach(v => {
                    data[v] = !(value[v] == null || value[v] === 'N' || value[v] === false)
                })
            }
        })
        return data
    }

    static createForm(obj: {}, fb: FormBuilder, validators = [], exclude?): FormGroup {
        let data = {}
        if(exclude) exclude.forEach(v => delete obj[v])

        Object.keys(obj).forEach(key => {
            const validationIndex = validators.findIndex(f => f.campo === key)
            if (validationIndex !== -1) {
                data[key] = fb.control('', validators[validationIndex].validation)
            } else {
                data[key] = fb.control('')
            }
        })
        return fb.group(data)
    }

    static parseForm(obj: {}, value: {}, relacionamentos?: Array<{ chave, referencia }>, mascaras?: string[], datas?: string[], checkbox?: string[], checkboxNovo?: string[], exclude?) : any {
        let data = {}
        if(exclude) exclude.forEach(v => delete obj[v])

        Object.keys(value).forEach(key => {
            if (value[key] === undefined || value[key] === null) value[key] = ''
            typeof obj[key] === 'number' ? data[key] = Number.parseFloat(value[key].toString().replace(',', '.')) || 0 : data[key] = value[key].toString().includes('(') ? value[key] : value[key].toString() || ''
        })
        if (relacionamentos != null && relacionamentos.length > 0) {
            relacionamentos.forEach(v => {
                let nome = v.chave + '@xdata.ref';
                if (data[v.chave] && data[v.chave].toString().match(/\d/g) && data[v.chave] != 0) {
                    if (data[v.chave].toString().includes('(')) {
                        data[nome] = data[v.chave]
                    } else {
                        data[nome] = v.referencia + '(' + data[v.chave] + ')'
                    }
                    delete data[v.chave];
                } else {
                    delete data[nome];
                    delete data[v.chave];
                }
            })
        }
        if (mascaras != null && mascaras.length > 0) {
            mascaras.forEach(value => data[value] = this.removeMascara(data[value]))
        }
        if (datas != null && datas.length > 0) {
            datas.forEach(value => data[value] = this.dataParaString(data[value]))
        }
        if (checkbox != null && checkbox.length > 0) {
            checkbox.forEach(value => {
                data[value] = data[value] === true || data[value] === "true" ? 'S' : 'N'
            })

        }
        for (let key in data) {
            if (data[key] === "") data[key] = null
        }
        if (checkboxNovo != null && checkboxNovo.length > 0) {
            checkboxNovo.forEach(value => {
                data[value] = data[value] === 'TRUE' || data[value] === true || data[value] === 'true'
            })
        }
        if (data['Id'] === null || data['Id'] === '') data['Id'] = 0
        return data
    }

    static removeMascara(value: string) {
        if (value == null || value.trim() === '') return ''
        return value.match(/\d/g).join('')
    }

    static dataParaString(data) {
        if (data === undefined || data === null || data === '') return ''
        if(typeof data === 'string') return  data
        let mes = (data.getUTCMonth() + 1).toString()
        if (mes.length === 1) mes = '0' + mes
        let dia = data.getUTCDate().toString()
        if (dia.length === 1) dia = '0' + dia
        return data.getUTCFullYear() + '-' + mes + '-' + dia
    }

    static dataParaStringComHora(data) {
        if (data === undefined || data === null || data === '') return ''
        if(typeof data === 'string') return  data
        let mes = (data.getUTCMonth() + 1).toString()
        if (mes.length === 1) mes = '0' + mes
        let dia = data.getUTCDate().toString()
        if (dia.length === 1) dia = '0' + dia
        let hora = data.getUTCHours()
        if (hora.length === 1) hora = '0' + hora
        let minuto = data.getUTCMinutes()
        if (minuto.length === 1) minuto = '0' + minuto
        let segundos = data.getUTCSeconds()
        if (segundos.length === 1) segundos = '0' + segundos
        return data.getUTCFullYear() + '-' + mes + '-' + dia + ' ' + hora + ':' + minuto + ':' + segundos + '.000000'
    }

    static verifyIfExistsValues(value: {}) {
        let hasValues = false
        Object.keys(value).forEach(key => {
            if (value[key] !== '') hasValues = true
        })
        return hasValues
    }

    static stringParaData(data) {
        if(data == null) return data
        let myMoment: moment.Moment = moment(data)
        return myMoment['_d']
    }
}


