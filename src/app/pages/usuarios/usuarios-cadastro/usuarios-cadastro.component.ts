import { Formulario } from './../../../controller/Formulario';
import { autoCompleteDelayTime, getUrlCad, SERVERLESS_URL } from './../../../controller/staticValues';
import { hasValue, Util } from './../../../controller/Util';
import { DadosDefaultService } from './../../../services/dados-default.service';
import { NetworkService } from './../../../services/network.service';
import { getEstados } from './../../../controller/staticValues';
import { BaseFormPost } from './../../../controller/BaseFormPost';
import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MessageService, SelectItem} from "primeng/api";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Endereco, ErroCep, NgxViacepService} from "@brunoc/ngx-viacep";
import {Subscription} from "rxjs";
import {Dimensions, ImageCroppedEvent} from "ngx-image-cropper";
import { Company } from '../../../model/company.model';

@Component({
    selector: 'app-usuarios-cadastro',
    templateUrl: './usuarios-cadastro.component.html',
    styleUrls: ['./usuarios-cadastro.component.css']
})

export class UsuariosCadastroComponent extends BaseFormPost implements OnInit, OnDestroy {

    @ViewChild('uploadImagem', {static: false}) uploadImagem

    $subscription1: Subscription;
    $subscription2: Subscription;
    $subscription3: Subscription;
    $subscription4: Subscription;
    $subscription5: Subscription;
    $subscription6: Subscription;
    $subscription7: Subscription;
    $subscription8: Subscription;
    $subscription9: Subscription;
    $subscription10: Subscription;
    $subscription11: Subscription;
    $subscription12: Subscription;

    entidade = 'empresas';
    id;
    form: FormGroup;
    enderecosTable = [];
    contatosTable = [];
    tiposPessoa = [{label: 'Fisica', value: 'F'}, {label: 'Juridica', value: 'J'}, {label: 'Exterior', value: 'E'}];
    tiposSexo = [{label: 'Masculino', value: 'M'}, {label: 'Feminino', value: 'F'}];
    selectSituacaoPessoa: SelectItem[] = [];
    selectVendedor: SelectItem[] = [];
    selectContaContabil: SelectItem[] = [];
    selectTabela: SelectItem[] = [];
    selectOperacaoFiscal: SelectItem[] = [];
    selectNaturezaFinanceira: SelectItem[] = [];
    selectPais: SelectItem[] = [];
    selectCrt: SelectItem[] = [
        {label: 'Simples Nacional', value: '1'},
        {label: 'Simples Com Excesso de Sublimite', value: '2'},
        {label: 'Normal', value: '3'},
    ];
    selectTipoRegime: SelectItem[] = [
        {label: 'Simples Nacional', value: '1'},
        {label: 'Simples Com Excesso de Sublimite', value: '2'},
        {label: 'Lucro Presumido', value: '3'},
        {label: 'Lucro Real', value: '4'},
    ];
    selectEstadoCivil: SelectItem[] = [
        {label: 'SOLTEIRO', value: '1'},
        {label: 'CASADO', value: '2'},
        {label: 'SEPARADO', value: '3'},
        {label: 'DIVORCIADO', value: '4'},
        {label: 'VIUVO', value: '5'},
        {label: 'UNIAO ESTAVEL', value: '6'}
    ]
    selectTipoEndereco: SelectItem[] = [];
    selectEstado = getEstados();
    selectICMS = [
        {label: 'Contribuinte ICMS', value: 1},
        {label: 'Cont. isento de Inscrição no Cad. ICMS', value: 2},
        {label: 'Não Contribuinte do ICMS ou Consumidor', value: 9},
    ]
    modalCepVisible = false;
    modalAdicionarEndereco = false;
    modalContato = false;
    contatoParaEdicao
    itemsRowEndereco = [
        // {label: 'Alterar', icon: 'fa fa-edit', command: (e) => this.editarEndereco(e)},
        // {label: 'Excluir', icon: 'fa fa-close', command: (e) => this.deletarEndereco(e)},
    ]
    itemsRowContato = [
        // {label: 'Alterar', icon: 'fa fa-edit', command: (e) => this.editarContato(e)},
        // {label: 'Excluir', icon: 'fa fa-close', command: (e) => this.deletarContato(e)},
    ]
    public contaContabilSugests = []
    onLabel = 'Sim'
    offLabel = 'Não'
    idPessoa;
    imageChangedEvent: any = '';
    croppedImage: any = '';
    imageSize = {
        width: 0,
        height: 0,
    };
    showCropper = false;
    private timeOut: any = 0


    //Novo
    selectIndCooperativa: SelectItem[] = [
        {value: '0', label: '0 - Não é Cooperativa'},
        {value: '1', label: '1 - Cooperativa de Trabalho'},
        {value: '2', label: '2 - Cooperativa de Produção'},
        {value: '3', label: '3 - Outras Cooperativa'},
    ]

    selectIndConstrutora: SelectItem[] = [
        {value: '0', label: '0 - Não é Construtora'},
        {value: '1', label: '1 - Empresa Construtora'},        
    ]

    selectTributario: SelectItem[] = []

    constructor(public networkService: NetworkService, public dadosDefault: DadosDefaultService, private route: ActivatedRoute, private fb: FormBuilder, public router: Router, public messageService: MessageService,
                private viaCep: NgxViacepService) {
        super(networkService, dadosDefault, router, 'company', messageService);
        this.form = Formulario.createForm(new Company(), this.fb);
        // this.form.addControl("PessoaFisicaForm", Formulario.createForm(new PersonFisical(), this.fb));
        // this.form.addControl("PessoaForm", Formulario.createForm(new Pessoa(), this.fb));

        // this.form.get('PessoaForm').get('Tipo').setValue('F');
        // this.form.get('Ativo').setValue(true)
        // this.form.get('Cliente').setValue(true)
        // this.form.get('CodContaContabil').setValue(1)
    }

    get imagem() {
        const staticImg = '../../../assets/images/user.png'
        const img = this.form.get('PessoaForm').get('CaminhoFoto').value
        return hasValue(img) ? img : staticImg
    };

    ngOnInit() {
    //     // this.$subscription1 = this.dadosDefault.pessoa().subscribe(values => {
    //     //     this.selectSituacaoPessoa = values[0];
    //     //     this.selectOperacaoFiscal = values[1];
    //     //     this.selectNaturezaFinanceira = values[2];
    //     //     this.selectVendedor = values[3];
    //     //     this.selectTipoEndereco = values[4];
    //     //     this.selectContaContabil = values[5]
    //     //     this.selectTabela = values[6]
    //     //     this.selectPais = values[7]

    this.$subscription1 = this.dadosDefault.empregador().subscribe(values => {
        this.selectTributario = values[0];
    })

            if (this.id) {
                this.dadosDefault.exibirLoader.next(true)
                this.$subscription2 = this.networkService.buscar('empregador', this.id, null).subscribe((value: any) => {

                    this.idPessoa = value.IdPessoa.Id

                    const data = Formulario.prepareValueToForm(new Company(), value, null, null, Company.checkbox());
                    Object.keys(data).forEach(key => this.form.controls[key].setValue(data[key]));

                    // if (value.IdPessoa) {
                    //     const dataPessoa = Formulario.prepareValueToForm(new Pessoa(), value.IdPessoa, Pessoa.datas(), null, Pessoa.checkbox());
                    //     Object.keys(dataPessoa).forEach(key => this.form.get('PessoaForm').get(key).setValue(dataPessoa[key]))
                    // }

                    // if (value.IdPessoaFisica) {
                    //     const dataPessoaFisica = Formulario.prepareValueToForm(new PersonFisical(), value.IdPessoaFisica, PersonFisical.datas(), PersonFisical.relacionamentos(), PersonFisical.checkbox());
                    //     Object.keys(dataPessoaFisica).forEach(key => this.form.get('PessoaFisicaForm').get(key).setValue(dataPessoaFisica[key]))
                    // }

                    this.$subscription3 = this.networkService.getSimples(getUrlCad(), `pessoaendereco?$filter=IdPessoa eq ${value.IdPessoa.Id}`).subscribe((v: any) => {
                        this.enderecosTable = v.value
                    })

                    this.$subscription4 = this.networkService.getSimples(getUrlCad(), `pessoacontato?$filter=IdPessoa eq ${value.IdPessoa.Id}`).subscribe((v: any) => {
                        this.contatosTable = v.value
                    })

                }).add(() => this.dadosDefault.exibirLoader.next(false))
            } else {
                this.form.get('DataCadastro').setValue(new Date())
            }
        // });

        this.$subscription5 = this.route.paramMap.subscribe(params => {
            this.id = params.get('id')
        })
    }

    processarFormulario() {
        let inv = false
        if (this.form.invalid) {
            Object.keys(this.form.controls).forEach(c => {
                if (this.form.get(c).invalid) {
                    this.messageService.add({severity: 'error', summary: `O campo ${c} e obrigatorio`})
                    inv = true
                }
            })
            if (inv) return
        }

        const cod = this.form.get('CodContaContabil').value ? this.form.get('CodContaContabil').value.Codigo : null

        const {PessoaForm, PessoaFisicaForm, ...data} = Object.assign({}, this.form.value)

        const temp = {...data, CodContaContabil: cod}
        let value: any = {
            ...Formulario.parseForm(new Company(), temp, null, null, null, null, Company.checkbox()),
            Ativo: true,
            "$id": 1
        };

        
        // value.IdPessoa = {
        //     ...Formulario.parseForm(new Pessoa(), {
        //         ...PessoaForm,
        //         Email: data.Email,
        //         DataCadastro: data.DataCadastro,
        //         DataNascimento: data.DataNascimento,
        //         Logradouro: data.Logradouro,
        //         Numero: data.Numero,
        //         Complemento: data.Complemento,
        //         Cep: data.Cep,
        //         Cidade: data.Cidade,
        //         CodigoIbge: data.CodigoIbge,
        //         UF: data.UF,     
        //         Bairro: data.Bairro           
        //     }, null, Pessoa.mascaras(), Pessoa.datas(), null, Pessoa.checkbox()),
        //     Ativo: true, Fantasia: value.Fantasia, Nome: value.Nome, "$id": 2
        // };

        // if (this.form.get('PessoaForm').get('Tipo').value !== 'J') {
        //     value.IdPessoaFisica = {
        //         ...Formulario.parseForm(new PersonFisical(), PessoaFisicaForm, PersonFisical.referencias(), null, PersonFisical.datas(), null, PersonFisical.checkbox()),
        //         IdPessoa: {"$ref": 2}
        //     }
        // }

        const vFinal = {           
            
            Pessoa: value,
            // Le: this.enderecosTable.map(x => Formulario.parseForm(new PessoaEndereco(), x, PessoaEndereco.referencias(), null, null, null, PessoaEndereco.checkbox())),
            // Lc: this.contatosTable.map(x => Formulario.parseForm(new PessoaContato(), x, PessoaContato.referencias(), null, PessoaContato.datas(), null, PessoaContato.checkbox())),
        }

        this.networkService.exibirLoader.next(true);
        if (this.imageChangedEvent) {
            this.networkService.salvarPost(SERVERLESS_URL, 'upload-imagem/pessoa', {
                imagem: this.croppedImage,
            }).subscribe((resFoto: any) => {
                vFinal.Pessoa.IdPessoa.CaminhoFoto = resFoto.url
                this.$subscription6 = this.networkService.salvarPost(getUrlCad(), 'pessoas/pessoaempresa2', vFinal).subscribe((v: any) => {
                    this.router.navigate(['/pessoa'])
                }).add(() => this.networkService.exibirLoader.next(false))
            }, e => this.networkService.exibirLoader.next(false))
        } else {
            this.$subscription6 = this.networkService.salvarPost(getUrlCad(), 'pessoas/pessoaempresa2', vFinal).subscribe((v: any) => {
                this.router.navigate(['/pessoa'])
            }).add(() => this.networkService.exibirLoader.next(false))
        }


    }

    adicionarEndereco(value) {
        const {index, ...data} = value
        if (typeof index !== 'undefined' && index !== null) {
            this.enderecosTable.splice(index, 1, {...data, Principal: false})
        } else {
            this.enderecosTable.push(Object.assign({}, {...data, Principal: false}));
        }
    }

    adicionarContato(value) {
        const {index, ...data} = value
        if (typeof index !== 'undefined' && index !== null) {
            this.contatosTable.splice(index, 1, data)
        } else {
            this.contatosTable.push(Object.assign({}, data));
        }
    }

    buscaCnpj(e) {
        if (e.type === 'keypress' && e.key !== 'Enter') return;

        let cnpj = this.form.get('PessoaForm').get('CpfCnpj').value.toString().match(/\d/g);

        if (cnpj === null || (cnpj.join('').length !== 11 && cnpj.join('').length !== 14)) {
            this.messageService.add(Util.pushErrorMsg('Cpf/Cnpj Invalido'))
            return;
        }
        cnpj = cnpj.join('')

        if (cnpj.length === 11) {
            this.$subscription7 = this.networkService.getSimples(getUrlCad(), `pessoa?$filter=cpfcnpj eq '${cnpj}'`).subscribe((v: any) => {
                this.form.get('PessoaForm').get('Tipo').setValue('F')
                const vApi = v.value
                if (vApi && vApi.length === 1) {
                    this.form.get('Nome').setValue(vApi[0].Nome)
                    this.form.get('Fantasia').setValue(vApi[0].Fantasia)
                    this.form.get('PessoaForm').get('Id').setValue(vApi[0].Id)
                    this.form.get('Logradouro').setValue(vApi[0].Logradouro)
                    this.form.get('Complemento').setValue(vApi[0].Complemento)
                    this.form.get('Contato').setValue(vApi[0].Contato)
                    this.form.get('Email').setValue(vApi[0].Email)
                    this.form.get('Numero').setValue(vApi[0].Numero)
                    this.form.get('CodigoIbge').setValue(vApi[0].CodigoIbge)
                    this.form.get('Fone1').setValue(vApi[0].Fone1)
                    this.form.get('Fone2').setValue(vApi[0].Fone2)
                    this.form.get('Celular').setValue(vApi[0].Celular)
                    this.form.get('Bairro').setValue(vApi[0].Bairro)
                    this.form.get('UF').setValue(vApi[0].Uf)
                    this.form.get('Cep').setValue(vApi[0].Cep)
                    this.form.get('Cidade').setValue(vApi[0].Cidade)
                    this.form.get('IdCondPagamento').setValue(vApi[0].IdCondPagamento)
                    this.form.get('PessoaForm').get('ContribuinteIcms').setValue(vApi[0].ContribuinteIcms)
                }
                return
            })
        }

        if (cnpj.length === 14) {
            this.$subscription8 = this.networkService.getSimples(getUrlCad(), `pessoa?$filter=cpfcnpj eq '${cnpj}'`).subscribe((v: any) => {
                this.form.get('PessoaForm').get('Tipo').setValue('J')
                const vApi = v.value
                if (vApi && vApi.length === 1) {
                    this.form.get('Nome').setValue(vApi[0].Nome)
                    this.form.get('Fantasia').setValue(vApi[0].Fantasia)
                    this.form.get('PessoaForm').get('Id').setValue(vApi[0].Id)
                    this.form.get('Contato').setValue(vApi[0].Contato)
                    this.form.get('Complemento').setValue(vApi[0].Complemento)
                    this.form.get('Logradouro').setValue(vApi[0].Logradouro)
                    this.form.get('Celular').setValue(vApi[0].Celular)
                    this.form.get('Numero').setValue(vApi[0].Numero)
                    this.form.get('UF').setValue(vApi[0].UF)
                    this.form.get('Bairro').setValue(vApi[0].Bairro)
                    this.form.get('CodigoIbge').setValue(vApi[0].CodigoIbge)
                    this.form.get('Fone1').setValue(vApi[0].Fone1)
                    this.form.get('Fone2').setValue(vApi[0].Fone2)
                    this.form.get('Email').setValue(vApi[0].Email)
                    this.form.get('Cep').setValue(vApi[0].Cep)
                    this.form.get('Cidade').setValue(vApi[0].Cidade)
                    this.form.get('IdCondPagamento').setValue(vApi[0].IdCondPagamento)
                    this.form.get('PessoaForm').get('ContribuinteIcms').setValue(vApi[0].ContribuinteIcms)
                } else if (cnpj.length === 14) {
                    this.buscarCnpjReceitaWs(cnpj)
                }
            })
        }
    }

    buscarCnpjReceitaWs(cnpj) {
        this.$subscription9 = this.dadosDefault.buscarCnpj(cnpj).subscribe((v: any) => {
            this.form.get('Nome').setValue(v['nome']);
            this.form.get('Fantasia').setValue(v['fantasia']);
            this.form.get('Cep').setValue(v['cep']);
            this.form.get('Logradouro').setValue(v['logradouro']);
            this.form.get('Numero').setValue(v['numero']);
            this.form.get('Complemento').setValue(v['complemento']);
            this.form.get('Bairro').setValue(v['bairro']);
            this.form.get('Cidade').setValue(v['municipio']);
            this.form.get('UF').setValue(v['uf'])
            this.form.get('Fone1').setValue(v['telefone'])
            this.form.get('Email').setValue(v['email'])
            this.verificaCepValido(true)
        })
    }

    verificaCepValido(event) {
        if (event === true || (event.key === 'Enter' || event.type === 'blur') && this.form.get('Cep').value !== null) {
            let cep = this.form.get('Cep').value.toString().match(/\d/g)
            if (cep === null) return
            cep = cep.join('');
            if (cep.length === 8) {
                this.viaCep.buscarPorCep(cep)
                    .then((endereco: Endereco) => {
                        if (event === true) {
                            this.form.get('CodigoIbge').setValue(endereco.ibge)
                            return
                        }
                        console.log(endereco);
                        this.form.get('Logradouro').setValue(endereco.logradouro);
                        this.form.get('Complemento').setValue(endereco.complemento);
                        this.form.get('Bairro').setValue(endereco.bairro);
                        this.form.get('Cidade').setValue(endereco.localidade);
                        this.form.get('UF').setValue(endereco.uf)
                        this.form.get('CodigoIbge').setValue(endereco.ibge)
                    }).catch((error: ErroCep) => {
                    this.messageService.add({severity: 'error', summary: 'Cep Nao Encontrado'})
                })
            }
        }
    }

    changeSelect(value) {
        switch (value.type) {
            case 'vendedor':
                this.selectVendedor.push(Util.valueToSelect(value.payload));
                this.form.get('IdVendedor').setValue(value.payload.Id);
                break;
            case 'situacaopessoa':
                this.selectSituacaoPessoa.push(Util.valueToSelect(value.payload));
                this.form.get('PessoaForm').get('IdSituacaoPessoa').setValue(value.payload.Id);
                break;
            case 'naturezafinanceira':
                this.selectNaturezaFinanceira.push(Util.valueToSelect(value.payload));
                this.form.get('CodNatFinanceira').setValue(value.payload.CodControle);
                break;
            case 'tipoendereco':
                this.selectTipoEndereco.push(Util.valueToSelect(value.payload));
                this.form.get('IdTipoEndereco').setValue(value.payload.Id);
                break
        }
    }

    cepPesquisado(value) {
        if (typeof value !== 'object') return;
        this.modalCepVisible = false;
        console.log(Object.assign({}, value))
        this.form.get('Cep').setValue(value['Cep']);
        this.form.get('UF').setValue(value['Uf']);
        this.form.get('Cidade').setValue(value['Cidade']);
        this.form.get('Logradouro').setValue(value['Logradouro'])
        this.form.get('CodigoIbge').setValue(value['ibge'])
    }

    novoEndereco() {
        this.modalAdicionarEndereco = true
        this.dadosDefault.dadosAdicionarEndereco.next({index: undefined})
    }

    novoContato() {
        this.modalContato = true
        this.dadosDefault.dadosAdicionarContato.next({index: undefined})
    }

    procurarContaContabil({query}) {
        clearTimeout(this.timeOut);
        this.timeOut = setTimeout(() => {
            this.$subscription12 = this.networkService.listar(getUrlCad(), 'planocontas', 0, 100, 'Descricao', 'asc', {
                col: 'Descricao',
                value: query
            }, null).subscribe(v => {
                this.contaContabilSugests = v;
                this.timeOut = 0
            }, e => {
                this.timeOut = 0
            })
        }, autoCompleteDelayTime)
    }

    cancelarLocal() {
        this.router.navigate(['/pessoa'])
    }

    ngOnDestroy() {
        super.ngOnDestroy()
        if (this.$subscription1) this.$subscription1.unsubscribe()
        if (this.$subscription2) this.$subscription2.unsubscribe()
        if (this.$subscription3) this.$subscription3.unsubscribe()
        if (this.$subscription4) this.$subscription4.unsubscribe()
        if (this.$subscription5) this.$subscription5.unsubscribe()
        if (this.$subscription6) this.$subscription6.unsubscribe()
        if (this.$subscription7) this.$subscription7.unsubscribe()
        if (this.$subscription8) this.$subscription8.unsubscribe()
        if (this.$subscription9) this.$subscription9.unsubscribe()
        if (this.$subscription10) this.$subscription10.unsubscribe()
        if (this.$subscription11) this.$subscription11.unsubscribe()
        if (this.$subscription12) this.$subscription12.unsubscribe()
    }

    verHistorico() {
        this.router.navigate([`/historico-pessoa/${this.idPessoa}`])
    }

    atualizaPessoaSefaz() {
        // this.networkService.getSimples(getUrlCad(), `pessoas/atualizarDadosSefaz?IdPessoa=${this.idPessoa}`).subscribe(v => {
        //     const dataPessoa = Formulario.prepareValueToForm(new Pessoa(), v, Pessoa.datas(), null, Pessoa.checkbox());
        //     Object.keys(dataPessoa).forEach(key => this.form.get('PessoaForm').get(key).setValue(dataPessoa[key]))
        // })
    }

    atualizaPessoaWeb() {
        let cnpj = this.form.get('PessoaForm').get('CpfCnpj').value
        cnpj = cnpj.replace(/\./g, '')
        cnpj = cnpj.replace(/\//g, '')
        cnpj = cnpj.replace(/-/g, '')

        if (cnpj.length !== 14) return
        this.buscarCnpjReceitaWs(cnpj)
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

    private deletarEndereco(e: any) {
        if (e.Id) {
            this.$subscription10 = this.networkService.deletar(getUrlCad(), 'pessoaendereco', e.Id).subscribe(v => {
            });
        }
        const index = this.enderecosTable.findIndex(v => v === e)
        this.enderecosTable.splice(index, 1)
    }

    private editarEndereco(e: any) {
        this.modalAdicionarEndereco = true
        const index = this.enderecosTable.findIndex(v => v === e)
        this.dadosDefault.dadosAdicionarEndereco.next({...e, index})
    }

    private deletarContato(e: any) {
        if (e.Id) {
            this.$subscription11 = this.networkService.deletar(getUrlCad(), 'pessoacontato', e.Id).subscribe(v => {
            });
        }
        const index = this.contatosTable.findIndex(v => v === e)
        this.contatosTable.splice(index, 1)
    }

    private editarContato(e: any) {
        this.modalContato = true
        const index = this.contatosTable.findIndex(v => v === e)
        this.dadosDefault.dadosAdicionarContato.next({...e, index})
    }

}
