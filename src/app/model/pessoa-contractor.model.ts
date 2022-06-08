export class PessoaContractor {
    public Id: number = 0
    public InternalCode: string = ''
    public Nome: string = ''
    public CaminhoFoto: string = ''
    public Email: string = ''
    public Fone1: string = ''
    public Fone2: string = ''
    public Celular: string = ''
    public Contato: string = ''
    public InscricaoEstadual: string = ''
    public InscricaoMunicipal: string = ''
    public Logradouro: string = ''
    public Numero: string = ''
    public Complemento: string = ''
    public Cep: string = ''
    public Bairro: string = ''
    public Ativo: boolean = false
    public DateCreation: any = ''
    public DateUpdate: any = ''
    public Fantasia: string = ''
    public Cidade: string = ''
    public Uf: string = ''
    public CodigoIbge: number = 0
    public ContractorId: number = 0
    public PessoaId: string = ''
    public PersonFisicalId: string = ''

    constructor() {}

    static datas() {
        return ['DateCreation', 'DateUpdate']
    }

    static checkbox() {
        return ['Ativo']
    }

    static relacionamentos() {
        return ['PessoaId', 'PersonFisicalId']
    }

    static referencias() {
        return [{chave: 'PessoaId', referencia: 'Pessoa'}, {chave: 'PersonFisicalId', referencia: 'PersonFisical'}]
    }

    static expanded() {
        return ['PessoaId', 'PersonFisicalId']
    }
}