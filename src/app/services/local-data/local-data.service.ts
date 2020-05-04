import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class LocalDataService {

  constructor(
    private _storage: Storage
  ) { }

  async setData(key: string, value: any) {
    try {
      await this._storage.set(key, value);
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  }

  async getData(key: string) {
    const resultData = await this._storage.get(key);
    if (!!resultData) {
      return resultData;
    }
    return null;
  }

  async deleteData(key: string) {
    return await this._storage.remove(key);
  }
}
