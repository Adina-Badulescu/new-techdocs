import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad {

  constructor(private _authService: AuthService) {


  }
  canLoad(route: Route): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    // const isAuthorized = this._authService.user?.roles.includes(route.data.role);
    
    //http://schemas.microsoft.com/ws/2008/06/identity/claims/role
    return this._authService.isLoggedIn$.getValue();
    
  }


}
