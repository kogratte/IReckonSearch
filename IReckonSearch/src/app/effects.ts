import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from '@ngrx/effects';
import { tap, distinctUntilChanged, filter, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { from } from 'rxjs';
import { Store, select, createSelector } from '@ngrx/store';
import { AppState, State } from './state';
import { Customer } from './models';

@Injectable()
export class AppEffects {
    constructor(
        private actions$: Actions,
        private store: Store<AppState>,
        private router: Router
    ) { }

    @Effect({ dispatch: false })
    redirectToCustomerProfile$ = this.store.select(x => x.app.currentCustomer)
        .pipe(
            distinctUntilChanged(),
            filter(x => x !== undefined),
            tap(customer => {
                this.router.navigate(['/customer/:id', {id: customer.id}]);
            })
        );
}