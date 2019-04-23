// import { async, ComponentFixture, TestBed } from '@angular/core/testing';

// import { CustomerDataComponent } from './customer-data.component';
// import { MyMaterialsModule } from '../my-materials/my-materials.module';
// import { HttpClientTestingModule } from '@angular/common/http/testing';
// import { CustomersService } from '../customers.service';
// import { ActivatedRoute } from '@angular/router';
// import { Observable, of } from 'rxjs';
// import { cold } from 'jasmine-marbles';

// describe('CustomerDataComponent', () => {
//   let component: CustomerDataComponent;
//   let fixture: ComponentFixture<CustomerDataComponent>;
//   let stubedParamMaps: Observable<any>;
//   let stubedCustomerSvc = jasmine.createSpyObj("customerService", ["get"]);
//   let stubedParams: {
//     get: (name: string) => {
//     }
//   };

//   beforeEach(async(() => {
//     stubedParamMaps = cold('a', { a: stubedParams });

//     TestBed.configureTestingModule({
//       imports: [
//         MyMaterialsModule,
//         HttpClientTestingModule
//       ],
//       providers: [
//         { provide: CustomersService, useValue: stubedCustomerSvc },
//         { provide: ActivatedRoute, useValue: {
//           'parent': {
//             'paramMap': stubedParamMaps
//           }
//         } }
//       ],
//       declarations: [ CustomerDataComponent ]
//     })
//     .compileComponents();


//   }));

//   beforeEach(() => {
//     debugger;
//     fixture = TestBed.createComponent(CustomerDataComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   fit('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });
