import { Component, OnInit } from '@angular/core';
import { AppState } from '../state';
import { Store, select } from '@ngrx/store';
import { Customer } from '../models';
import { showProfile, processSearch } from '../actions';
import { Observable } from 'rxjs';
import { filter, distinctUntilChanged, map } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  isLoading$: Observable<boolean>;
  customers$: Observable<Customer[]>;

  constructor(private store: Store<AppState>, private snackbar: MatSnackBar) { }

  ngOnInit() {
    this.isLoading$ = this.store.select(s => s.app.loading);

    this.customers$ = this.store.pipe(
      select(s => s.app.filteredCustomers),
      filter(x => x !== null)
    );

    this.store.pipe(
      select(s => s.app.searchFailed),
      distinctUntilChanged(),
      map(searchFailed => {
        if (searchFailed) {
          this.snackbar.open('No results match your criterias', '', {
            duration: 3000
          });
        }
      })
    ).subscribe();
  }

  displayCustomerProfile(customer: Customer) {
    this.store.dispatch(showProfile(customer));
  }

  search(input) {
    this.store.dispatch(processSearch(input));
  }
}
