import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatSort, MatPaginator, MatTableDataSource } from '@angular/material';
import { Customer } from '../models';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../state';
import { showProfile } from '../actions';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
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

    this.customers$.subscribe(customers => {
      this.dataSource.data = customers;
    });
  }

  showProfile(customer: Customer) {
    this.store.dispatch(showProfile(customer));
  }
}
