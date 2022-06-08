import {Component, forwardRef, Input, OnInit} from '@angular/core';
import {SelectItem} from "primeng/api";
import {center, defaultColSize} from "../../controller/staticValues";
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import {Util} from "../../controller/Util";

const FIELD_VALUE_ACESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => RadioButtonComponent),
    multi: true
}

@Component({
  selector: 'app-radio-button',
  templateUrl: './radio-button.component.html',
  styleUrls: ['./radio-button.component.css'],
    providers: [FIELD_VALUE_ACESSOR]
})
export class RadioButtonComponent implements ControlValueAccessor {

    @Input() options: SelectItem[] = []
    @Input() group: string;
    @Input() isReadOnly = false;
    @Input() size = defaultColSize
    @Input() center = center
    @Input() row = false;

  constructor() { }

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

    onChange: (_: any) => void = () => {}
    onTouched: (_: any) => void = () => {}

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
}
