import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AnimalService {

  apiUri = "/api/animals";
  httpOptions = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) { }

  getAllAnimalsData(): Observable<any> {

    return this.http.get<any>(this.apiUri)

  }

  newAnimal(data: any): Observable<any> {
    return this.http.post<any>(
      this.apiUri,
      data,
      { headers: this.httpOptions }
    );
  }

  updateAnimal(id: string, data: any): Observable<any> {
    console.log(data)
    return this.http.put<any>(
      this.apiUri + "/" + id,
      data,
      { headers: this.httpOptions }
    )
  }

  getOneAnimal(id: string): Observable<any> {
    return this.http.get<any>(
      this.apiUri + "/" + id,
      { headers: this.httpOptions }
    )
  }

  deleteOneAnimal(id: string): Observable<any> {
    return this.http.delete(this.apiUri + "/" + id,
      { headers: this.httpOptions })
  }
}
