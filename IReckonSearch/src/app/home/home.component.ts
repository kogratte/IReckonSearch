import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppState } from '../state';
import { Store, select } from '@ngrx/store';
import { Customer } from '../models';
import { showProfile } from '../actions';
import { Observable, BehaviorSubject, Subject } from 'rxjs';
import { filter, map, combineLatest, withLatestFrom } from 'rxjs/operators';
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

    this.customers$ = this.store.pipe(
      select(s => s.app.customers),
      filter(x => x !== null),
      combineLatest(this.searchInput),
      untilDestroyed(this),
      map(([customers, search]) => this.filterCustomers(customers, search)),
      withLatestFrom(this.searchInput),
      map(([results, search]) => {
        if (search && search.length > 0) {
          this.handleSearchResults(results);
        }

        return results;
      }),
      filter(results => results.length > 0)
    );    
  }

  handleSearchResults(results: Customer[]): Customer[] {
    if (results.length === 0) {
      Promise.resolve().then(() => { 
        this.snackbar.open('No results match your criterias', '', {
          duration: 3000
        });  
       });
    }

    return results;
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
