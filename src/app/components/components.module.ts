import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { PostsComponent } from './posts/posts.component';
import { PostComponent } from './post/post.component';
import { PipesModule } from '../pipes/pipes.module';
import { AvatarSelectorComponent } from './avatar-selector/avatar-selector.component';
import { MapaComponent } from './mapa/mapa.component';
import { ModalService } from '../services/ui-services/modal/modal.service';


@NgModule({
  declarations: [
    PostsComponent,
    PostComponent,
    AvatarSelectorComponent,
    MapaComponent
  ],
  exports: [
    PostsComponent,
    AvatarSelectorComponent
  ],
  entryComponents: [
    MapaComponent
  ],
  imports: [
    PipesModule,
    IonicModule,
    CommonModule
  ],
  providers: [
    ModalService
  ]
})
export class ComponentsModule { }
