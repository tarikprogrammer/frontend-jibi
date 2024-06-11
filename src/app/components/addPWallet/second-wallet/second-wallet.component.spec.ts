import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecondWalletComponent } from './second-wallet.component';

describe('SecondWalletComponent', () => {
  let component: SecondWalletComponent;
  let fixture: ComponentFixture<SecondWalletComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SecondWalletComponent]
    });
    fixture = TestBed.createComponent(SecondWalletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
