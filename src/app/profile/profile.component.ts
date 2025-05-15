import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SportlerService } from '../../service/sportler.service';
import { Sportler } from '../model/sportler.model';
import { CookieService } from '../../service/cookie.service';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from "../header/header.component";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  imports: [
    CommonModule,
    HeaderComponent
]
})
export class ProfileComponent implements OnInit {
  sportler: Sportler | null = null;
  loading = true;
  error = '';

  constructor(
    private route: ActivatedRoute,
    private sportlerService: SportlerService,
    private router: Router,
    private cookieService: CookieService
  ) {}

ngOnInit(): void {
  const username = this.cookieService.getUsername();
  if (!username) {
    this.error = 'Kein Benutzername angegeben.';
    this.loading = false;
    return;
  }

  this.sportlerService.getSportlerByUsername(username).subscribe({
    next: (data) => {
      this.sportler = data;
      this.loading = false;
    },
    error: () => {
      this.error = 'Benutzer nicht gefunden.';
      this.loading = false;
    }
  });
}


  goBack() {
    this.router.navigate(['/sportler-overview']);
  }
}
