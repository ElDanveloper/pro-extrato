import {Injectable} from '@angular/core'
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router'
import {Observable} from 'rxjs'
import {AuthService} from './auth.service'
import {EMPRESA_STORAGE_KEY, TOKEN_STORAGE_KEY, TOKEN_TEMP_STORAGE_KEY} from "../../controller/staticValues";

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(private router: Router, private authService: AuthService) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        if (sessionStorage.getItem(EMPRESA_STORAGE_KEY)) {            
            return true
        } else if (sessionStorage.getItem(TOKEN_TEMP_STORAGE_KEY)) {               
            this.router.navigate(['/selecao-empresa'], {replaceUrl: true})
            return false
        } else {

            this.router.navigate(['/login'], {replaceUrl: true})
            return false
        }
    }
}
