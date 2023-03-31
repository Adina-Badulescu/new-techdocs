import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { IAuthResponse } from 'app/models/IAuthResponse';
import { User } from 'oidc-client';
import { BehaviorSubject, Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _baseUrl: string = '';
  private readonly TOKEN_NAME: string = 'auth_token'
  private _tokenSubject: BehaviorSubject<IAuthResponse | null>;
  public token: Observable<IAuthResponse | null>;
  private _user: User | null;
  userClaims!: IAuthResponse;

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string, private router: Router) {
    this._tokenSubject = new BehaviorSubject(JSON.parse(localStorage.getItem(this.TOKEN_NAME)!));
    this.token = this._tokenSubject.asObservable();
    this._user = this.getUserClaims(this.token)
    this._baseUrl = baseUrl;
  }

  public get tokenValue() {
    return this._tokenSubject.value;
  }

  login(email: string, password: string) {
    return this.http.post<IAuthResponse>(`${this._baseUrl}auth/Login`, { email, password })
      .pipe(map(authResponse => {
        localStorage.setItem(this.TOKEN_NAME, JSON.stringify(authResponse.token));
        this.userClaims = this.getUserClaims(authResponse);
        return this._tokenSubject.next(authResponse);
      }));
  }

  private getUserClaims(authResponse: IAuthResponse): IAuthResponse {
    return JSON.parse(atob(authResponse?.token?.split('.')[1])) as IAuthResponse;
  }

  logout() {
    // remove user from local storage and set current user to null
    localStorage.removeItem(this.TOKEN_NAME );
    this._tokenSubject.next(null);
    this.router.navigate(['/auth/Login']);
  }

  register(user: User) {
    return this.http.post(`${this._baseUrl}auth/Register`, user);
  }

}
