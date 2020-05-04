import { Injectable } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { MapaComponent } from 'src/app/components/mapa/mapa.component';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(
    private _modalController: ModalController
  ) { }

  async showMapModal(latitudParam: string, longitudParam: string) {
    const mapModal = await this._modalController.create({
      component: MapaComponent,
      componentProps: {
        latitud: latitudParam,
        longitud: longitudParam
      }
    });
    await mapModal.present();
    const { data } = await mapModal.onWillDismiss();
    return data;
  }
}
