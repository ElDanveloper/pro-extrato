import {Component, EventEmitter, forwardRef, HostListener, Input, OnInit, Output, ViewChild} from '@angular/core';
import {ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR} from "@angular/forms";
import {Util} from "../../controller/Util";
import {center, defaultColSize} from "../../controller/staticValues";

const FIELD_VALUE_ACESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => InputCpfCnpjComponent),
    multi: true
}

@Component({
    selector: 'app-input-cpf-cnpj',
    templateUrl: './input-cpf-cnpj.component.html',
    styleUrls: ['./input-cpf-cnpj.component.css'],
    providers: [FIELD_VALUE_ACESSOR]
})
export class InputCpfCnpjComponent implements ControlValueAccessor {

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
            if (this.value !== undefined && this.value !== null && this.value.toString().length) this.value.toString().match(/\d/g).length === 11 ? this.aplicarMascaraCpf() : this.value.toString().match(/\d/g).length === 14 ? this.aplicarMascaraCnpj() : console.log('');
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
         if (this.value !== undefined && this.value.toString().length) this.value.toString().match(/\d/g).length === 11 ? this.aplicarMascaraCpf() : this.value.toString().match(/\d/g).length === 14 ? this.aplicarMascaraCnpj() : console.log('')
     }

     @HostListener('keypress', ['$event']) validaDigito(e) {
         if (!e.key.toString().match(/\d|\.|-|\//)) e.preventDefault()
         this.onKeypress.emit(e)
     }

    aplicarMascaraCpf() {
        let data = this.value.toString().match(/[0-9]/g)
        this.value = `${data.slice(0, 3).join('')}.${data.slice(3, 6).join('')}.${data.slice(6, 9).join('')}-${data.slice(9, 11).join('')}`
    }

    aplicarMascaraCnpj() {
        let data = this.value.toString().match(/[0-9]/g)
        this.value = `${data.slice(0, 2).join('')}.${data.slice(2, 5).join('')}.${data.slice(5, 8).join('')}/${data.slice(8, 12).join('')}-${data.slice(12, 14).join('')}`
    }

    change($event: Event) {
        this.onBlur.emit($event)
    }

}
