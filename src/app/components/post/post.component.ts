import { Component, OnInit, Input } from '@angular/core';
import { Post } from 'src/app/utils/models/post.models';
import { ModalService } from 'src/app/services/ui-services/modal/modal.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit {

  @Input() post: Post;

  slideSingleOpts = {
    allowSlideNext: false,
    allowSlidePrev: false
  };

  constructor(
    private _modalService: ModalService
  ) { }

  ngOnInit() {
  }

  openMapModal() {
    if (!!this.post.coords && this.post.coords.indexOf(',') !== -1) {
      const latitud = this.post.coords.split(',')[0];
      const longitud = this.post.coords.split(',')[1];
      this._modalService.showMapModal(latitud, longitud);
    }
  }
}
