import { PersonClient } from './../model/person-client.model';
import { getUrlPro } from './../controller/staticValues';
// import { getUrlCompra } from 'src/app/controller/staticValues';
import { Util } from './../controller/Util';
import { catchError, map } from 'rxjs/operators';
import { getUrlCad, URL_BASE } from './../controller/staticValues';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class NetworkService {

    constructor(private http: HttpClient) {

    }

    public exibirLoader = new BehaviorSubject(false);

    public salvarPost(url: string, endpoint: string, data: Object): Observable<Object> {
        return this.http.post(`${url}/${endpoint}`, data)
            .pipe(map((res: Response) => res['value'] || res), catchError(this.errorHandler))
    }

    public salvar(url: string, entidade: string, data: Object): Observable<Object> {
        return this.http.post(`${url}/${entidade}`, data)
            .pipe(map((res: Response) => res['value'] || res), catchError(this.errorHandler))
    }

    public postComHeaders(url: string, endpoint: string, data: Object): Observable<Object> {
        return this.http.post(`${url}/${endpoint}`, data, {observe: 'response'})
            .pipe(catchError(this.errorHandler))
    }

    public atualizar(url = getUrlCad(), entidade: string, data: Object): Observable<Object> {
        return this.http.put(`${url}/${entidade}(${data['Id']})`, data)
            .pipe(map((res: Response) => res['value']), catchError(this.errorHandler))
    }

    pesquisarCep(estado, cidade, logradouro) {
        return this.http.get(`https://viacep.com.br/ws/${estado}/${cidade}/${logradouro}/json`)
            .pipe(catchError(this.errorHandler))
    }

    public listarComData(url: string, entidade, skip, top, atributo, dataInicial, dataFinal, expanded): Observable<Object[]> {
        let filter = `&$filter=(${atributo} ge ${dataInicial} and ${atributo} le ${dataFinal})`
        if (expanded !== null) filter = filter + expanded
        return this.http.get(`${url}/${entidade}?$top=${top}&$skip=${skip}${filter}`)
            .pipe(map((res: Response) => res['value']), catchError(this.errorHandler))
    }

    listarProduto(parametros) {
        return this.http.get(`${getUrlCad()}/produtos/produtos${parametros}`)
            .pipe(map((res: Response) => res['value']), catchError(this.errorHandler))
    }

    buscarProdutoPeloGtin(v) {
        const parametros = {Gtin: v}
        return this.http.post(`${URL_BASE}/NcmInterface/BuscarProduto`, parametros).pipe(catchError(this.errorHandler))
    }


    public atualizarPost(url = getUrlCad(), entidade: string, data: Object): Observable<Object> {
        return this.http.put(`${url}/${entidade}`, data)
            .pipe(map((res: Response) => res['value']), catchError(this.errorHandler))
    }

    public listar(url: string, entidade, skip, top, sortField, sortOrder, colFilter: any, expanded, ): Observable<Object[]> {
        let filter = ''
        if (colFilter !== undefined && Object.keys(colFilter).length === 2 && (typeof colFilter.value !== 'string' || (typeof colFilter.value === 'string' && colFilter.value !== ''))) {
            if (colFilter.col === 'Id' || colFilter.col === 'Id_nfe') filter = `&$filter= ${colFilter.col} eq ${colFilter.value}`
            if (colFilter.col !== 'Id' && colFilter.col !== 'Id_nfe') filter = `&$filter=contains(lower(${colFilter.col}), '${Util.lower(colFilter.value)}')`
        } else if (colFilter !== undefined && Object.keys(colFilter).length > 2) {
            const values = Object.entries(colFilter)
                filter = `&$filter=(contains(lower(${values[0][1]}), '${Util.lower(values[1][1])}') or contains(lower(${values[2][0]}), '${Util.lower(values[2][1])}'))`
        }

        if (expanded !== null) filter = filter + expanded
        return this.http.get(`${url}/${entidade}?$orderby=${sortField} ${sortOrder}&$top=${top}&$skip=${skip}${filter}`)
            .pipe(map((res: Response) => res['value']), catchError(this.errorHandler))
    }

    public buscar(entidade, id, expanded?, url = getUrlPro()): Observable<{}> {
        let query = `${url}/${entidade}/${id}`
        if (expanded) query = query + expanded
        return this.http.get(query).pipe(catchError(this.errorHandler))
    }

    public getSimplesQtd(url: string, entidade: string,): Observable<Object> {
        return this.http.get(`${url}/${entidade}`).pipe(map((res: Response) => res['@xdata.count']), catchError(this.errorHandler))
    }

    listarPessoa(parametros) {
        // ${Util.expandedQuery(PersonClient.expanded())}
        return this.http.get(`${getUrlPro()}/getPersonClient${parametros}`)
            .pipe(map((res: Response) => res['value']), catchError(this.errorHandler))
    }

    public listarCustom(url: string, entidade, skip, top, filter, expanded?): Observable<Object[]> {
        return this.http.get(`${url}/${entidade}?$top=${top}&$skip=${skip}${filter}`)
            .pipe(map((res: Response) => res['value']), catchError(this.errorHandler))
    }

    salvarProdutoAgil(v) {
        return this.http.post(`${getUrlCad()}/produtos/produtoagil`, v).pipe(catchError(this.errorHandler))
    }

    public listarPost(url: string, filtro: {}, page: number = 1, top: number = 10, expanded?): Observable<Object> {
        let headers = new HttpHeaders()
        headers = headers.append('page', page.toString())
        headers = headers.append('top', top.toString())
        if(expanded) url = url + expanded
        return this.http.post(`${getUrlPro()}/${url}`, filtro, {headers, observe: 'response'})
            // .pipe(map((res: Response) => res['value']), catchError(this.errorHandler))
    }

    public getSimples(url: string, entidade: string,): Observable<Object> {
        return this.http.get(`${url}/${entidade}`).pipe(catchError(this.errorHandler))
    }

    public getSimplesComHeaders(url: string, entidade: string, page: number = 1, top: number = 10): Observable<Object> {
        let headers = new HttpHeaders()
        headers = headers.append('page', page.toString())
        headers = headers.append('top', top.toString())
        return this.http.get(`${url}/${entidade}`, {headers, observe: 'response'}).pipe(catchError(this.errorHandler))
    }

    public getSimplesFromHeader(url: string, entidade: string, count: number, page: number): Observable<Object> {
        let headers = new HttpHeaders();
        headers = headers.append('count', count.toString())
        headers = headers.append('page', page.toString())
        return this.http.get(`${url}/${entidade}`, {headers}).pipe(catchError(this.errorHandler))
    }

    public deletar(url: string = getUrlCad(), entidade, id: number) {
        return this.http.delete(`${url}/${entidade}(${id})`).pipe(catchError(this.errorHandler))
    }

    public deletarPost(url: string, id: {}, urlApi = getUrlCad()): Observable<any> {
        return this.http.post(`${urlApi}/${url}`, id)
            .pipe(catchError(this.errorHandler))
    }

    public baixarCsv(url: string, entidade: string): Observable<any> {
        let headers = new HttpHeaders();
        headers = headers.set('Accept', 'text/csv;charset=UTF-8');
        return this.http.get(`${url}/${entidade}`, {headers, responseType: 'arraybuffer', observe: 'response' })
    }

    public baixarCsvPost(url: string, entidade: string, data): Observable<any> {
        let headers = new HttpHeaders();
        headers = headers.set('Accept', 'text/csv;charset=UTF-8');
        return this.http.post(`${url}/${entidade}`, data, {headers, responseType: 'arraybuffer', observe: 'response' })
    }

    uploadCsvAndDownloadCsv(url, endpoint, file) {
        let headers = new HttpHeaders();
        headers = headers.set('Accept', 'text/csv;charset=UTF-8');
        return this.http.post(`${url}/${endpoint}`, file, {headers, responseType: 'arraybuffer', observe: 'response' })
    }

    // uploadXML(file) {
    //     const formData: FormData = new FormData();
    //     formData.append('xml', file, file.name);
    //     return this.http.post(`${getUrlCompra()}/compras/ImportarXMLNfe`, formData)
    //         .pipe(map((res: Response) => res['value']), catchError(this.errorHandler))
    // }


    public salvarEBaixarArquivo(url: string, entidade: string, data: Object): Observable<any> {
        let headers = new HttpHeaders();
        headers = headers.set('Accept', 'application/pdf');
        return this.http.post(`${url}/${entidade}`, data, {headers: headers, responseType: 'blob' as 'json', observe: 'response'})
    }

    public baixarArquivo(url: string, entidade: string, fileType = 'application/pdf'): Observable<any> {
        let headers = new HttpHeaders();
        headers = headers.set('Accept', fileType);
        return this.http.get(`${url}/${entidade}`, {headers: headers, responseType: 'blob' as 'json', observe: 'response'})
    }

    public baixarZip(url: string, entidade: string): Observable<any> {
        return this.http.get(`${url}/${entidade}`, {responseType: 'arraybuffer', observe: 'response'})
    }

    public visualizarPdf(url: string, entidade: string): Observable<any> {
        let headers = new HttpHeaders();
        headers = headers.set('Accept', 'application/pdf');
        return this.http.get(`${url}/${entidade}`, { responseType: 'arraybuffer', observe: 'response' })
    }

    public quantidadeParaPaginarComData(url: string, entidade, atributo, dataInicial, dataFinal) {
        let filter = `&$filter=(${atributo} ge ${dataInicial} and ${atributo} le ${dataFinal})`
        return this.http
            .get(`${url}/${entidade}?$inlinecount=allpages&$top=0${filter}`)
            .pipe(map((res: Response) => res['@xdata.count']), catchError(this.errorHandler))
    }

    public quantidadeParaPaginar(url: string, entidade, colFilter: any) {
        let filter = ''
        if (colFilter !== undefined && Object.keys(colFilter).length === 2) {
            if (colFilter.col === 'Id' || colFilter.col === 'Id_nfe') filter = `&$filter= ${colFilter.col} eq ${colFilter.value}`
            if (colFilter.col !== 'Id' && colFilter.col !== 'Id_nfe') filter = `&$filter=contains(lower(${colFilter.col}), '${Util.lower(colFilter.value)}')`
        } else if (colFilter !== undefined && Object.keys(colFilter).length > 2) {
            const values = Object.entries(colFilter)
            filter = `&$filter=(contains(lower(${values[0][1]}), '${Util.lower(values[1][1])}') or contains(lower(${values[2][0]}), '${Util.lower(values[2][1])}'))`
        }

        return this.http
            .get(`${url}/${entidade}?$inlinecount=allpages&$top=0${filter}`)
            .pipe(map((res: Response) => res['@xdata.count']), catchError(this.errorHandler))
    }

    public quantidadeParaPaginarComDataETodosOsCampos(url: string, entidade, atributo, dataInicial, dataFinal, campos, value, filtroFixo?) {
        let filter = `&$filter=(${atributo} ge ${dataInicial} and ${atributo} le ${dataFinal}`

        let notFirst = false
        campos.forEach((campo, i) => {
            if (notFirst) {
                filter = filter + ' or '
            } else if (value !== '' && !filter.match(/ and $/)) {
                filter = filter + ' and '
            }
            if (campo.tipo === 'string' && value !== '') {
                filter = filter + `contains(lower(${campo.campo}), '${Util.lower(value)}')`
                notFirst = true
            } else if (campo.tipo === 'number' && value !== '' && value.toString().match(/^\d+$/)) {
                filter = filter + `(${campo.campo} eq ${Number(value)})`
                notFirst = true
            }
        })

        if(filtroFixo) {
            filter = filter + filtroFixo

            if(filter.includes(' or  and ')) {
                filter = filter.replace(' or  and ', ' and ')
                filter = filter.replace(') o and ', ') and ')
            }
        }

        filter = filter + ')'

        if(filter.match(/ or \)/)) filter = filter.replace(" or )", ")")

        const completeQuery = `${url}/${entidade}?$inlinecount=allpages&$top=0${filter}`

        return this.http.get(completeQuery).pipe(map((res: Response) => res['@xdata.count']), catchError(this.errorHandler))
    }

    public quantidadeParaPaginarSemDataETodosOsCampos(url: string, entidade, campos, value, filtroFixo?) {
        let filter = `&$filter=(`

        let notFirst = false
        campos.forEach((campo, i) => {
            if (notFirst) {
                filter = filter + ' or '
            } else if (value !== '' && !filter.match(/ and $/)) {
                //filter = filter + ' and '
            }
            if (campo.tipo === 'string' && value !== '') {
                filter = filter + `contains(lower(${campo.campo}), '${Util.lower(value)}')`
                notFirst = true
            } else if (campo.tipo === 'number' && value !== '' && value.toString().match(/^\d+$/)) {
                filter = filter + `(${campo.campo} eq ${Number(value)})`
                notFirst = true
            }
        })

        if(filtroFixo) {
            filter = filter + filtroFixo

            if(filter.includes(' or  and ')) {
                filter = filter.replace(' or  and ', ' and ')
                filter = filter.replace(') o and ', ') and ')
            }


            if(filter.includes('( and ')) {
                filter = filter.replace('( and ', '(')
            }

        }


        filter = filter + ')'

        if(filter.includes('&$filter=()')) filter = filter.replace('&$filter=()', '')

        const completeQuery = `${url}/${entidade}?$inlinecount=allpages&$top=0${filter}`

        return this.http.get(completeQuery).pipe(map((res: Response) => res['@xdata.count']), catchError(this.errorHandler))
    }

    public listarComDataETodosOsCampos(url: string, entidade, skip, top, atributo, dataInicial, dataFinal, expanded, campos, value, filtroFixo?, sort?): Observable<Object[]> {
        let filter = `&$filter=(${atributo} ge ${dataInicial} and ${atributo} le ${dataFinal}`

        let notFirst = false
        campos.forEach((campo, i) => {
            if (notFirst) {
                filter = filter + ' or '
            } else if (value !== '' && !filter.match(/ and $/)) {
                filter = filter + ' and '
            }
            if (campo.tipo === 'string' && value !== '') {
                filter = filter + `contains(lower(${campo.campo}), '${Util.lower(value)}')`
                notFirst = true
            } else if (campo.tipo === 'number' && value !== '' && value.toString().match(/^\d+$/)) {
                filter = filter + `(${campo.campo} eq ${Number(value)})`
                notFirst = true
            }
        })

        if(filtroFixo) {
            filter = filter + filtroFixo
            if(filter.includes(' or  and ')) {
                filter = filter.replace(' or  and ', ' and ')
                filter = filter.replace(') o and ', ') and ')
            }
        }

        filter = filter + ')'

        if(filter.match(/ or \)/)) filter = filter.replace(" or )", ")")

        if (expanded !== null) filter = filter + expanded

        let requestUrl = `${url}/${entidade}?$top=${top}&$skip=${skip}`
        if(sort) requestUrl = requestUrl + `&$orderby=${sort} desc`

        return this.http.get(`${requestUrl}${filter}`)
            .pipe(map((res: Response) => res['value']), catchError(this.errorHandler))
    }

    public listarSemDataETodosOsCampos(url: string, entidade, skip, top, expanded, campos, value, filtroFixo?, sort?): Observable<Object[]> {
        let filter = `&$filter=(`

        let notFirst = false
        campos.forEach((campo, i) => {
            if (notFirst) {
                filter = filter + ' or '
            } else if (value !== '' && !filter.match(/ and $/)) {
            }
            if (campo.tipo === 'string' && value !== '') {
                filter = filter + `contains(lower(${campo.campo}), '${Util.lower(value)}')`
                notFirst = true
            } else if (campo.tipo === 'number' && value !== '' && value.toString().match(/^\d+$/)) {
                filter = filter + `(${campo.campo} eq ${Number(value)})`
                notFirst = true
            }
        })

        if(filtroFixo) {
            filter = filter + filtroFixo
            if(filter.includes(' or  and ')) {
                filter = filter.replace(' or  and ', ' and ')
                filter = filter.replace(') o and ', ') and ')
            }

            if(filter.includes('( and ')) {
                filter = filter.replace('( and ', '(')
            }

        }

        filter = filter + ')'

        if(filter.includes('&$filter=()')) filter = filter.replace('&$filter=()', '')

        if (expanded !== null) filter = filter + expanded

        let requestUrl = `${url}/${entidade}?$top=${top}&$skip=${skip}`
        if(sort) requestUrl = requestUrl + `&$orderby=${sort} asc`

        return this.http.get(`${requestUrl}${filter}`)
            .pipe(map((res: Response) => res['value']), catchError(this.errorHandler))
    }

    private errorHandler(error: HttpErrorResponse) {
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
        return throwError(excecao.toString().replace(/\\r/g, '\\n'))

    }

    public baixarArquivoS3(url: string): Observable<any> {
        return this.http.get(`${url}`, {responseType: 'blob' as 'json'})
    }    

}

