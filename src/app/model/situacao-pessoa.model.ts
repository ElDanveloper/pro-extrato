export class SituacaoPessoa {
    public Id: number = 0
    public Nome: string = ''

    constructor() {
    }

    static listUrl() {
        return 'situacaopessoainterface/consultasituacaopessoa'
    }

    static deleteUrl() {
        return 'situacaopessoainterface/excluirsituacaopessoa'
    }

    static salveUrl() {
        return 'situacaopessoainterface/gravarsituacaopessoa';
    }

}
