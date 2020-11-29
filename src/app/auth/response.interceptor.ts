import {Injectable} from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from '@angular/common/http';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {SnackBarComponent} from '../snack-bar/snack-bar.component';

@Injectable()
export class ResponseInterceptor implements HttpInterceptor {
  constructor(private router: Router,
              private snackbar: SnackBarComponent
  ) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      tap((event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
            console.log(`Correct response from ${event.url}`);
          }
        }, error => {
          if (error instanceof HttpErrorResponse) {
            if (error.status === 401) {
              this.router.navigate(['logIn']);
            }
          }
        }
      )
    );
  }
}

