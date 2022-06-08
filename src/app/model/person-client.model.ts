export class PersonClient {
    public Id: number = 0
    public ContractorClientId: number = 0
    public ContractorId: number = 0
    public NatureFinancialId: string = ''
    public PersonId: string = ''

    constructor() {}

    static relacionamentos() {
        return ['NatureFinancialId', 'PersonId']
    }

    static referencias() {
        return [{chave: 'NatureFinancialId', referencia: 'NatureFinancial'}, {chave: 'PersonId', referencia: 'Pessoa'}]
    }

    static expanded() {
        return ['NatureFinancialId', 'PersonId']
    }
}