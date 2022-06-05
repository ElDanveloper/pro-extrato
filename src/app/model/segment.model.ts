export class Segment {

    public Id: number = 0
    public Description: string = ''
    public DateCreation: any = ''
    public DateUpdate: any = ''

    constructor() { }

    static datas() {
        return ['DateCreation', 'DateUpdate']
    }


}