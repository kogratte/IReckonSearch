import { Component, OnInit, ViewChild } from '@angular/core';
import { AppState } from '../state';
import { Store, select } from '@ngrx/store';
import { Customer } from '../models';
import { showProfile, processSearch } from '../actions';
import { Observable } from 'rxjs';
import { MatSort, MatTableDataSource, MatPaginator } from '@angular/material';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  searchInput: string;
  isLoading$: Observable<boolean>;
  customers$: Observable<Customer[]>;

  displayedColumns = [
    "photo",
    "localid",
    "email",
    "first_name",
    "phone",
    "address",
    "modified",
    "links"
  ];

  constructor(private store: Store<AppState>) { }

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  dataSource: MatTableDataSource<Customer>;

  ngOnInit() {
    this.isLoading$ = this.store.select(s => s.app.loading);
    this.dataSource = new MatTableDataSource(new Array<Customer>());
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    
    var subscribtion = this.store.pipe(
      select(s => s.app.searchInput),
      map(i => {
        this.searchInput = i;
        subscribtion.unsubscribe();
      })
    ).subscribe();

    this.store.pipe(
      select(s => s.app.filteredCustomers),
      filter(x => x !== null),
      map(x => this.dataSource.data = x)
    ).subscribe();
  }

  displayCustomerProfile(customer: Customer) {
    this.store.dispatch(showProfile(customer));
  }

  search() {
    this.store.dispatch(processSearch(this.searchInput));
  }
}
