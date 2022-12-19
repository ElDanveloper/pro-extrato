export class Department {
    Id: number = 0
    Description: string = ''
    TypeDepartament: string = ''  //A: Administrativo, C: Contabil, F: Fiscal, P: Pessoa, M: Marketing, S: Societario
    Active: boolean = false
    Interno: boolean = false
    ContractorId: number = 0
    ContractorClientId: number = 0
    UserIdResp: string = ''
    DateLastZap: any = ''
    DateLastEmailDoc: any = ''
    DeparmentAccountingId: number = 0
    DeparmentCorpoateId: number = 0
    DeparmentConciliateId: number = 0
    DeparmentCommercialId: number = 0
    DeparmentRhId: number = 0
    DeparmentFiscalId: number = 0
    DeparmentAdmId: number = 0
    DeparmentBPOId: number = 0

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
