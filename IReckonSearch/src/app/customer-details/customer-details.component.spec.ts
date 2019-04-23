import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerDetailsComponent } from './customer-details.component';
import { MyMaterialsModule } from '../my-materials/my-materials.module';
import { RouterModule } from '@angular/router';
import { QuickFactsComponent } from '../quick-facts/quick-facts.component';
import { CustomerStatusComponent } from '../customer-status/customer-status.component';
import { CustomerTopThreeComponent } from '../customer-top-three/customer-top-three.component';
import { RFMScoreComponent } from '../rfmscore/rfmscore.component';
import { OtherFactsComponent } from '../other-facts/other-facts.component';
import { QuickFactComponent } from '../quick-fact/quick-fact.component';
import { provideMockStore } from '@ngrx/store/testing';
import { initialState } from '../state';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AppRoutingModule } from '../app-routing.module';

describe('CustomerDetailsComponent', () => {
  let component: CustomerDetailsComponent;
  let fixture: ComponentFixture<CustomerDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        CustomerDetailsComponent, 
        QuickFactsComponent, 
        QuickFactComponent,
        CustomerStatusComponent,
        CustomerTopThreeComponent,
        RFMScoreComponent,
        OtherFactsComponent
      ],
      imports: [
        HttpClientTestingModule,
        MyMaterialsModule,
        RouterModule.forRoot([])
      ],
      providers: [
        provideMockStore({ initialState })
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
