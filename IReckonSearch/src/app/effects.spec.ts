import { TestBed } from '@angular/core/testing';
import { Observable, empty } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import * as MyActions from './actions';
import * as MyEffects from './effects';
import { Customer } from './models';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { cold, hot } from 'jasmine-marbles';
import { Router } from '@angular/router';
import { AppModule } from './app.module';
import { APP_BASE_HREF } from '@angular/common';
import { AppState, initialState, reducer } from './state';
import { Store, StoreModule } from '@ngrx/store';

describe('App effects', () => {
    let effects: MyEffects.AppEffects;
    let actions: Observable<any>;
    let router: Router;
    let store: Store<AppState>;
    let navigateSpy: any;
    
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [
          RouterTestingModule.withRoutes([]),
          AppModule,
          StoreModule.forRoot({ app: reducer })
        ],
        providers: [
          MyEffects.AppEffects,
          provideMockActions(() => actions),
          {provide: APP_BASE_HREF, useValue: '/'}
        ]
      });

      store = TestBed.get(Store);
      effects = TestBed.get(MyEffects.AppEffects);
      router = TestBed.get(Router);
      navigateSpy = spyOn(router, 'navigate');
      navigateSpy.calls.reset();
    });
  
    it('should redirect on customer profile page if currentCustomer is updated in state', () => {
 
      const customer: Customer = {
        id: 4,
        firstName: "Zinedine",
        lastName: "Zidane",
        email: "galactic@realmadrid.com"
      };

      store.dispatch(MyActions.showProfile(customer));
      effects.redirectToCustomerProfile$.subscribe(() => {
        expect(navigateSpy).toHaveBeenCalledWith(["/customer/:id", { id: customer.id }]);
      });
    });
  });