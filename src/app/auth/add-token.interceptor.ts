import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AuthorizationService } from './authorization.service';


@Injectable()
export class AddTokenInterceptor implements HttpInterceptor {

  constructor(private auth: AuthorizationService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // take token
    const authToken = this.auth.getToken();

    // set auth header
    req = req.clone({ setHeaders: { Authorization: authToken } });

    // return request with token
    return next.handle(req);
  }
}
