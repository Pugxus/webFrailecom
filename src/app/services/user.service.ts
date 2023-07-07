import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiUri = "/api";
  httpOptions = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) { }

  getAllUsersData(): Observable<any> {

    return this.http.get<any>(this.apiUri+"/users")

  }

  newUser(data: any): Observable<any> {
    return this.http.post<any>(
      this.apiUri + "/signup",
      data,
      { headers: this.httpOptions }
    );
  }

  updateUser(id: string, data: any): Observable<any> {
    console.log(data)
    return this.http.put<any>(
      this.apiUri + "/users/" + id,
      data,
      { headers: this.httpOptions }
    )
  }

  getOneUser(id: string): Observable<any> {
    return this.http.get<any>(
      this.apiUri + "/users/" + id,
      { headers: this.httpOptions }
    )
  }

  deleteOneUser(id: string): Observable<any> {
    return this.http.delete(this.apiUri + "/users/" + id,
      { headers: this.httpOptions })
  }
}
