import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoAccessComponent } from './no-access.component';
import { AuthConfig, OAuthModule } from 'angular-oauth2-oidc';
import { HttpClient } from '@angular/common/http';
import { createSpyFromClass } from 'jasmine-auto-spies';
import {
  TranslateLoader,
  TranslateModule
} from '@ngx-translate/core';
import { authConfig, HttpLoaderFactory } from '../../../main';

describe('NoAccessComponent', () => {
  let component: NoAccessComponent;
  let fixture: ComponentFixture<NoAccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        OAuthModule.forRoot({ resourceServer: { sendAccessToken: true } }),
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient],
          },
        }),
        NoAccessComponent,
      ],
      providers: [
        { provide: HttpClient, useValue: createSpyFromClass(HttpClient) },
        { provide: AuthConfig, useValue: authConfig },
      ],
      teardown: {destroyAfterEach: true}
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NoAccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
