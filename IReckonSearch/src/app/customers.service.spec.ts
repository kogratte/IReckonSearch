import { TestBed } from '@angular/core/testing';

import { CustomersService } from './customers.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { initialState } from './state';
import { RouterModule } from '@angular/router';

describe('CustomersService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      provideMockStore({ initialState }),
      
    ],
    imports: [
      HttpClientTestingModule,
      RouterModule.forRoot([])
    ]
  }));

  it('should be created', () => {
    const service: CustomersService = TestBed.get(CustomersService);
    expect(service).toBeTruthy();
  });
});
