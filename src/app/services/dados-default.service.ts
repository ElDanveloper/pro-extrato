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
        let natureza = this.http.post(`${getUrlPro()}/financialCategories`, {Level: 1}).pipe(map((res: Response) => res['value'].map(v => ({label: Util.up(v.Description), value: { Classificacao: v.Classificate, Id: v.Id}}))));

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
        let natureza = this.http.post(`${getUrlPro()}/financialCategories`, {Level: 1}).pipe(map((res: Response) => res['value'].map(v => ({label: Util.up(v.Description), value: { Classificacao: v.Classificate, Id: v.Id}}))));
        let costCenter = this.http.get(`${getUrlPro()}/procostcenter`).pipe(map((res: Response) => res['value'].map(v => ({label: Util.up(v.Description), value: v.Id}))));
        let project = this.http.get(`${getUrlPro()}/proproject`).pipe(map((res: Response) => res['value'].map(v => ({label: Util.up(v.Description), value: v.Id}))));

        return forkJoin([naturezaFinGrupo, natureza, costCenter, project])       
    }

    public modalOpeningbalance() {
        let account = this.http.get(`${getUrlPro()}/proaccount`).pipe(map((res: Response) => res['value'].map(v => ({label: Util.up(v.Name), value: v.Id}))))

        return forkJoin([account])
    }

    // pessoa() {
    //     let situacaoPessoa = this.http.get(`${getUrlCad()}/situacaopessoa`).pipe(map((res: Response) => res['value'].map(v => ({label: Util.up(v.Nome), value: v.Id}))), catchError(this.errorHandlerDefaultValues));
    //     let operacaoFiscal = this.http.get(`${getUrlCad()}/operacaofiscal`).pipe(map((res: Response) => res['value'].map(v => ({label: Util.up(v.Descricao), value: v.Id}))), catchError(this.errorHandlerDefaultValues));
    //     let naturezaFinanceira = this.http.get(`${getUrlCad()}/naturezafinanceira?$filter=Sintetico eq false`).pipe(map((res: Response) => res['value'].map(v => ({label: Util.up(v.Descricao), value: v.CodControle}))), catchError(this.errorHandlerDefaultValues));
    //     let vendedor = this.http.get(`${getUrlCad()}/vendedor`).pipe(map((res: Response) => res['value'].map(v => ({label: Util.up(v.Nome), value: v.Id}))), catchError(this.errorHandlerDefaultValues));
    //     let tipoendereco = this.http.get(`${getUrlCad()}/tipoendereco`).pipe(map((res: Response) => res['value'].map(v => ({label: Util.up(v.Nome), value: v.Id}))), catchError(this.errorHandlerDefaultValues));
    //     let contaContabil = this.http.get(`${getUrlCad()}/planocontas?$filter=Sintetico eq false`).pipe(map((res: Response) => res['value'].map(v => ({label: Util.up(v.Descricao), value: v.Id}))), catchError(this.errorHandlerDefaultValues));
    //     let tabelaPreco = this.http.get(`${getUrlCad()}/tabelapreco`).pipe(map((res: Response) => res['value'].map(v => ({label: Util.up(v.Nome), value: v.Id}))), catchError(this.errorHandlerDefaultValues));
    //     let pais = this.http.get(`${URL_BASE}/paises`).pipe(map((res: Response) => res['value'].map(v => ({label: Util.up(v.Pais), value: Util.toNumber(v.Ibge)}))), catchError(this.errorHandlerDefaultValues));
    //     return forkJoin([situacaoPessoa, operacaoFiscal, naturezaFinanceira, vendedor, tipoendereco, contaContabil, tabelaPreco, pais])
    // }

    // ncm() {
    //     let cstIpi = this.http.get(`${URL_BASE}/cstipi`).pipe(map((res: Response) => res['value'].map(v => ({
    //         label: Util.up(v.Descricao),
    //         value: v.Codigo
    //     }))), catchError(this.errorHandlerDefaultValues));
    //     let cstCofins = this.http.get(`${URL_BASE}/cstcofins`).pipe(map((res: Response) => res['value'].map(v => ({
    //         label: Util.up(v.Descricao),
    //         value: v.Codigo
    //     }))), catchError(this.errorHandlerDefaultValues));
    //     let cstPis = this.http.get(`${URL_BASE}/cstpis`).pipe(map((res: Response) => res['value'].map(v => ({
    //         label: Util.up(v.Descricao),
    //         value: v.Codigo
    //     }))), catchError(this.errorHandlerDefaultValues));
    //     return forkJoin([cstIpi, cstCofins, cstPis])
    // }

    // ncmContador() {
    //     let cstIpi = this.http.get(`${URL_BASE}/cstipi`).pipe(map((res: Response) => res['value'].map(v => ({
    //         label: Util.up(v.Descricao),
    //         value: v.Codigo
    //     }))), catchError(this.errorHandlerDefaultValues));
    //     let cstCofins = this.http.get(`${URL_BASE}/cstcofins`).pipe(map((res: Response) => res['value'].map(v => ({
    //         label: Util.up(v.Descricao),
    //         value: v.Codigo
    //     }))), catchError(this.errorHandlerDefaultValues));
    //     let cstPis = this.http.get(`${URL_BASE}/cstpis`).pipe(map((res: Response) => res['value'].map(v => ({
    //         label: Util.up(v.Descricao),
    //         value: v.Codigo
    //     }))), catchError(this.errorHandlerDefaultValues));
    //     let cstBIcms = this.http.get(`${URL_BASE}/cstbicms`).pipe(map((res: Response) => res['value'].map(v => ({
    //         label: Util.up(v.Descricao),
    //         value: v.Cst
    //     }))), catchError(this.errorHandlerDefaultValues));
    //     let unidadeTributaria = this.http.get(`${URL_BASE}/unidadetributaria`).pipe(map((res: Response) => res['value'].map(v => ({
    //         label: Util.up(v.Descricao),
    //         value: v.Nome
    //     }))), catchError(this.errorHandlerDefaultValues));
    //     return forkJoin([cstIpi, cstCofins, cstPis, cstBIcms, unidadeTributaria])
    // }

    // impostoIcms() {
    //     let cfop = this.http.get(`${getUrlCad()}/cfop`).pipe(map((res: Response) => res['value'].map(v => ({label: Util.up(v.Descricao), value: v.Cfop}))), catchError(this.errorHandlerDefaultValues));
    //     let cstBIcms = this.http.get(`${URL_BASE}/cstbicms`).pipe(map((res: Response) => res['value'].map(v => ({label: Util.up(v.Descricao), value: v.Cst}))), catchError(this.errorHandlerDefaultValues));
    //     return forkJoin([cfop, cstBIcms, ])
    // }

    // grupo() {
    //     let secao = this.http.get(`${getUrlCad()}/secao`).pipe(map((res: Response) => res['value'].map(v => ({
    //         label: Util.up(v.Nome),
    //         value: v.Id
    //     }))), catchError(this.errorHandlerDefaultValues));
    //     let marca = this.http.get(`${getUrlCad()}/marca`).pipe(map((res: Response) => res['value'].map(v => ({
    //         label: Util.up(v.Nome),
    //         value: v.Id
    //     }))), catchError(this.errorHandlerDefaultValues));
    //     let categoria = this.http.get(`${getUrlCad()}/categoria`).pipe(map((res: Response) => res['value'].map(v => ({
    //         label: Util.up(v.Nome),
    //         value: v.Id
    //     }))), catchError(this.errorHandlerDefaultValues));
    //     let subcategoria = this.http.get(`${getUrlCad()}/subcategoria`).pipe(map((res: Response) => res['value'].map(v => ({
    //         label: Util.up(v.Nome),
    //         value: v.Id
    //     }))), catchError(this.errorHandlerDefaultValues));
    //     let unidadeProduto = this.http.get(`${getUrlCad()}/unidadeproduto`).pipe(map((res: Response) => res['value'].map(v => ({
    //         label: Util.up(v.Descricao),
    //         value: v.Id
    //     }))), catchError(this.errorHandlerDefaultValues));
    //     let grupoTributario = this.http.get(`${getUrlCad()}/grupotributario`).pipe(map((res: Response) => res['value'].map(v => ({
    //         label: Util.up(v.Descricao),
    //         value: v.Id
    //     }))), catchError(this.errorHandlerDefaultValues));
    //     let grupo = this.http.get(`${getUrlCad()}/grupo`).pipe(map((res: Response) => res['value'].map(v => ({
    //         label: Util.up(v.Descricao),
    //         value: v.Id
    //     }))), catchError(this.errorHandlerDefaultValues));
    //     return forkJoin([secao, marca, categoria, subcategoria, unidadeProduto, grupoTributario, grupo])
    // }

    // subcategoria() {
    //     let categoria = this.http.get(`${getUrlCad()}/categoria`).pipe(map((res: Response) => res['value'].map(v => ({label: Util.up(v.Nome), value: v.Id}))), catchError(this.errorHandlerDefaultValues));
    //     return forkJoin([categoria])
    // }

    // grupoTributario() {
    //     let impostoIcms = this.http.get(`${getUrlCad()}/impostoicms`).pipe(map((res: Response) => res['value'].map(v => ({label: Util.up(v.Descricao), value: v.Id}))), catchError(this.errorHandlerDefaultValues));
    //     let cstIpi = this.http.get(`${URL_BASE}/cstipi`).pipe(map((res: Response) => res['value']), catchError(this.errorHandlerDefaultValues));
    //     let cstCofins = this.http.get(`${URL_BASE}/cstcofins`).pipe(map((res: Response) => res['value']), catchError(this.errorHandlerDefaultValues));
    //     let cstPis = this.http.get(`${URL_BASE}/cstpis`).pipe(map((res: Response) => res['value']), catchError(this.errorHandlerDefaultValues));
    //     let cstAIcms = this.http.get(`${URL_BASE}/cstaicms`).pipe(map((res: Response) => res['value'].map(v => ({label: Util.up(v.Descricao), value: v.Cst}))), catchError(this.errorHandlerDefaultValues));
    //     return forkJoin([impostoIcms, cstIpi, cstCofins, cstPis, cstAIcms])
    // }

    // produto() {
    //     let grupoTributario = this.http.get(`${getUrlCad()}/grupotributario`).pipe(map((res: Response) => res['value'].map(v => ({label: Util.up(v.Descricao), value: v.Id}))), catchError(this.errorHandlerDefaultValues));
    //     let unidadeProduto = this.http.get(`${getUrlCad()}/unidadeproduto`).pipe(map((res: Response) => res['value'].map(v => ({
    //         label: Util.up(v.Nome),
    //         value: v.Id
    //     }))), catchError(this.errorHandlerDefaultValues));
    //     let secao = this.http.get(`${getUrlCad()}/secao`).pipe(map((res: Response) => res['value'].map(v => ({
    //         label: Util.up(v.Nome),
    //         value: v.Id
    //     }))), catchError(this.errorHandlerDefaultValues));
    //     let categoria = this.http.get(`${getUrlCad()}/categoria`).pipe(map((res: Response) => res['value'].map(v => ({
    //         label: Util.up(v.Nome),
    //         value: v.Id
    //     }))), catchError(this.errorHandlerDefaultValues));
    //     let subcategoria = this.http.get(`${getUrlCad()}/subcategoria`).pipe(map((res: Response) => res['value'].map(v => ({
    //         label: Util.up(v.Nome),
    //         value: v.Id
    //     }))), catchError(this.errorHandlerDefaultValues));
    //     let marca = this.http.get(`${getUrlCad()}/marca`).pipe(map((res: Response) => res['value'].map(v => ({
    //         label: Util.up(v.Nome),
    //         value: v.Id
    //     }))), catchError(this.errorHandlerDefaultValues));
    //     let grupo = this.http.get(`${getUrlCad()}/grupo`).pipe(map((res: Response) => res['value'].map(v => ({
    //         label: Util.up(v.Descricao),
    //         value: v.Id
    //     }))), catchError(this.errorHandlerDefaultValues));
    //     let impostoIcms = this.http.get(`${getUrlCad()}/impostoicms`).pipe(map((res: Response) => res['value'].map(v => ({
    //         label: Util.up(v.Descricao),
    //         value: v.Id
    //     }))), catchError(this.errorHandlerDefaultValues));
    //     let setor = this.http.get(`${getUrlCad()}/setor`).pipe(map((res: Response) => res['value'].map(v => ({
    //         label: Util.up(v.Nome),
    //         value: v.Id
    //     }))), catchError(this.errorHandlerDefaultValues));
    //     let unidcompra = this.http.get(`${getUrlCad()}/unidadeproduto`).pipe(map((res: Response) => res['value'].map(v => ({
    //         label: Util.up(v.Nome),
    //         value: v.Id
    //     }))), catchError(this.errorHandlerDefaultValues));
    //     let cstIpi = this.http.get(`${URL_BASE}/cstipi`).pipe(map((res: Response) => res['value'].map(v => ({
    //         label: Util.up(v.Descricao),
    //         value: v.Codigo
    //     }))), catchError(this.errorHandlerDefaultValues));
    //     let cstCofins = this.http.get(`${URL_BASE}/cstcofins`).pipe(map((res: Response) => res['value'].map(v => ({
    //         label: Util.up(v.Descricao),
    //         value: v.Codigo
    //     }))), catchError(this.errorHandlerDefaultValues));
    //     let cstPis = this.http.get(`${URL_BASE}/cstpis`).pipe(map((res: Response) => res['value'].map(v => ({
    //         label: Util.up(v.Descricao),
    //         value: v.Codigo
    //     }))), catchError(this.errorHandlerDefaultValues));
    //     let cstAIcms = this.http.get(`${URL_BASE}/cstaicms`).pipe(map((res: Response) => res['value'].map(v => ({
    //         label: Util.up(v.Descricao),
    //         value: v.Cst
    //     }))), catchError(this.errorHandlerDefaultValues));
    //     let cstBIcms = this.http.get(`${URL_BASE}/cstbicms`).pipe(map((res: Response) => res['value'].map(v => ({
    //         label: Util.up(v.Descricao),
    //         value: v.Cst
    //     }))), catchError(this.errorHandlerDefaultValues));
    //     let cest = this.http.get(`${URL_BASE}/cest`).pipe(map((res: Response) => res['value'].map(v => ({label: Util.up(v.Descricao), value: v.CodigoCest}))), catchError(this.errorHandlerDefaultValues));

    //     return forkJoin([grupoTributario, unidadeProduto, secao, categoria, subcategoria, marca, grupo, impostoIcms, setor, unidcompra,
    //         cstIpi, cstCofins, cstPis, cstAIcms, cstBIcms])
    // }

    // grupoBem() {
    //     let planocontas = this.http.get(`${getUrlCad()}/planocontas?$filter=Sintetico eq false`).pipe(map((res: Response) => res['value'].map(v => ({label: Util.up(v.Descricao), value: v.Codigo}))));
    //     return forkJoin([planocontas, ])
    // }

    // modalTransferencia() {
    //     let contaCaixa = this.http.get(`${getUrlCad()}/contacaixa`).pipe(map((res: Response) => res['value'].map(v => ({label: Util.up(v.Nome), value: v.Id}))));
    //     return forkJoin([contaCaixa])
    // }

    // pagamentoViaConta() {
    //     let naturezaFinanceira = this.http.get(`${getUrlCad()}/naturezafinanceira?$filter=Sintetico eq false`).pipe(map((res: Response) => res['value'].map(v => ({label: Util.up(v.Descricao), value: v.Id}))));
    //     let contaCaixa = this.http.get(`${getUrlCad()}/contacaixa`).pipe(map((res: Response) => res['value'].map(v => ({label: Util.up(v.Nome), value: v.Id}))));
    //     return forkJoin([naturezaFinanceira, contaCaixa])
    // }

    // produtoSimplificado() {
    //     let grupo = this.http.get(`${getUrlCad()}/grupo`).pipe(map((res: Response) => res['value'].map(v => ({label: Util.up(v.Descricao), value: v.Id}))), catchError(this.errorHandlerDefaultValues));
    //     return forkJoin([grupo])
    // }

    // patrimBem() {
    //     let setor = this.http.get(`${getUrlCad()}/setor`).pipe(map((res: Response) => res['value'].map(v => ({label: Util.up(v.Nome), value: v.Id}))), catchError(this.errorHandlerDefaultValues));
    //     let grupoBem = this.http.get(`${getUrlCad()}/patrimgrupobem`).pipe(map((res: Response) => res['value'].map(v => ({label: Util.up(v.Descricao), value: v.Id}))), catchError(this.errorHandlerDefaultValues));
    //     let bemPrincipal = this.http.get(`${getUrlCad()}/patrimbem`).pipe(map((res: Response) => res['value'].map(v => ({label: Util.up(v.Descricao), value: v.Id}))), catchError(this.errorHandlerDefaultValues));
    //     let funcaoImobilizado = this.http.get(`${getUrlCad()}/prodfuncaoimobilizado`).pipe(map((res: Response) => res['value'].map(v => ({label: Util.up(v.Descricao), value: v.Id}))), catchError(this.errorHandlerDefaultValues));
    //     return forkJoin([setor, grupoBem, bemPrincipal, funcaoImobilizado])
    // }

    // public modalLancamentoContabilSimplificado() {
    //     let planoContas = this.http.get(`${getUrlCad()}/planocontas?$filter=Sintetico eq false`).pipe(map((res: Response) => res['value'].map(v => ({label: Util.up(v.Descricao), value: v.Id}))));
    //     let lancamentoPadrao = this.http.get(`${getUrlCad()}/lancamentoPadrao?$expand=IdContaDebito&$expand=IdContaCredito`).pipe(map((res: Response) => res['value']));
    //     return forkJoin([planoContas, lancamentoPadrao])
    // }

    // public novaDespesa() {
    //     let lancamentoPadrao = this.http.get(`${getUrlCad()}/lancamentoPadrao?$expand=IdContaDebito&$expand=IdContaCredito`).pipe(map((res: Response) => res['value'].map(v => ({label: Util.up(v.Descricao), value: v.Id}))));
    //     let tipoDocumento = this.http.get(`${getUrlCad()}/tipodocumento`).pipe(map((res: Response) => res['value'].map(v => ({label: Util.up(v.Descricao), value: v.Id}))));
    //     return forkJoin([lancamentoPadrao, tipoDocumento])
    // }

    // itensvendido() {
    //     let grupo = this.http.get(`${getUrlCad()}/grupo`).pipe(map((res: Response) => res['value'].map(v => ({label: Util.up(v.Descricao), value: v.Id}))), catchError(this.errorHandlerDefaultValues));
    //     let tipoFiscal = this.http.get(`${getUrlCad()}/nfeTipoFiscal`).pipe(map((res: Response) => res['value'].map(v => ({label: Util.up(v.Nome), value: v.Id}))), catchError(this.errorHandlerDefaultValues));
    //     let marca = this.http.get(`${getUrlCad()}/marca`).pipe(map((res: Response) => res['value'].map(v => ({label: Util.up(v.Nome), value: v.Id}))), catchError(this.errorHandlerDefaultValues));
    //     let subcategoria = this.http.get(`${getUrlCad()}/subcategoria`).pipe(map((res: Response) => res['value'].map(v => ({label: Util.up(v.Nome), value: v.Id}))), catchError(this.errorHandlerDefaultValues));
    //     let secao = this.http.get(`${getUrlCad()}/secao`).pipe(map((res: Response) => res['value'].map(v => ({label: Util.up(v.Nome), value: v.Id}))), catchError(this.errorHandlerDefaultValues));
    //     let vendedor = this.http.get(`${getUrlCad()}/vendedor`).pipe(map((res: Response) => res['value'].map(v => ({label: Util.up(v.Nome), value: v.Id}))), catchError(this.errorHandlerDefaultValues));
    //     return forkJoin([grupo, tipoFiscal, marca, subcategoria, secao, vendedor])
    // }

    // modalCadastrarProdutoFromNfeDetalhe() {
    //     let grupo = this.http.get(`${getUrlCad()}/grupo`).pipe(map((res: Response) => res['value'].map(v => ({label: Util.up(v.Descricao), value: v.Id}))), catchError(this.errorHandlerDefaultValues));
    //     let impostoIcms = this.http.get(`${getUrlCad()}/impostoicms`).pipe(map((res: Response) => res['value'].map(v => ({label: Util.up(v.Descricao), value: v.Id}))), catchError(this.errorHandlerDefaultValues));
    //     return forkJoin([grupo, impostoIcms])
    // }

    // importarXmlNaoVinculado() {
    //     let grupo = this.http.get(`${getUrlCad()}/grupo`).pipe(map((res: Response) => res['value'].map(v => ({label: Util.up(v.Descricao), value: v.Id}))), catchError(this.errorHandlerDefaultValues));
    //     let impostoIcms = this.http.get(`${getUrlCad()}/impostoicms`).pipe(map((res: Response) => res['value'].map(v => ({label: Util.up(v.Descricao), value: v.Id}))), catchError(this.errorHandlerDefaultValues));
    //     let grupoTributario = this.http.get(`${getUrlCad()}/grupotributario`).pipe(map((res: Response) => res['value'].map(v => ({label: Util.up(v.Descricao), value: v.Id}))), catchError(this.errorHandlerDefaultValues));
    //     let operacaoFiscal = this.http.get(`${getUrlCad()}/operacaofiscal`).pipe(map((res: Response) => res['value'].map(v => ({label: Util.up(v.Descricao), value: v.Id}))), catchError(this.errorHandlerDefaultValues));
    //     let cfop = this.http.get(`${getUrlCad()}/cfop?$filter=(TipoOperacao eq 'E' and IndNfe eq 1)`).pipe(map((res: Response) => res['value'].map(v => ({label: Util.up(v.Descricao), value: v.Cfop}))), catchError(this.errorHandlerDefaultValues));
    //     let naturezaFinanceira = this.http.get(`${getUrlCad()}/naturezafinanceira?$filter=Sintetico eq false and ApareceEntrada eq true`).pipe(map((res: Response) => res['value'].map(v => ({
    //         label: Util.up(v.Descricao),
    //         value: v.Id
    //     }))));
    //     return forkJoin([grupo, impostoIcms, grupoTributario, operacaoFiscal, cfop, naturezaFinanceira])
    // }

    // importarXmlParametro() {
    //     let operacaoFiscal = this.http.get(`${getUrlCad()}/operacaofiscal?$expand=IdCfop`).pipe(map((res: Response) => res['value']), catchError(this.errorHandlerDefaultValues));
    //     let localEstoque = this.http.get(`${getUrlCad()}/localestoque`).pipe(map((res: Response) => res['value'].map(v => ({label: Util.up(v.Descricao), value: v.Id}))));
    //     let naturezaFinanceira = this.http.get(`${getUrlCad()}/naturezafinanceira?$filter=(Sintetico eq false and ApareceEntrada eq true)`).pipe(map((res: Response) => res['value']), catchError(this.errorHandlerDefaultValues));
    //     return forkJoin([operacaoFiscal, localEstoque, naturezaFinanceira])
    // }

    // nfe() {
    //     let operacaoFiscal = this.http.get(`${getUrlCad()}/operacaofiscal?$expand=IdCfop`).pipe(map((res: Response) => res['value']), catchError(this.errorHandlerDefaultValues));
    //     let vendedor = this.http.get(`${getUrlCad()}/vendedor`).pipe(map((res: Response) => res['value'].map(v => ({label: Util.up(v.Nome), value: v.Id}))), catchError(this.errorHandlerDefaultValues));
    //     let tabelaPreco = this.http.get(`${getUrlCad()}/tabelapreco`).pipe(map((res: Response) => res['value'].map(v => ({label: Util.up(v.Nome), value: v.Id}))), catchError(this.errorHandlerDefaultValues));
    //     let cstIpi = this.http.get(`${URL_BASE}/cstipi`).pipe(map((res: Response) => res['value'].map(v => ({label: Util.up(v.Descricao), value: v.Codigo}))), catchError(this.errorHandlerDefaultValues));
    //     let cstIcms = this.http.get(`${URL_BASE}/cstbicms`).pipe(map((res: Response) => res['value'].map(v => ({label: Util.up(v.Descricao), value: v.Cst}))), catchError(this.errorHandlerDefaultValues));
    //     let cstCofins = this.http.get(`${URL_BASE}/cstcofins`).pipe(map((res: Response) => res['value'].map(v => ({label: Util.up(v.Descricao), value: v.Codigo}))), catchError(this.errorHandlerDefaultValues));
    //     let cstPis = this.http.get(`${URL_BASE}/cstpis`).pipe(map((res: Response) => res['value'].map(v => ({label: Util.up(v.Descricao), value: v.Codigo}))), catchError(this.errorHandlerDefaultValues));
    //     let condicoesPagamento = this.http.get(`${getUrlCad()}/condicoespagamento`).pipe(map((res: Response) => res['value']));
    //     let bandeira = this.http.get(`${getUrlCad()}/bandeira`).pipe(map((res: Response) => res['value'].map(v => ({label: Util.up(v.Nome), value: v.Id}))));
    //     let csosn = this.http.get(`${URL_BASE}/csosn`).pipe(map((res: Response) => res['value'].map(v => ({label: Util.up(v.Descricao), value: v.Codigo.toString()}))), catchError(this.errorHandlerDefaultValues));
    //     return forkJoin([operacaoFiscal, vendedor, tabelaPreco, cstIpi, cstIcms, cstCofins, cstPis, condicoesPagamento, bandeira, csosn])
    // }

    // public modalAdicionarCondicoesPagamento() {
    //     let condicoesPagamento = this.http.get(`${getUrlCad()}/condicoespagamento?$expand=IdMeiosPagamento/IdAdmCartao`).pipe(map((res: Response) => res['value']), catchError(this.errorHandlerDefaultValues));
    //     let bandeira = this.http.get(`${getUrlCad()}/bandeira`).pipe(map((res: Response) => res['value']));
    //     let adquirentes = this.http.get(`${getUrlVenda()}/vendas/ListaRedesAdquirentes`).pipe(map((res: Response) => res['value']));
    //     return forkJoin([condicoesPagamento, bandeira, adquirentes])
    // }

    // configurarNfePorItem() {
    //     let grupoTributario = this.http.get(`${getUrlCad()}/grupotributario`).pipe(map((res: Response) => res['value'].map(v => ({label: Util.up(v.Descricao), value: v.Id}))), catchError(this.errorHandlerDefaultValues));
    //     return forkJoin([grupoTributario])
    // }

    // configuracaoOperacaoFiscal() {
    //     let operacaoFiscal = this.http.get(`${getUrlCad()}/operacaofiscal`).pipe(map((res: Response) => res['value'].map(v => ({label: Util.up(v.Descricao), value: v.Id}))), catchError(this.errorHandlerDefaultValues));
    //     let grupoTributario = this.http.get(`${getUrlCad()}/grupotributario`).pipe(map((res: Response) => res['value'].map(v => ({label: Util.up(v.Descricao), value: v.Id}))), catchError(this.errorHandlerDefaultValues));
    //     return forkJoin([operacaoFiscal, grupoTributario])
    // }

    // operacaoFiscal() {
    //     let cfop = this.http.get(`${URL_BASE}/cfop`).pipe(map((res: Response) => res['value']), catchError(this.errorHandlerDefaultValues));
    //     let tipoFiscal = this.http.get(`${URL_BASE}/nfeTipoFiscal`).pipe(map((res: Response) => res['value'].map(v => ({label: Util.up(v.Nome), value: v.Tipo}))), catchError(this.errorHandlerDefaultValues));
    //     return forkJoin([cfop, tipoFiscal])
    // }

    // tributacaoIcmsUf() {
    //     let cstBIcms = this.http.get(`${URL_BASE}/cstbicms`).pipe(map((res: Response) => res['value'].map(v => ({label: Util.up(v.Descricao), value: v.Cst}))), catchError(this.errorHandlerDefaultValues));
    //     let csosn = this.http.get(`${URL_BASE}/csosn`).pipe(map((res: Response) => res['value'].map(v => ({label: Util.up(v.Descricao), value: v.Codigo.toString()}))), catchError(this.errorHandlerDefaultValues));
    //     let modalidadebaseicms = this.http.get(`${URL_BASE}/modalidadebaseicms`).pipe(map((res: Response) => res['value'].map(v => ({label: Util.up(v.Descricao), value: v.Codigo}))), catchError(this.errorHandlerDefaultValues));
    //     let motivoDesoneracao = this.http.get(`${URL_BASE}/motivoDesoneracao`).pipe(map((res: Response) => res['value'].map(v => ({label: Util.up(v.Descricao), value: v.CodigoNfe === null ? null : v.CodigoNfe.toString()}))), catchError(this.errorHandlerDefaultValues));
    //     let modalidadeBaseIcmsSt = this.http.get(`${URL_BASE}/modalidadeBaseIcmsSt`).pipe(map((res: Response) => res['value'].map(v => ({label: Util.up(v.Descricao), value: v.Codigo}))), catchError(this.errorHandlerDefaultValues));
    //     return forkJoin([cstBIcms, csosn, modalidadebaseicms, motivoDesoneracao, modalidadeBaseIcmsSt])
    // }

    // tributacaoCofins() {
    //     let operacaoFiscal = this.http.get(`${getUrlCad()}/operacaofiscal`).pipe(map((res: Response) => res['value'].map(v => ({label: Util.up(v.Descricao), value: v.Id}))), catchError(this.errorHandlerDefaultValues));
    //     let grupoTributario = this.http.get(`${getUrlCad()}/grupotributario`).pipe(map((res: Response) => res['value'].map(v => ({label: Util.up(v.Descricao), value: v.Id}))), catchError(this.errorHandlerDefaultValues));
    //     let cstCofins = this.http.get(`${URL_BASE}/cstCofins`).pipe(map((res: Response) => res['value'].map(v => ({label: Util.up(v.Descricao), value: v.Codigo}))), catchError(this.errorHandlerDefaultValues))
    //     return forkJoin([operacaoFiscal, grupoTributario, cstCofins, ])
    // }

    // tributacaoIpi() {
    //     let operacaoFiscal = this.http.get(`${getUrlCad()}/operacaofiscal`).pipe(map((res: Response) => res['value'].map(v => ({label: Util.up(v.Descricao), value: v.Id}))), catchError(this.errorHandlerDefaultValues));
    //     let grupoTributario = this.http.get(`${getUrlCad()}/grupotributario`).pipe(map((res: Response) => res['value'].map(v => ({label: Util.up(v.Descricao), value: v.Id}))), catchError(this.errorHandlerDefaultValues));
    //     let cstIpi = this.http.get(`${URL_BASE}/cstipi`).pipe(map((res: Response) => res['value'].map(v => ({label: Util.up(v.Descricao), value: v.Codigo}))), catchError(this.errorHandlerDefaultValues))
    //     let modalidadeBaseIpi = this.http.get(`${URL_BASE}/modalidadeBaseIpi`).pipe(map((res: Response) => res['value'].map(v => ({label: Util.up(v.Descricao), value: v.Codigo}))), catchError(this.errorHandlerDefaultValues))
    //     // let codigoEnquadramento = this.http.get(`${URL_BASE}/codigoEnquadramento`).pipe(map((res: Response) => res['value'].map(v => ({label: Util.up(v.Descricao), value: v.Codigo}))), catchError(this.errorHandlerDefaultValues))
    //     return forkJoin([operacaoFiscal, grupoTributario, cstIpi, modalidadeBaseIpi, ])
    // }

    // tributacaoIss() {
    //     let operacaoFiscal = this.http.get(`${getUrlCad()}/operacaofiscal`).pipe(map((res: Response) => res['value'].map(v => ({label: Util.up(v.Descricao), value: v.Id}))), catchError(this.errorHandlerDefaultValues));
    //     let grupoTributario = this.http.get(`${getUrlCad()}/grupotributario`).pipe(map((res: Response) => res['value'].map(v => ({label: Util.up(v.Descricao), value: v.Id}))), catchError(this.errorHandlerDefaultValues));
    //     return forkJoin([operacaoFiscal, grupoTributario ])
    // }

    // tributacaoPis() {
    //     let operacaoFiscal = this.http.get(`${getUrlCad()}/operacaofiscal`).pipe(map((res: Response) => res['value'].map(v => ({label: Util.up(v.Descricao), value: v.Id}))), catchError(this.errorHandlerDefaultValues));
    //     let grupoTributario = this.http.get(`${getUrlCad()}/grupotributario`).pipe(map((res: Response) => res['value'].map(v => ({label: Util.up(v.Descricao), value: v.Id}))), catchError(this.errorHandlerDefaultValues));
    //     let cstPis = this.http.get(`${URL_BASE}/cstPis`).pipe(map((res: Response) => res['value'].map(v => ({label: Util.up(v.Descricao), value: v.Codigo}))), catchError(this.errorHandlerDefaultValues))
    //     return forkJoin([operacaoFiscal, grupoTributario, cstPis, ])
    // }

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

