import { Component, EventEmitter, forwardRef, HostListener, Input, OnInit, Output, ViewChild, ElementRef } from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import {Util} from "../../controller/Util";
import {center, defaultColSize} from "../../controller/staticValues";
import {DadosDefaultService} from "../../services/dados-default.service";

const FIELD_VALUE_ACESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => InputMoneyComponent),
    multi: true
}

@Component({
    selector: 'app-input-money',
    templateUrl: './input-money.component.html',
    styleUrls: ['./input-money.component.css'],
    providers: [FIELD_VALUE_ACESSOR]
})
export class InputMoneyComponent implements OnInit, ControlValueAccessor {

    @Input() label: string;
    @Input() placeholder = '0,00';
    @Input() id: string = Util.randomId();
    @Input() type = 'text';
    @Input() isReadOnly = false;
    @Input() size = defaultColSize;
    @Input() center = center;
    @Input() row = false;
    @Input() virgula = 'padrao';

    @Output() onBlur = new EventEmitter<any>()
    @Output() onKeypress = new EventEmitter<any>()
    @Output() onEnterpress = new EventEmitter<any>()
    @Output() onChangeValue = new EventEmitter<any>()

    @Input() innerValue: any;

    private cursorSemSelecionar: boolean = false
    @ViewChild('input') input
    @ViewChild('inputRef') inputRef: ElementRef;
    private cursorPosition: number = 0
    private valor: string = ''
    tiposVirgula = {
        padrao: 2,
        valor: 3,
        quantidade: 3
    }
    @Input() qtdDecimais = 2

    possuiFoco = false

    get value() {
        return this.innerValue;
    }

    set value(v: any) {
        const m = this.value === undefined && v !== undefined
        if (v !== this.innerValue) {
            this.innerValue = v;
            this.onChange(v)
            this.onChangeValue.emit(v)
            if(m || !this.possuiFoco) {
                this.adicionaMascara()
            }
        }
    }

    get decimais() {
        return this.qtdDecimais
    }

    set decimais(v) {
        this.qtdDecimais = v
    }

    constructor(private dadosDefault: DadosDefaultService) {
    }

    @HostListener('click', ['$event']) focouUsandoMouse(e) {
        //Se o usuario clicar uma vez retorne true, se nao, retorne false
        this.cursorSemSelecionar = this.focoNormal()
    }

    focouNoInput(e) {
        e.preventDefault()
        //Quando o usuario entra no input, o todos os digitos serao selecionados porque o usuario entrou com um TAB
        if (this.value !== null && !this.cursorSemSelecionar) this.input.nativeElement.setSelectionRange(0, this.value.toString().length)
        this.cursorSemSelecionar = false
        this.possuiFoco = true
    }

    @HostListener('paste', ['$event']) validaColar(e) {

        e.preventDefault()
        this.valor = e.clipboardData.getData('text/plain')

        this.cursorPosition = this.input.nativeElement.selectionStart

        //Se o texto tiver mais que 1 virgula, retorne
        if (this.valor.match(new RegExp(`[.,]{${this.decimais},}`, 'g'))) return

        if (!this.validaDigito()) return

        this.alterarValor()

        this.input.nativeElement.setSelectionRange(this.value.toString().length, this.value.toString().length)
    }

    insereDigitos(e) {
        e.preventDefault()
        this.valor = e.key.toString()

        this.cursorPosition = this.input.nativeElement.selectionStart
        const temp = this.cursorPosition
        if (!this.validaDigito()) return

        this.alterarValor()

        setTimeout(() => {
            //Apos adicionar o digito eu avanco o cursor em 1 casa
            this.input.nativeElement.setSelectionRange(temp + 1, temp + 1)
        })
        this.onKeypress.emit(e)
    }

    adicionaZeros = () => {
        let value = ''

        for (let i = 0; i < this.decimais; i++) {
            value = value.concat('0')
        }

        return value
    }

    completaZeros = () => {
        const index = this.value.toString().indexOf(',')
        const current = this.value.toString().substring(index + 1)
        const tam = current.length
        let value = ''
        for (let i = 0 ; i < (this.decimais - tam); i++) {
            value = value + '0'
        }
        return value
    }

    adicionaMascara(e?) {        
        if(this.value === undefined || this.value === null) {
            this.value = '0,00'
            return
        } else {
            this.value = this.value.toString().replace(".", ",")
        }
        if (this.value.toString().match(/,$/g)) {
            this.value = this.value + this.adicionaZeros()
        } else if (!this.value.toString().match(/,/)) {
            this.value = this.value + ',' + this.adicionaZeros()
        } else if (!this.value.toString().match(`,\d{${this.decimais}}$`, 'g')) {
            this.value = this.value + this.completaZeros()
        } 

        //Como alem das opces anteriores essa tambem pode ser verdadeira junto com elas, entao eu faco essa checagem separado para que ela tambem seja verificada
        if (this.value.toString().match(/^,/)) this.value = '0' + this.value
        if(e) {
            this.onBlur.emit(e)
            this.possuiFoco = false
        }
    }

    private focoNormal(): boolean {
        return this.input.nativeElement.selectionStart === this.input.nativeElement.selectionEnd
    }

    private alteraValorParcialmenteSelecionado(data, cursorPosition, posicaoFinalCursor, valor) {
        data.splice(cursorPosition, ((posicaoFinalCursor + 1) - cursorPosition), valor)
        this.value = data.join('')
    }

    private validaDigito(): boolean {        
        
        //Se o tipo de valor nao for numerico, sinal de negativo, virgula ou ponto, retorne
        if (!this.valor.match(/,|^-|\.|\d/g)) return false
        
        //Verifica se já foi inserido o sinal de negativo ou se está na primeira posição
        if (this.valor.toString().match(/^-/) && this.cursorPosition !== 0) return false
        

        //Se o usuario digitar virgula ou ponto e ja tiver uma virgula, porem o usuario nao focou no input usando TAB (porque se estiver selecionado e o usuario digitar um ponto ja existindo um, nao apagaria o texto anterior), retorne
        if (this.value !== null && (this.value.toString().match(/,/) && this.valor.match(/[.,]/g)) && this.cursorSemSelecionar) return false

        //Se o valor jà tiver duas casas decimais e o usuario tentar digitar depois da virgula, retorne
        if (this.value !== null && this.value.toString().match(/,\d{6}/g) && (this.cursorPosition >= (this.value.toString().length - this.decimais))) return false

        //Se o usuario digitar um ponto, troque por virgula
        if (this.valor.match(/\./g)) this.valor = this.valor.replace('.', ',')

        return true
    }

    private alterarValor() {
        if (this.value === null) return '0,00'
        //Transformei o valor em um array para poder inserir o novo digito em qualquer lugar onde o cursor estiver
        let data = this.value.toString().split('')
        data.splice(this.cursorPosition, 0, this.valor)
        //Se selecionar parte do valor chama a funcao que insere o valor no trecho correspondente, se o foco estiver normal, insere o valor normalmente, se entrar com TAB, vai apagar o valor anterior do input, e resertar a posicao do cursor
        !this.focoNormal() && (this.cursorPosition !== 0 || this.input.nativeElement.selectionEnd !== this.value.toString().length) ? this.alteraValorParcialmenteSelecionado(data, this.cursorPosition, this.input.nativeElement.selectionEnd, this.valor) :
            this.cursorSemSelecionar ? this.value = data.join('') :
                (() => {
                    this.value = this.valor
                    this.cursorPosition = 0
                })()

        //Faco isso para caso tenha focado usando TAB nos proximos digitos ele ja trata como se estivesse entrado no input sem o TAB
        this.cursorSemSelecionar = true
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

    get gridClass() {
        return Util.defaultInputClass(this.size)
    }

    ngOnInit(): void {
        this.dadosDefault.parametros.subscribe(v => {
            //this.tiposVirgula = {...v, padrao: 2}
            //this.decimais = this.tiposVirgula[this.virgula]
        })
    }

    focus() {
        this.inputRef.nativeElement.focus();
    }

}
