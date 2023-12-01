import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BurialComponent } from './burial.component';

describe('BurialComponent', () => {
  let component: BurialComponent;
  let fixture: ComponentFixture<BurialComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BurialComponent]
    });
    fixture = TestBed.createComponent(BurialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
