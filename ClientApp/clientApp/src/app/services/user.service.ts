import { RegisterUser, UserDetails, LoginUser } from './../Models/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl: string = 'http://localhost:5211';
  header!: HttpHeaders;

  constructor(private http: HttpClient) {
    this.header = new HttpHeaders({
      'accept': 'text/plain',
      'content-type': 'application/json'
    });
  }

  register(registerData: RegisterUser): Observable<UserDetails> {
    return this.http.post<UserDetails>(`${this.baseUrl}/user/register`, registerData, { headers: this.header });
  }

  login(loginData: LoginUser) {
    return this.http.post<UserDetails>(`${this.baseUrl}/user/login`, loginData, { headers: this.header });
  }

  getUserDetails(emai: string): Observable<UserDetails> {
    return this.http.get<UserDetails>(`${this.baseUrl}/user/details`, { headers: this.header });
  }
}
