import { Injectable } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

declare var window: any;

@Injectable({
  providedIn: 'root'
})
export class CameraService {

  constructor(
    private _camera: Camera
  ) { }

  private setCameraOptions(sourceTypeIn: number) {
    return {
      quality: 100,
      destinationType: this._camera.DestinationType.FILE_URI,
      encodingType: this._camera.EncodingType.JPEG,
      mediaType: this._camera.MediaType.PICTURE,
      correctOrientation: true,
      sourceType: sourceTypeIn
    } as CameraOptions;
  }

  async getCameraPicture() {
    const cameraOptions = this.setCameraOptions(this._camera.PictureSourceType.CAMERA);
    return await this._camera.getPicture(cameraOptions)
      .then(
        (imageData) => {
          return window.Ionic.WebView.convertFileSrc(imageData);
        }
      )
      .catch(
        err => {
          console.error(err);
          return null;
        }
      );
  }

  async getGalleryPicture() {
    const cameraOptions = this.setCameraOptions(this._camera.PictureSourceType.PHOTOLIBRARY);
    return await this._camera.getPicture(cameraOptions)
      .then(
        (imageData) => {
          return window.Ionic.WebView.convertFileSrc(imageData);
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
