import { CommaPipeZeroPipe } from './comma-pipe-zero.pipe';
import { DatePipe } from './date.pipe';
import { CpfCnpjPipe } from './cpf-cnpj.pipe';
import { VirgulaPipe } from './virgula.pipe';
import { CommonModule } from '@angular/common';
import { NgModule } from "@angular/core";

@NgModule({
    declarations: [
        VirgulaPipe,
        DatePipe,
        // VirgulaPipeSemZeroPipe,
        // DataPipe,
        // DataComHoraPipe,
        // DataJavascriptPipe,
        // ZeroExtraPipe,
        // BoolPipe,
        // SimNaoPipe,
        CpfCnpjPipe,
        CommaPipeZeroPipe,
    ],
    imports: [
        CommonModule,
    ],
    exports: [
        VirgulaPipe,
        DatePipe,
        CommaPipeZeroPipe,
        // VirgulaPipeSemZeroPipe,
        // DataPipe,
        // DataComHoraPipe,
        // DataJavascriptPipe,
        // ZeroExtraPipe,
        // BoolPipe,
        // SimNaoPipe,
        CpfCnpjPipe,
    ],
})
export class PipesModule { }