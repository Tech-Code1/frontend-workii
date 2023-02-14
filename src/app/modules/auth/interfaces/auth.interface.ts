export interface IAuthResponse {
    ok: boolean;
    id?: string,
    email?: string,
    password?: string,
    token?: string
}

export interface IUser {
  uiid: string;
  email: string;
}

export interface IOtp {
  otp: string;
  ok: boolean;
}
