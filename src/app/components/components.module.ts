import { DateNavigatorComponent } from './date-navigator/date-navigator.component';
import { LayoutsModule } from './../layout/layouts.module';
import { TemaModule } from './../tema.module';
import { CommonModule } from '@angular/common';
import { NgModule } from "@angular/core";
import { DiretivasModule } from '../diretivas/diretivas.module'


@NgModule({
    declarations: [
        // OpcoesTableComponent,   
        DateNavigatorComponent,    
        // ModalComponent, 
        // DividedGridComponent,
        // PainelComponent,
        // InputComponent,
        // SelectComponent,
        // InputCpfCnpjComponent,
        // InputTelefoneComponent,
        // CustomModalComponent,
        // DateComponent,
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
        
        //ModaisModule,
    ],
    exports: [
        // OpcoesTableComponent,
        DateNavigatorComponent,
        // ModalComponent,
        // DividedGridComponent,
        // PainelComponent,
        // InputComponent,
        // SelectComponent,
        // InputCpfCnpjComponent,
        // InputTelefoneComponent,
        // CustomModalComponent,
        // DateComponent,
        // InputIntegerComponent,
        // RadioButtonComponent,
        // InputMoneyComponent,
        // InputPesquisarPessoaComponent,
    ],
})
export class ComponentsModule {}