import { async, ComponentFixture, TestBed, ComponentFixtureAutoDetect } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { reducer, initialState, State } from '../state';
import { Store, StoreModule } from '@ngrx/store';
import { SHOW_PROFILE, showProfile } from '../actions';
import { Customer } from '../models';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MyMaterialsModule } from '../my-materials/my-materials.module';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let store: MockStore<State>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MyMaterialsModule,
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
        loyalty_member_id: "",
        modified: "",
        phone: "",
        photo: "",
        prefix: "",
        suffix: ""
      };

      fixture = TestBed.createComponent(HomeComponent);
      component = fixture.componentInstance;
      component.displayCustomerProfile(customer);

      expect(store.dispatch).toHaveBeenCalledWith(showProfile(customer));
    });
  });
});
