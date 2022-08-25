export class ProParameter {
    Id: number = 0
    ContractorClientId: number = 0
    ContractorId: number = 0
    CodeCatFGTS: number = 0  //Fgts
    CodeCatTaxBank: number = 0  //Tarifas bancárias
    CodeCatSimplesNacional: number = 0  //Das, Simples Nacional
    CodeCatInteresIncome: number = 0  //Receita de Juros, Financeiras
    CodeCatChargeExpense: number = 0  //Despesa de cobrança
    CodeCatCommunication: number = 0 //Desp. de comunicaçoes: telefone, internet
    CodeCatEnergy: number = 0  //Energia eletrica
    CodeCatINSS: number = 0  //INSS
    CodeCatLoan: number = 0   //Empréstimos
    CodeCatDARF: number = 0  //Darf, tributos federais
    CodeCatInterestExpense: number = 0  //Despesas de Juros
    CodeCatSalary: number = 0  //salario
    CodeCatWaterBill: number = 0   //conta de agua
    CodeCatFuel: number = 0   //combustivel
    CodeCatPublicity: number = 0  //publicidade
    CodeCatDonation: number = 0  //Doaçoes
    CodeCatConsortium: number = 0   //Consórcio
    CodeCatIncome: number = 0   //Recebimento, Receita
    CodeCatWithdraw: number = 0  //saque, retirada
    CodeCatICMS: number = 0
    CodeCatIncomePix: number = 0
    CodeCatSafeExpense: number = 0
    CodeCatIncomeSlip: number = 0
    CodeCatIncomeCreditCard: number = 0
    CodeCatIncomeDebitCard: number = 0
    CodeCatIncomeFoodCard: number = 0
    LastClosing: any = ''
    CodeCatTravel: number = 0
    CodeCatHealth: number = 0
    CodeCatLicenseCar: number = 0
    DepartamentAccountingId: string = ''

    static datas() {
        return ['LastClosing']
    }

    static relacionamentos() {
        return ['DepartamentAccountingId']
    }

    static referencias() {
        return [{chave: 'DepartamentAccountingId', referencia: 'Department'}]
    }

    static expanded() {
        return ['DepartamentAccountingId']
    }

}