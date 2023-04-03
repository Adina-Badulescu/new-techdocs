import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { IAuthResponse } from 'app/models/IAuthResponse';
import { IUser } from 'app/models/IUser';
import { BehaviorSubject, Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _baseUrl: string = '';
  private readonly TOKEN_NAME: string = 'auth_token';
  public _isLoggedIn$ = new BehaviorSubject<boolean>(false);
  // private _tokenSubject: BehaviorSubject<User | null>;
  // public token: Observable<User | null>;
  public user: IUser | string | null;
  userClaims!: IAuthResponse;

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string, private router: Router) {
    this._baseUrl = baseUrl;    
    this._isLoggedIn$.next(!!this.token);    
    // if(!this.token) {
    //   this.router.navigate(['/login']);
    // }
    this.user = this.token;
    // this._tokenSubject = new BehaviorSubject(JSON.parse(localStorage.getItem(this.TOKEN_NAME)!));
    // this.token = this._tokenSubject.asObservable();
    
    
  }

  private getUserFromTokenClaim(authResponse: IAuthResponse): any{
    if (!authResponse) {
      return null;
    }
    console.log(JSON.parse(atob(authResponse.token.split('.')[1])))
    return JSON.parse(atob(authResponse.token.split('.')[1])) as IUser;
  }

  private get token(): string | null {
    return localStorage.getItem(this.TOKEN_NAME);
  }

  login(email: string, password: string): Observable<void> {
    return this.http.post<IAuthResponse>(`${this._baseUrl}auth/Login`, { email, password })
      .pipe(map(authResponse => {
        if (authResponse.result != true) {
          this._isLoggedIn$.next(false);
        }
        this._isLoggedIn$.next(true);
        localStorage.setItem(this.TOKEN_NAME, JSON.stringify(authResponse.token));
        this.user = this.getUserFromTokenClaim(authResponse);
        
      }));
  }



  logout(): void {    
    localStorage.removeItem(this.TOKEN_NAME );
    this._isLoggedIn$.next(false);
    this.router.navigate(['']);
  }

  register(user: IUser) {
    return this.http.post(`${this._baseUrl}register`, user);
  }



}
