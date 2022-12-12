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
import { Component, OnInit, ViewChild } from "@angular/core";

import { Subscription } from "rxjs";

@Component({
    selector: 'app-main-accountant',
    templateUrl: './main-accountant.component.html',
    styleUrls: ['./main-accountant.component.css']
})

export class MainAccountantComponent extends BaseFormPost implements OnInit {

    @ViewChild('uploadImagem', {static: false}) uploadImagem

    form: FormGroup;

    selectEstado = getEstados();
    imageSize = {
        width: 0,
        height: 0,
    };
    croppedImage: any = '';
    showCropper = false;
    imageChangedEvent: any = '';

    $subscription3: Subscription;


    constructor(public router: Router, private route: ActivatedRoute, public messageService: MessageService, public networkService: NetworkService, public dadosDefault: DadosDefaultService,private fb: FormBuilder, private viaCep: NgxViacepService) {
        super(networkService, dadosDefault, router, 'contractor', messageService);
        this.form = Formulario.createForm(new Contractor(), this.fb);
    }

    ngOnInit() {

    }

    takeCnpj() {
        // 20367555000183 - para teste        
        if(!this.form.get('Cnpj').value){
            this.messageService.add(Util.pushErrorMsg('Favor informar o CNPJ!'))
            return
        } 
        const cnpj = this.form.get('Cnpj').value.toString().match(/\d/g);
        this.dadosDefault.exibirLoader.next(true);
        this.$subscription3 = this.networkService.getSimples(getCnpj(), cnpj.join('')).subscribe((v: any) => {            
           console.log(JSON.stringify(v)) 
        }, e => {
            this.messageService.add(Util.pushErrorMsg(e))
        }).add(() => this.dadosDefault.exibirLoader.next(false))
    }

    verificaCepValido(event) {
        if (event === true || (event.key === 'Enter' || event.type === 'blur') && this.form.get('PessoaForm').get('Cep').value !== null) {
            let cep = this.form.get('PessoaForm').get('Cep').value.toString().match(/\d/g)
            if (cep === null) return
            cep = cep.join('');
            if (cep.length === 8) {
                this.viaCep.buscarPorCep(cep)
                    .then((endereco: Endereco) => {
                        if (event === true) {
                            this.form.get('PessoaForm').get('CodigoIbge').setValue(endereco.ibge)
                            return
                        }
                        this.form.get('PessoaForm').get('Logradouro').setValue(endereco.logradouro);
                        this.form.get('PessoaForm').get('Complemento').setValue(endereco.complemento);
                        this.form.get('PessoaForm').get('Bairro').setValue(endereco.bairro);
                        this.form.get('PessoaForm').get('Cidade').setValue(endereco.localidade);
                        this.form.get('PessoaForm').get('UF').setValue(endereco.uf)
                        this.form.get('PessoaForm').get('CodigoIbge').setValue(endereco.ibge)
                    }).catch((error: ErroCep) => {
                    this.messageService.add({severity: 'error', summary: 'Cep Nao Encontrado'})
                })
            }
        }
    }

    fileChangeEvent(event: any): void {
        const regex = new RegExp("([a-zA-Z0-9\s_\\.\-:])+(.jpg|.png|.gif)$");
        if (!regex.test(event.target.value.toLowerCase())) {
            this.messageService.add(Util.pushInfoMessage('Arquivo nao é uma imagem valida'))
            this.uploadImagem.nativeElement.value = ''
            return
        }

        const reader = new FileReader()
        const file = event.target.files[0]
        reader.readAsDataURL(file)

        reader.onload = (e) => {

            const image = new Image()
            image.src = e.target.result.toString()

            image.onload = () => {
                if (image.height < 640 && image.width < 640) {
                    this.messageService.add(Util.pushInfoMessage('Imagem muito pequena, um dos lados tem que ter pelo menos 640px'))
                    this.uploadImagem.nativeElement.value = ''
                    return
                }
                this.imageChangedEvent = event;
            }
        }

    }

    imageCropped(event: ImageCroppedEvent) {
        this.imageSize = {width: event.width, height: event.height}
        this.croppedImage = event.base64;
    }

    imageLoaded() {
        this.showCropper = true;
    }

    cropperReady(sourceImageDimensions: Dimensions) {

    }

    loadImageFailed() {

    }

    clickUploadImagem() {
        // @ts-ignore
        this.uploadImagem.nativeElement.click()
    }

    get imagem() {
        const staticImg = '../../../../../assets/images/user.png'
        const img = null
        return hasValue(img) ? img : staticImg
    };


}
