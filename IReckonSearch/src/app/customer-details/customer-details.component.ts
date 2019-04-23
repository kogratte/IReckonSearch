import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState } from '../state';
import { from, of, Observable, combineLatest, forkJoin } from 'rxjs';
import { filter, map, switchMap, catchError, distinctUntilChanged, withLatestFrom } from 'rxjs/operators';
import { Customer } from '../models';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomersService } from '../customers.service';
@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.scss']
})
export class CustomerDetailsComponent implements OnInit {
  customer$: Observable<Customer>;

  links = [{
    label: "Profile Detail",
    route: "data"
  }, {
    label: "Profile ID's",
    route: 'profileIds'
  }, {
    label: "Activity Timeline",
    route: 'timeline'
  }];
  customersLoaded: boolean;

  constructor(private store: Store<AppState>,
    private customerService: CustomersService,
    private router: Router,
    private activeRoute: ActivatedRoute) { }

  ngOnInit() {

    this.customer$ = this.activeRoute.paramMap.pipe(
      map(params => params.get("id")),
      filter(id => !!id),
      switchMap((customerId) => this.customerService.get(customerId).pipe(catchError((e, c) => {
          this.router.navigate(["/"]);
          throw e;
        })
      )),
      switchMap(customer => {
        return of(customer);
      }),
      catchError((e, c) => {
        return c;
      }));
  }
}
