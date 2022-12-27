export interface UserForRegister {
  userName: string;
  email?: string;
  password: string;
  mobile?: string;
}

export interface UserForLogin {
  userName: string;
  password: string;
  token: string;
}
