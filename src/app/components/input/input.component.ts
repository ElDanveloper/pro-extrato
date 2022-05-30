import {Component, EventEmitter, forwardRef, Input, Output} from '@angular/core';
import {ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR} from "@angular/forms";
import {Util} from "../../controller/Util";
import {center, defaultColSize} from "../../controller/staticValues";

const FIELD_VALUE_ACESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => InputComponent),
    multi: true
}

@Component({
    selector: 'app-input',
    templateUrl: './input.component.html',
    styleUrls: ['./input.component.css'],
    providers: [FIELD_VALUE_ACESSOR]
})
export class InputComponent implements ControlValueAccessor {

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
    @Input() lowercase = false
    @Input() maxLength = 1000;

    @Output() onBlur = new EventEmitter<any>()
    @Output() onKeypress = new EventEmitter<any>()

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
        // let classes = Util.defaultInputClass(this.size)
        // classes['ui-g-nopad'] = true
        return Util.defaultInputClass(this.size)
    }

    keyPress(event: KeyboardEvent) {
        if(this.value) this.value = this.value.toString();
        this.onKeypress.emit(event)
    }
}
