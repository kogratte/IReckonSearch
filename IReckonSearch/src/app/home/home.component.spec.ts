import { async, ComponentFixture, TestBed, ComponentFixtureAutoDetect, tick, fakeAsync } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { AppState, reducer, initialState, State } from '../state';
import { Store, StoreModule } from '@ngrx/store';
import { SHOW_PROFILE, processSearch } from '../actions';
import { Customer } from '../models';
import { MatIconModule, MatToolbarModule, MatSortModule, MatPaginatorModule, MatProgressSpinnerModule, MatInputModule, MatTableModule } from '@angular/material';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let store: MockStore<State>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatIconModule,
        MatToolbarModule,
        MatSortModule,
        MatPaginatorModule,
        MatProgressSpinnerModule,
        MatInputModule,
        MatTableModule,
        FormsModule,
        BrowserAnimationsModule,
        HttpClientTestingModule,
        StoreModule.forRoot({ app: reducer })
      ],
      providers: [
        provideMockStore({ initialState }),
        { provide: ComponentFixtureAutoDetect, useValue: true }
      ],
      declarations: [HomeComponent]
    })
      .compileComponents();

    store = TestBed.get(Store);
  }));

  beforeEach(() => {
    spyOn(store, 'dispatch').and.callThrough();
  });

  it('should create', () => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;

    expect(component).toBeTruthy();
  });

  describe("displayCustomerProfile()", () => {
    it('should dispatch a SHOW_PROFILE action when calling displayCustomerProfile', () => {
      const customer: Customer = {
        id: 5,
        first_name: "John",
        last_name: "Doe",
        email: "john.doe@gmail.com",
        address: "",
        birthdate: "",
        email2: "",
        localid: 5,
        loyalti_member_id: "",
        modified: "",
        phone: "",
        photo: "",
        prefix: "",
        suffix: ""
      };

      fixture = TestBed.createComponent(HomeComponent);
      component = fixture.componentInstance;
      component.displayCustomerProfile(customer);

      expect(store.dispatch).toHaveBeenCalledWith({ type: SHOW_PROFILE, customer: customer });
    });
  });
});
