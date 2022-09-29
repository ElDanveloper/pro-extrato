import { Router } from '@angular/router';
import { Component, EventEmitter, Input, OnInit, Output, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { DadosDefaultService } from "../../services/dados-default.service";
import { NetworkService } from "../../services/network.service";
import { Util } from "../../controller/Util";
import { MessageService } from "primeng/api";

@Component({
    selector: 'app-modal-switch-account',
    templateUrl: './modal-switch-account.component.html',
    styleUrls: ['./modal-switch-account.component.css']
})
export class ModalSwitchAccountComponent implements OnInit {

    @Input() modalVisible = false;
    @Output() dadosSalvos = new EventEmitter()
    @Output() closeModal = new EventEmitter()
    form: FormGroup
    dataSemMovimento = Util.getDateComTresMesAntes()

    // selectAdquirente = [
    //     {label: '', value: null},
    //     {label: 'REDE', value: 'REDE'},
    // ]
    selectContaCaixa = []
    IdContaCaixa = 0

    exibirLoader = this.dadosDefault.exibirLoader
    exibirLoaderNetwork = this.networkService.exibirLoader


    constructor(private fb: FormBuilder, private dadosDefault: DadosDefaultService, private networkService: NetworkService, private messageService: MessageService, public router: Router) {
        this.form = this.fb.group({
            Nome: '',
        })
    }

    ngOnInit() {       
       this.dadosDefault.conciliator().subscribe(v => {
           this.selectContaCaixa = v[0]
       })
    }

    OnChanges() {

    }

    fecharModal() {
        this.form.reset()
        this.closeModal.emit(false)
    }

    selecionouContaCaixa(e) {
        this.IdContaCaixa = e        
    }

    confirmar() {
        // let contaCaixa = this.selectContaCaixa.find(x => x.value === this.IdContaCaixa);
        // console.log("Conta Caixa ----> " + contaCaixa.label)
        // sessionStorage.setItem('caixaBanco', contaCaixa.label)
        this.router.navigate([`/account-launch/${this.IdContaCaixa}`])        
        this.fecharModal()
    }
}
