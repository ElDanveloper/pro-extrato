import {Injectable} from '@angular/core'
import {HttpClient, HttpErrorResponse} from '@angular/common/http'
import {BehaviorSubject, Observable, throwError} from 'rxjs'
import {catchError, map} from 'rxjs/operators'
import {API_AUTH, EMPRESA_STORAGE_KEY} from "../../controller/staticValues";
import {Router} from "@angular/router";

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    public usuarioLogado: BehaviorSubject<boolean> = new BehaviorSubject(!!sessionStorage.getItem(EMPRESA_STORAGE_KEY))

    listaEmpresas = new BehaviorSubject<any>(null)

    constructor(private http: HttpClient, private router: Router) {
    }

    isUsuarioLogado() {
        return this.usuarioLogado.asObservable()
    }

    public primeiraAuthenticacao(usuario: {}) {
        return this.http.post(`https://app.hunno.com.br/api/login`, usuario).pipe(catchError(this.errorHandler))
    }

    public segundaAuthenticacao() {
        return this.http.get(`https://app.hunno.com.br/api/suport/client`).pipe(catchError(this.errorHandler))
    }
    
    public terceiraAuthenticacao() {
        return this.http.get(`https://app.hunno.com.br/api/suport/contractor/user`).pipe(catchError(this.errorHandler))
    }

    public selectAuthenticacao(contractor: {}) {
        return this.http.post(`https://app.hunno.com.br/api/update/token/selected`, contractor).pipe(map(res => res)).pipe(catchError(this.errorHandler))
    }

    public quartaAuthenticacao(usuarioEmpresa: {}) {
        return this.http.post(`${API_AUTH}/security/SecurityUserService/LoginUsuarioEmpresa`, usuarioEmpresa).pipe(map(res => res['value'])).pipe(catchError(this.errorHandler))
    }

    deslogar() {
        this.usuarioLogado.next(false)
        sessionStorage.clear()
        this.router.navigate(['/login'])
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

}
