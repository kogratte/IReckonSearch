import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuickFactComponent } from './quick-fact.component';

describe('QuickFactComponent', () => {
  let component: QuickFactComponent;
  let fixture: ComponentFixture<QuickFactComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuickFactComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuickFactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
