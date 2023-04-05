import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { AuthService } from 'app/services/auth/auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HasRoleGuard implements CanLoad {
  constructor(private _authService: AuthService) { }

  canLoad(route: Route): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {    
    
    const token = this._authService.token;
    if (token) {
      const user = this._authService.getUserFromToken(token); 
      // check if the role is the same as the route.path which is trying to access
      if(user.role == route.path) {
        return true;
      }
    }
    return false;
  }
  
}
