import {
    Component,
    EventEmitter,
    Input,
    OnChanges,
    OnDestroy,
    OnInit,
    Output,
    SimpleChanges,
    ViewChild
} from '@angular/core';
import {ConfirmationService, MessageService} from "primeng/api";
import {NetworkService} from "../../../services/network.service";
import {Router} from "@angular/router";
import {Util} from "../../../controller/Util";
import {getUrlCad, getUrlPro, qtdLinhas} from "../../../controller/staticValues";
import {Paginator} from "primeng/paginator";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-modal-financial-category-search',
  templateUrl: './modal-financial-category-search.component.html',
  styleUrls: ['./modal-financial-category-search.component.css']
})
export class ModalFinancialCategorySearchComponent implements OnInit, OnChanges, OnDestroy {

    @ViewChild('inputPesquisa') public inputPesquisa
    @ViewChild('p') paginator: Paginator;

    @Input() modalVisible = false;
    @Input() data = undefined;
    @Output() dadosSalvos = new EventEmitter()
    @Output() closeModal = new EventEmitter()
    @Input() filtroAdicional = null

    value;
    lista = []
    totalItens = 0

    jaPesquisou = false
    pagina = 0;
    public first: number = 0
    public loading: boolean
    public top: number = 7
    qtdLinhas = qtdLinhas()

    $subscriptionLista: Subscription;

    constructor(public confirmationService: ConfirmationService, public networkService: NetworkService, public router: Router, private messageService: MessageService) {

    }

    ngOnInit() {

    }

    fecharModal() {
        this.limpaDados()
        this.closeModal.emit(false)
    }

    limpaDados() {
        this.lista = []
        this.totalItens = 0
        this.data = ''
        this.value = null
    }

    confirmar() {
        this.dadosSalvos.emit(Object.assign({}, this.value))
        this.lista = []
    }

    ngOnChanges(changes: SimpleChanges): void {

        if(this.inputPesquisa !== undefined) {
                this.inputPesquisa.nativeElement.click()
                this.inputPesquisa.nativeElement.focus()
        }

        if(this.data) {
            this.inputPesquisa.nativeElement.value = this.data
            this.carregarLista()
        } else {
            if(this.inputPesquisa) this.inputPesquisa.nativeElement.value = ''
            this.limpaDados()
        }
    }

    pressionaEnter(event: KeyboardEvent) {
        if(event.key === 'Enter') this.carregarLista();
    }

    changeSelect(e: any) {
        switch (e.type) {
            case 'naturezafinanceira':
                this.value = e.payload
                this.confirmar()
                break
        }
    }

    ngOnDestroy(): void {
        if(this.$subscriptionLista) this.$subscriptionLista.unsubscribe()
    }

    carregarLista(page?, top?) {  
        console.log('Top ---> ' + top)
        
        let v;
        try {
            v = this.inputPesquisa.nativeElement.value
        } catch (e) {
            v = ''
        }
        let body = {}
        if (v !== '') {
            body = {
                Description: v
            }
        }
        this.networkService.exibirLoader.next(true)
        this.networkService.listarPost('FinancialCategories', body, page, top).subscribe((v: any) => {            
            this.lista = v.body['value']
            let pagina = v.headers.get('pages')            
            this.totalItens = Util.toNumber(pagina) * this.top
        }).add(this.networkService.exibirLoader.next(false))
    }

    public lazyLoad(event): void {        
        // if (!this.jaPesquisou) return
        this.loading = true
        if (this.lista) {
            if (this.top !== event.rows && event.rows !== undefined) {
                this.top = event.rows
                event.first = 0
            }
            
            this.carregarLista((event.first / 10) + 1, 7)
            this.loading = false
        }
    }

    // public lazyLoad(event): void {
    //     this.pagina = event.first / event.rows
    //     if (!this.jaPesquisou) return
    //     // this.loading = true
    //     if (this.lista) {
    //         if (this.top !== event.rows && event.rows !== undefined) {
    //             this.top = event.rows
    //             event.first = 0
    //         }
    //         this.carregarLista()
    //         // this.loading = false
    //     }
    // }


    // public carregarLista(): void {
    //     // this.loading = false
    //     this.jaPesquisou = true
    //     let v;
    //     try {
    //         v = this.inputPesquisa.nativeElement.value
    //     } catch (e) {
    //         v = ''
    //     }

    //     if(v.toString().match(/^\d+$/)) {
    //         v = `CodeControl eq ${v}`
    //     } else {
    //         v = `contains(lower(Description), '${Util.lower(v)}')`
    //     }

    //     let filter = ''



    //     if(this.filtroAdicional) {
    //         filter = `financialCategory?$filter=(Sintetic eq false and ${this.filtroAdicional} and ${v})`
    //     } else {
    //         filter = `financialCategory?$filter=(Sintetic eq false and ${v})`
    //     }

    //     this.networkService.getSimplesQtd(getUrlPro(), `${filter}&$inlinecount=allpages&$top=0`).subscribe((qtd: number) => {
    //         this.totalItens = qtd
    //     this.networkService.getSimples(getUrlPro(),`${filter}&$skip=${this.pagina}&$top=${this.top}`).subscribe((listaSec:any) => {
    //         this.lista = listaSec.value
    //     }, error1 => {
    //         this.messageService.add(Util.pushErrorMsg(error1))
    //     });
    //     }, error2 => {
    //         this.messageService.add(Util.pushErrorMsg(error2))
    //     })
    // }



}
