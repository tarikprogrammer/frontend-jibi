import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FirstWalletComponent } from './first-wallet.component';

describe('FirstWalletComponent', () => {
  let component: FirstWalletComponent;
  let fixture: ComponentFixture<FirstWalletComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FirstWalletComponent]
    });
    fixture = TestBed.createComponent(FirstWalletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
