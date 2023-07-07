import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../models/user';
import { Jwtres } from '../models/jwtres';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  apiUri = '/api';
  authSubject = new BehaviorSubject(false);
  private token: string | null = '';

  constructor(private httpClient: HttpClient) { }


  private saveToken(token: string, expiresIn: string) {

    localStorage.setItem("ACCESS_TOKEN", token);

    localStorage.setItem("EXPIRES_IN", expiresIn);

    this.token = token;

  }

  register(user: User): Observable<Jwtres> {

    console.log(user)

    return this.httpClient.post<Jwtres>(this.apiUri + '/signup', user);

  }

  login(user: User): Observable<Jwtres> {
    console.log(user)
    return this.httpClient.post<Jwtres>(this.apiUri + '/login', user);

  }
}
