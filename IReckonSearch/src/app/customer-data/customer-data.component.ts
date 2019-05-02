import { Component, OnInit, OnDestroy } from '@angular/core';
import { Customer } from '../models';
import { Observable } from 'rxjs';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { AppState } from '../state';
import { Store, select } from '@ngrx/store';

@Component({
  selector: 'app-customer-data',
  templateUrl: './customer-data.component.html',
  styleUrls: ['./customer-data.component.scss']
})
export class CustomerDataComponent implements OnInit, OnDestroy {
  ngOnDestroy(): void {
  }
  customer$: Observable<Customer>;
  constructor(private store: Store<AppState>) { }

  ngOnInit() {

    this.customer$ = this.store.pipe(select(s => s.app.currentCustomer),
      untilDestroyed(this));
  }
}
