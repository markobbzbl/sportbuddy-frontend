import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';
import { OAuthService } from 'angular-oauth2-oidc';
import { authConfig } from './app/config/auth.config';

bootstrapApplication(AppComponent, appConfig).then(appRef => {
  const injector = appRef.injector;
  const authService = injector.get(OAuthService);
  authService.configure(authConfig);
  authService.loadDiscoveryDocumentAndLogin();
});
