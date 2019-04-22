import { Injectable } from "@angular/core";
import { Actions, Effect, ofType, OnInitEffects } from '@ngrx/effects';
import { filter, map, switchMap, withLatestFrom, startWith, } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Store, Action, select } from '@ngrx/store';
import { AppState } from './state';
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
    processSearch
} from './actions';
import { of } from 'rxjs';
import { Customer } from './models';
import { HttpClient } from '@angular/common/http';

export const customersUri = "https://profiles-list.firebaseio.com/Data.json";

@Injectable()
export class AppEffects implements OnInitEffects {
    constructor(
        private actions$: Actions,
        private store: Store<AppState>,
        private router: Router,
        private httpClient: HttpClient
    ) { }

    ngrxOnInitEffects(): Action {
        return loadCustomers();
    };

    @Effect()
    loadCustomers$ = this.actions$.pipe(
        ofType(LOAD_CUSTOMERS),
        switchMap(() => this.httpClient.get<Array<Customer>>(customersUri)),
        map(customers => customersLoaded(customers))
    );

    @Effect({ dispatch: false })
    showProfile$ = this.actions$.pipe(
        ofType<ShowProfile>(SHOW_PROFILE),
        switchMap(x => of(this.router.navigate(['/customer/:id', { id: x.customer.id }])))
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
        switchMap(() => of(this.router.navigate(['/error'])))
    );

    @Effect()
    searching$ = this.actions$.pipe(
        ofType<ProcessSearch>(PROCESS_SEARCH),
        switchMap((x) => x.input),
        withLatestFrom(this.store.pipe(select((s: AppState) => s.app.customers))),
        switchMap(([input, rawCustomers]) => {
            if (input.trim().length === 0 || rawCustomers.length === 0) {
                return of(rawCustomers);
            }
            var r = new RegExp(`${input}`, 'ig');
            const filteredCustomers = rawCustomers.filter(c => {
                return r.test(c.first_name) == true;
            });

            return of(filteredCustomers);
        }),
        switchMap(filteredCustomers => {
            return of(searchFinished(filteredCustomers));
        })
    )
}