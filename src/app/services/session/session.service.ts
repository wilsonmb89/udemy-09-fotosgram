import { Injectable } from '@angular/core';
import { LocalDataService } from '../local-data/local-data.service';
import { Router } from '@angular/router';
import { SecurityService } from '../security/security.service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  private logoutSubject = new Subject<any>();
  logoutStream = this.logoutSubject.asObservable();

  constructor(
    private _securityService: SecurityService,
    private _localDataService: LocalDataService,
    private _router: Router
  ) { }

  validateToken() {
    return this._securityService.validateToken();
  }

  logOut() {
    this.logoutSubject.next(true);
    this._localDataService.deleteData('autorizationToken');
    this._router.navigate(['/login']);
  }

  async getUserFromToken() {
    return await this.validateToken()
      .then( data => data.user )
      .catch(
        err => {
          console.error(err);
          return null;
        }
      );
  }
}
