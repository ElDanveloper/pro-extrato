import { ModalFinancialCategorySearchComponent } from './../components/input-financial-category-search/modal-financial-category-search/modal-financial-category-search.component';
import { ModalReconcileInstallmentComponent } from './../pages/conciliation/modal-reconcile-installment/modal-reconcile-installment.component';
import { ModalReconcileAccountingComponent } from './../pages/conciliation/modal-reconcile-accounting/modal-reconcile-accounting.component';
import { ProjetoCadastroComponent } from './../pages/projeto-cadastro/projeto-cadastro.component';
import { ModalNaturezaFinanceiraCadastroComponent } from './modal-natureza-financeira-cadastro/modal-natureza-financeira-cadastro.component';
import { ModalNaturezaFinanceiraComponent } from './modal-natureza-financeira/modal-natureza-financeira.component';
import { ModalPessoaCadastroComponent } from './modal-pessoa-cadastro/modal-pessoa-cadastro.component';
import { ModalUsuarioCadastroComponent } from './modal-usuario-cadastro/modal-usuario-cadastro.component';
import { ModalEmpresaCadastroComponent } from './modal-empresa-cadastro/modal-empresa-cadastro.component';
import { ModalTrocarEmpresaComponent } from './modal-trocar-empresa/modal-trocar-empresa.component';
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
      ModalTrocarEmpresaComponent,
      ModalEmpresaCadastroComponent,
      ModalUsuarioCadastroComponent,
      ModalPessoaCadastroComponent,
      ModalNaturezaFinanceiraComponent,
      ModalNaturezaFinanceiraCadastroComponent,
      ProjetoCadastroComponent,
      ModalReconcileAccountingComponent,
      ModalReconcileInstallmentComponent,
      ModalFinancialCategorySearchComponent,
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
        ModalTrocarEmpresaComponent,
        ModalEmpresaCadastroComponent,
        ModalUsuarioCadastroComponent,
        ModalPessoaCadastroComponent,
        ModalNaturezaFinanceiraComponent,
        ModalNaturezaFinanceiraCadastroComponent,
        ModalReconcileAccountingComponent,
        ModalReconcileInstallmentComponent,
        ModalFinancialCategorySearchComponent,
        //ModalPagamentoViaContaCorrenteComponent,
    ]
})
export class ModaisModule { }
