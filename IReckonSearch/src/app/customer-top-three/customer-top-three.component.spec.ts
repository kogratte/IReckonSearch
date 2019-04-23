import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerTopThreeComponent } from './customer-top-three.component';

describe('CustomerTopThreeComponent', () => {
  let component: CustomerTopThreeComponent;
  let fixture: ComponentFixture<CustomerTopThreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerTopThreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerTopThreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
