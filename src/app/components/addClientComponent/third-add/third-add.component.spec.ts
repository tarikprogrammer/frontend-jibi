import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThirdAddComponent } from './third-add.component';

describe('ThirdAddComponent', () => {
  let component: ThirdAddComponent;
  let fixture: ComponentFixture<ThirdAddComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ThirdAddComponent]
    });
    fixture = TestBed.createComponent(ThirdAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
