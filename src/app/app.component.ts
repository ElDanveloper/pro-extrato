import { DadosDefaultService } from './services/dados-default.service';
import { Component, OnInit } from '@angular/core';
import { NetworkService } from './services/network.service';

// import { OneSignalService } from 'onesignal-ngx'

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {

    exibirLoader = this.dadosDefault.exibirLoader
    exibirLoaderNetwork = this.networkService.exibirLoader

    constructor(private dadosDefault: DadosDefaultService, private networkService: NetworkService) {
        
    }

    

    ngOnInit(){        
        
    }

}
