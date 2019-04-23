import { Injectable } from "@angular/core";
import { Actions, Effect, ofType, OnInitEffects } from '@ngrx/effects';
import { filter, map, switchMap, withLatestFrom } from 'rxjs/operators';
import { Router } from '@angular/router';
import {  Action } from '@ngrx/store';
import {
    searchFinished, SEARCH_FINISHED,
    ProcessSearch,
    PROCESS_SEARCH,
    SHOW_PROFILE,
    ShowProfile,
    CustomerLoadingFailed,
    CUSTOMERS_LOADING_FAILED,
    customersLoaded,
    loadCustomers,
    LOAD_CUSTOMERS,
    noSearchResult,
    GoHome,
    GO_HOME
} from './actions';
import { of } from 'rxjs';
import { CustomersService } from './customers.service';

@Injectable()
export class AppEffects implements OnInitEffects {
    constructor(
        private actions$: Actions,
        private router: Router,
        private customersService: CustomersService
    ) { }

    ngrxOnInitEffects(): Action {
        return loadCustomers();
    };

    @Effect()
    loadCustomers$ = this.actions$.pipe(
        ofType(LOAD_CUSTOMERS),
        switchMap(() => this.customersService.getAll()),
        switchMap(customers => {
            return of(customersLoaded(customers));
        })
    );

    @Effect({ dispatch: false })
    showProfile$ = this.actions$.pipe(
        ofType<ShowProfile>(SHOW_PROFILE),
        map(x => {
            this.router.navigate(['customer', x.customer.loyalty_member_id, "data"]);
        })
    );

    @Effect({ dispatch: false })
    logSearchResult$ = this.actions$.pipe(
        ofType(SEARCH_FINISHED),
        filter(x => !!x),
        map(results => {
            console.log("Search results", results);
        })
    )

    @Effect({ dispatch: false })
    customerLoadingError$ = this.actions$.pipe(
        ofType<CustomerLoadingFailed>(CUSTOMERS_LOADING_FAILED),
        map(() => this.router.navigate(['/error']))
    );

    @Effect()
    searching$ = this.actions$.pipe(
        ofType<ProcessSearch>(PROCESS_SEARCH),
        switchMap((x) => of(x.input)),
        withLatestFrom(this.customersService.getAll()),
        switchMap(([input, rawCustomers]) => this.customersService.filter(rawCustomers, input)),
        switchMap(filteredCustomers => {
            if (filteredCustomers.length === 0) {
                return of(noSearchResult());
            }
            return of(searchFinished(filteredCustomers))
        })
    );

    // @Effect({dispatch: false})
    // redirectToNoResultPage$ = this.actions$.pipe(
    //     ofType<NoSearchResult>(NO_SEARCH_RESULT),
    //     map(() => {
    //         this.router.navigate(["no-results"]);
    //     })
    // )

    @Effect({dispatch: false})
    goHome$ = this.actions$.pipe(
        ofType<GoHome>(GO_HOME),
        map(() => {
            this.router.navigate(["home"]);
        })
    )
}