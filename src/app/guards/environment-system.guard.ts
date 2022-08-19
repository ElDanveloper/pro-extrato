import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { VERSAO_SISTEMA } from '../controller/staticValues'
import { Util } from '../controller/Util';

@Injectable(
    {providedIn: 'root'}
)
export class EnvironmentSystemGuard implements CanActivate {

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ) : Observable<boolean> | boolean{
        if(localStorage.getItem('couter') == null) return false;
        let versaoSistema = localStorage.getItem('couter');
        return  versaoSistema === 'true';
    }
}