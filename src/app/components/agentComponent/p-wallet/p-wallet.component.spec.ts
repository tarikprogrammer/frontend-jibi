import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PWalletComponent } from './p-wallet.component';

describe('PWalletComponent', () => {
  let component: PWalletComponent;
  let fixture: ComponentFixture<PWalletComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PWalletComponent]
    });
    fixture = TestBed.createComponent(PWalletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
