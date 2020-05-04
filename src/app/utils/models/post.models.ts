export class CreatePostRq {
  mensaje: string;
  coords: string;
}

export interface CreatePostRs {
  ok: boolean;
  post: Post;
}

export interface GetPostsRs {
  ok: boolean;
  page: number;
  resultsPerPage: number;
  posts: Post[];
}

export interface Post {
  img: Img[];
  _id: string;
  mensaje: string;
  coords: string;
  usuario: Usuario;
  created: string;
  __v: number;
}

interface Usuario {
  avatar: string;
  _id: string;
  nombre: string;
  email: string;
  __v: number;
}

interface Img {
  _id: string;
  fileSystemName: string;
  fileName: string;
  extension: string;
  __v: number;
}

interface Usuario {
  avatar: string;
  _id: string;
  nombre: string;
  email: string;
  __v: number;
}

export interface UploadPostImageRs {
  ok: boolean;
  fileSaved: FileSaved;
}

interface FileSaved {
  _id: string;
  fileSystemName: string;
  fileName: string;
  extension: string;
  __v: number;
}
