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
    ],
    imports: [
        CommonModule,
    ],
    exports: [
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
    ],
})
export class PipesModule { }