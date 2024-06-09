import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaiementFacturesComponent } from './paiement-factures.component';

describe('PaiementFacturesComponent', () => {
  let component: PaiementFacturesComponent;
  let fixture: ComponentFixture<PaiementFacturesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PaiementFacturesComponent]
    });
    fixture = TestBed.createComponent(PaiementFacturesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
