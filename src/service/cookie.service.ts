import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, switchMap } from 'rxjs';
import { AuthService } from './auth.service';
import { Sportler } from '../app/model/sportler.model';

@Injectable({
  providedIn: 'root',
})
export class CookieService {
  getCookie(name: string): string | null {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
      return parts.pop()?.split(';').shift() ?? null;
    }
    return null;
  }

  setToken(name: string, value: string, hours: number = 1): void {
    const expires = new Date(Date.now() + hours * 60 * 60 * 1000).toUTCString(); // 1 Stunde = 3600000 ms
    document.cookie = `${name}=${value}; expires=${expires}; path=/`;
  }
  
}
