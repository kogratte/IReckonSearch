import { Component, OnInit, OnDestroy } from '@angular/core';
import {  Observable } from 'rxjs';
import { filter, map, switchMap, catchError } from 'rxjs/operators';
import { Customer } from '../models';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomersService } from '../customers.service';
import { untilDestroyed } from 'ngx-take-until-destroy';

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.scss']
})
export class CustomerDetailsComponent implements OnInit, OnDestroy {
  ngOnDestroy(): void {
  }
  customer$: Observable<Customer>;
  customer: Customer;

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

  constructor(private customerService: CustomersService,
    private router: Router,
    private activeRoute: ActivatedRoute) { }

  ngOnInit() {
    this.customer$ = this.activeRoute.paramMap.pipe(
      map(params => params.get("id")),
      filter(id => !!id),
      switchMap(customerId => this.customerService.get(customerId).pipe(
        untilDestroyed(this),
        catchError((e, c) => {
          this.router.navigate(["/"]);
          throw e;
        })
      ))
    );
    this.customer$.subscribe(customer => this.customer = customer);
  }
}
