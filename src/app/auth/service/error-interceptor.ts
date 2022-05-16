import { Util } from '../../controller/Util';
import * as Sentry  from '@sentry/browser';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http'
import {Observable, throwError} from 'rxjs'
import {Injectable} from '@angular/core'
import {catchError} from "rxjs/operators";

import {MessageService} from "primeng/api";

import {AuthService} from "./auth.service";
import {environment} from "../../../environments/environment";

if(environment.production) {
    Sentry.init({
        dsn: "https://6de63569b8834477996f82bea1eacf7e@sentry.io/5173629",
        release:'toqweb@v1.0',
    });
}

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(private messageService: MessageService, private authService: AuthService) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(catchError((erro: HttpErrorResponse) => {
            Sentry.captureException(erro);

            if(typeof erro.error === 'string') {
                this.messageService.add(Util.pushErrorMsg(erro.error))
                const eventId = Sentry.captureException(erro);

                if(erro.error === 'Invalid JWT' || erro.error === 'Token expired') {
                    this.authService.deslogar()
                }

                return throwError(erro)
            }

            if(erro.error instanceof ArrayBuffer) {
                let decodedString = new TextDecoder("utf-8").decode(new Uint8Array(erro.error));
                const mensagem = JSON.parse(decodedString)['error']['message'];

                this.messageService.add(Util.pushErrorMsg(mensagem))

                // this.handleSentryError(erro, mensagem, req.body)
                return throwError(erro)
            }

            if(erro.error instanceof Blob) {
                const reader: FileReader = new FileReader();
                reader.onloadend = (e) => {
                    const mensagem = JSON.parse(reader.result as string);
                    this.messageService.add(Util.pushErrorMsg(mensagem.error.message))
                    // this.handleSentryError(erro, mensagem.error.message, req.body)
                };
                reader.readAsText(erro.error);
                return throwError(erro)
            }

            const eventId = Sentry.captureException(erro);
            if(erro instanceof  HttpErrorResponse) {
                this.messageService.add(Util.pushErrorMsg(this.extractError(erro)))
                // this.handleSentryError(erro, null, req.body)
                return throwError(erro)
            } else {
                console.log('---cliente error---')
                console.log(erro)
                //client side error
                return throwError(erro)
            }
        }))
    }

    private extractError(error: HttpErrorResponse) {
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

    handleSentryError(err: HttpErrorResponse, message, body) {
        const newErr = new HttpErrorResponse({
            url: err.url,
            status: err.status,
            headers: err.headers,
            statusText: err.statusText,
            error: {
                message,
                body,
            }
        })
        const eventId = Sentry.captureException(newErr);
    }

}

