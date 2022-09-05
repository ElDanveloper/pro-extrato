export class ProBankHistoric {
    Id: number = 0
    ContractorClientId: number = 0
    ContractorId: number = 0
    Historic: string = ''
    TypeHistoric: string = ''
    BankCode: number = 0
    AccountTransferId: number = 0
    FinancialCategoryId: string = ''
    PersonId: string = ''

    static relacionamentos() {
        return ['FinancialCategoryId', 'PersonId']
    }

    static referencias() {
        return [{chave: 'FinancialCategoryId', referencia: 'FinancialCategory'}, {chave: 'PersonId', referencia: 'Pessoa'}]
    }

    static expanded() {
        return ['FinancialCategoryId', 'PersonId']
    }

}