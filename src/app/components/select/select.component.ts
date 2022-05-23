import {Component, EventEmitter, forwardRef, Input, OnInit, Output} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import {Util} from "../../controller/Util";
import {SelectItem} from "primeng/api";
import {center, defaultColSize} from "../../controller/staticValues";

const FIELD_VALUE_ACESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => SelectComponent),
    multi: true
}

@Component({
    selector: 'app-select',
    templateUrl: './select.component.html',
    styleUrls: ['./select.component.css'],
    providers: [FIELD_VALUE_ACESSOR]
})
export class SelectComponent implements ControlValueAccessor, OnInit {

    @Input() label: string;
    @Input() placeholder;
    @Input() id: string = Util.randomId();
    @Input() options: SelectItem[] = [];
    @Input() isReadOnly = false;
    @Input() size = defaultColSize
    @Input() center = center
    @Input() icon = false;
    @Input() row = false;

    @Output() onValueChange = new EventEmitter<any>()

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
            this.onValueChange.emit(v)
        }
    }

    get gridClass() {
        // let classes = Util.defaultInputClass(this.size)
        // classes['ui-g-nopad'] = true
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

    changeValue($event: any) {
        this.value = $event.value
    }

    ngOnInit(): void {
        this.placeholder = this.value === undefined || '' ? 'Selecione' : null
    }
}
