import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SportlerOverviewComponent } from './sportler-overview.component';

describe('SportlerOverviewComponent', () => {
  let component: SportlerOverviewComponent;
  let fixture: ComponentFixture<SportlerOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SportlerOverviewComponent]
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
