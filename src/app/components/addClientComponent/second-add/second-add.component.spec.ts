import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecondAddComponent } from './second-add.component';

describe('SecondAddComponent', () => {
  let component: SecondAddComponent;
  let fixture: ComponentFixture<SecondAddComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SecondAddComponent]
    });
    fixture = TestBed.createComponent(SecondAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
