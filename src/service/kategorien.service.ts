import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Kategorie } from '../app/model/kategorie.model';

@Injectable({
  providedIn: 'root',
})
export class KategorieService {
  private apiUrl = 'http://localhost:9090/api/kategorien';

  constructor(private http: HttpClient) {}

  // Method to get the Kategorie data with authentication
  getKategorie(): Observable<any> {
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

  getKategorieByName(name: string): Observable<Kategorie | null> {
    const token = window.sessionStorage.getItem('access_token');
    if (!token) {
      throw new Error('No token found');
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.get<Kategorie[]>(this.apiUrl, { headers }).pipe(
      map((KategorieList) => {
        const found = KategorieList.find((s) => s.name === name);
        return found === undefined ? null : found;
      })
    );
  }
}
