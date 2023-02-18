import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpResponse } from '@angular/common/http';
import { Observable, throwError, of, interval } from 'rxjs';
import { catchError, delay, retry, retryWhen, timeout } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class WhoisService {
  _baseUrl: string = '';
  //configUrl: string = 'app/config.json' 
  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    

  }

  searchUrl(providedUrl: string): Observable<string> {    
    return this.http.get<string>(`${this._baseUrl}getdomainn/Query?id=${providedUrl}`)    
    .pipe(retry({count: 3, delay: 2000, resetOnSuccess: true}), catchError(x => of(x)))
  }
 
  
}
