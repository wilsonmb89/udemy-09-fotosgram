import { Injectable } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';

@Injectable({
  providedIn: 'root'
})
export class GeolocationService {

  constructor(
    private _geolocation: Geolocation
  ) { }

  public async getGeolocation() {
    return await this._geolocation.getCurrentPosition()
      .then(
        res => {
          return res;
        }
      )
      .catch(
        err => {
          console.error(err);
          return null;
        }
      );
  }

}
