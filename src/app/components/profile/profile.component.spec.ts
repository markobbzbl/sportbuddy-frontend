import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfileComponent } from './profile.component'; // Your standalone component
import { SportlerService } from '../../service/sportler.service';
import { CookieService } from '../../service/cookie.service';
import { of, throwError } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';
import { provideAnimations } from '@angular/platform-browser/animations';
import { AuthConfig, provideOAuthClient } from 'angular-oauth2-oidc';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { MatCardModule } from '@angular/material/card';
import { createSpyFromClass } from 'jasmine-auto-spies';
import { authConfig } from '../../../main';

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;
  let sportlerServiceSpy: jasmine.SpyObj<SportlerService>;
  let cookieServiceSpy: jasmine.SpyObj<CookieService>;
  let router: Router;

  beforeEach(async () => {
    sportlerServiceSpy = jasmine.createSpyObj('SportlerService', [
      'getSportlerByUsername',
    ]);
    cookieServiceSpy = jasmine.createSpyObj('CookieService', ['getUsername']);

    await TestBed.configureTestingModule({
      imports: [ProfileComponent, MatCardModule, RouterTestingModule],
      providers: [
        provideAnimations(),
        provideOAuthClient(),
        provideHttpClient(),
        { provide: SportlerService, useValue: sportlerServiceSpy },
        { provide: CookieService, useValue: cookieServiceSpy },
        { provide: ActivatedRoute, useValue: { params: of({}) } },
        {
          provide: MatDialogRef,
          useValue: { close: jasmine.createSpy('close') },
        },
        { provide: HttpClient, useValue: createSpyFromClass(HttpClient) },
        { provide: AuthConfig, useValue: authConfig },
      ],
      teardown: { destroyAfterEach: true },
    }).compileComponents();

    router = TestBed.inject(Router);
    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load sportler data if username exists', () => {
    const mockSportler = {
      id: 1,
      username: 'marko',
      firstname: 'marko',
      lastname: 'jevtic',
      email: 'marko.jevtic@testmail.test',
      ort: 'Walzwerk',
      sportartenIds: [],
      kategorieIds: [],
      verfuegbarkeit: 'immer',
    };
    cookieServiceSpy.getUsername.and.returnValue('marko');
    sportlerServiceSpy.getSportlerByUsername.and.returnValue(of(mockSportler));

    fixture.detectChanges(); // triggers ngOnInit

    expect(component.sportler).toEqual(mockSportler);
    expect(component.loading).toBeFalse();
    expect(component.error).toBe('');
  });

  it('should set error if no username found', () => {
    cookieServiceSpy.getUsername.and.returnValue(null);

    fixture.detectChanges();

    expect(component.sportler).toBeNull();
    expect(component.loading).toBeFalse();
    expect(component.error).toBe('Kein Benutzername angegeben.');
  });

  it('should set error if sportlerService fails', () => {
    cookieServiceSpy.getUsername.and.returnValue('nonexistent');
    sportlerServiceSpy.getSportlerByUsername.and.returnValue(
      throwError(() => new Error('Not found'))
    );

    fixture.detectChanges();

    expect(component.sportler).toBeNull();
    expect(component.loading).toBeFalse();
    expect(component.error).toBe('Benutzer nicht gefunden.');
  });

  it('should navigate back on goBack()', () => {
    spyOn(router, 'navigate');
    component.goBack();
    expect(router.navigate).toHaveBeenCalledWith(['/sportler-overview']);
  });
});
