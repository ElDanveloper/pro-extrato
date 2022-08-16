export class ProStatementItem {

    Id: number = 0
    ContractorClientId: number = 0
    ContractorId: number = 0
    Day: number = 0
    Month: number = 0
    Year: number = 0
    DateMovement: any = ''
    DateAccounting: any = ''
    Historic: string = ''
    Document: string = ''
    Amount: number = 0
    Reconciled: string = ''
    ReconciledType: string = ''  // E: Empresa, C: Contador, S: Sistema, N: Não Conciliado
    Obs: string = ''
    BankId: string = ''
    Reference: string = ''
    SourceCategory: string = ''
    PersonId: number = 0
    Status: string = ''
    CurrancyCode: string = ''
    Category: string = ''
    Balance: number = 0
    Specie: string = ''  //debit or Credit
    Reason: string = ''
    PayMethod: string = ''
    CpfCnpj: string = ''
    FinancialCategoryId: string = ''
    AccountId: string = ''
    StatementId: string = ''
    StatementItemPartyId: string = ''

    static datas() {
        return ['DateMovement', 'DateAccounting']
    }

    static checkboxAntigo() {
        return ['Reconciled']
    }

    static mascaras() {
        return ['CpfCnpj']
    }

    static relacionamentos() {
        return ['FinancialCategoryId', 'AccountId', 'StatementId', 'StatementItemPartyId']
    }

    static referencias() {
        return [{ chave: 'FinancialCategoryId', referencia: 'FinancialCategory' }, { chave: 'AccountId', referencia: 'ProAccount' }, { chave: 'StatementId', referencia: 'ProStatement' }, { chave: 'StatementItemPartyId', referencia: 'ProStatementItemParty' }]
    }

    static expanded() {
        return ['FinancialCategoryId', 'AccountId', 'StatementId', 'StatementItemPartyId', 'StatementId/AccountId', 'StatementId/StatementList']
    }

}