import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client/http-client.service';
import { POST } from 'src/app/utils/constants/servicePath.constant';
import { GetPostsRs, CreatePostRq, CreatePostRs, UploadPostImageRs, Post } from 'src/app/utils/models/post.models';
import { Subject } from 'rxjs';
import { FileService } from '../file/file.service';


@Injectable({
  providedIn: 'root'
})
export class PostService {

  private postSubject = new Subject<any>();
  postStream = this.postSubject.asObservable();

  constructor(
    private _httpClientService: HttpClientService,
    private _fileService: FileService
  ) { }

  async createPost(post: CreatePostRq) {
    const endpoint = POST.POST_CONTROLLER.concat(`${POST.CREATE_POST}`);
    const createPostRs = await this._httpClientService.post<CreatePostRs>(endpoint, post);
    if (!!createPostRs) {
      return createPostRs;
    }
    return null;
  }

  getPosts(page?: number, resultsPerPage?: number) {
    const endpoint =
      POST.POST_CONTROLLER.concat(`${POST.GET_POSTS}`)
      .concat(`?${POST.PAGE_PARAM}${(page || 1)}`)
      .concat(`&${POST.RESULTS_PER_PAGE_PARAM}${(resultsPerPage || 5)}`);
    return this._httpClientService.get<GetPostsRs>(endpoint);
  }

  async uploadPostImage(urlFile: string, postId: string) {
    const body = await this.getFormData(urlFile, postId);
    if (!!body) {
      const endpoint = POST.POST_CONTROLLER.concat(`${POST.UPLOAD_POST_IMAGE}`);
      return await this._httpClientService.post<UploadPostImageRs>(endpoint, body);
    }
    return null;
  }

  private async getFormData(urlFile: string, postId: string): Promise<any> {
    const file = await this._fileService.getFile(urlFile);
    if (!!file) {
      const formData = new FormData();
      formData.append('image', file, `${new Date().getTime()}.jpg`);
      formData.append('postId', postId);
      return formData;
    }
    return null;
  }

  public emitPost(post: Post) {
    this.postSubject.next(post);
  }

}
