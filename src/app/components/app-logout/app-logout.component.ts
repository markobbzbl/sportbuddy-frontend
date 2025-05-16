import { Component } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-app-logout',
  imports: [MatButton, MatIcon, TranslateModule, MatTooltip],
  templateUrl: './app-logout.component.html',
  styleUrl: './app-logout.component.scss',
})
export class AppLogoutComponent {
    logout() {
    window.sessionStorage.clear()
    window.location.href = "http://localhost:8080/realms/sportbuddy/protocol/openid-connect/logout?redirect_uri=http://localhost:4200";
  }
}
