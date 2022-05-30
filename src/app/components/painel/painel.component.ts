import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-painel',
  templateUrl: './painel.component.html',
  styleUrls: ['./painel.component.css']
})
export class PainelComponent implements OnInit {

    @Input() title: string;
    @Input() opened = false;
    @Input() classe = 'painel-page';

  constructor() { }

  ngOnInit() {
  }

}
