import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { tap } from 'rxjs/operators';
import { SessionService } from '../../session/session.service';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpErrorInterceptorService implements HttpInterceptor {

  constructor(
    private _sessionService: SessionService
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return from(this.handle(req, next));
  }

  async handle(req: HttpRequest<any>, next: HttpHandler) {
    return next.handle(req).pipe(
      tap(
        (event: any) => {},
        (err: any) => {
          if (err instanceof HttpErrorResponse) {
            console.error('HttpErrorInterceptorService', err);
            if (Number(err.status) === 401) {
              this._sessionService.logOut();
            }
          }
        }
      )
    ).toPromise();
  }
}
