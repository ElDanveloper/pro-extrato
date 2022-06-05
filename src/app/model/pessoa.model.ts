import { Validators } from '@angular/forms';
export class Pessoa {

    public Id: number = 0
    public Nome: string = ''
    public CpfCnpj: string = ''
    public TipoInscricao: string = '' //1 CNPJ, 2 CPF, 3 CAEPF, 4- CNO, 5 - CGC, 6 - CEI
    public Tipo: string = ''
    public CaminhoFoto: string = ''
    public ContribuinteIcms: string = ''
    public Email: string = ''
    public Crt: string = ''
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
    public IdentidadeEstrangeira: string = ''
    public Cidade: string = ''
    public Uf: string = ''
    public CodigoIbge: number = 0
    public CityId: string = ''

    constructor() { }

    static datas() {
        return ['DateCreation', 'DateUpdate']
    }

    static checkbox() {
        return ['Ativo']
    }

    static validacoes() {
        return [
            {campo: 'Nome', validation: Validators.compose([Validators.required])},
        ]
    }

    static mascaras() {
        return ['CpfCnpj', 'Cep']
    }

    static relacionamentos() {
        return ['CityId']
    }

    static referencias() {
        return [{chave: 'CityId', referencia: 'City'}]
    }

    static expanded() {
        return ['CityId']
    }


}