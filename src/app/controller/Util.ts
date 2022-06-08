import { saveAs } from 'file-saver';
import { DateTopbarService } from '../services/date-topbar.service';

export class Util {

    static anos() {
        return [
            {label: "2025", value: 2025},
            {label: "2024", value: 2024},
            {label: "2023", value: 2023},
            {label: "2022", value: 2022},
            {label: "2021", value: 2021},
            {label: "2020", value: 2020},
            {label: "2019", value: 2019},
            {label: "2018", value: 2018},
            {label: "2017", value: 2017},
            {label: "2016", value: 2016},
            {label: "2015", value: 2015},
        ]
    }

    static randomId() {
        let text = "";
        const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for (let i = 0; i < 5; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));

        return text;
    }

    static defaultInputClass(size: string) {        
        return {[`p-col-${size} p-md-${size} p-sm-12`]: true}
    }

    static expandedQuery(campos, replace?) {
        let query = '?$expand=' + campos[0]
        for (let i = 1; i < campos.length; i++) {
            query = query + '&$expand=' + campos[i]
        }
        return replace ? query.replace('?', '&') : query
    }

    static cadastroRoute() {
        return 'cadastro'
    }

    static pushErrorMsg(error: any): any {
        try {
            return [{severity: 'error', summary: error, sticky: true}]
        } catch (e) {
            return [{severity: 'error', summary: JSON.stringify(error), life: 1000}]
        }
    }

    static pushSuccessMsg(msg: any): any {
        try {
            return [{severity: 'success', summary: msg, sticky: true}]
        } catch (e) {
            return [{severity: 'success', summary: JSON.stringify(msg), sticky: true}]
        }
    }

    static pushSuccessMsgSemDelay(msg = 'Operação concluída!'): any {
        try {
            return [{severity: 'success', summary: msg, life: 1000}]
        } catch (e) {
            return [{severity: 'success', summary: JSON.stringify(msg), life: 1000}]
        }
    }

    static dataInit(): any {
        let dateTopbar: DateTopbarService
        dateTopbar.dateInit.asObservable().subscribe(value => {return value})
    }

    static dataFim(): any {
        let dateTopbar: DateTopbarService
        dateTopbar.dateFim.asObservable().subscribe(value => {return value})
    }

    static pushInfoMessage(msg: any): any {
        try {
            return [{severity: 'info', summary: msg}]
        } catch (e) {
            return [{severity: 'info', summary: JSON.stringify(msg)}]
        }
    }

    static valueToSelect(value) {
        const label = value['Nome']? value['Nome'] : value['Descricao']
        return {label, value: value['Id']}
    }

    static toNumber = (val, casas = 2) =>  {
        const v = val === undefined ? 0 : val === null ? 0 : typeof val === 'number' ? Number(val.toFixed(casas)) : Number(Number.parseFloat(val.toString().replace(',', '.')).toFixed(casas))
        return isNaN(v) || !isFinite(v) ? 0 : v
    }

    static toNumber2 = val =>  {
        const v = val === undefined ? 0 : val === null ? 0 : typeof val === 'number' ? val : Number.parseFloat(val.replace(',', '.'))
        return isNaN(v) ? 0 : v
    }

    static formataVirgula = value => {
        if (value === undefined || value === null || value === '') {
            return '0,00'
        } else {
            let data = '' + value
            data = data.replace(/\./g, ',');
            data = data.match(/,\d{1}$/g) ? data + '0' : data.match(/,\d{2}/g) ? data : data + ',00'
            return data

        }
    }

    static up(value) {
        //value === undefined || value === null ? '' : typeof value === 'string' ? value.toUpperCase() : value
        return value
    }

    static lower = value => value === undefined || value === null ? '' : typeof value === 'string' ? value.toLowerCase() : value

    static uuidv4() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            // tslint:disable-next-line:no-bitwise triple-equals
            const r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }


    static getDateComUmMesAntes() {
        const currentDate = new Date()
        return new Date(currentDate.getFullYear(), currentDate.getMonth(), 1)
    }

    static getDatePreviousMonth(d: Date) {
        d.setMonth(d.getMonth() - 1)
        return d
    }

    static getLastDayDate() {
        const currentDate = new Date()
        return new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0)
    }

    static isNegative = v => Util.toNumber(v) < 0


    static extractErrorMessage = (v) => {
        if(typeof v !== 'object') return v
        try {
            return v.message
        } catch (e) {
            return v
        }
    }

    static getMonthLabel(v) {
        switch (v) {
            case 0:
                return 'Jan'
            case 1:
                return 'Fev'
            case 2:
                return 'Mar'
            case 3:
                return 'Abr'
            case 4:
                return 'Mai'
            case 5:
                return 'Jun'
            case 6:
                return 'Jul'
            case 7:
                return 'Ago'
            case 8:
                return 'Set'
            case 9:
                return 'Out'
            case 10:
                return 'Nov'
            case 11:
                return 'Dez'
            default:
                return ''

        }
    }

    static addZero = v => v.toString().length === 1 ? '0' + v : v;

    static extractFileErrorMessage(e) {
        let decodedString = new TextDecoder("utf-8").decode(new Uint8Array(e.error));
        const message = JSON.parse(decodedString)['error']['message'];
        let arr = message.toString().split('')
        arr = arr.map(x => x === '.' ? x + '       \n\n' : x)
        const result = arr.join('')
        return result
    }

    static dataParaString(date: Date) {
        return `${date.getFullYear()}-${Util.addZero(date.getMonth() + 1)}-${date.getDate()}`
    }

    static dataParaStringComZero(date: Date) {
        return `${date.getFullYear()}-${Util.addZero(date.getMonth() + 1)}-${Util.addZero(date.getDate())}`
    }

    static saveCsvFromRelatorio(v) {
        // @ts-ignore
        let decoded = String.fromCharCode(...new Uint8Array(v.body));
        const fileName = v.headers.get('file-name')
        const file = new Blob([decoded], {type: 'text/csv;charset=UTF-8'});
        saveAs(file, fileName)
    }

    static saveZip(v) {
        const blob = new Blob([v.body], {type: "application/zip"});

        // @ts-ignore
        const fileName = v.headers.get('file-name')
        saveAs(blob, fileName)
    }

    static savePdf(v) {
        const fileName = v.headers.get('file-name')
        const file = new Blob([v.body], {type: 'application/pdf'});
        const fileURL = window.URL.createObjectURL(file);
        window.open(fileURL, '_blank');
        saveAs(file, fileName)
    }

    static saveXml(v) {
        const fileName = v.headers.get('file-name')
        const file = new Blob([v.body], {type: 'text/xml'});
        saveAs(file, fileName)
    }

    static saveExcelFile(v) {
        // @ts-ignore
        let fileName = v.headers.get('file-name')
        if(fileName !== null) fileName = fileName.replace('https://xmldfe.s3-sa-east-1.amazonaws.com/', '')
        const file = new Blob([v.body], {type: v.headers.get('Content-Type')});
        saveAs(file, fileName)
    }

    static saveTextFile(v) {
        // @ts-ignore
        let decoded = String.fromCharCode(...new Uint8Array(v.body));
        let fileName = v.headers.get('file-name')
        if(fileName !== null) fileName = fileName.replace('https://xmldfe.s3-sa-east-1.amazonaws.com/', '')
        const file = new Blob([decoded], {type: v.headers.get('Content-Type')});
        saveAs(file, fileName)
    }

    static saveTextFileAnsi(v) {
        // @ts-ignore
        let decoded = String.fromCharCode(...new Uint8Array(v.body));
        let fileName = v.headers.get('file-name')
        if(fileName !== null) fileName = fileName.replace('https://xmldfe.s3-sa-east-1.amazonaws.com/', '')
        const file = new Blob([decoded], { type: "text/csv;charset=windows-1252"});
        saveAs(file, fileName)
    }

}


export const sum = (a, b) => {
    a = Util.toNumber(a)
    b = Util.toNumber(b)
    return Util.toNumber((a + b).toFixed(2))
}

export const sub = (a, b) => {
    a = Util.toNumber(a)
    b = Util.toNumber(b)
    return Util.toNumber((a - b).toFixed(2))
}

export const mul = (a, b) => {
    a = Util.toNumber(a)
    b = Util.toNumber(b)
    return Util.toNumber((a * b).toFixed(2))
}

export const div = (a, b) => {
    a = Util.toNumber(a)
    b = Util.toNumber(b)
    return Util.toNumber((a / b).toFixed(2))
}


export const sum6 = (a, b) => {
    a = Util.toNumber(a, 6)
    b = Util.toNumber(b, 6)
    return Util.toNumber((a + b).toFixed(6), 6)
}

export const sub6 = (a, b) => {
    a = Util.toNumber(a, 6)
    b = Util.toNumber(b, 6)
    return Util.toNumber((a - b).toFixed(6), 6)
}

export const mul6 = (a, b) => {
    a = Util.toNumber(a, 6)
    b = Util.toNumber(b, 6)
    return Util.toNumber((a * b).toFixed(6), 6)
}

export const div6 = (a, b) => {
    a = Util.toNumber(a, 6)
    b = Util.toNumber(b, 6)
    return Util.toNumber((a / b).toFixed(6), 6)
}

export const hasValue = v => v !== undefined && v!== null && v !== '' && v !== 0 && v !== '0' && v !== '0,00' && v !== '0.00'
