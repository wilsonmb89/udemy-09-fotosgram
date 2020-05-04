import { Component, OnInit } from '@angular/core';
import { CreatePostRq } from 'src/app/utils/models/post.models';
import { PostService } from 'src/app/services/post/post.service';
import { AlertService } from 'src/app/services/ui-services/alert/alert.service';
import { Router } from '@angular/router';
import { GeolocationService } from 'src/app/services/geolocation/geolocation.service';
import { CameraService } from 'src/app/services/camera/camera.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  tempImages: string[] = [];
  newPost: CreatePostRq;
  isLoadingGeo: boolean;
  geoToggleVal: boolean;

  constructor(
    private _postService: PostService,
    private _alertService: AlertService,
    private _router: Router,
    private _geolocation: GeolocationService,
    private _cameraService: CameraService
  ) {}

  ngOnInit() {
    this.newPost = new CreatePostRq();
    this.isLoadingGeo = false;
  }

  ionViewWillEnter() {
    this.resetPage();
  }

  public async crearPost(): Promise<void> {
    const postResult = await this._postService.createPost(this.newPost);
    if (!!postResult && postResult.ok) {
      this.tempImages.forEach(
        async tempImg => {
          const uploadPostImageRs = await this._postService.uploadPostImage(tempImg, postResult.post._id);
          if (!!uploadPostImageRs) {
            postResult.post.img.push(uploadPostImageRs.fileSaved);
          }
        }
      );
      this._postService.emitPost(postResult.post);
      this._router.navigate(['/tabs/tab1']);
    } else {
      this._alertService.defaultAlert('No fue posible crear el post');
    }
  }

  private resetPage(): void {
    this.newPost.mensaje = '';
    this.geoToggleVal = false;
    this.tempImages = [];
  }

  public async geoToggle(): Promise<void> {
    this.newPost.coords = null;
    if (this.geoToggleVal) {
      this.isLoadingGeo = true;
      const geoRs = await this._geolocation.getGeolocation();
      if (!!geoRs && !!geoRs.coords) {
        this.newPost.coords = `${geoRs.coords.latitude},${geoRs.coords.longitude}`;
      }
      this.isLoadingGeo = false;
    }
  }

  public async openCamera() {
    const img = await this._cameraService.getCameraPicture();
    if (!!img) {
      this.tempImages.push(img);
    } else {
      this.tempImages.push('/assets/perro-1.jpg');
    }
  }

  public async openGallery() {
    const img = await this._cameraService.getGalleryPicture();
    if (!!img) {
      this.tempImages.push(img);
    } else {
      this.tempImages.push('/assets/perro-1.jpg');
    }
  }
}
