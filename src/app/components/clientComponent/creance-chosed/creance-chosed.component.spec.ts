import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreanceChosedComponent } from './creance-chosed.component';

describe('CreanceChosedComponent', () => {
  let component: CreanceChosedComponent;
  let fixture: ComponentFixture<CreanceChosedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreanceChosedComponent]
    });
    fixture = TestBed.createComponent(CreanceChosedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
