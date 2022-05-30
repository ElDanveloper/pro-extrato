import { PainelComponent } from './painel/painel.component';
import { DateComponent } from './date/date.component';
import { InputTelefoneComponent } from './input-telefone/input-telefone.component';
import { InputComponent } from './input/input.component';
import { InputCpfCnpjComponent } from './input-cpf-cnpj/input-cpf-cnpj.component';
import { OpcoesTableComponent } from './opcoes-table/opcoes-table.component';
import { SelectComponent } from './select/select.component';
import { ModaisModule } from './../modais/modais.module';
import { ModalComponent } from './modal/modal.component';
import { DateNavigatorComponent } from './date-navigator/date-navigator.component';
import { LayoutsModule } from './../layout/layouts.module';
import { TemaModule } from './../tema.module';
import { CommonModule } from '@angular/common';
import { NgModule } from "@angular/core";
import { DiretivasModule } from '../diretivas/diretivas.module'


@NgModule({
    declarations: [
        OpcoesTableComponent,   
        DateNavigatorComponent,    
        ModalComponent, 
        // DividedGridComponent,
        PainelComponent,
        InputComponent,
        SelectComponent,
        InputCpfCnpjComponent,
        InputTelefoneComponent,
        // CustomModalComponent,
        DateComponent,
        // InputIntegerComponent,
        // RadioButtonComponent,
        // InputMoneyComponent,
        // InputPesquisarPessoaComponent,
        
    ],
    imports: [
        CommonModule,
        TemaModule,
        DiretivasModule,
        LayoutsModule,        
        // ModaisModule,
    ],
    exports: [
        OpcoesTableComponent,
        DateNavigatorComponent,
        ModalComponent,
        // DividedGridComponent,
        PainelComponent,
        InputComponent,
        SelectComponent,
        InputCpfCnpjComponent,
        InputTelefoneComponent,
        // CustomModalComponent,
        DateComponent,
        // InputIntegerComponent,
        // RadioButtonComponent,
        // InputMoneyComponent,
        // InputPesquisarPessoaComponent,
    ],
})
export class ComponentsModule {}