import { LayoutsModule } from './../layout/layouts.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DialogModule} from "primeng/dialog";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {TableModule} from "primeng/table";
import {TemaModule} from "../tema.module";
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import {PipesModule} from '../pipes/pipes.module';
import {DiretivasModule} from '../diretivas/diretivas.module';
import {ComponentsModule} from '../components/components.module';
import {ModalSelecionarEmpresaEscritorioComponent} from '../modais/modal-selecionar-empresa-escritorio/modal-selecionar-empresa-escritorio.component';

@NgModule({
  declarations: [
      ModalSelecionarEmpresaEscritorioComponent,      
      //ModalPagamentoViaContaCorrenteComponent,
  ],
    imports: [
        CommonModule,
        DialogModule,
        FormsModule,
        ReactiveFormsModule,
        TableModule,
        TemaModule,
        ProgressSpinnerModule,
        PipesModule,
        DiretivasModule,
        ComponentsModule,
        LayoutsModule,
    ],
    exports: [
        ModalSelecionarEmpresaEscritorioComponent,        
        //ModalPagamentoViaContaCorrenteComponent,
    ]
})
export class ModaisModule { }
