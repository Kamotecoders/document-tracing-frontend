import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PsaComponent } from './psa.component';

describe('PsaComponent', () => {
  let component: PsaComponent;
  let fixture: ComponentFixture<PsaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PsaComponent]
    });
    fixture = TestBed.createComponent(PsaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
