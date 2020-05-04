import { NgModule } from '@angular/core';
import { DomSanitizerPipe } from './dom-sanitizer/dom-sanitizer.pipe';
import { ImageSanitizerPipe } from './image-sanitizer/image-sanitizer.pipe';
import { PostImagePipe } from './post-image/post-image.pipe';


@NgModule({
  declarations: [
    DomSanitizerPipe,
    ImageSanitizerPipe,
    PostImagePipe
  ],
  exports: [
    DomSanitizerPipe,
    ImageSanitizerPipe,
    PostImagePipe
  ],
  imports: []
})
export class PipesModule { }
