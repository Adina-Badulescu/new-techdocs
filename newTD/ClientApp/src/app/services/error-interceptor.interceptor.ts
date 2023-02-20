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
      // .pipe(
      //   catchError((err) => {
      //     if (err instanceof ErrorEvent) {

      //       // retry({ count: 2, delay: 2000, resetOnSuccess: true }),
      //         // catchError(error => of(error)),

      //   } else {
      //       console.log('this is an error return by the server');
      //     }
      //     return throwError(err);
      //   })
      // )


    .pipe(
      retry({ count: 2, delay: 2000, resetOnSuccess: true }),
      // catchError(error => of(error)),

    )



  }


}
