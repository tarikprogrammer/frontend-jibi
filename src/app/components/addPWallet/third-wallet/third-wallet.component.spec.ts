import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThirdWalletComponent } from './third-wallet.component';

describe('ThirdWalletComponent', () => {
  let component: ThirdWalletComponent;
  let fixture: ComponentFixture<ThirdWalletComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ThirdWalletComponent]
    });
    fixture = TestBed.createComponent(ThirdWalletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
