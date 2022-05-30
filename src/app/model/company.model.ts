import { Validators } from '@angular/forms';
export class Company {

public Id: number = 0
public Codigo: string = ''
public Nome: string = ''
public Email: string = ''
public Celular: string = ''
public Contato: string = ''
public Logradouro: string = ''
public Numero: string = ''
public Complemento: string = ''
public Cep: string = ''
public Bairro: string = ''
public Ativo: boolean = false
public Fantasia: string = ''
public Cidade: string = ''
public Uf: string = ''
public CodigoIbge: number = 0
public PessoaId: number = 0
public Cnpj: string = ''
public SegmentoId: number = 0
public ResponsavelId: number = 0

constructor() {}

static checkbox() {
    return ['Ativo']
}

static validacoes() {
    return [
        {campo: 'Nome', validation: Validators.compose([Validators.required])},
    ]
}

static mascaras() {
    return ['Cnpj', 'Cep']
}

}