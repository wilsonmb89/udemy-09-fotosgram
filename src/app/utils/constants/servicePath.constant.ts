import { environment } from '../../../environments/environment';

export const POST = {
  POST_CONTROLLER: environment.serverURL.concat('post/'),
  GET_POSTS: 'getPosts',
  PAGE_PARAM: 'page=',
  RESULTS_PER_PAGE_PARAM: 'resultsPerPage=',
  CREATE_POST: 'create',
  UPLOAD_POST_IMAGE: 'uploadPostImage',
  GET_IMAGE: 'getImage'
};

export const SECURITY = {
  SECURITY_CONTROLLER: environment.serverURL.concat('security/'),
  LOGIN: 'login'
};

export const USER = {
  USER_CONTROLLER: environment.serverURL.concat('user/'),
  CREATE_USER: 'create',
  UPDATE_USER: 'update'
};
