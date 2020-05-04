import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpEvent, HttpHandler } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { LocalDataService } from '../../local-data/local-data.service';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {

  constructor(
    private _localData: LocalDataService
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return from(this.handle(req, next));
  }

  async handle(req: HttpRequest<any>, next: HttpHandler) {
    const authToken = await this._localData.getData('autorizationToken');
    if (!!authToken) {
      req = req.clone({ headers: req.headers.set('x-token', authToken) });
    }
    return next.handle(req).toPromise();
  }

}
