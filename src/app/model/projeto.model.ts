export class Projeto {
    Id: number = 0
    Nome: string = ''
    Ativo: boolean = false
    IdEmpresa: number = 0
    IdHolding: number = 0

    static checkbox() {
        return ['Ativo']
    }

}
