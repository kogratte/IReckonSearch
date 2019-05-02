import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Customer } from './models';
import { HttpClient } from '@angular/common/http';
import { switchMap, catchError, map, distinctUntilChanged } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AppState } from './state';
import { customersLoadingFailed } from './actions';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {

  private customersUri: string = "https://profiles-list.firebaseio.com/Data.json";
  private customers$: Observable<Customer[]>;

  constructor(private httpClient: HttpClient, private store: Store<AppState>,
    private router: Router) { }

  loadCustomers(): Observable<any> {
    if (this.customers$) return this.customers$;

    this.customers$ = this.httpClient.get<Customer[]>(this.customersUri).pipe(
      switchMap(customers => {
        if (customers == null) {
          throw new Error("Invalid response");
        }
        return of(customers);
      }),
      catchError((e, c) => {
        this.store.dispatch(customersLoadingFailed());
        return c;
      })
    );

    return this.customers$;
  }
  getAll(): Observable<Customer[]> {
    return this.loadCustomers();
  }

  customersObservables: Object = {};

  get(loyalty_member_id: string): Observable<Customer> {
    if (this.customersObservables[loyalty_member_id] === undefined) {
      this.customersObservables[loyalty_member_id] = this.getAll().pipe(
        distinctUntilChanged(),
        map(customers => customers.filter(customer => customer.loyalty_member_id.toString() === loyalty_member_id)),
        switchMap(customers => {
          if (customers.length !== 1) {
            throw new Error("Customer not found");
          }
          return of(customers[0]);
        })
      );
    }
    return this.customersObservables[loyalty_member_id];
  }
}
