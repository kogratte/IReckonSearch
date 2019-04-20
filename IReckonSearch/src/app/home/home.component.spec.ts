import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { AppState, reducer } from '../state';
import { Store, StoreModule } from '@ngrx/store';
import { SHOW_PROFILE } from '../actions';
import { Customer } from '../models';
import { MatIconModule, MatToolbarModule } from '@angular/material';
import {  MockStore } from '@ngrx/store/testing';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let store: MockStore<AppState>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatIconModule,
        MatToolbarModule,
        StoreModule.forRoot({ app: reducer })
      ],
      providers: [
      ],
      declarations: [HomeComponent]
    })
      .compileComponents();

      store = TestBed.get(Store);
  }));

  beforeEach(() => {
    spyOn(store, 'dispatch').and.callThrough();
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should use an h1 with "Profiles" title', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Profiles');
  });

  it('should dispatch a DisplayProfile action when calling showProfile', () => {
    const customer: Customer = {
      id: 5,
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@gmail.com"
    };

    component.displayCustomerProfile(customer);

    expect(store.dispatch).toHaveBeenCalledWith({ type: SHOW_PROFILE, customer: customer });
  });
});
