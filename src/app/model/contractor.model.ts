import { Validators } from '@angular/forms';
export class Contractor {

    Id: number = 0
    CrcSubscription: string = ''
    Email: string = ''
    WhatsappBusiness: string = ''
    Instagram: string = ''
    Facebook: string = ''
    Youtube: string = ''
    Linkedin: string = ''
    GoogleAccount: string = ''
    DateRegister: any = ''
    DateInitialContract: any = ''
    DateLastContract: any = ''
    ActiveContract: boolean = false
    Cel: string = ''
    Phone1: string = ''
    Phone2: string = ''
    TawktoId: string = ''
    Nome: string = ''
    Cnpj: string = ''
    LinkLogo: string = ''
    Contato: string = ''
    InscricaoEstadual: string = ''
    InscricaoMunicipal: string = ''
    Logradouro: string = ''
    Numero: string = ''
    Complemento: string = ''
    Cep: string = ''
    Bairro: string = ''
    Ativo: boolean = false
    DateUpdate: any = ''
    Fantasia: string = ''
    Cidade: string = ''
    Uf: string = ''
    PersonId: number = 0
    PersonContractorId: string = ''

    static datas() {
        return ['DateRegister', 'DateInitialContract', 'DateLastContract', 'DateUpdate']
    }

    static checkbox() {
        return ['Ativo', 'ActiveContract']
    }

    static validacoes() {
        return [
            {campo: 'Nome', validation: Validators.compose([Validators.required])},
        ]
    }

    static mascaras() {
        return ['Cnpj', 'Cep']
    }

    static relacionamentos() {
        return ['PersonContractorId']
    }

    static referencias() {
        return [{chave: 'PersonContractorId', referencia: 'PersonContractor'}]
    }

    static expanded() {
        return ['PersonContractorId']
    }

}
