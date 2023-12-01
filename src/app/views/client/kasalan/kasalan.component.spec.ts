import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KasalanComponent } from './kasalan.component';

describe('KasalanComponent', () => {
  let component: KasalanComponent;
  let fixture: ComponentFixture<KasalanComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [KasalanComponent]
    });
    fixture = TestBed.createComponent(KasalanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
