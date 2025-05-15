import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Sportler } from '../app/model/sportler.model';

@Injectable({
  providedIn: 'root',
})
export class SportlerService {
  private apiUrl = 'http://localhost:9090/api/sportler';

  constructor(private http: HttpClient) {}

  // Method to get the Sportler data with authentication
  getSportler(): Observable<any> {
    const token = window.sessionStorage.getItem('access_token'); // Retrieve token from AuthService
    if (!token) {
      throw new Error('No token found');
    }

    // Set headers with Authorization token
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    // Make the HTTP GET request
    return this.http.get(this.apiUrl, { headers });
  }

  getSportlerByUsername(username: string): Observable<Sportler | null> {
    const token = window.sessionStorage.getItem('access_token');
    if (!token) {
      throw new Error('No token found');
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.get<Sportler[]>(this.apiUrl, { headers }).pipe(
      map((sportlerList) => {
        const found = sportlerList.find((s) => s.username === username);
        return found === undefined ? null : found;
      })
    );
  }
}
