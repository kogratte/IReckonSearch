import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerStatusComponent } from './customer-status.component';
import { QuickFactComponent } from '../quick-fact/quick-fact.component';
import { MatIconModule } from '@angular/material';
import { MyMaterialsModule } from '../my-materials/my-materials.module';

describe('CustomerStatusComponent', () => {
  let component: CustomerStatusComponent;
  let fixture: ComponentFixture<CustomerStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        CustomerStatusComponent,
        QuickFactComponent
     ],
     imports: [
       MyMaterialsModule
     ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
