import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WorkshiftService {

  apiUri = "/api";
  httpOptions = new HttpHeaders().set("Content-Type", "application/json");

  constructor(private http: HttpClient) { }

  getAllWorkshiftsData(): Observable<any> {

    return this.http.get<any>(this.apiUri+"/turnos")

  }

  newWorkshift(data: any): Observable<any> {
    return this.http.post<any>(
      this.apiUri + "/turnos",
      data,
      { headers: this.httpOptions }
    );
  }

  updateWorkshift(id: string, data: any): Observable<any> {
    console.log(data)
    return this.http.put<any>(
      this.apiUri + "/turnos/" + id,
      data,
      { headers: this.httpOptions }
    )
  }

  getOneWorkshift(id: string): Observable<any> {
    return this.http.get<any>(
      this.apiUri + "/turnos/" + id,
      { headers: this.httpOptions }
    )
  }

  deleteOneWorkshift(id: string): Observable<any> {
    return this.http.delete(this.apiUri + "/turnos/" + id,
      { headers: this.httpOptions })
  }
}
