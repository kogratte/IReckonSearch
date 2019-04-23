import { Component, OnInit, Input } from '@angular/core';
import { Customer } from '../models';
import { CustomersService } from '../customers.service';
import { filter, map, switchMap, catchError } from 'rxjs/operators';
import { Action } from 'rxjs/internal/scheduler/Action';
import { ActivatedRoute, Router } from '@angular/router';
import { of, Observable } from 'rxjs';

@Component({
  selector: 'app-customer-data',
  templateUrl: './customer-data.component.html',
  styleUrls: ['./customer-data.component.scss']
})
export class CustomerDataComponent implements OnInit {
  customer:Customer;
  constructor(private customerService: CustomersService, private activeRoute: ActivatedRoute, private router:Router) { }

  ngOnInit() {
    this.activeRoute.parent.paramMap.pipe(
      map(params => params.get("id")),
      filter(id => !!id),
      switchMap((customerId) => this.customerService.get(customerId)),
      switchMap(customer => of(customer)),
      catchError((e, c) => {
        return c;
      })).subscribe(customer => this.customer = customer);
  }
}
