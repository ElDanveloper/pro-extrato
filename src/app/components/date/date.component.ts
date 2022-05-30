import { defaultColSize, center } from './../../controller/staticValues';
import { Util } from '../../controller/Util';
import { forwardRef, Component, Input } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";


const FIELD_VALUE_ACESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => DateComponent),
    multi: true
}

@Component({
  selector: 'app-date',
  templateUrl: './date.component.html',
  styleUrls: ['./date.component.css'],
    providers: [FIELD_VALUE_ACESSOR]
})
export class DateComponent implements ControlValueAccessor {

    @Input() label: string;
    @Input() placeholder = '';
    @Input() id: string = Util.randomId();
    @Input() type = 'text';
    @Input() isReadOnly = false;
    @Input() size = defaultColSize
    @Input() center = center
    @Input() row = false;
    @Input() view = "date";
    @Input() dateFormat = "dd/mm/yy";
    @Input() yearNavigator = false;
    @Input() showTime = false;

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

    changeValue($event: any) {
        this.value = $event
    }
}
