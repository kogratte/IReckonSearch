import { Component, OnInit } from '@angular/core';
import { AppState } from '../state';
import { Store } from '@ngrx/store';
import { Customer } from '../models';
import { showProfile } from '../actions';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
  }

  displayCustomerProfile(customer: Customer) {
    this.store.dispatch(showProfile(customer));
  }
}
