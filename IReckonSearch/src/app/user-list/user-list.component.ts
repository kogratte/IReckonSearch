import { Component, OnInit, ViewChild, Input, OnDestroy } from '@angular/core';
import { MatSort, MatPaginator, MatTableDataSource } from '@angular/material';
import { Customer } from '../models';
import { Store } from '@ngrx/store';
import { AppState } from '../state';
import { showProfile } from '../actions';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { untilDestroyed } from 'ngx-take-until-destroy';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit, OnDestroy {
  ngOnDestroy(): void {
  }
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  
  @Input("customers")
  customers$: Observable<Customer[]>;
  
  dataSource: MatTableDataSource<Customer>;

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
  
  constructor(private store:Store<AppState>) { }

  ngOnInit() {
    this.dataSource = new MatTableDataSource(new Array<Customer>());
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.customers$.pipe(
      map(x => {
        this.dataSource.data = x;
      }),
      untilDestroyed(this)
    ).subscribe();
  }

  showProfile(customer: Customer) {
    this.store.dispatch(showProfile(customer));
  }
}
