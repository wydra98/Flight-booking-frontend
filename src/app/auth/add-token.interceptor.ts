import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AuthorizationService } from './authorization.service';


@Injectable()
export class AddTokenInterceptor implements HttpInterceptor {

  constructor(private auth: AuthorizationService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (req.url.includes('/login') || req.url.includes('/register')) {
      return next.handle(req);
    }

    const authToken = this.auth.getToken();
    req = req.clone({ setHeaders: { authorization: authToken }});
    console.log(req.headers);
    return next.handle(req);
  }
}
