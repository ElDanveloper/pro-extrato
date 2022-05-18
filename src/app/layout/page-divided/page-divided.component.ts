import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-page-divided',
  templateUrl: './page-divided.component.html',
  styleUrls: ['./page-divided.component.css']
})
export class PageDividedComponent implements OnInit {

    @Input() padrao = true

  constructor() { }

  ngOnInit() {
  }

}
