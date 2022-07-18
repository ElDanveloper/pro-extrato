import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from "./auth.service";
import {TOKEN_STORAGE_KEY, TOKEN_TEMP_STORAGE_KEY} from "../../controller/staticValues";

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

    constructor(private router: Router) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        if(sessionStorage.getItem(TOKEN_STORAGE_KEY)) {
            // this.router.navigate(['/'], {replaceUrl: true})
            return false
        } else if(sessionStorage.getItem(TOKEN_TEMP_STORAGE_KEY)) {
            this.router.navigate(['/selecao-empresa'])
            return false
        } else {
            return true
        }
    }

}
