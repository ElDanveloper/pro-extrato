import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-parametros',
  templateUrl: './parametros.component.html',
  styleUrls: ['./parametros.component.css']
})
export class ParametrosComponent implements OnInit {

    currentIndex = 0;
    activeItem: any;
    items = [
        {label: 'Empresa', icon: 'fa fa-fw fa-book'},
        {label: 'Usuarios', icon: 'fa fa-fw fa-book'},        
        {label: 'Parametros', icon: 'fa fa-fw fa-book'},        
    ];

    // @ViewChild(ParametrosGeraisComponent, {static: false}) parametrosGeraisComponent: ParametrosGeraisComponent;
    // @ViewChild(ParametrosNotaFiscalComponent, {static: false}) parametrosNotaFiscalComponent: ParametrosNotaFiscalComponent;
    // @ViewChild(ParametrosContabeisComponent, {static: false}) parametrosContabeisComponent: ParametrosContabeisComponent;
    // @ViewChild(ParametrosEmpresaComponent, {static: false}) parametrosEmpresaComponent: ParametrosEmpresaComponent;

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
      console.log('Teste ---> ')
      this.currentIndex = 0
      this.activeItem = this.items[0]

      this.route.queryParamMap.subscribe(({params}: any) => {
          if(!params || !params.page) return;

          switch (params.page) {              
              case 'parametros-gerais':
                  this.setItem(2)
                  break;              
              case 'Usuarios':
                    this.setItem(1)
                  break;
              case 'empresas/cadastro':
                    this.setItem(0)
                  break;
          }
          this.router.navigate([], {
              queryParams: {
                  page: null,
              },
              queryParamsHandling: 'merge',
              replaceUrl: true,
          })
      })

  }

    setActiveItem(e) {
        this.currentIndex = this.items.findIndex(v => v === e.activeItem)
    }

    setItem(index) {
        this.currentIndex = index
        this.activeItem = this.items[index]
    }

}
