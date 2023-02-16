import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpResponse } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class WhoisService {
  _baseUrl: string = '';
  //configUrl: string = 'app/config.json' 
  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    
    

  }

  searchUrl(providedUrl: string): Observable<boolean> {
    console.log(this._baseUrl.concat(providedUrl));
    return this.http.get<boolean>(`${this._baseUrl}GetDomain/Query?id=${providedUrl}`);    
  }
 
  
}
