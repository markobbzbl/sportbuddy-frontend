import { enableProdMode, importProvidersFrom, inject, provideEnvironmentInitializer } from '@angular/core';
import { environment } from './environments/environment';
import { AuthConfig, OAuthStorage, OAuthModule } from 'angular-oauth2-oidc';
import {
  HTTP_INTERCEPTORS,
  provideHttpClient,
  withInterceptorsFromDi,
  withXsrfConfiguration,
  HttpClient,
} from '@angular/common/http';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { AppComponent } from './app/app.component';
import { HttpXSRFInterceptor } from './app/interceptor/http.csfr.interceptor';
import { AppAuthService } from './app/service/app.auth.service';
import { AppRoutingModule } from './app/app-routing.module';

if (environment.production) {
  enableProdMode();
}

export const authConfig: AuthConfig = {
  issuer: 'http://localhost:8080/realms/sportbuddy',
  requireHttps: false,
  redirectUri: environment.frontendBaseUrl,
  postLogoutRedirectUri: environment.frontendBaseUrl,
  clientId: 'sportbuddy',
  scope: 'openid profile roles offline_access',
  responseType: 'code',
  showDebugInformation: true,
  requestAccessToken: true,
  silentRefreshRedirectUri: window.location.origin + '/silent-refresh.html',
  silentRefreshTimeout: 500,
  clearHashAfterLogin: true,
};

export function storageFactory(): OAuthStorage {
  return sessionStorage;
}

export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(
      BrowserModule,
      AppRoutingModule,
      OAuthModule.forRoot({ resourceServer: { sendAccessToken: true } }),
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient],
        },
      }),
      MatMomentDateModule
    ),
    { provide: AuthConfig, useValue: authConfig },
    { provide: HTTP_INTERCEPTORS, useClass: HttpXSRFInterceptor, multi: true },
    {
      provide: OAuthStorage,
      useFactory: storageFactory,
    },
    Location,
    { provide: LocationStrategy, useClass: PathLocationStrategy },
    provideHttpClient(
      withInterceptorsFromDi(),
      withXsrfConfiguration({
        cookieName: 'XSRF-TOKEN',
        headerName: 'X-XSRF-TOKEN',
      })
    ),
    provideAnimations(),
    provideEnvironmentInitializer(() => {inject(AppAuthService).initAuth().finally()})
  ]
})
.catch((err) => console.error(err));
