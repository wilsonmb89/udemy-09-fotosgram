import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client/http-client.service';
import { CreateUserRq, CreateUserRs, UpdateUserRq, UpdateUserRs } from 'src/app/utils/models/user.models';
import { USER } from 'src/app/utils/constants/servicePath.constant';
import { LocalDataService } from '../local-data/local-data.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private _httpClientService: HttpClientService,
    private _localDataService: LocalDataService
  ) { }

  async createUser(newUser: CreateUserRq) {
    const endpoint = USER.USER_CONTROLLER.concat(USER.CREATE_USER);
    const userCreated = await this._httpClientService.post<CreateUserRs>(endpoint, newUser);
    if (!!userCreated && userCreated.ok) {
      this._localDataService.setData('autorizationToken', userCreated.token);
      return userCreated;
    }
    this._localDataService.deleteData('autorizationToken');
    return null;
  }

  async updateUser(userUpdate: UpdateUserRq) {
    const endpoint = USER.USER_CONTROLLER.concat(USER.UPDATE_USER);
    const userUpdated = await this._httpClientService.post<UpdateUserRs>(endpoint, userUpdate);
    if (!!userUpdated && userUpdated.ok) {
      this._localDataService.setData('autorizationToken', userUpdated.token);
      return userUpdated;
    }
    this._localDataService.deleteData('autorizationToken');
    return null;
  }
}
