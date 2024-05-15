import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalInfosComponent } from './personal-infos.component';

describe('PersonalInfosComponent', () => {
  let component: PersonalInfosComponent;
  let fixture: ComponentFixture<PersonalInfosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PersonalInfosComponent]
    });
    fixture = TestBed.createComponent(PersonalInfosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
