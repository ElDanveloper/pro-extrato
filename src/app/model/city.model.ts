export class city {
    public Id: number = 0
    public Name: string = ''
    public Ibge: string = ''
    public DateCreation: any = ''
    public DateUpdate: any = ''
    public StadeId: string = ''

    constructor() {}

    static datas() {
        return ['DateCreation', 'DateUpdate']
    }

    static relacionamentos() {
        return ['StadeId']
    }

    static referencias() {
        return [{chave: 'StadeId', referencia: 'Stade'}]
    }

    static expanded() {
        return ['StadeId']
    }
}