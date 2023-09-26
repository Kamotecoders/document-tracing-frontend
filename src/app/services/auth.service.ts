import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay } from 'rxjs';
import { Users } from '../models/Users';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  url = 'localhost:3000/auth/';
  constructor(private http: HttpClient) {}
  login(data: any) {
    return this.http.post<Users>(this.url + 'login', data).pipe(delay(1000));
  }
  register(data: any) {
    return this.http.post(this.url + 'register', data).pipe(delay(1000));
  }
}
