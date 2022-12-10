import { getUrlPro } from 'src/app/controller/staticValues';
import { getUrlCad, getUrlReport } from './../../controller/staticValues';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { BaseFormPost } from "../../controller/BaseFormPost";
import { FormBuilder, FormGroup } from "@angular/forms";
import { NetworkService } from "../../services/network.service";
import { DadosDefaultService } from "../../services/dados-default.service";
import { ActivatedRoute, Router } from "@angular/router";
import { MessageService } from "primeng/api";
import { Formulario } from "../../controller/Formulario";
import { Util } from "../../controller/Util";
import { ProStatementItem } from 'src/app/model/pro-statement-item.model';
import { timestamp } from 'rxjs/operators';
import { ProAccount } from 'src/app/model/pro-account.model';

@Component({
    selector: 'app-modal-report-dre',
    templateUrl: './modal-report-dre.component.html',
    styleUrls: ['./modal-report-dre.component.css']
})
export class ModalReportDreComponent implements OnInit {

    entidade = 'Relatório DRE'
    @Input() dateStart;
    @Input() dateEnd;
    @Input() endpoint;
    @Input() nameFile;
    @Input() title;
    @Input() hash;
    @ViewChild('data') public dataSelect
    @ViewChild('conteudo') public content



    constructor(public networkService: NetworkService, public dadosDefault: DadosDefaultService, public router: Router, private route: ActivatedRoute, private fb: FormBuilder, public messageService: MessageService) {

    }

    ngOnInit() {

    }

    ngOnChanges() {        
        this.entidade = this.entidade + " - " + this.title
    }

    report(type) {
        let body = {
            type: type,
            month_end: this.dateEnd.getMonth() + 1,
            year_end: this.dateEnd.getFullYear(),
        }
        console.log(JSON.stringify(body))
        if (type === 'pdf') {
            this.dadosDefault.exibirLoader.next(true)
            this.networkService.salvarEBaixarArquivo(getUrlReport(), this.endpoint, body).subscribe(v => {
                Util.savePdf(v, this.nameFile)
            }).add(() => this.dadosDefault.exibirLoader.next(false))
        }
        if (type === 'xls') {
            this.dadosDefault.exibirLoader.next(true)
            this.networkService.salvarEBaixarArquivo(getUrlReport(), this.endpoint, body).subscribe(v => {
                Util.savePdf(v, this.nameFile + '.xls')
            }).add(() => this.dadosDefault.exibirLoader.next(false))
        }
    }

    fecharModal() {
        this.dateStart = '';
        this.dateEnd = '';
        this.endpoint = '';
        this.nameFile = '';
        this.title = '';
        this.dadosDefault.closeModal(this.hash)
    }
}
