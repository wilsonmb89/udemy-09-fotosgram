export class LoginRq {
  email: string;
  password: string;
  success: boolean;

  constructor() {
    this.success = true;
  }
}

export interface LoginRs {
  ok: boolean;
  user: User;
  token: string;
}

interface User {
  avatar: string;
  _id: string;
  nombre: string;
  email: string;
  password: string;
  __v: number;
}
