export class ContractorClient {
    public Id: number = 0
    public CodeClient: string = ''
    public DateInitialControl: any = ''
    public DateLastControl: any = ''
    public DateRegister: any = ''
    public ModeDeliveryDp: string = ''
    public ModeDeliveryFiscal: string = ''
    public ModeDeliveryMoviment: string = ''
    public Active: boolean = false
    public RegimeTypeId: number = 0
    public DateAlt: any = ''
    public Deleted: boolean = false
    public AccountantId: number = 0
    public FinancialCategoryId: number = 0
    public PlanAccountItemId: number = 0
    public PlanId: number = 0
    public PersonId: number = 0
    public ContractorId: number = 0
    public PersonContractorId: string = ''
    public SegmentId: string = ''

    constructor() {}

    static datas() {
        return ['DateInitialControl', 'DateLastControl', 'DateRegister', 'DateAlt']
    }

    static checkbox() {
        return ['Active', 'Deleted']
    }

    static relacionamentos() {
        return ['PersonContractorId', 'SegmentId']
    }

    static referencias() {
        return [{chave: 'PersonContractorId', referencia: 'PessoaContractor'}, {chave: 'SegmentId', referencia: 'Segment'}]
    }

    static expanded() {
        return ['PersonContractorId', 'SegmentId', 'PersonContractorId/PessoaId']
    }
}