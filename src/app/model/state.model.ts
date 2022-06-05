export class State {
    public Id: number = 0
    public Name: string = ''
    public Ibge: string = ''
    public Uf: string = ''
    public DateCreation: any = ''
    public DateUpdate: any = ''

    constructor() {}

    static datas() {
        return ['DateCreation', 'DateUpdate']
    }
}