import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { ICard } from 'app/middle-section/card-component/ICard.interface';


@Injectable({
  providedIn: 'root'
})
export class BackendService {
  private _baseUrl: string = '';

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this._baseUrl = baseUrl;
  }

  searchDomain(domainQueried: string): Observable<boolean> {
    return this.http.get<boolean>(`${this._baseUrl}getdomain/Query?id=${domainQueried}`)
      .pipe(
        retry({ count: 2, delay: 2000, resetOnSuccess: true }),
        catchError(error => of(error))
      )
  }

  listTemplates(): Observable<ICard> {
    return this.http.get<string>(`${this._baseUrl}templates/ListTemplates`)
    .pipe(
      retry({ count: 2, delay: 2000, resetOnSuccess: true }),
      catchError(error => of(error))
    )
  }

  getTemplate() {

  }


}
