import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { SportlerService } from '../../service/sportler.service';
import { Sportler } from '../../model/sportler.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { SearchbarComponent } from '../searchbar/searchbar.component';
import { HeaderComponent } from '../header/header.component';
import { MatTooltip } from '@angular/material/tooltip';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { AppAuthService } from '../../service/app.auth.service';
import { EditDialogComponent } from '../edit-dialog/edit-dialog.component';
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
    HeaderComponent,
    MatTooltip,
  ],

  templateUrl: './sportler-overview.component.html',
  styleUrl: './sportler-overview.component.scss',
})
export class SportlerOverviewComponent implements OnInit {
  sportlerList: Sportler[] = [];
  loginForm: FormGroup;
  errorMessage = '';
  displayedColumns: string[] = [
    'username',
    'firstname',
    'lastname',
    'email',
    'ort',
  ];
  dataSource = new MatTableDataSource<Sportler>();
  i = 1;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  token = window.sessionStorage.getItem('access_token');
  isAdmin = false;
  constructor(
    private fb: FormBuilder,
    private sportlerService: SportlerService,
    private dialog: MatDialog,
    private authService: AppAuthService,
    private cd: ChangeDetectorRef
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', Validators.required],
    });
  }
  ngOnInit(): void {
    this.authService.accessTokenObservable.subscribe((token) => {
      if (token) {
        this.token = token;

        this.authService.getRoles().subscribe((roles: string[]) => {
          this.isAdmin = roles.includes('admin');

          // Now load data after roles and isAdmin is set
          this.loadData();

          // Manually trigger change detection to update the view
          this.cd.detectChanges();
        });
      }
    });
  }

  loadData() {
    if (this.token) {
      this.sportlerService.getSportler().subscribe(
        (data) => {
          console.log('Sportler data received', data);
          this.sportlerList = data;
          this.dataSource = new MatTableDataSource(this.sportlerList);
        },
        (error) => {
          console.error('Error fetching sportler data', error);
        }
      );
    }
  }

  redirectToLogin(): void {
    const keycloakLoginUrl =
      'http://localhost:8080/realms/sportbuddy/protocol/openid-connect/auth' +
      '?response_type=code' +
      '&client_id=sportbuddy' +
      '&redirect_uri=http://localhost:4200';
    window.location.href = keycloakLoginUrl;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource!.filter = filterValue.trim().toLowerCase();
  }

 deleteSportler(sportler: Sportler): void {
  const dialogRef = this.dialog.open(DeleteDialogComponent, {
    width: '350px',
    data: { message: 'Möchtest du diesen Sportler wirklich löschen?' },
  });

  dialogRef.afterClosed().subscribe((confirmed: boolean) => {
    if (confirmed) {
      this.sportlerService.deleteSportler(sportler.id).subscribe({
        next: () => {
          console.log('Sportler erfolgreich gelöscht');
          this.loadData();
        },
        error: (error) => {
          console.error('Fehler beim Löschen des Sportlers', error);
        },
      });
    }
  });
}



  editSportler(sportler: Sportler): void {
    const dialogRef = this.dialog.open(EditDialogComponent, {
      width: '400px',
      data: sportler,
    });

    dialogRef.afterClosed().subscribe((result: Sportler | undefined) => {
      if (result) {
        this.sportlerService.updateSportler(result).subscribe(
          () => {
            console.log('Sportler updated', result);
            this.loadData(); // reload list
          },
          (error) => {
            console.error('Fehler beim Bearbeiten des Sportlers', error);
          }
        );
      }
    });
  }
}
