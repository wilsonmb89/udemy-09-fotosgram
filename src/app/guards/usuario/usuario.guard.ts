import { Injectable } from '@angular/core';
import { CanLoad } from '@angular/router';
import { Observable } from 'rxjs';
import { SecurityService } from 'src/app/services/security/security.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioGuard implements CanLoad {

  constructor(
    private _securityService: SecurityService
  ) {}

  canLoad(): Observable<boolean> | Promise<boolean> | boolean {
    return this._securityService.validateToken()
      .then(
        res => {
          return res.ok;
        }
      )
      .catch(
        err => {
          return false;
        }
      );
  }
}
