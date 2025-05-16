import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SportlerOverviewComponent } from './sportler-overview.component';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { AuthConfig, provideOAuthClient } from 'angular-oauth2-oidc';
import { routes } from '../../app-routing.module';
import { createSpyFromClass } from 'jasmine-auto-spies';
import { authConfig } from '../../../main';

describe('SportlerOverviewComponent', () => {
  let component: SportlerOverviewComponent;
  let fixture: ComponentFixture<SportlerOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SportlerOverviewComponent],
      providers: [
        provideRouter(routes),
        provideAnimations(),
        provideOAuthClient(),
        provideHttpClient(),
        { provide: HttpClient, useValue: createSpyFromClass(HttpClient) },
        { provide: AuthConfig, useValue: authConfig }
    
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SportlerOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
