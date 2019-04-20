import { Injectable } from "@angular/core";
import { Actions, Effect } from '@ngrx/effects';
import { tap, distinctUntilChanged, filter } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from './state';

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