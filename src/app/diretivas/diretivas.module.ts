import { OpcoesTableControlDirective } from './../components/opcoes-table/opcoes-table-control.directive';
import { ModalOpenOnClickPortalDirective } from './modal-open-on-click-portal.directive';
// import { AlinharDireitaDirective } from './alinhar-direita.directive';
import { CommonModule } from '@angular/common';
import { NgModule } from "@angular/core";
// import {OpcoesTableControlDirective} from "../components/opcoes-table/opcoes-table-control.directive";
// import { AlinharCentroDirective } from './alinhar-centro.directive';
import { ModalOpenOnClickDirective } from './modal-open-on.click.directive'
// import { ClipboardDirective } from '../components/copy/clipboard.directive';

@NgModule({
    declarations: [
        OpcoesTableControlDirective,
        ModalOpenOnClickDirective,
        ModalOpenOnClickPortalDirective,
        // AlinharCentroDirective,
        // AlinharDireitaDirective,
        // ClipboardDirective,
    ],
    imports: [
        CommonModule,
        
    ],
    exports: [
        OpcoesTableControlDirective,
        ModalOpenOnClickPortalDirective,
        ModalOpenOnClickDirective,
        // AlinharCentroDirective,
        // AlinharDireitaDirective,
        // ClipboardDirective,
    ]
})

export class DiretivasModule {}