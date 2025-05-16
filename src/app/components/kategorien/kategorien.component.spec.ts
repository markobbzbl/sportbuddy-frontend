import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KategorienComponent } from './kategorien.component';

describe('KategorienComponent', () => {
  let component: KategorienComponent;
  let fixture: ComponentFixture<KategorienComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KategorienComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KategorienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
