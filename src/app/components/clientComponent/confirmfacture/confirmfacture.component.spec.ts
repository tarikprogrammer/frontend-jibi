import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmfactureComponent } from './confirmfacture.component';

describe('ConfirmfactureComponent', () => {
  let component: ConfirmfactureComponent;
  let fixture: ComponentFixture<ConfirmfactureComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConfirmfactureComponent]
    });
    fixture = TestBed.createComponent(ConfirmfactureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
