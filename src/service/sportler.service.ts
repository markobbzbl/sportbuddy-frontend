import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, switchMap } from 'rxjs';
import { AuthService } from './auth.service';
import { Sportler } from '../app/model/sportler.model';
import { CookieService } from './cookie.service';

@Injectable({
  providedIn: 'root',
})
export class SportlerService {
  private apiUrl = 'http://localhost:8080/api/sportler';

  constructor(private http: HttpClient, private cookieService: CookieService) {}
  
  getSportler(): Observable<Sportler[]> {
    console.log("hasd")
    const token = this.cookieService.getCookie('accessToken');
    if (!token) {
      throw new Error('Token is not available');
    }
    const headers = new HttpHeaders().set('Authorization', `Bearer ` +  token);
    const sportler =  this.http.get<Sportler[]>(this.apiUrl, { headers });
    console.log("allah", sportler)
    return sportler
  }
}
