import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { response } from 'express';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenUrl = 'http://localhost:8080/realms/sportbuddy/protocol/openid-connect/token';
  private clientId = 'sportbuddy';

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<string> {
    const body = new HttpParams()
      .set('client_id', this.clientId)
      .set('grant_type', 'password')
      .set('scope', 'openid profile roles offline_access')
      .set('username', username)
      .set('password', password);
  
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
  
    return this.http.post<any>(this.tokenUrl, body.toString(), { headers }).pipe(
      map(response => {
        console.log("test", response);
        return response.access_token;
      })
    );
  }
  
}
