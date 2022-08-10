import { NetworkService } from './../../services/network.service';
import { defaultColSize, center } from './../../controller/staticValues';
import { Util } from './../../controller/Util';
import { Component, EventEmitter, forwardRef, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from "@angular/forms";
import { MessageService } from "primeng/api";


const FIELD_VALUE_ACESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => InputSearchPersonComponent),
    multi: true
}

@Component({
    selector: 'app-input-search-person',
    templateUrl: './input-search-person.component.html',
    styleUrls: ['./input-search-person.component.css'],
    providers: [FIELD_VALUE_ACESSOR]
})
export class InputSearchPersonComponent implements ControlValueAccessor, OnInit {

    @Input() label: string;
    @Input() field: string = 'Nome';
    @Input() placeholder = '';
    @Input() id: string = Util.randomId();
    @Input() type = 'text';
    @Input() isReadOnly = false;
    @Input() size = defaultColSize
    @Input() center = center
    @Input() row = false;
    @Input() validacao: FormControl
    @Input() tentativa = false
    @Input() lowercase = false

    @Output() onBlur = new EventEmitter<any>()
    @Output() onKeypress = new EventEmitter<any>()
    @Output() valorSelecionado = new EventEmitter<any>()
    @Output() change = new EventEmitter<any>()

    @ViewChild('pesquisarpessoa') pesquisarpessoa;

    private innerValue: any;

    inputValue;
    inputValueCheck;

    updateInputValueCheck() {
        this.inputValueCheck = this.inputValue;
    }

    get value() {
        return this.innerValue;
    }

    set value(v: any) {
        if (v !== null && typeof this.innerValue !== 'object' && typeof v === 'object') {
            this.inputValue = v[this.field]
        }
        if (v === null) this.inputValue = '';

        this.updateInputValueCheck()

        if (v !== this.innerValue) {
            this.innerValue = v;
            this.onChange(v)

        }
    }

    constructor(private networkService: NetworkService, private messageService: MessageService) {

    }

    onChange: (_: any) => void = () => { }
    onTouched: (_: any) => void = () => { }
    //modalPesquisa = false;
    valorParcialParaPesquisar: undefined;


    get campoInvalido() {
        return this.validacao !== undefined && this.validacao.invalid && this.tentativa;
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    setDisabledState(isDisabled: boolean): void {
        this.isReadOnly = isDisabled;
    }

    writeValue(v: any): void {
        this.value = v;
    }

    get gridClass() {
        return Util.defaultInputClass(this.size)
    }

    openModal(event) {
        if (this.inputValue === undefined || this.inputValue === null || this.inputValue.toString().trim() === '') {
            this.value = null
            this.updateInputValueCheck()
            this.valorParcialParaPesquisar = undefined
            this.valorSelecionado.emit(null)
            return
        }
        if (this.inputValue === this.inputValueCheck) return;
        if (event.type === 'blur' || event.type === 'keypress' && event.key === 'Enter' && (this.inputValue !== undefined && this.inputValue !== null && this.inputValue.toString().trim() !== '')) {
            let parametro = ''

            if (this.innerValue !== '') {
                parametro = `?Texto='${this.inputValue}'`
            }
            this.networkService.listarPessoa(parametro).subscribe(v => {
                if (v.length === 1) {
                    this.valorPesquisado(v[0])
                } else {
                    this.valorParcialParaPesquisar = this.inputValue
                    this.openModalPesquisa()
                }
            })
        }
    }

    ngOnInit(): void {
    }


    valorPesquisado(event: any) {
        this.value = event.PersonId
        this.inputValue = event.PersonId.Nome
        this.updateInputValueCheck()
        this.valorParcialParaPesquisar = undefined
        this.valorSelecionado.emit(event.PersonId)
    }

    openModalPesquisa() {
        this.pesquisarpessoa.nativeElement.click();
    }
}
