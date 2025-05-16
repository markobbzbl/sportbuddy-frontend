import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { Router, RouterModule } from '@angular/router';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AppLoginComponent } from "../app-login/app-login.component";
import { AppLogoutComponent } from "../app-logout/app-logout.component";

@Component({
  selector: 'app-header',
  imports: [
    ReactiveFormsModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatTableModule,
    MatInputModule,
    CommonModule,
    MatIconModule,
    RouterModule,
    MatDialogModule,
    MatMenuModule,
    MatTooltipModule,
    MatSnackBarModule,
    AppLoginComponent,
    AppLogoutComponent
],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  constructor(private router: Router){

  }

  logout() {
    window.sessionStorage.clear()
    window.location.href = "http://localhost:8080/realms/sportbuddy/protocol/openid-connect/logout?redirect_uri=http://localhost:4200";
  }

  loadContactPage(){
    this.router.navigate(["/contact"])
  }
}
