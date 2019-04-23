import { TestBed } from '@angular/core/testing';
import { ReplaySubject, of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import * as MyActions from './actions';
import * as MyEffects from './effects';
import { Customer } from './models';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Router } from '@angular/router';
import { APP_BASE_HREF } from '@angular/common';
import { initialState, State } from './state';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { CustomersService } from './customers.service';

describe('App effects', () => {
  let effects: MyEffects.AppEffects;
  let actions: any = new ReplaySubject(1);
  let router: Router;
  let store: MockStore<State>;
  let navigateSpy: any;
  let customersSvc = jasmine.createSpyObj('customersService', {
    "getAll": jasmine.createSpy()
  });
  const customers = [
    { ...buildCustomer(5), first_name: "Will", last_name: "Smith" },
    { ...buildCustomer(6), first_name: "Bill", last_name: "Gates" },
    { ...buildCustomer(7), first_name: "Donald", last_name: "Duck" },
    { ...buildCustomer(8), first_name: "Donald", last_name: "Trump" },
    { ...buildCustomer(9), first_name: "Iron", last_name: "Man" },
    { ...buildCustomer(10), first_name: "Super", last_name: "Man" },
    { ...buildCustomer(10), first_name: "Manuel", last_name: "Dos Santos" },
    { ...buildCustomer(10), first_name: "Ronald", last_name: "McDonald" },
  ];

  beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([])
      ],
      providers: [
        provideMockActions(() => actions),
        provideMockStore({ initialState }),
        { provide: APP_BASE_HREF, useValue: '/' },
        { provide: CustomersService, useValue: customersSvc },
        MyEffects.AppEffects,
      ]
    });

    store = TestBed.get(Store);
    effects = TestBed.get(MyEffects.AppEffects);
    router = TestBed.get(Router);
    customersSvc = TestBed.get(CustomersService);
    navigateSpy = spyOn(router, 'navigate');
    navigateSpy.calls.reset();
  });

  afterEach(() => {
  });

  describe("LOAD_CUSTOMERS", () => {
    it("should load customers from remote json", () => {
      actions.next(MyActions.loadCustomers());
      const stubedCustomers = [
        buildCustomer(5)
      ];
      spyOn(customersSvc, 'getAll').and.returnValue(of(stubedCustomers));
      
      effects.loadCustomers$.pipe(
        map(x => {
          expect(x).toEqual(MyActions.customersLoaded(stubedCustomers));
          return x;
        })
      ).subscribe();

      // const req = httpTestingController.expectOne(customersUri);
      // req.flush(stubedCustomers);
    });

    // it("should dispatch an error if result is null", () => {
    //   actions.next(MyActions.loadCustomers());
      
    //   spyOn(customersSvc, 'getAll').and.throwError("totot");
     
    //   effects.loadCustomers$.pipe(
    //     map(x => {
    //       expect(x).toEqual(MyActions.customersLoadingFailed());
    //       return x;
    //     })
    //   ).subscribe();

    // });
  })
  describe("SHOW_PROFILE", () => {
    it("should redirect to the customer profile page", () => {
      const customer: Customer = {
        id: 4,
        first_name: "Zinedine",
        last_name: "Zidane",
        email: "galactic@realmadrid.com",
        address: "",
        birthdate: "",
        email2: "",
        localid: 5,
        loyalty_member_id: "",
        modified: "",
        phone: "",
        photo: "",
        prefix: "",
        suffix: ""
      };

      actions.next(MyActions.showProfile(customer));
      effects.showProfile$.subscribe(() => {
        expect(navigateSpy).toHaveBeenCalledWith(["customer", customer.loyalty_member_id, 'data']);
      });
    });
  });

  describe("CUSTOMERS_LOADING_FAILED", () => {
    it("should redirect to error page", () => {
      actions.next(MyActions.customersLoadingFailed());
      effects.customerLoadingError$.subscribe(() => {
        expect(navigateSpy).toHaveBeenCalledWith(["/error"]);
      });
    })
  });
});
export function buildCustomer(id: number): Customer {
  return {
    address: "",
    birthdate: "",
    email: "",
    email2: "",
    first_name: "",
    id: id,
    last_name: "",
    localid: id,
    loyalty_member_id: "",
    modified: "",
    phone: "",
    photo: "",
    prefix: "",
    suffix: ""
  };
};
