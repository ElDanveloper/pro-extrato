import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {ConfirmationService} from "primeng/api";
import {NetworkService} from "../../../services/network.service";
import {Router} from "@angular/router";
import {DadosDefaultService} from "../../../services/dados-default.service";

@Component({
  selector: 'app-modal-search-person',
  templateUrl: './modal-search-person.component.html',
  styleUrls: ['./modal-search-person.component.css']
})
export class ModalSearchPersonComponent implements OnInit {

    @ViewChild('inputPesquisa') public inputPesquisa
    @ViewChild('conteudo') public content

    public entidade = 'Pesquisar Pessoa'


    @Input() modalVisible = false;
    @Input() data = '';
    @Output() dadosSalvos = new EventEmitter()
    @Output() closeModal = new EventEmitter()
    value;
    lista = []
    totalItens = 0

    public hash
    public modal = true;

    filtro = ''


    constructor(public confirmationService: ConfirmationService, public networkService: NetworkService, public dadosDefault: DadosDefaultService, public router: Router) {

    }

    ngOnInit() {
        setTimeout(() => {
            if(this.data) {
                this.carregarLista()
            } else {
                this.data = ''
                this.lista = []
                this.totalItens = 0
                this.value = null
            }
            this.inputPesquisa.nativeElement.click()
        }, 1000)
    }

    fecharModal() {
        this.lista = []
        this.totalItens = 0
        this.data = ''
        this.value = null
        this.closeModal.emit(false)
        this.dadosDefault.closeModal(this.hash);
    }

    processarFormulario() {
        this.dadosSalvos.emit(Object.assign({}, this.value))
        this.lista = []
        this.dadosDefault.closeModal(this.hash);
    }

    carregarLista() {        
        let parametro = ''
        if(this.data !== '') {
            parametro = `?Texto='${this.data}'`
        }
        this.networkService.listarPessoa(parametro).subscribe((v: any) => {            
            this.totalItens = this.lista.length
            this.lista = v
        })
    }

    get pessoas () {               
        return this.lista.filter(v => {            
            if (v.PersonId.Nome === null) {
                v.PersonId.Nome = ''
            }               
            if (v.PersonId.CpfCnpj === null) {
                v.PersonId.CpfCnpj = ''
            }
            return v.PersonId.Nome.toLowerCase().includes(this.data.toLowerCase()) || v.PersonId.CpfCnpj.toString().includes(this.data)
        })
    
}

    pressionaEnter(event: KeyboardEvent) {
        if(event.key === 'Enter') this.carregarLista();
    }

    changeSelect(e: any) {
        switch (e.type) {
            case 'pessoa':
                this.value = e.payload
                this.processarFormulario()
                break
        }
    }
}
