import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppState } from '../state';
import { Store, select } from '@ngrx/store';
import { Customer } from '../models';
import { showProfile } from '../actions';
import { Observable, BehaviorSubject, Subject } from 'rxjs';
import { filter, map, combineLatest, withLatestFrom, tap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';
import { untilDestroyed } from 'ngx-take-until-destroy';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  isLoading$: Observable<boolean>;
  customers$: Observable<Customer[]>;
  searchInput: Subject<string> = new BehaviorSubject<string>("");

  constructor(private store: Store<AppState>, private snackbar: MatSnackBar) { }

  ngOnDestroy(): void {
  }

  ngOnInit() {
    this.isLoading$ = this.store.select(s => s.app.loading);

    // WTF?
    this.customers$ = this.store.pipe(
      select(s => s.app.customers),
      filter(x => x !== null),
      combineLatest(this.searchInput),
      map(([customers, search]) => {
        return {
          'customers': this.filterCustomers(customers, search),
          'search': search  
        };
      }),
      tap(searchResult => {
        if (searchResult.search && searchResult.search.length > 0 && searchResult.customers && searchResult.customers.length === 0) {
          Promise.resolve().then(() => { // Mandatory to avoid an error...
            this.snackbar.open('No results match your criterias', '', {
              duration: 3000
            });
          });
        }
      }),
      filter(results => results.customers.length > 0),
      map(result => result.customers),
      untilDestroyed(this)
    );
  }

  filterCustomers(customers: Customer[], search: string) {
    if (!search || search.trim().length === 0) {
      return customers;
    }
    var r = new RegExp(`${search}`, 'ig');

    return customers.filter(c => {
      return r.test(c.first_name) == true ||
        r.test(c.last_name) == true ||
        r.test(c.address) == true ||
        r.test(c.email) == true ||
        r.test(c.email2) == true ||
        r.test(c.loyalty_member_id) == true ||
        r.test(c.phone) == true ||
        r.test(c.prefix) == true;
    });
  }

  displayCustomerProfile(customer: Customer) {
    this.store.dispatch(showProfile(customer));
  }

  search(input: string) {
    this.searchInput.next(input);
  }
}
