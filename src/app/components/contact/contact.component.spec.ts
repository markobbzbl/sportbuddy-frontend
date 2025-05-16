import { provideHttpClient } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { AuthConfig, provideOAuthClient } from 'angular-oauth2-oidc';
import { routes } from '../../app-routing.module';
import { ContactComponent } from './contact.component';

describe('ContactComponent', () => {
  let component: ContactComponent;
  let fixture: ComponentFixture<ContactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ContactComponent,
        MatDialogModule,
        MatSnackBarModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule
      ],
      providers: [
        provideRouter(routes),
        provideAnimations(),
        provideOAuthClient(),
        provideHttpClient(),
        {
          provide: AuthConfig,
          useValue: {
            issuer: 'https://dummy-issuer',
            clientId: 'dummy-client-id',
            redirectUri: 'http://localhost',
            scope: 'openid profile email',
          } satisfies AuthConfig
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
