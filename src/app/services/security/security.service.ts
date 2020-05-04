import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client/http-client.service';
import { LoginRq, LoginRs } from 'src/app/utils/models/security.model';
import { SECURITY, USER } from 'src/app/utils/constants/servicePath.constant';
import { LocalDataService } from '../local-data/local-data.service';
import { ValidateTokenRs } from 'src/app/utils/models/user.models';

@Injectable({
  providedIn: 'root'
})
export class SecurityService {

  constructor(
    private _httpClientService: HttpClientService,
    private _localDataService: LocalDataService
  ) { }

  async loginUser(userLoginRq: LoginRq) {
    const endpoint = SECURITY.SECURITY_CONTROLLER.concat(SECURITY.LOGIN);
    const userLogged = await this._httpClientService.post<LoginRs>(endpoint, userLoginRq);
    if (!!userLogged && userLogged.ok) {
      this._localDataService.setData('autorizationToken', userLogged.token);
      return true;
    }
    this._localDataService.deleteData('autorizationToken');
    return false;
  }

  async validateToken() {
    const endpoint = USER.USER_CONTROLLER;
    const autorizationToken = await this._localDataService.getData('autorizationToken');
    if (!!autorizationToken) {
      return await this._httpClientService.get<ValidateTokenRs>(endpoint);
    }
    return { ok: false, user: null } as ValidateTokenRs;
  }
}
