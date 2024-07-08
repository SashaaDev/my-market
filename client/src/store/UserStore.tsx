import { makeAutoObservable } from "mobx";

import { jwtDecode } from "jwt-decode";
interface IUser {
  _id: string;
  name: string;
  role: string;
  email: string;
  address: string;
}

export default class UserStore {
  _isAuth: boolean;
  _user: IUser | null;
  _token: string | null;

  constructor() {
    this._isAuth = false;
    this._user = null;
    this._token = null;
    makeAutoObservable(this);

    const token = localStorage.getItem('token');
    if (token) {
      this.setUserFromToken(token);
      this._isAuth = true;
    }
  }

  setIsAuth(bool: boolean) {
    this._isAuth = bool;
  }

  setUserFromToken(token: string) {
    const decodedToken: any = jwtDecode(token);

    const user: IUser = {
      _id: decodedToken.userId,
      name: decodedToken.name,
      role: decodedToken.role,
      email: decodedToken.email,
      address: decodedToken.address,
    };
    this._user = user;
this._token = token;
    localStorage.setItem('token', token);
  }

  clearUser() {
    this._user = null;
    localStorage.removeItem('token');
  }

  get isAuth() {
    return this._isAuth;
  }

  get user() {
    return this._user;
  }

  get token() {
    return this._token;
  }
}
