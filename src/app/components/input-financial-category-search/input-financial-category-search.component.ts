import { getUrlPro } from './../../controller/staticValues';
import {Component, ElementRef, EventEmitter, forwardRef, Input, OnInit, Output, ViewChild} from '@angular/core';
import {ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR} from "@angular/forms";
import {Util} from "../../controller/Util";
import {center, defaultColSize, getUrlCad} from "../../controller/staticValues";
import {NetworkService} from "../../services/network.service";
import {MessageService} from "primeng/api";


const FIELD_VALUE_ACESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => InputFinancialCategorySearchComponent),
    multi: true
}

@Component({
  selector: 'app-input-financial-category-search',
  templateUrl: './input-financial-category-search.component.html',
  styleUrls: ['./input-financial-category-search.component.css'],
    providers: [FIELD_VALUE_ACESSOR]
})
export class InputFinancialCategorySearchComponent implements ControlValueAccessor, OnInit {

    @Input() label: string;
    @Input() field: string = 'Description';
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
    @Input() filtroAdicional = null

    @Output() onBlur = new EventEmitter<any>()
    @Output() onKeypress = new EventEmitter<any>()
    @Output() valorSelecionado = new EventEmitter<any>()

    @ViewChild('inputRef') inputRef: ElementRef;

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
        if(v !== null && typeof this.innerValue !== 'object' && typeof  v === 'object') {
            this.inputValue = v[this.field]
        }
        if(v === null) this.inputValue = '';

        this.updateInputValueCheck()

        if(v !== this.innerValue) {
            this.innerValue = v;
            this.onChange(v)

        }
    }

    constructor(private networkService: NetworkService, private messageService: MessageService) {

    }

    onChange: (_: any) => void = () => {}
    onTouched: (_: any) => void = () => {}
    modalPesquisa = false;
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
        if(this.inputValue === undefined || this.inputValue === null || this.inputValue.toString().trim() === '') return
        if(this.inputValue === this.inputValueCheck) return;
        if(event.type === 'blur' || event.type === 'keypress' && event.key === 'Enter' && (this.inputValue !== undefined && this.inputValue !== null && this.inputValue.toString().trim() !== '')) {
            let filtro = ''

            let v = this.inputValue;
            // if(v.toString().match(/^\d+$/)) {
            //     v = `CodeControl eq ${v}`
            // } else {
            //     v = `contains(lower(Description), '${Util.lower(v)}')`
            // }

            let body = {
                Description: v,
                Level: 3
            }
            if (v !== '') {
                body.Description = v                            
            }
            
            this.networkService.exibirLoader.next(true)
            this.networkService.listarPost('FinancialCategories', body).subscribe((v: any) => {            
                const value = v.body['value']                
                    if(value.length === 1) {
                        this.valorPesquisado(value[0])
                    } else {
                        this.valorParcialParaPesquisar = this.inputValue
                        this.modalPesquisa = true
                    }
            }).add(this.networkService.exibirLoader.next(false))

            // if(this.filtroAdicional) {
            //     filtro = `financialCategory?$filter=(Sintetic eq false and ${this.filtroAdicional} and ${v})`
            // } else {
            //     filtro = `financialCategory?$filter=(Sintetic eq false and ${v})`
            // }
            // this.networkService.getSimples(getUrlPro(),filtro).subscribe((v: any) => {
            //     const {value} = v
            //     if(value.length === 1) {
            //         this.valorPesquisado(value[0])
            //     } else {
            //         this.valorParcialParaPesquisar = this.inputValue
            //         this.modalPesquisa = true
            //     }
            // })
        }
    }

    ngOnInit(): void {
    }


    valorPesquisado(event: any) {
        this.modalPesquisa = false;
        this.value = event
        this.inputValue = event[this.field]
        this.updateInputValueCheck()
        this.valorParcialParaPesquisar = undefined
        this.valorSelecionado.emit(event)
        this.inputRef.nativeElement.nextSibling.focus()
    }

    focus() {
        this.inputRef.nativeElement.focus();
    }
}
