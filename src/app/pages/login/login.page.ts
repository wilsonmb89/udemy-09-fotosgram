import { Component, OnInit, ViewChild } from '@angular/core';
import { LoginRq } from 'src/app/utils/models/security.model';
import { SecurityService } from 'src/app/services/security/security.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { IonSlides } from '@ionic/angular';
import { UserService } from 'src/app/services/user/user.service';
import { CreateUserRq } from 'src/app/utils/models/user.models';
import { AlertService } from 'src/app/services/ui-services/alert/alert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  @ViewChild('mainSlides', { static: true }) mainSlides: IonSlides;

  loginUserData: LoginRq;
  registerUserData: CreateUserRq;

  constructor(
    private _userService: UserService,
    private _securityService: SecurityService,
    private _router: Router,
    private _alertService: AlertService
  ) { }

  ngOnInit() {
    this.validateToken();
    this.loginUserData = new LoginRq();
    this.registerUserData = new CreateUserRq();
    this.mainSlides.lockSwipes(true);
  }

  ionViewWillEnter() {
    this.validateToken();
  }

  async validateToken() {
    const validateTokenRs = await this._securityService.validateToken();
    if (validateTokenRs.ok) {
      this._router.navigate(['/tabs']);
    }
  }

  login(flogin: NgForm) {
    if (flogin.valid) {
      this.loginUserData.success = true;
      this._securityService.loginUser(this.loginUserData)
        .then(
          res => {
            flogin.reset();
            if (res) {
              this._router.navigate(['/tabs']);
            } else {
              this.loginUserData.success = false;
              setTimeout(() => {
                this.loginUserData.success = true;
              }, 3000);
            }
          }
        ).catch(
          err => {
            this._alertService.defaultAlert('Ocurrio un error iniciando sesión.');
            console.error(err);
          }
        );
    }
  }

  registrer(fRegister: NgForm) {
    if (fRegister.valid) {
      this.registerUserData.successCreate = true;
      this._userService.createUser(this.registerUserData)
        .then(
          res => {
            if (!!res) {
              fRegister.reset();
              this._router.navigate(['/tabs']);
            } else {
              this.registerUserData.successCreate = false;
              setTimeout(() => {
                this.registerUserData.successCreate = true;
              }, 3000);
            }
          }
        )
        .catch(
          err => {
            this._alertService.defaultAlert('Ocurrio un error creando al usuario.');
            console.error(err);
          }
        );
    }
  }

  setAvatarSelected(newAvatar: string) {
    this.registerUserData.avatar = newAvatar;
  }

  slideTo(slideIndex: number) {
    this.mainSlides.lockSwipes(false);
    this.mainSlides.slideTo(slideIndex);
    this.mainSlides.lockSwipes(true);
  }
}
