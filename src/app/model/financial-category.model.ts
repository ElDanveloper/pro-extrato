export class FinancialCategory {

    public Id: number = 0
    public ContractorId: number = 0
    public ContractorClientId: number = 0
    public Description: string = ''
    public Classificate: string = ''
    public Historic: string = ''
    public Sintetic: boolean = false // A natureza será do tipo sintético quando nao for permitido fazer lançamento. Ou seja, trata-se de conta de Agrupamento.
    public ViewOnApp: boolean = false
    public Level: number = 0
    public RequireComplement: boolean = false
    public CodeAccountPlan: string = ''
    public CodeControl: number = 0
    public Excluded: boolean = false
    public CodeIntegration: string = ''
    public ProjecId: number = 0
    public CostCenterId: number = 0
    public Specie: string = '' //D = Despesa, R = Receita, T = Transferencia, F = Financiamento, I = Investimoento
    public SpecieFlow: string = '' //S = Saida, E = Entrada
    public FixVariable: string = '' //F = Fixo, V = Variavel, N = Nenhum
    public IdNaturezaFinGrupo: any = ''
    public ShortDescription: any = ''

    constructor() {}

    static checkbox() {
        return ['Sintetic', 'ViewOnApp', 'RequireComplement', 'Excluded']
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