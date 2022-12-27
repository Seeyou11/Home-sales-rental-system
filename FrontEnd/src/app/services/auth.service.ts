import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserForLogin, UserForRegister } from '../model/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseUrl = 'http://localhost:5250/api/Account/login';
  constructor(private http: HttpClient) {}

  authUser(user: UserForLogin) {
    return this.http.post('http://localhost:5250/api/Account/login', user);
  }

  registerUser(user: UserForRegister) {
    return this.http.post('http://localhost:5250/api/Account/register', user);
  }
}
