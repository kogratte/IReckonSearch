import { Component, OnInit, OnDestroy } from '@angular/core';
import { Customer } from '../models';
import { CustomersService } from '../customers.service';
import { filter, map, switchMap, catchError, withLatestFrom } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { of, Observable } from 'rxjs';
import { untilDestroyed } from 'ngx-take-until-destroy';

@Component({
  selector: 'app-customer-data',
  templateUrl: './customer-data.component.html',
  styleUrls: ['./customer-data.component.scss']
})
export class CustomerDataComponent implements OnInit, OnDestroy {
  ngOnDestroy(): void {
  }
  customer$: Observable<Customer>;
  constructor(private customerService: CustomersService, private activeRoute: ActivatedRoute) { }

  ngOnInit() {

    this.customer$ = this.activeRoute.parent.paramMap.pipe(
      map(params => params.get("id")),
      filter(id => !!id),
      switchMap(customerId => this.customerService.get(customerId).pipe(
        untilDestroyed(this),
        catchError((e, c) => {
          return c;
        })
      ))
    );
  }
}
