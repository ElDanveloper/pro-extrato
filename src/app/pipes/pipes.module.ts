import { VirgulaPipe } from './virgula.pipe';
import { CommonModule } from '@angular/common';
import { NgModule } from "@angular/core";

@NgModule({
    declarations: [
        VirgulaPipe,
        // VirgulaPipeSemZeroPipe,
        // DataPipe,
        // DataComHoraPipe,
        // DataJavascriptPipe,
        // ZeroExtraPipe,
        // BoolPipe,
        // SimNaoPipe,
        // CpfCnpjPipe,
    ],
    imports: [
        CommonModule,
    ],
    exports: [
        VirgulaPipe,
        // VirgulaPipeSemZeroPipe,
        // DataPipe,
        // DataComHoraPipe,
        // DataJavascriptPipe,
        // ZeroExtraPipe,
        // BoolPipe,
        // SimNaoPipe,
        // CpfCnpjPipe,
    ],
})
export class PipesModule { }