import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherFactsComponent } from './other-facts.component';

describe('OtherFactsComponent', () => {
  let component: OtherFactsComponent;
  let fixture: ComponentFixture<OtherFactsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OtherFactsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OtherFactsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
