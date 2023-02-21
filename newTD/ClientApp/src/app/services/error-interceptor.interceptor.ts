import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, of, retry, throwError } from 'rxjs';

@Injectable()


export class ErrorInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
    .pipe(
      //retry(2) <-- this works but without delay
      retry({ count: 2, delay: 2000, resetOnSuccess: true }), // <-- Infinity of retries
      catchError(error => of(error)),

    )



  }


}
