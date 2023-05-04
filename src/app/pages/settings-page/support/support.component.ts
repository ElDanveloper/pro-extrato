
import { Contractor } from './../../../model/contractor.model';
import { Util, hasValue } from './../../../controller/Util';
import { Dimensions } from 'ngx-image-cropper';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { getCnpj, getEstados, getUrlCnpj } from './../../../controller/staticValues';
import { ErroCep } from '@brunoc/ngx-viacep';
import { Endereco } from '@brunoc/ngx-viacep';
import { NgxViacepService } from '@brunoc/ngx-viacep';
import { Formulario } from './../../../controller/Formulario';
import { FormBuilder } from '@angular/forms';
import { DadosDefaultService } from './../../../services/dados-default.service';
import { BaseFormPost } from './../../../controller/BaseFormPost';
import { FormGroup } from '@angular/forms';
import { NetworkService } from './../../../services/network.service';
import { MessageService } from 'primeng/api';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";

@Component({
    selector: 'app-support',
    templateUrl: './support.component.html',
    styleUrls: ['./support.component.css']
})
export class SupportComponent implements OnInit {

    @ViewChild('support') support: ElementRef;

    modalSupport = false

    constructor(public router: Router, private route: ActivatedRoute, public messageService: MessageService, public networkService: NetworkService, public dadosDefault: DadosDefaultService,private fb: FormBuilder, private viaCep: NgxViacepService) { }

    ngOnInit() { }

    clearData() {
        this.modalSupport = true
    }

}
