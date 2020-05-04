import { Component, OnInit } from '@angular/core';
import { SessionService } from 'src/app/services/session/session.service';
import { UpdateUserRq } from 'src/app/utils/models/user.models';
import { NgForm } from '@angular/forms';
import { UserService } from 'src/app/services/user/user.service';
import { AlertService } from 'src/app/services/ui-services/alert/alert.service';
import { ToastService } from 'src/app/services/ui-services/toast/toast.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {

  userUpdateData: UpdateUserRq;
  userTokenData: UpdateUserRq;
  newAvatar: string;

  constructor(
    private _sessionService: SessionService,
    private _userService: UserService,
    private _alertService: AlertService,
    private _toastService: ToastService
  ) {}

  ngOnInit() {
    this.userUpdateData = new UpdateUserRq();
    this.userTokenData = new UpdateUserRq();
    this.newAvatar = 'av-1.png';
  }

  ionViewWillEnter() {
    this.loadTokenUser();
  }

  public logout(): void {
    this._sessionService.logOut();
  }

  public async loadTokenUser() {
    const tokenUser = await this._sessionService.getUserFromToken();
    this.userTokenData.nombre = tokenUser.nombre;
    this.userTokenData.email = tokenUser.email;
    this.userTokenData.avatar = tokenUser.avatar;
  }

  public setAvatarSelected(newAvatar: string): void {
    this.newAvatar = newAvatar || 'av-1.png';
  }

  public async updateUser(fUpdate: NgForm) {
    if (fUpdate.valid) {
      this.userUpdateData.avatar = this.newAvatar;
      return await this._userService.updateUser(this.userUpdateData)
        .then(
          res => {
            this.userUpdateData.successUpdate = res.ok;
            fUpdate.reset();
            if (res.ok) {
              this.loadTokenUser();
              this._toastService.showDefaultToast('Usuario Actualizado Correctamente!');
              return res.user;
            } else {
              setTimeout(() => {
                this.userUpdateData.successUpdate = true;
              }, 2000);
              return null;
            }
          }
        )
        .catch(
          err => {
            console.error(err);
            this._alertService.defaultAlert('Hubo un error intentando actualizar el usuario');
            return null;
          }
        );
    }
    return null;
  }
}
