import {Component, EventEmitter, forwardRef, HostListener, Input, OnInit, Output, ViewChild} from '@angular/core';
import {ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR} from "@angular/forms";
import {Util} from "../../controller/Util";
import {center, defaultColSize} from "../../controller/staticValues";

const FIELD_VALUE_ACESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => InputTelefoneComponent),
    multi: true
}

@Component({
    selector: 'app-input-telefone',
    templateUrl: './input-telefone.component.html',
    styleUrls: ['./input-telefone.component.css'],
    providers: [FIELD_VALUE_ACESSOR]
})
export class InputTelefoneComponent implements ControlValueAccessor {

    @Input() label: string;
    @Input() placeholder = '';
    @Input() id: string = Util.randomId();
    @Input() type = 'text';
    @Input() isReadOnly = false;
    @Input() size = defaultColSize
    @Input() center = center
    @Input() row = false;
    @Input() validacao: FormControl
    @Input() tentativa = false

    @Output() onBlur = new EventEmitter<any>()
    @Output() onKeypress = new EventEmitter<any>()

    private innerValue: any;

    constructor() {
    }

    get value() {
        return this.innerValue;
    }

    set value(v: any) {
        if (v !== this.innerValue) {
            this.innerValue = v;
            this.onChange(v)
            this.aplicarMascaraTelefone()
        }
    }

    get campoInvalido() {
        return this.validacao !== undefined && this.validacao.invalid && this.tentativa;
    }

    get gridClass() {
        return Util.defaultInputClass(this.size)
    }

    onChange: (_: any) => void = () => {
    }

    onTouched: (_: any) => void = () => {
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

    aplicarMascara(e) {
        this.aplicarMascaraTelefone()
     }

     @HostListener('keypress', ['$event']) validaDigito(e) {
         if (!e.key.toString().match(/\d|\(|\)|-/)) e.preventDefault()
         this.onKeypress.emit(e)
     }

    aplicarMascaraTelefone() {
        if(this.value === undefined || this.value === null) return
        const valor = this.value.toString().match(/\d/g)
        if(valor === null) return;
        if(valor.length === 10) {
            valor.splice(0, 0, '(')
            valor.splice(3, 0, ') ')
            valor.splice(8, 0, '-')
            this.value = valor.join('').replace(',', '')
        } else if(valor.length === 11) {
            valor.splice(0, 0, '(')
            valor.splice(3, 0, ') ')
            valor.splice(9, 0, '-')
            this.value = valor.join('').replace(',', '')
        } else if(valor.length === 8 || valor.length === 9) {
            valor.splice(5, 0, '-')
            this.value = valor.join('').replace(',', '')
        }
    }

    change($event: Event) {
        this.onBlur.emit($event)
    }
}
