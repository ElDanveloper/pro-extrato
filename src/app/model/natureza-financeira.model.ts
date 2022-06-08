export class NaturezaFinanceira {

    public Id: number = 0
    public ContractorId: number = 0
    public ContractorClientId: number = 0
    public Descricao: string = ''
    public Classificacao: string = ''
    public Historico: string = ''
    public Sintetico: boolean = false // A natureza será do tipo sintético quando nao for permitido fazer lançamento. Ou seja, trata-se de conta de Agrupamento.
    public IndicaPermuta: boolean = false //Ao marcar esta opção significa que o lançamento não irá fazer registro no movimento de pagamento ou recebimento
    public ApareceApp: boolean = false
    public Nivel: number = 0
    public PedeComplemento:	boolean = false
    public IdPlanoConta: string = ''
    public CodControle: number = 0
    public Excluido: boolean = false
    public Uid: string = ''
    public IdProjeto: number = 0
    public IdNaturezaFinGrupo: any = ''

    constructor() {}

    static checkbox() {
        return ['Sintetico', 'IndicaPermuta', 'ApareceApp', 'PedeComplemento', 'Excluido']
    }

    static relacionamentos() {
        return ['IdNaturezaFinGrupo']
    }

    static referencias() {
        return [{chave: 'IdNaturezaFinGrupo', referencia: 'NaturezaFinGrupo'}]
    }

    static expanded() {
        return ['IdNaturezaFinGrupo']
    }    
}