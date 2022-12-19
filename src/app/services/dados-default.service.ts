import { NetworkService } from './network.service';
import { getUrlClient, getUrlPro, getUrlUser } from './../controller/staticValues';
import { BehaviorSubject, Subject, Observable, of } from 'rxjs';
import { Injectable } from "@angular/core";
import { forkJoin } from "rxjs/internal/observable/forkJoin"
import { HttpClient, HttpErrorResponse } from "@angular/common/http"
import {getUrlCad, URL_BASE} from '../controller/staticValues'
import {Util} from '../controller/Util'
import {catchError, map} from 'rxjs/operators'

@Injectable({
    providedIn: 'root'
})
export class DadosDefaultService {

    public dadosAdicionarEndereco = new Subject();
    public dadosAdicionarContato = new Subject();
    public adicionarEndereco: Observable<any> = this.dadosAdicionarEndereco.asObservable();
    public adicionarContato: Observable<any> = this.dadosAdicionarContato.asObservable();
    private modalSubject = new Subject();
    public modal: Observable<any> = this.modalSubject.asObservable();
    public exibirLoader = new BehaviorSubject(false);
    public setParametros = new BehaviorSubject(null);
    public parametros: Observable<any> = this.setParametros.asObservable();
    public counterEnvironment = new BehaviorSubject(false)
    
    listaModais: string[] = [];

    constructor(private http: HttpClient, private networkService: NetworkService) {

    }

    closeModal(hash) {        
        this.modalSubject.next(hash)
    }

    // modalConfigurarNfe() {
    //     let grupoTributario = this.http.get(`${getUrlCad()}/grupotributario`).pipe(map((res: Response) => res['value'].map(v => ({label: Util.up(v.Descricao), value: v.Id}))), catchError(this.errorHandlerDefaultValues));
    //     let operacaoFiscal = this.http.get(`${getUrlCad()}/operacaofiscal`).pipe(map((res: Response) => res['value'].map(v => ({label: Util.up(v.Descricao), value: v.Id}))), catchError(this.errorHandlerDefaultValues));
    //     return forkJoin([grupoTributario, operacaoFiscal])
    // }

    // public editarPagamentoRecebimentoContabil() {
    //     let planoContas = this.http.get(`${getUrlCad()}/planocontas?$filter=Sintetico eq false`).pipe(map((res: Response) => res['value']));
    //     return forkJoin([planoContas])
    // }

    // public planoContasListagem() {
    //     let planoContas = this.http.get(`${getUrlCad()}/planocontas?$filter=(Sintetico eq true)`).pipe(map((res: Response) => res['value'].map(v => ({
    //         label: Util.up(v.Descricao),
    //         value: v.Id
    //     }))));
    //     let contabilCodSped = this.http.get(`${getUrlCad()}/contabilCodSped`).pipe(map((res: Response) => res['value'].map(v => ({label: Util.up(v.Descricao), value: v.Descricao}))));
    //     return forkJoin([planoContas, contabilCodSped])
    // }

    // public naturezaFinanceiraListagem() {
    //     let naturezaFinGrupo = this.http.get(`${getUrlCad()}/naturezafingrupo?$filter=(NivelDfc eq 3)`).pipe(map((res: Response) => res['value'].map(v => ({label: Util.up(v.Nome), value: v.Id}))));
    //     let planoContas = this.http.get(`${getUrlCad()}/planocontas?$filter=(Sintetico eq false)`).pipe(map((res: Response) => res['value'].map(v => ({
    //         label: Util.up(v.Descricao),
    //         value: v.Id
    //     }))));
    //     return forkJoin([naturezaFinGrupo, planoContas])
    // }

    // public modalPlanoContas() {
    //     let centroResultado = this.http.get(`${getUrlCad()}/centroresultado`).pipe(map((res: Response) => res['value'].map(v => ({label: Util.up(v.Descricao), value: v.Id}))));
    //     let contabilDreLayout = this.http.get(`${getUrlCad()}/contabildrelayout`).pipe(map((res: Response) => res['value'].map(v => ({label: Util.up(v.Descricao), value: v.Id}))));
    //     let plano = this.http.get(`${getUrlCad()}/plano`).pipe(map((res: Response) => res['value'].map(v => ({label: Util.up(v.Descricao), value: v.Id}))));
    //     let planoContas = this.http.get(`${getUrlCad()}/planocontas?$filter=(Sintetico eq true)`).pipe(map((res: Response) => res['value'].map(v => ({
    //         label: Util.up(v.Descricao),
    //         value: v.Id
    //     }))));
    //     let planoContaRefSped = this.http.get(`${getUrlCad()}/planocontarefsped`).pipe(map((res: Response) => res['value'].map(v => ({label: Util.up(v.Descricao), value: v.CodSped}))));
    //     let contabilCodSped = this.http.get(`${getUrlCad()}/contabilCodSped`).pipe(map((res: Response) => res['value'].map(v => ({label: Util.up(v.Descricao), value: v.Descricao}))));
    //     return forkJoin([centroResultado, contabilDreLayout, plano, planoContas, planoContaRefSped, contabilCodSped])
    // }

    public buscarCnpj(cnpj: string) {
        return this.http.get(`https://bpoymh2e3b.execute-api.us-east-1.amazonaws.com/prod/consulta-cnpj/${cnpj}`)
    }

    // public empregador() {
    //    let tributaria = this.http.get(`${getUrlHunnoRh()}/FolhaClasseTributaria`).pipe(map((res: Response) => res['value'].map(v => ({label: Util.up(v.Descricao), value: v.Codigo})))) 
    //    return forkJoin([tributaria])
    // }

    public empresa() {        
        let company = this.http.get(`${getUrlClient()}/deleted/false`).pipe(map((res: any) => res.map(v => ({label: Util.up(v.nome), value: v.id}))))
        let segment = this.http.get(`${getUrlPro()}/segment`).pipe(map((res: Response) => res['value'].map(v => ({label: Util.up(v.Description), value: v.Id}))))
        let contractor = this.http.get(`${getUrlUser()}/contractor`).pipe(map((res: any) => res.map(v => ({label: Util.up(v.nome), value: v.id}))))        

        return forkJoin([company, segment, contractor])
    }

    public pessoa() {
        let natureza = this.http.post(`${getUrlPro()}/financialCategories`, {Level: 1}).pipe(map((res: Response) => res['value'].map(v => ({label: Util.up(v.Description), value: v.Id}))));

        return forkJoin([natureza])
    }

    // verificaNcmValido(value) {
    //     let ncm = {CodigoNcm: value};
    //     return this.http.post(`${URL_BASE}/NcmInterface/BuscarNcm`, ncm).pipe(catchError(this.errorHandlerDefaultValues))
    // }

    // verificaCestValido(value) {
    //     return this.http.get(`${URL_BASE}/cest?$filter=(CodigoCest eq '${value}')`).pipe(catchError(this.errorHandlerDefaultValues))
    // }

    // public endereco() {
    //     let rotaViagem = this.http.get(`${getUrlCad()}/rotaviagem`).pipe(map((res: Response) => res['value'].map(v => ({label: Util.up(v.Nome), value: v.Id}))));
    //     let tipoEndereco = this.http.get(`${getUrlCad()}/tipoendereco`).pipe(map((res: Response) => res['value'].map(v => ({label: Util.up(v.Nome), value: v.Id}))));
    //     return forkJoin([rotaViagem, tipoEndereco])
    // }

    public modalNaturezaFinanceira() {
        
        let naturezaFinGrupo = this.http.get(`${getUrlPro()}/naturezafingrupo?filter=(nivelDfc eq 3)`).pipe(map((res: Response) => res['value'].map(v => ({label: v.Classificacao + ' - ' + Util.up(v.Nome), value: v.Id}))));
        let natureza = this.http.get(`${getUrlPro()}/financialCategory?$filter=level eq 3&$orderby=classificate`).pipe(map((res: Response) => res['value'].map(v => ({label: v.Classificate + ' - ' + Util.up(v.Description), value: v.Id}))))
        // let natureza = this.http.post(`${getUrlPro()}/financialCategories`, {Level: 3}).pipe(map((res: Response) => res['value'].map(v => ({label: Util.up(v.Description), value: v.Id}))));
        let costCenter = this.http.get(`${getUrlPro()}/procostcenter`).pipe(map((res: Response) => res['value'].map(v => ({label: Util.up(v.Description), value: v.Id}))));
        let project = this.http.get(`${getUrlPro()}/proproject`).pipe(map((res: Response) => res['value'].map(v => ({label: Util.up(v.Description), value: v.Id}))));
        let typeCategory = this.http.get(`${getUrlPro()}/ProTypeCategory`).pipe(map((res: Response) => res['value'].map(v => ({label: Util.up(v.Description), value: v.Code}))));
        

        return forkJoin([naturezaFinGrupo, natureza, costCenter, project, typeCategory])       
    }
  
    public modalOpeningbalance() {
        let account = this.http.get(`${getUrlPro()}/proaccount`).pipe(map((res: Response) => res['value'].map(v => ({label: Util.up(v.Name), value: v.Id}))))

        return forkJoin([account])
    }

    public conciliator() {
        let account = this.http.get(`${getUrlPro()}/proaccount`).pipe(map((res: Response) => res['value'].map(v => ({label: Util.up(v.Name), value: v.Id}))))
        return forkJoin([account])
    }

    public account() {
        let bank = this.http.get(`${getUrlPro()}/bank`).pipe(map((res: Response) => res['value'].map(v => ({label: Util.up(v.Name), value: Util.toNumber(v.Code)}))))
        let natureza = this.http.get(`${getUrlPro()}/financialCategory?$filter=level eq 3&$orderby=classificate`).pipe(map((res: Response) => res['value'].map(v => ({label: v.Classificate + ' - ' + Util.up(v.Description), value: v.Id}))))
        // let natureza = this.http.post(`${getUrlPro()}/financialCategories`, {Level: 3}).pipe(map((res: Response) => res['value'].map(v => ({label: Util.up(v.Description), value: v.Id}))));

        return forkJoin([bank, natureza])
    }

    public parameter() {
        let natureza = this.http.get(`${getUrlPro()}/financialCategory?$filter=level eq 3&$orderby=classificate`).pipe(map((res: Response) => res['value'].map(v => ({label: v.Classificate + ' - ' + Util.up(v.Description), value: v.CodeControl}))))
        return forkJoin([natureza])
    }
    
    public registrationNatureza() {
        let natureza = this.http.get(`${getUrlPro()}/financialCategory?$filter=level eq 2&$orderby=classificate`).pipe(map((res: Response) => res['value'].map(v => ({label: v.Classificate + ' - ' + Util.up(v.Description), value: v.Id}))))
        return forkJoin([natureza])
    }

    public typeDepartment() {
        let department = this.http.get(`${getUrlPro()}/Department`).pipe(map((res: Response) => res['value'].map(v => ({label: Util.up(v.Description), value: v.Id}))))
        return forkJoin([department])
    }

    private errorHandlerDefaultValues(error: HttpErrorResponse) {
        console.log(error)
        if(error instanceof HttpErrorResponse) {
            let excecao
            try {
                if (error.error && error.error['error']) {
                    excecao = error.error.error.message
                } else if(error.message) {
                    excecao = error.message
                } else {
                    excecao = JSON.stringify(error)
                }
            } catch (e) {
                excecao = 'Feche o sistema e acesse novamente e confira se o registro foi gravado'
            }
            return excecao
        }
        return of([]);
    }
}

