export class ProStatement {

    Id: number = 0
    ContractorClientId: number = 0
    ContractorId: number = 0
    Day: number = 0
    Month: number = 0
    Year: number = 0
    DateBalance: any = ''
    InitialBalance: number = 0
    FinalBalance: number = 0
    Debits: number = 0
    Credits: number = 0
    CalculatedBalance: number = 0
    Status: string = ''
    DateUpdate: any = ''
    AccountId: string = ''
    // StatementList

    static datas() {
        return ['DateBalance', 'DateUpdate']
    }

    static relacionamentos() {
        return ['AccountId']
    }

    static referencias() {
        return [{ chave: 'AccountId', referencia: 'ProAccount' }]
    }

    static expanded() {
        return ['AccountId', 'StatementList']
    }
}