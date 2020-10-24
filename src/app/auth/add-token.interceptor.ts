import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AuthorizationService } from './authorization.service';


@Injectable()
export class AddTokenInterceptor implements HttpInterceptor {

  constructor(private auth: AuthorizationService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authToken = this.auth.getToken();
    req = req.clone({ setHeaders: { Authorization: authToken }});

    return next.handle(req);
  }
}
