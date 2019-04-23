import { Component, OnInit } from '@angular/core';
import { AppState } from '../state';
import { Store } from '@ngrx/store';
import { goHome } from '../actions';

@Component({
  selector: 'app-no-result',
  templateUrl: './no-result.component.html',
  styleUrls: ['./no-result.component.scss']
})
export class NoResultComponent implements OnInit {

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
  }

  goHome() {
    this.store.dispatch(goHome());
  }
}
