import { RegisterUser, UserDetails, LoginUser } from './../Models/user';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl: string = '';
  constructor(private http: HttpClient) { }

  register(registerData: RegisterUser): Observable<UserDetails> {
    return this.http.post<UserDetails>(`${this.baseUrl}/user/register`, registerData);
  }

  login(loginData: LoginUser) {
    return this.http.post<UserDetails>(`${this.baseUrl}/user/login`, loginData);
  }

  getUserDetails(emai: string): Observable<UserDetails> {
    return this.http.get<UserDetails>(`${this.baseUrl}/user/details`);
  }
}
