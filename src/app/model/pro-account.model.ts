export class ProAccount {

    Id: number = 0
    ContractorId: number = 0
    ContractorClientId: number = 0
    ItemId: string = ''
    HasMfa: boolean = false
    DateRegister: any = ''
    DateUpdate: any = ''
    Name: string = ''
    MarketingName: string = ''
    Owner: string = ''
    AccountId: string = ''
    DigitNumber: string = ''
    AccountNumber: string = ''
    Number: string = ''
    BankAgency: string = ''
    SubTypePluggly: string = ''
    BankCode: number = 0
    TypePluggly: string = ''
    ClosingDay: number = 0
    CreditLimit: number = 0
    CodePlanAccount: string = ''
    Excluded: boolean = false
    DueDate: number = 0
    TypePro: number = 0   //1 = Conta Corrente, 2 = Poupança, 3 = Aplicacão, 4 = Garantida, 5 = Cartão Crédito, 6 = Crediario, Empréstimo, Carteira Virtual, Mutuo, 7 = Caixa Interno.


    static datas() {
        return ['DateRegister', 'DateUpdate']
    }

    static checkbox() {
        return ['HasMfa', 'Excluded']
    }

}