import { Injectable } from '@angular/core';
import { WhoisService } from './whois.service';
import { SpinnerService } from './spinner-service.service';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';
import { catchError, finalize, Observable, of, retry, tap } from 'rxjs';
@Injectable()
export class Interceptor implements HttpInterceptor {

  constructor(private _spinnerService: SpinnerService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {
    this._spinnerService.show();

    return next.handle(req).pipe(
      // tap({
      //   // Succeeds when there is a response; ignore other events
      //   next: (event) => (of(event)),
      //   // Operation failed; error is an HttpErrorResponse
      //   error: (error) => {
      //     of(error).pipe(
      //       retry({ count: 2, delay: 2000, resetOnSuccess: true }),
      //       catchError(error => of(error))
      //     )
      //   }
      // }),
      finalize(() => this._spinnerService.hide()),
    );
  }

}
