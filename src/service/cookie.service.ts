import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class CookieService {
  constructor(private http: HttpClient, private router: Router) {}

  getCookie() {
    const token = window.sessionStorage.getItem('access_token');
    return token;
  }

  reset(redirect_uri: any) {
    this.router.navigate(redirect_uri)
  }

  getUsername() {
    const token = window.sessionStorage.getItem('access_token');
    if (!token) return null;

    try {
      // JWT Token hat 3 Teile, durch Punkte getrennt: header.payload.signature
      const payloadBase64 = token.split('.')[1];
      if (!payloadBase64) return null;

      // Base64Url Decodierung (JWT verwendet Base64Url, also ersetze ggf. Zeichen)
      const payloadJson = atob(
        payloadBase64.replace(/-/g, '+').replace(/_/g, '/')
      );
      const payload = JSON.parse(payloadJson);
      console.log(payload.preferred_username);
      return payload.preferred_username ?? null;
    } catch (e) {
      return null;
    }
  }
}
