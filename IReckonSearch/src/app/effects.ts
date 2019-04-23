import { Injectable } from "@angular/core";
import { Actions, Effect, ofType, OnInitEffects } from '@ngrx/effects';
import { filter, map, switchMap, withLatestFrom } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Action, Store, select } from '@ngrx/store';
import {
    SHOW_PROFILE,
    ShowProfile,
    CustomerLoadingFailed,
    CUSTOMERS_LOADING_FAILED,
    customersLoaded,
    loadCustomers,
    LOAD_CUSTOMERS,
    GoHome,
    GO_HOME
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

    ngrxOnInitEffects(): Action {
        return loadCustomers();
    };

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
    customerLoadingError$ = this.actions$.pipe(
        ofType<CustomerLoadingFailed>(CUSTOMERS_LOADING_FAILED),
        map(() => this.router.navigate(['/error']))
    );

    @Effect({ dispatch: false })
    goHome$ = this.actions$.pipe(
        ofType<GoHome>(GO_HOME),
        map(() => this.router.navigate(["home"]))
    )
}