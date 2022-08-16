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

    selecAccount =  []

    constructor(public networkService: NetworkService, public dadosDefault: DadosDefaultService, public router: Router, private route: ActivatedRoute, private fb: FormBuilder, public messageService: MessageService) {
        super(networkService, dadosDefault, router, 'InsertTransection', messageService);

        this.form = Formulario.createForm(new ProStatementItem(), this.fb)
        // this.form.addControl("Account", Formulario.createForm(new ProAccount(), this.fb))
        this.naoBuscar = true

        // this.form.get('DateMovement').setValue(new Date());
    }

    ngOnInit() {
        
    }

    ngOnChanges() {                        
        this.dadosDefault.modalOpeningbalance().subscribe(v => {
            this.selecAccount = v[0]
        })

        const value = Formulario.prepareValueToForm(new ProStatementItem(), this.data, ProStatementItem.datas(), ProStatementItem.relacionamentos(), ProStatementItem.checkboxAntigo());
                Object.keys(value).forEach(key => this.form.controls[key].setValue(value[key]));
        
        this.form.get('FinancialCategoryId').setValue(this.data.FinancialCategoryId)    

        this.dadosDefault.exibirLoader.next(true)
        this.networkService.buscar('Pessoa', this.data.PersonId, null).subscribe(v => {            
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

        const data = Object.assign({}, this.form.value)
        const person = this.form.get('PersonId').value
        

        let value= {...Formulario.parseForm(new ProStatementItem(), data, ProStatementItem.referencias(), null, ProStatementItem.datas(), ProStatementItem.checkboxAntigo(), null)};
        value.PersonId = person.Id
        
        this.dadosDefault.exibirLoader.next(true)
        this.networkService.atualizarPost(getUrlPro(), 'UpdateStatementItemFull', value).subscribe(v => {
            this.messageService.add(Util.pushSuccessMsg("Salvo com Sucesso!"))
            this.fecharModal()
        }).add(this.dadosDefault.exibirLoader.next(false))
    }
    
    fecharModal() {
        this.dadosDefault.closeModal(this.hash)
        this.form.reset()
    }

    pessoaSelecionada(e: any) {
        if (e.FinancialCategoryId !== null) {
            this.dadosDefault.exibirLoader.next(true)
            this.networkService.getSimples(getUrlPro(), `FinancialCategory/${e.FinancialCategoryId}`).subscribe(v => {                
                this.form.get('FinancialCategoryId').setValue(v)
            }).add(this.dadosDefault.exibirLoader.next(false))            
        }
    }
}
