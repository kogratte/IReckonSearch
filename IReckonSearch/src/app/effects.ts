import { Injectable } from "@angular/core";
import { Actions, Effect, ofType, OnInitEffects } from '@ngrx/effects';
import { map, switchMap, filter, catchError } from 'rxjs/operators';
import { Router, ActivationEnd, ActivatedRouteSnapshot } from '@angular/router';
import { Action, Store } from '@ngrx/store';
import {
    SHOW_PROFILE,
    ShowProfile,
    CustomersLoadingFailed,
    CUSTOMERS_LOADING_FAILED,
    customersLoaded,
    loadCustomers,
    LOAD_CUSTOMERS,
    GoHome,
    GO_HOME,
    CUSTOMER_LOADING_FAILED,
    CustomerLoadingFailed,
    goHome,
    customerLoaded,
    initApp,
    INIT_APP,
    InitApp,
    LoadCustomer,
    LOAD_CUSTOMER,
    customerLoadingFailed
} from './actions';
import { of } from 'rxjs';
import { CustomersService } from './customers.service';
import { AppState } from './state';

@Injectable()
export class AppEffects implements OnInitEffects {
    constructor(
        private actions$: Actions,
        private router: Router,
        private customersService: CustomersService,
        private store: Store<AppState>
    ) {
    }

    // When effects are inited, an initial action is dispatched.
    ngrxOnInitEffects(): Action {
        return initApp();
    };

    @Effect()
    initApp$ = this.actions$.pipe(
        ofType<InitApp>(INIT_APP),
        switchMap(_ => {
            let router$ = this.router.events.pipe(
                filter(event => event instanceof ActivationEnd),
                map((event: ActivationEnd) => event.snapshot),
                //  In a perfect world, we also load specific customer from here, but the path is /data and not the full url
                filter((route: ActivatedRouteSnapshot) => route.routeConfig.path === "home"),
                map(_ => loadCustomers())
            );
            
            router$.subscribe();

            return router$;
        })
    );

    @Effect()
    loadCustomers$ = this.actions$.pipe(
        ofType(LOAD_CUSTOMERS),
        switchMap(() => this.customersService.getAll()),
        switchMap(customers => of(customersLoaded(customers)))
    );

    @Effect({ dispatch: false })
    showProfile$ = this.actions$.pipe(
        ofType<ShowProfile>(SHOW_PROFILE),
        map(x => this.router.navigate(['customer', x.customer.loyalty_member_id, "data"]))
    );

    @Effect({ dispatch: false })
    customersLoadingError$ = this.actions$.pipe(
        ofType<CustomersLoadingFailed>(CUSTOMERS_LOADING_FAILED),
        map(() => this.router.navigate(['/error']))
    );

    @Effect({ dispatch: false })
    goHome$ = this.actions$.pipe(
        ofType<GoHome>(GO_HOME),
        map(() => this.router.navigate(["home"]))
    );

    @Effect()
    customerLoadingFailed$ = this.actions$.pipe(
        ofType<CustomerLoadingFailed>(CUSTOMER_LOADING_FAILED),
        switchMap(() => of(goHome()))
    );

    @Effect()
    loadCustomer$ = this.actions$.pipe(
        ofType<LoadCustomer>(LOAD_CUSTOMER),
        switchMap(_ => this.customersService.get(_.id).pipe(
            map(customer => {
                return customerLoaded(customer);
            }),
            catchError(([err, c]) => {
                return of(customerLoadingFailed());
            })    
        ))
    );
}