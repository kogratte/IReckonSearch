import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RFMScoreComponent } from './rfmscore.component';

describe('RFMScoreComponent', () => {
  let component: RFMScoreComponent;
  let fixture: ComponentFixture<RFMScoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RFMScoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RFMScoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
