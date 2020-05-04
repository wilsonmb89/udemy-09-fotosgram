import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(
    private _toastController: ToastController
  ) { }

  public async showDefaultToast(message: string, durationTime?: number): Promise<void> {
    const toast = await this._toastController.create({
      animated: true,
      position: 'top',
      message,
      color: 'primary',
      cssClass: 'ion-text-center',
      duration: durationTime || 1500
    });
    toast.present();
  }
}
