import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client/http-client.service';

const imageExt = ['jpg', 'jpeg', 'png'];

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(
    private _httpClientService: HttpClientService
  ) { }

  async getFile(urlFile: string) {
    const fileName = `${new Date().getTime()}.jpg`;
    try {
      const arrayBufferFile = await this._httpClientService.simpleGet(urlFile, { responseType: 'arraybuffer' });
      if (!!arrayBufferFile) {
        const blobFile = new Blob([arrayBufferFile], { type: 'image/jpeg' });
        return blobFile;
      }
      return null;
    } catch (err) {
      console.error(err);
      return null;
    }
  }
}
