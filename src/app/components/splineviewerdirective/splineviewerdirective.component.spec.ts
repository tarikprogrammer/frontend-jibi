import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SplineviewerdirectiveComponent } from './splineviewerdirective.component';

describe('SplineviewerdirectiveComponent', () => {
  let component: SplineviewerdirectiveComponent;
  let fixture: ComponentFixture<SplineviewerdirectiveComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SplineviewerdirectiveComponent]
    });
    fixture = TestBed.createComponent(SplineviewerdirectiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
