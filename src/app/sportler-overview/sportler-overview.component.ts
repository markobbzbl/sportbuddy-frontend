import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { SportlerService } from '../../service/sportler.service';
import { Sportler } from '../model/sportler.model';
import { CookieService } from '../../service/cookie.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { resolve } from 'path';

@Component({
  selector: 'app-sportler-overview',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './sportler-overview.component.html',
  styleUrl: './sportler-overview.component.scss',
})
export class SportlerOverviewComponent implements OnInit {
  sportlerList: Sportler[] = [];
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private sportlerService: SportlerService, private authService: AuthService, private cookieService: CookieService) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', Validators.required]
    });
  }


  ngOnInit(): void {
    console.log('INIT SPORTLER');
    this.authService.login("admin", "admin").subscribe(token => {
      this.cookieService.setToken("accessToken", token, 1);
      console.log('Token erhalten:', token);
    });
    
    this.sportlerService.getSportler().subscribe(
      (data) => {
        console.log('Sportler data received', data);
        this.sportlerList = data;
      },
      (error) => {
        console.error('Error fetching sportler data', error); // Handle any errors
      }
    );
  }



  onSubmit() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value.username, this.loginForm.value.password).subscribe({
        next: (response) =>{
          console.log("login succeeded!", response);
          this.cookieService.setToken("accessToken", response, 1)
        }
      })
    }
  }
}
