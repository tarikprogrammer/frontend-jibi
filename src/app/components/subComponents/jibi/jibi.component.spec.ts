import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JibiComponent } from './jibi.component';

describe('JibiComponent', () => {
  let component: JibiComponent;
  let fixture: ComponentFixture<JibiComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JibiComponent]
    });
    fixture = TestBed.createComponent(JibiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
