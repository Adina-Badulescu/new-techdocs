import { Inject, Injectable, OnDestroy } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, of, pipe } from 'rxjs';
import { catchError, map, retry, tap } from 'rxjs/operators';
import { ITemplate } from 'app/models/ITemplate.interface';
import { IUser } from 'app/models/IUser';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class BackendService {
  private _baseUrl: string = '';
  private readonly TOKEN_NAME: string = 'auth_token';
  private userSubject!: BehaviorSubject<string>;
  public user: Observable<string | null> = new Observable();


  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string, private router: Router) {
    this._baseUrl = baseUrl;
    this.userSubject = new BehaviorSubject(localStorage.getItem(this.TOKEN_NAME)!);
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


  listTemplates(numberOfResults: number, searchString?: string | null | undefined): Observable<ITemplate[]> {
    if (searchString != null || searchString != undefined) {
      return this.http.get<string>(`${this._baseUrl}templates/ListTemplates?numberOfResults=${numberOfResults}&searchString=${searchString}`)
        .pipe(this.retryOnError)
    }
    return this.http.get<string>(`${this._baseUrl}templates/ListTemplates?numberOfResults=${numberOfResults}`)
      .pipe(this.retryOnError)
  }

  createTemplate(template: any): Observable<ITemplate> {
       return this.http.post<any>(`${this._baseUrl}templates/CreateTemplate`, template)
      .pipe(this.retryOnError)
  }



} 
