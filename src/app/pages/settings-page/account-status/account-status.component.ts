import { Router } from '@angular/router';
import { DadosDefaultService } from './../../../services/dados-default.service';
import { NetworkService } from './../../../services/network.service';
import { SelectItem, MessageService } from 'primeng/api';
import { FormGroup } from '@angular/forms';
import { BaseFormPost } from './../../../controller/BaseFormPost';
import { Component, OnDestroy, OnInit } from "@angular/core";

@Component({
    selector: 'app-account-status',
    templateUrl: './account-status.component.html',
    styleUrls: ['./account-status.component.css']
})

export class AccountStatusComponent extends BaseFormPost implements OnInit, OnDestroy {

    

    constructor(public networkService: NetworkService, public dadosDefault: DadosDefaultService, public router: Router, public messageService: MessageService,) {
        super(networkService, dadosDefault, router, 'company', messageService);        
    }

    ngOnInit() {

    }

    processarFormulario() {

    }



    ngOnDestroy() {
        super.ngOnDestroy()
    }    

}
