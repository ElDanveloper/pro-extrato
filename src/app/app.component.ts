import { DadosDefaultService } from './services/dados-default.service';
import { Component, OnInit } from '@angular/core';
import { NetworkService } from './services/network.service';

import { OneSignal } from 'onesignal-ngx'

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {

    exibirLoader = this.dadosDefault.exibirLoader
    exibirLoaderNetwork = this.networkService.exibirLoader

    constructor(private dadosDefault: DadosDefaultService, private networkService: NetworkService, private oneSignal: OneSignal) {
        this.oneSignal.init({
            appId: "e49063a5-f1b1-4daf-9f2e-5b7873a88762",
            serviceWorkerParam: {
                scope: "/OneSignalSDKWorker.js"
              },
              serviceWorkerPath: 'OneSignalSDKWorker.js'
          });
    }



    ngOnInit(){
        this.oneSignal.on('subscriptionChange', function(isSubscribed) {
            console.log("The user's subscription state is now:", isSubscribed);
          });

    }

}
