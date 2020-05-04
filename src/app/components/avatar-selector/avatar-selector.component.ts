import { Component, OnInit, Output, EventEmitter, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';

@Component({
  selector: 'app-avatar-selector',
  templateUrl: './avatar-selector.component.html',
  styleUrls: ['./avatar-selector.component.scss'],
})
export class AvatarSelectorComponent implements OnInit, OnChanges {

  @Input() defaultAvatar: 'av-1.png';
  @Output() avatarChanged = new EventEmitter<string>();
  @ViewChild('slidesAvatar', {static: true}) slidesAvatar: IonSlides;

  avatars = [
    {
      img: 'av-1.png',
      seleccionado: true
    },
    {
      img: 'av-2.png',
      seleccionado: false
    },
    {
      img: 'av-3.png',
      seleccionado: false
    },
    {
      img: 'av-4.png',
      seleccionado: false
    },
    {
      img: 'av-5.png',
      seleccionado: false
    },
    {
      img: 'av-6.png',
      seleccionado: false
    },
    {
      img: 'av-7.png',
      seleccionado: false
    },
    {
      img: 'av-8.png',
      seleccionado: false
    },
  ];

  avatarSlidesOpt = {
    slidesPerView: 3.5,
    centeredSlides: true
  };

  constructor() { }

  ngOnInit() {
    this.setDefaultAvatar();
  }

  async setAvatar(ev: any) {
    this.avatars.forEach(avatar => avatar.seleccionado = false);
    const activeIndex = await ev.target.getActiveIndex();
    this.avatars[activeIndex || 0].seleccionado = true;
    this.avatarChanged.emit(this.avatars[activeIndex].img);
  }

  setDefaultAvatar(): void {
    if (!!this.defaultAvatar) {
      const defaultIndex = this.avatars.findIndex(avatar => avatar.img === this.defaultAvatar);
      const avatarIndex = defaultIndex !== -1 ? defaultIndex : 0;
      this.slidesAvatar.slideTo(avatarIndex);
      this.avatarChanged.emit(this.avatars[avatarIndex].img);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.defaultAvatar.previousValue !== changes.defaultAvatar.currentValue) {
      this.setDefaultAvatar();
    }
  }
}
