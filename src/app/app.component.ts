import { DadosDefaultService } from './services/dados-default.service';
import { Component } from '@angular/core';
import { NetworkService } from './services/network.service';
import { OneSignal } from 'onesignal-ngx';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
})
export class AppComponent {

    exibirLoader = this.dadosDefault.exibirLoader
    exibirLoaderNetwork = this.networkService.exibirLoader

    constructor(private dadosDefault: DadosDefaultService, private networkService: NetworkService, private oneSignal: OneSignal) {
        this.oneSignal.init({
            appId: "8c39c189-54b0-4160-82c9-b9e7e4e2e0cb"
        })        
    }

}
