export class ProMonthlyClose {
    Id: number = 0
    ContractorClientId: number = 0
    ContractorId: number = 0
    Day: number = 0
    Month: number = 0
    Year: number = 0
    DateBalance: any = ''
    Balance: number = 0
    Status: string = ''
    AccountId: string = ''

    static datas() {
        return ['DateBalance']
    }

    static relacionamentos() {
        return ['AccountId']
    }

    static referencias() {
        return [{chave: 'AccountId', referencia: 'ProAccount'}]
    }

    static expanded() {
        return ['AccountId']
    }
}