export class Financial {
    Id: number = 0
    Classificate: string = ''
    Description: string = ''
    Sintetic: boolean = false
    Level: number = 0
    IdNaturezaFinGrupo: number = 0
    CodeAccountPlan: string = ''
    ProjectId: number = 0
    Historic: string = ''
    CodeControl: number = 0
    Specie: string = ''


    static checkbox() {
        return ['Sintetic']
    }
}