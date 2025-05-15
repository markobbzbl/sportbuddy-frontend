import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { SportlerService } from '../../service/sportler.service';
import { Sportler } from '../model/sportler.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import {
  MatTableDataSource,
  MatTableModule,
} from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';
import { SearchbarComponent } from "../searchbar/searchbar.component";
import { CookieService } from '../../service/cookie.service';
import { HeaderComponent } from "../header/header.component";
@Component({
  selector: 'app-sportler-overview',
  imports: [
    ReactiveFormsModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatTableModule,
    MatInputModule,
    CommonModule,
    MatIconModule,
    RouterModule,
    SearchbarComponent,
    HeaderComponent 
],
  templateUrl: './sportler-overview.component.html',
  styleUrl: './sportler-overview.component.scss',
})
export class SportlerOverviewComponent implements OnInit, AfterViewInit {
  sportlerList: Sportler[] = [];
  loginForm: FormGroup;
  errorMessage: string = '';
  displayedColumns: string[] = [
    'username',
    'firstname',
    'lastname',
    'email',
    'ort',
    'verfuegbarkeit',
  ];
  dataSource = new MatTableDataSource<Sportler>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private cookieService: CookieService,
    private sportlerService: SportlerService
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {
  const token = window.sessionStorage.getItem('access_token');

  if (token) {
    this.sportlerService.getSportler().subscribe(
      (data) => {
        console.log('Sportler data received', data);
        this.sportlerList = data;
        this.dataSource = new MatTableDataSource(this.sportlerList);
      },
      (error) => {
        // Assuming the 401 error is from unauthenticated access, redirect to login
        if (error.status === 401) {
          window.sessionStorage.removeItem('access_token')
          const loginUrl = `http://localhost:8080/realms/sportbuddy/protocol/openid-connect/auth?response_type=code&client_id=sportbuddy&redirect_uri=http://localhost:4200`;
          window.location.href = loginUrl; // redirect the user to login
        } else {
          console.error('Error fetching sportler data', error);
        }
      }
    );
  } else {
    // If there's no token, redirect to login page
    this.router.navigate(['login']);
  }
}


  ngAfterViewInit() {
    this.dataSource!.paginator = this.paginator;
    this.dataSource!.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource!.filter = filterValue.trim().toLowerCase();
  }
}
