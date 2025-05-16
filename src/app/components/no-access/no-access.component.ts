import {Component} from '@angular/core';
import {AppAuthService} from '../../service/app.auth.service';
import {OAuthService} from 'angular-oauth2-oidc';
import { MatIcon } from '@angular/material/icon';
import { NgIf } from '@angular/common';
import { AppLoginComponent } from '../app-login/app-login.component';
import { HeaderService } from '../../service/header.service';
import { Router, RouterModule } from '@angular/router';

@Component({
    selector: 'app-no-access',
    templateUrl: './no-access.component.html',
    styleUrls: ['./no-access.component.scss'],
    imports: [MatIcon, NgIf, AppLoginComponent, RouterModule]
})
export class NoAccessComponent {

  constructor(private authService: AppAuthService, private headerService: HeaderService, public oauthService: OAuthService) {
    this.headerService.setPage('nav.noaccess');
  }

  public login() {
    this.authService.login();
  }

}
