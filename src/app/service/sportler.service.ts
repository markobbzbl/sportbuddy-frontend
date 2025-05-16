import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Sportler } from '../model/sportler.model';

@Injectable({
  providedIn: 'root',
})
export class SportlerService {
  private apiUrl = 'http://localhost:9090/api/sportler';

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = window.sessionStorage.getItem('access_token');
    if (!token) {
      throw new Error('No token found');
    }
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  }

  getSportler(): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.get(this.apiUrl, { headers });
  }

  createSportler(sportler: Sportler): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.post(this.apiUrl, sportler, { headers });
  }

  updateSportler(sportler: Sportler): Observable<any> {
  return this.http.put(`${this.apiUrl}/${sportler.id}`, sportler);
}

  deleteSportler(id: number): Observable<any> {
    const headers = this.getAuthHeaders();
    const sportlerId = id;
    const url = `${this.apiUrl}/${sportlerId}`;
    console.log(url)
    return this.http.delete(url, { headers });
  }

  getSportlerByUsername(username: string): Observable<Sportler | null> {
    const headers = this.getAuthHeaders();
    return this.http.get<Sportler[]>(this.apiUrl, { headers }).pipe(
      map((sportlerList) => {
        const found = sportlerList.find((s) => s.username === username);
        return found === undefined ? null : found;
      })
    );
  }
}
