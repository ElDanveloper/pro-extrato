import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-notfound',
  templateUrl: './app.notfound.component.html',
})
export class AppNotfoundComponent {

  public counter = ''

  constructor(private router: Router){}
  
  home(){
    this.counter = localStorage.getItem('counter')
    if(this.counter === 'false'){
      this.router.navigate(['dashboard-company'])
    } else {
      this.router.navigate(['dashboard-home'])
    }
    // [routerLink]="['/home']"
  }

}
