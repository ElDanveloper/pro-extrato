import { DadosDefaultService } from './services/dados-default.service';
import { Component } from '@angular/core';
import { NetworkService } from './services/network.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
})
export class AppComponent {

    exibirLoader = this.dadosDefault.exibirLoader
    exibirLoaderNetwork = this.networkService.exibirLoader

    constructor(private dadosDefault: DadosDefaultService, private networkService: NetworkService) {}

}
