
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { BaseFormPost } from "../../controller/BaseFormPost";
import { FormBuilder, FormGroup } from "@angular/forms";
import { NetworkService } from "../../services/network.service";
import { DadosDefaultService } from "../../services/dados-default.service";
import { ActivatedRoute, Router } from "@angular/router";
import { MessageService } from "primeng/api";
import { Formulario } from "../../controller/Formulario";
import { Util } from "../../controller/Util";
import { getUrlPro } from 'src/app/controller/staticValues';

@Component({
    selector: 'app-modal-support',
    templateUrl: './modal-support.component.html',
    styleUrls: ['./modal-support.component.css']
})
export class ModalSupportComponent implements OnInit {

    @Input() modalVisible = false;
    @Input() data = '';
    @Output() dadosSalvos = new EventEmitter()
    @Output() closeModal = new EventEmitter()
    /* selectNatureza = [];
    nature; */

    constructor(public networkService: NetworkService, public dadosDefault: DadosDefaultService, public router: Router, private route: ActivatedRoute, private fb: FormBuilder, public messageService: MessageService) {
        //super(networkService, dadosDefault, router, 'IncludeBalance', messageService);
        //this.form = Formulario.createForm(new Nature(), this.fb)
    }

    ngOnInit() {
        /* this.dadosDefault.registrationNatureza().subscribe(value => {
            this.selectNatureza = value[0]
        }) */

    }

    ngOnChanges() {
        this.dadosDefault.exibirLoader.next(true)
        this.networkService.getSimples(getUrlPro(), 'ClearProExtrato?Items=true&Accounts=true').subscribe(v => {
            console.log(v);
        }).add(() => this.dadosDefault.exibirLoader.next(false))
    }

    confirmar() {}

    fecharModal() {
        //this.selected = []
        this.closeModal.emit()
    }

}

