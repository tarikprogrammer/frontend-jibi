import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FirstAddComponent } from './first-add.component';

describe('FirstAddComponent', () => {
  let component: FirstAddComponent;
  let fixture: ComponentFixture<FirstAddComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FirstAddComponent]
    });
    fixture = TestBed.createComponent(FirstAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
