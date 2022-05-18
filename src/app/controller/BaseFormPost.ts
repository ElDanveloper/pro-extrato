import {NetworkService} from "../services/network.service";
import {Router} from "@angular/router";
import {getUrlCad} from "./staticValues";
import {MessageService} from "primeng/api";
import {Util} from "./Util";
import { EventEmitter, OnDestroy, Output, ViewChild, Directive, Component, Inject } from "@angular/core";
import {DadosDefaultService} from "../services/dados-default.service";
import {Subscription} from "rxjs";

// @Component({
//     template: ''
// })
export class BaseFormPost implements OnDestroy {

    @Output() dadosSalvos = new EventEmitter();
    @ViewChild('conteudo') content;
    hash = '';
    modal = false;
    tentativa = false;
    updateOverride = false
    naoBuscar = false
    urlCadastro

    $subscriptionSalvar: Subscription;
    $subscriptionAtualizar: Subscription;
    $subscriptionProcurar: Subscription;

    constructor(public networkService: NetworkService, public dadosDefault: DadosDefaultService, public router: Router, public entidade, public messageService: MessageService) {
    }

    public save(endpoint, value, modal?, url = getUrlCad()) {
        this.clear();
        if (value.Id === undefined || value.Id === '') value.Id = 0;

        if(this.updateOverride) {
            this.$subscriptionAtualizar = this.networkService.atualizarPost(url, endpoint, value).subscribe(v => {
                this.sair(v);
                this.messageService.add(Util.pushSuccessMsgSemDelay('Realizado com Sucesso!'))
            })

        } else {
            this.$subscriptionSalvar = this.networkService.salvarPost(url, endpoint, value).subscribe(v => {
                this.sair(v);
                this.messageService.add(Util.pushSuccessMsgSemDelay('Realizado com Sucesso!'))
            })
        }

    }

    public cancelar() {
        this.sair()
    }

    public validaFormulario(form) {

    }

    addSingleErrorMessage(msg) {
        this.messageService.add(msg);
    }

    clear() {
        this.messageService.clear();
    }

    private sair(value?) {
        if (this.modal) {
            if(this.naoBuscar) {
                this.dadosSalvos.emit({type: this.entidade, payload: value});
                this.dadosDefault.closeModal(this.hash);
            } else {
                this.$subscriptionProcurar = this.networkService.buscar(this.entidade, value).subscribe(v => {
                    this.dadosSalvos.emit({type: this.entidade, payload: v});
                    this.dadosDefault.closeModal(this.hash);
                })
            }
        } else {
            this.router.navigate([`/${this.urlCadastro !== undefined ? this.urlCadastro : this.entidade}`])
        }
    }

    fechar(){
        this.dadosDefault.closeModal(this.hash);
    }

    formatDate(date) {
        let d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;

        return [day, month, year].join('/');
    }

    ngOnDestroy() {
        if(this.$subscriptionSalvar) this.$subscriptionSalvar.unsubscribe()
        if(this.$subscriptionAtualizar) this.$subscriptionAtualizar.unsubscribe()
        if(this.$subscriptionProcurar) this.$subscriptionProcurar.unsubscribe()
    }

}
