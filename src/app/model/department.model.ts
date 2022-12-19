export class Department {
    Id:	number = 0
    Description: string = ''
    TypeDepartament: string = '' //A: Administrativo, C: Contabil, F: Fiscal, P: Pessoal, M: Marketing, S: Societario, X-ProExtrato, N=Consultoria Financeira
    Active:	boolean = false
    Interno: boolean = false
    ContractorId: number = 0
    ContractorClientId: number = 0
    UserIdResp: string = ''

    static checkbox() {
        return ['Active', 'Interno']
    }

    static relacionamentos() {
        return ['UserIdResp']
    }

    static referencias() {
        return [{chave: 'UserIdResp', referencia: 'Users'}]
    }

    static expanded() {
        return ['UserIdResp']
    }

}
