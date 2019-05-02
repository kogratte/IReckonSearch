import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';
import { Customer } from '../models';
import { ActivatedRoute } from '@angular/router';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { loadCustomer } from '../actions';
import { AppState } from '../state';
import { Store, select } from '@ngrx/store';

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

  constructor(private activeRoute: ActivatedRoute, private store: Store<AppState>) { 
      this.activeRoute.paramMap.pipe(
        map(params => params.get("id")),
        filter(id => !!id),
        tap(id => { 
          this.store.dispatch(loadCustomer(id));
      })).subscribe();
    }

  ngOnInit() {
    this.customer$ = this.store.pipe(
      select(s => s.app.currentCustomer),
      untilDestroyed(this)
    );
  }
}
