export class CreateUserRq {
  nombre: string;
  email: string;
  password: string;
  avatar: string;
  successCreate: boolean;

  constructor() {
    this.successCreate = true;
    this.avatar = 'av-1.png';
  }
}

export interface ValidateTokenRs {
  ok: boolean;
  user: TokenUser;
}

interface TokenUser {
  _id: string;
  nombre: string;
  mail: string;
  avatar: string;
}

export interface CreateUserRs {
  ok: boolean;
  user: UserModel;
  token: string;
}

export class UpdateUserRq {
  nombre: string;
  email: string;
  avatar: string;
  successUpdate: boolean;

  constructor() {
    this.successUpdate = true;
    this.avatar = 'av-1.png';
  }
}

export interface UpdateUserRs {
  ok: boolean;
  user: UserModel;
  token: string;
}

interface UserModel {
  avatar: string;
  _id: string;
  nombre: string;
  email: string;
  password: string;
  __v: number;
}
