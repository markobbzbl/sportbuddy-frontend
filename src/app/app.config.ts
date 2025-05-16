import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideOAuthClient } from 'angular-oauth2-oidc';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { routes } from './app-routing.module';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withFetch()),
    provideOAuthClient(),
    importProvidersFrom(MatSnackBarModule),
  ],
};
