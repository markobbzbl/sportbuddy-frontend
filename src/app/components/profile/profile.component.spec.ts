import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfileComponent } from './profile.component';
import { SportlerService } from '../../service/sportler.service';
import { CookieService } from '../../service/cookie.service';
import { of, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Sportler } from '../../model/sportler.model';

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;

  let sportlerServiceSpy: jasmine.SpyObj<SportlerService>;
  let cookieServiceSpy: jasmine.SpyObj<CookieService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    sportlerServiceSpy = jasmine.createSpyObj('SportlerService', ['getSportlerByUsername']);
    cookieServiceSpy = jasmine.createSpyObj('CookieService', ['getUsername']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [ProfileComponent],
      providers: [
        { provide: SportlerService, useValue: sportlerServiceSpy },
        { provide: CookieService, useValue: cookieServiceSpy },
        { provide: Router, useValue: routerSpy },
        { provide: ActivatedRoute, useValue: {} },
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load sportler data if username exists', () => {
    const mockSportler: Sportler = { id: 1, username: 'marko' } as Sportler;
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
    sportlerServiceSpy.getSportlerByUsername.and.returnValue(throwError(() => new Error('Not found')));

    fixture.detectChanges();

    expect(component.sportler).toBeNull();
    expect(component.loading).toBeFalse();
    expect(component.error).toBe('Benutzer nicht gefunden.');
  });

  it('should navigate back on goBack()', () => {
    component.goBack();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/sportler-overview']);
  });
});
