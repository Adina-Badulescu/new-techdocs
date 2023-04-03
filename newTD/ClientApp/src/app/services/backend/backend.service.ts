import { Inject, Injectable, OnDestroy } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, of, pipe } from 'rxjs';
import { catchError, map, retry, tap } from 'rxjs/operators';
import { ICard } from 'app/models/ICard.interface';
import { IUser } from 'app/models/IUser';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class BackendService {
  private _baseUrl: string = '';
  private readonly TOKEN_NAME: string = 'auth_token';
  private userSubject!: BehaviorSubject<IUser | null>;
  public user: Observable<IUser | null> = new Observable();

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string, private router: Router) {
    this._baseUrl = baseUrl;
    this.userSubject = new BehaviorSubject(JSON.parse(localStorage.getItem(this.TOKEN_NAME)!));
    this.user = this.userSubject.asObservable();
  }
  public get userValue() {
    return this.userSubject.value;
  }

  retryOnError = pipe(
    retry({ count: 2, delay: 2000, resetOnSuccess: true }),
    catchError(error => of(error))
  )


  searchDomain(domainQueried: string): Observable<boolean> {
    return this.http.get<boolean>(`${this._baseUrl}getdomain/Query?id=${domainQueried}`)
      .pipe(this.retryOnError)
  }


  listTemplates(numberOfResults: number, searchString?: string | null | undefined): Observable<ICard[]> {
    if (searchString != null || searchString != undefined) {
      return this.http.get<string>(`${this._baseUrl}templates/ListTemplates?numberOfResults=${numberOfResults}&searchString=${searchString}`).
        pipe(this.retryOnError)
    }
    return this.http.get<string>(`${this._baseUrl}templates/ListTemplates?numberOfResults=${numberOfResults}`).
      pipe(this.retryOnError)
  }




} 
