import { Util } from 'src/app/controller/Util';
import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {DadosDefaultService} from "../../services/dados-default.service";
import {NetworkService} from "../../services/network.service";
import {MessageService} from "primeng/api";
import { Router } from '@angular/router';
import {EMPRESA_COMPLETA_STORAGE_KEY} from "../../controller/staticValues";

@Component({
    selector: 'app-modal-selecionar-empresa-escritorio',
    templateUrl: './modal-selecionar-empresa-escritorio.component.html',
    styleUrls: ['./modal-selecionar-empresa-escritorio.component.css']
})
export class ModalSelecionarEmpresaEscritorioComponent implements OnInit {

    @Input() modalVisible = false;
    @Output() closeModal = new EventEmitter()

    finalidade = [
        {name: "Ambiente Empresa",value: 1},
        {name: "Ambiente Contador", value: 2}
    ]

    constructor(private fb: FormBuilder, private dadosDefault: DadosDefaultService, private networkService: NetworkService, private messageService: MessageService,private router: Router) {

    }

    ngOnInit() {

    }

    confirmar(event){
        if(event.value === 1){
            this.router.navigate(['selecao-empresa/1']);
        }
        if(event.value === 2){
            console.log('Seleção de empressão ---> ')
            this.router.navigate(['selecao-empresa/2']);
        }
    }

    fecharModal() {
        this.closeModal.emit(false)
    }
}
