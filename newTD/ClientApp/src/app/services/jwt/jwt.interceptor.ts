import { Inject, Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';


@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  private _baseUrl: string = '';

  constructor(private _authService: AuthService, @Inject('BASE_URL') baseUrl: string) {
    this._baseUrl = baseUrl;
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {


    console.log(this._authService.token);

    if (!this._authService.token) {
      return next.handle(request);
    }

    const requestWithToken = request.clone({
      headers: request.headers.set("Authorization",
        "Bearer " + this._authService.token)
    });

    return next.handle(requestWithToken);
  }

}
