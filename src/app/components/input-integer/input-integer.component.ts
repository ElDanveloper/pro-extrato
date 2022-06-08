import {Component, EventEmitter, forwardRef, Input, Output} from '@angular/core';
import {ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR} from "@angular/forms";
import {Util} from "../../controller/Util";
import {center, defaultColSize} from "../../controller/staticValues";

const FIELD_VALUE_ACESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => InputIntegerComponent),
    multi: true
}

@Component({
    selector: 'app-input-integer',
    templateUrl: './input-integer.component.html',
    styleUrls: ['./input-integer.component.css'],
    providers: [FIELD_VALUE_ACESSOR]
})
export class InputIntegerComponent implements ControlValueAccessor {

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

    @Input() maxLength = 200;

    private innerValue: any;

    get value() {
        return this.innerValue;
    }

    set value(v: any) {
        if(v !== this.innerValue) {
            this.innerValue = v;
            this.onChange(v)
        }
    }

    constructor() { }

    onChange: (_: any) => void = () => {}
    onTouched: (_: any) => void = () => {}
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

    insereDigitos(event: KeyboardEvent) {
        if(!event.key.match(/\d/)) event.preventDefault()
        this.onKeypress.emit(event)
    }
}
