import { Pipe, PipeTransform } from '@angular/core';
import { POST } from 'src/app/utils/constants/servicePath.constant';

@Pipe({
  name: 'postImage'
})
export class PostImagePipe implements PipeTransform {

  transform(img: string, userId: string, postId: string): string {
    const url = `${POST.POST_CONTROLLER}`
      .concat(`${POST.GET_IMAGE}`)
      .concat(`/${userId}`)
      .concat(`/${postId}`)
      .concat(`/${img}`);
    return url;
  }

}
