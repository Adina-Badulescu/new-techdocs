import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { IAuthResponse } from 'app/models/IAuthResponse';
import { IUser } from 'app/models/IUser';
import { IUserFromToken } from 'app/models/IUserFromToken';

import { BehaviorSubject, Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _baseUrl: string = '';
  private readonly TOKEN_NAME: string = 'auth_token';
  public isLoggedIn$ = new BehaviorSubject<boolean>(false);
  public user?: IUserFromToken | null;
  userClaims!: IAuthResponse;
 

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string, private router: Router) {
    this._baseUrl = baseUrl;    
    this.isLoggedIn$.next(!!this.token); 
    
    
  }



  getUserFromToken(token: string): IUserFromToken {
    this.user = JSON.parse(atob(token.split('.')[1])) as IUserFromToken;
    return this.user;
  }

  get token(): string | null {    
    return localStorage.getItem(this.TOKEN_NAME);
  }

  login(loginObject: any): Observable<void> {    
    return this.http.post<IAuthResponse>(`${this._baseUrl}auth/Login`, loginObject)
      .pipe(map(authResponse => {
        if (authResponse.result != true) {
          this.isLoggedIn$.next(false);          
        }
        this.isLoggedIn$.next(true);
        localStorage.setItem(this.TOKEN_NAME, authResponse.token);             
      }));
  }


  logout(): void {    
    localStorage.removeItem(this.TOKEN_NAME );
    this.isLoggedIn$.next(false);
    this.router.navigate(['']);
  }

  register(user: IUser) {
    return this.http.post(`${this._baseUrl}register`, user);
  }



}
