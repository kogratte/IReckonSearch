import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Customer } from './models';
import { HttpClient } from '@angular/common/http';
import { switchMap, catchError, map, distinctUntilChanged } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AppState } from './state';
import { customersLoadingFailed } from './actions';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {

  private customersUri: string = "https://profiles-list.firebaseio.com/Data.json";
  private customers$: Observable<Customer[]>;

  constructor(private httpClient: HttpClient, private store: Store<AppState>,
    private router: Router) { }

  loadCustomers(): Observable<any> {
    if (this.customers$) return this.customers$;

    this.customers$ = this.httpClient.get<Customer[]>(this.customersUri).pipe(
      switchMap(customers => {
        if (customers == null) {
          throw new Error("Invalid response");
        }
        return of(customers);
      }),
      catchError((e, c) => {
        this.store.dispatch(customersLoadingFailed());
        return c;
      })
    );

    return this.customers$;
  }
  getAll(): Observable<Customer[]> {
    //   return of([
    //     {
    //         id: 5,
    //         photo: "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/942d604e-8250-4a97-8623-b60bf03c9578/d9yv4ua-e217e423-50b0-455d-9613-40eef4ddf75c.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzk0MmQ2MDRlLTgyNTAtNGE5Ny04NjIzLWI2MGJmMDNjOTU3OFwvZDl5djR1YS1lMjE3ZTQyMy01MGIwLTQ1NWQtOTYxMy00MGVlZjRkZGY3NWMucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.CfFoi10AdMHPZSwSUBPp5SPbtpLqL7JjNrrpMPPnbl8",
    //         address: "31 rue des bourleux",
    //         birthdate: "1987-12-04",
    //         email: "nicolas.issalene@gmail.com",
    //         email2: "nicolas.issalene@daveo.fr",
    //         first_name: "Nicolas",
    //         last_name: "Issalene",
    //         localid: 4,
    //         loyalti_member_id: "toto",
    //         modified: "",
    //         phone: "",
    //         prefix: "",
    //         suffix: ""
    //     },

    //     {
    //         photo: "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/942d604e-8250-4a97-8623-b60bf03c9578/d9yv4ua-e217e423-50b0-455d-9613-40eef4ddf75c.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzk0MmQ2MDRlLTgyNTAtNGE5Ny04NjIzLWI2MGJmMDNjOTU3OFwvZDl5djR1YS1lMjE3ZTQyMy01MGIwLTQ1NWQtOTYxMy00MGVlZjRkZGY3NWMucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.CfFoi10AdMHPZSwSUBPp5SPbtpLqL7JjNrrpMPPnbl8",
    //         address: "32 rue des bourleux",
    //         birthdate: "1987-12-05",
    //         email: "manu@gmail.com",
    //         email2: "manu@daveo.fr",
    //         first_name: "Manuel",
    //         last_name: "Dos santos",
    //         localid: 4,
    //         loyalti_member_id: "toto5",
    //         id: 4,
    //         modified: "",
    //         phone: "",
    //         prefix: "",
    //         suffix: ""
    //     }
    // ]);

    return this.loadCustomers();
  }

  get(loyalty_member_id: string): Observable<Customer> {
    return this.getAll().pipe(
      distinctUntilChanged(),
      map(customers => customers.filter(customer => customer.loyalty_member_id.toString() === loyalty_member_id)),
      switchMap(customers => {
        if (customers.length !== 1) {
          throw new Error("Customer not found");
        }
        return of(customers[0]);
      })
    );
  }
}
