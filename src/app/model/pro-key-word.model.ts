export class ProKeyWord {
    Id: number = 0
    ContractorClientId: number = 0
    ContractorId: number = 0
    SecondWord: string = ''
    CodeControl: number = 0
    FirstWord: string = ''
    FinancialCategoryId: string = ''

    static relacionamentos() {
        return ['FinancialCategoryId']
    }

    static referencias() {
        return [{chave: 'FinancialCategoryId', referencia: 'FinancialCategory'}]
    }

    static expanded() {
        return ['FinancialCategoryId']
    }

}