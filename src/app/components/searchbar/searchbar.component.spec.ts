import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchbarComponent } from './searchbar.component';
import { provideHttpClient, HttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { provideOAuthClient, AuthConfig } from 'angular-oauth2-oidc';
import { createSpyFromClass } from 'jasmine-auto-spies';
import { authConfig } from '../../../main';
import { routes } from '../../app-routing.module';

describe('SearchbarComponent', () => {
  let component: SearchbarComponent;
  let fixture: ComponentFixture<SearchbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchbarComponent],
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

    fixture = TestBed.createComponent(SearchbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
