import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(
    private _alertController: AlertController
  ) { }

  async defaultAlert(message: string) {
    const alert = await this._alertController.create({
      header: 'Atención',
      message,
      buttons: ['OK']
    });
    alert.present();
  }
}
