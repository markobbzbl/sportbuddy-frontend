import { AuthConfig } from 'angular-oauth2-oidc';

export const authConfig: AuthConfig = {
  issuer: 'http://localhost:8080/realms/sportbuddy',
  redirectUri: window.location.origin,
  clientId: 'sportbuddy',
  responseType: 'code',
  scope: 'openid profile email',
  showDebugInformation: true,
  requireHttps: false, // nur für Entwicklung
};
