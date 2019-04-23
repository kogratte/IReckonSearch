import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerTopThreeComponent } from './customer-top-three.component';
import { MyMaterialsModule } from '../my-materials/my-materials.module';
import { QuickFactComponent } from '../quick-fact/quick-fact.component';
import { RouterModule } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('CustomerTopThreeComponent', () => {
  let component: CustomerTopThreeComponent;
  let fixture: ComponentFixture<CustomerTopThreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CustomerTopThreeComponent, QuickFactComponent],
      imports: [
        MyMaterialsModule,
        HttpClientTestingModule,
        RouterModule.forRoot([])
      ]
    }).compileComponents();
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
