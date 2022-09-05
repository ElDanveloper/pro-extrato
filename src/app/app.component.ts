import { DadosDefaultService } from './services/dados-default.service';
import { Component, OnInit } from '@angular/core';
import { NetworkService } from './services/network.service';
import { OneSignal } from 'onesignal-ngx';
// import { OneSignalService } from 'onesignal-ngx'

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {

    exibirLoader = this.dadosDefault.exibirLoader
    exibirLoaderNetwork = this.networkService.exibirLoader

    constructor(private dadosDefault: DadosDefaultService, private networkService: NetworkService, private oneSignal: OneSignal) {
        
    }

    onHandletTag(tag: string) {
        this.oneSignal.sendTag('Tech', tag).then(() => {
            console.log('Sent tag: ' + tag)
        })
    }

    ngOnInit(){
        this.oneSignal.init({
            appId: "8c39c189-54b0-4160-82c9-b9e7e4e2e0cb"
        })    
        var oneSignal = window['OneSignal'] || [];
        oneSignal.push(["init", {
            appId: "8c39c189-54b0-4160-82c9-b9e7e4e2e0cb",
            autoRegister: false,
            allowLocalhostAsSecureOrigin: true,
            notifyButton: {
                enable: false
            }
        }]);
        oneSignal.push(function () {
            // oneSignal.on('subscriptionChange', function (isSubscribed) {
            //     oneSignal.getUserId().then(function (userId) {

            //     })
            // })
        })
    }

}
