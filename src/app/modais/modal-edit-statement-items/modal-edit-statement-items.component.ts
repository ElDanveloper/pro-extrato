import { PersonClient } from 'src/app/model/person-client.model';
import { getUrlPro } from 'src/app/controller/staticValues';
import { getUrlCad } from './../../controller/staticValues';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { BaseFormPost } from "../../controller/BaseFormPost";
import { FormBuilder, FormGroup } from "@angular/forms";
import { NetworkService } from "../../services/network.service";
import { DadosDefaultService } from "../../services/dados-default.service";
import { ActivatedRoute, Router } from "@angular/router";
import { MessageService } from "primeng/api";
import { Formulario } from "../../controller/Formulario";
import { Util } from "../../controller/Util";
import { ProStatementItem } from 'src/app/model/pro-statement-item.model';
import { timestamp } from 'rxjs/operators';
import { ProAccount } from 'src/app/model/pro-account.model';

@Component({
    selector: 'app-modal-edit-statement-items',
    templateUrl: './modal-edit-statement-items.component.html',
    styleUrls: ['./modal-edit-statement-items.component.css']
})
export class ModalEditStatementItemsComponent extends BaseFormPost implements OnInit {

    entidade = 'Edição'
    // entObj = new LancamentoCaixaVO()
    id;
    form: FormGroup;
    @Input() data;
    @Input() hash;
    selectNaturezaFinanceira = [];
    @ViewChild('data') public dataSelect


    vencimento = false
    natureza = false
    historico = false

    selectSpecie = [
        {label: 'Débito', value: 'D'},
        {label: 'Crédito', value: 'C'}
    ]

    constructor(public networkService: NetworkService, public dadosDefault: DadosDefaultService, public router: Router, private route: ActivatedRoute, private fb: FormBuilder, public messageService: MessageService) {
        super(networkService, dadosDefault, router, 'InsertTransection', messageService);

        this.form = Formulario.createForm(new ProStatementItem(), this.fb)
        this.form.addControl("Account", Formulario.createForm(new ProAccount(), this.fb))
        this.naoBuscar = true

        this.form.get('DateMovement').setValue(new Date());
    }

    ngOnInit() {
        
    }

    ngOnChanges() {                        
        console.log(JSON.stringify(this.data))
        
        this.form.get('FinancialCategoryId').setValue(this.data.FinancialCategoryId)        
        this.dadosDefault.exibirLoader.next(true)
        this.networkService.buscar('PersonClient', this.data.PersonId, null).subscribe(v => {            
            this.form.get('PersonId').setValue(v)
        }).add(this.dadosDefault.exibirLoader.next(false))
    }

    selecionouNatureza(e) {
        // this.form.get('IdNaturezaFin').setValue(e.Id)
    }

    selecionouPerson(e) {
        if (!e) return
        this.form.get('PersonId').setValue(e.Id)
    }

    public processarFormulario(modal?) {

        const {Account, ...data} = Object.assign({}, this.form.value)

        console.log("Account ---> " + Account)

        let value= {...Formulario.parseForm(new ProStatementItem(), data, ProStatementItem.referencias(), null, ProStatementItem.datas(), null, null), "$id": 1};
        value.AccountId = {...Formulario.parseForm(new ProAccount(), Account, null, null, ProAccount.datas(), null, ProAccount.checkbox()), "$id": 2}
        
        this.dadosDefault.exibirLoader.next(true)
        this.networkService.salvarPost(getUrlPro(), 'InsertTransection', value).subscribe(v => {
            this.messageService.add(Util.pushSuccessMsg("Salvo com Sucesso!"))
            this.fecharModal()
        }).add(this.dadosDefault.exibirLoader.next(false))
    }

    verifcarLivroCaixa(livro) {
        // if(livro){
        // this.form.get('IdPessoa').setValue(null)
        // this.form.get('Documento').setValue('')
        // if(!this.natureza) this.form.get('IdNaturezaFin').setValue(null)
        // if(!this.historico) this.form.get('Historico').setValue('')
        // if(!livro) this.form.get('Valor').setValue('0,00') 
        // } else {

        // }
    }

    fecharModal() {
        this.dadosDefault.closeModal(this.hash)
        this.form.reset()
    }

    pessoaSelecionada(e: any) {
        if (e === null || e.IdNatureza === 0 || e.IdNatureza === null) return
        this.dadosDefault.exibirLoader.next(true)
        this.networkService.getSimples(getUrlCad(), `NaturezaFinanceira(${e.IdNatureza})`).subscribe(v => {
            // this.form.get('IdNaturezaFin').setValue(v)
            this.selecionouNatureza(v)
        }).add(() => this.dadosDefault.exibirLoader.next(false))
    }
}
