import { Injectable } from '@angular/core';
import { SpinnerService } from './spinner.service';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';
import {  finalize, Observable, } from 'rxjs';

@Injectable()
export class SpinnerInterceptor implements HttpInterceptor {

  constructor(private _spinnerService: SpinnerService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {
    this._spinnerService.show();

    return next.handle(req).pipe(
      finalize(() => this._spinnerService.hide()),
    );
  }

}
