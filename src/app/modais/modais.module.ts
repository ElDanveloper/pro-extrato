import { ModalAccountRegistrationComponent } from './modal-account-registration/modal-account-registration.component';
import { ModalEditStatementItemsComponent } from './modal-edit-statement-items/modal-edit-statement-items.component';
import { ModalPersonRegistrationComponent } from './modal-person-registration/modal-person-registration.component';
import { SituationPersonRegistrationComponent } from './../pages/person/situation-person-registration/situation-person-registration.component';
import { ModalDepartmentsRegistrationComponent } from './modal-departments-registration/modal-departments-registration.component';
import { ModalPaymentViaAccountComponent } from './modal-payment-via-account/modal-payment-via-account.component';
import { ModalOpeningBalanceComponent } from './modal-opening-balance/modal-opening-balance.component';
import { ModalSwitchAccountComponent } from './modal-switch-account/modal-switch-account.component';
import { InputSearchPersonComponent } from './../components/input-search-person/input-search-person.component';
import { ModalSearchPersonComponent } from './../components/input-search-person/modal-search-person/modal-search-person.component';
import { InputFinancialCategorySearchComponent } from './../components/input-financial-category-search/input-financial-category-search.component';
import { ModalFinancialCategorySearchComponent } from './../components/input-financial-category-search/modal-financial-category-search/modal-financial-category-search.component';
import { ModalReconcileInstallmentComponent } from './../pages/conciliation/modal-reconcile-installment/modal-reconcile-installment.component';
import { ModalReconcileAccountingComponent } from './../pages/conciliation/modal-reconcile-accounting/modal-reconcile-accounting.component';
import { ProjetoCadastroComponent } from './../pages/projeto-cadastro/projeto-cadastro.component';
import { ModalNaturezaFinanceiraCadastroComponent } from './modal-natureza-financeira-cadastro/modal-natureza-financeira-cadastro.component';
import { ModalNaturezaFinanceiraComponent } from './modal-natureza-financeira/modal-natureza-financeira.component';
import { ModalPessoaCadastroComponent } from './modal-pessoa-cadastro/modal-pessoa-cadastro.component';
import { ModalUserRegistrationComponent } from './modal-user-registration/modal-user-registration.component';
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
      ModalUserRegistrationComponent,
      ModalPessoaCadastroComponent,
      ModalNaturezaFinanceiraComponent,
      ModalNaturezaFinanceiraCadastroComponent,
      ProjetoCadastroComponent,
      ModalReconcileAccountingComponent,
      ModalReconcileInstallmentComponent,
      ModalFinancialCategorySearchComponent,
      InputFinancialCategorySearchComponent,
      ModalSearchPersonComponent,
      InputSearchPersonComponent,
      ModalSwitchAccountComponent,
      ModalOpeningBalanceComponent,
      ModalPaymentViaAccountComponent,
      ModalDepartmentsRegistrationComponent,
      SituationPersonRegistrationComponent,
      ModalPersonRegistrationComponent,
      ModalEditStatementItemsComponent,
      ModalAccountRegistrationComponent,
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
        ModalUserRegistrationComponent,
        ModalPessoaCadastroComponent,
        ModalNaturezaFinanceiraComponent,
        ModalNaturezaFinanceiraCadastroComponent,
        ModalReconcileAccountingComponent,
        ModalReconcileInstallmentComponent,
        ModalFinancialCategorySearchComponent,
        InputFinancialCategorySearchComponent,
        ModalSearchPersonComponent,
        InputSearchPersonComponent,
        ModalSwitchAccountComponent,
        ModalOpeningBalanceComponent,
        ModalPaymentViaAccountComponent,
        ModalDepartmentsRegistrationComponent,
        SituationPersonRegistrationComponent,
        ModalPersonRegistrationComponent,
        ModalEditStatementItemsComponent,
        ModalAccountRegistrationComponent,
     
        //ModalPagamentoViaContaCorrenteComponent,
    ]
})
export class ModaisModule { }
