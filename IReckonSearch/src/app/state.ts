import { Actions, SEARCH_FINISHED, CUSTOMERS_LOADED, CUSTOMERS_LOADING_FAILED, LOAD_CUSTOMERS, PROCESS_SEARCH, customersLoaded, NO_SEARCH_RESULT, SHOW_PROFILE } from './actions';
import { Customer } from './models';

export type AppState = {
    app: State;
};

export type State = {
    searchInput: string;
    loading: boolean;
    customers: Customer[],
    filteredCustomers: Customer[],
    customersLoaded: boolean,
    searchFailed: boolean,
    currentCustomer: Customer | undefined
};

export const initialState: State = {
    searchInput: "",
    loading: false,
    customers: [],
    filteredCustomers: [],
    customersLoaded: false,
    searchFailed: false,
    currentCustomer: undefined
};

export function reducer(state: State = initialState, action: Actions): State {
    switch (action.type) {
        case LOAD_CUSTOMERS:
            return {
                ...state,
                loading: true
            };

            case SHOW_PROFILE:
            return {
                ...state,
                currentCustomer: action.customer
            };

        case CUSTOMERS_LOADED:
            return {
                ...state,
                loading: false,
                customers: action.customers,
                filteredCustomers: action.customers,
                customersLoaded: true
            };

        case CUSTOMERS_LOADING_FAILED:
            return {
                ...state,
                loading: false,
                customers: [],
                filteredCustomers: []
            };

        case PROCESS_SEARCH:
            return {
                ...state,
                loading: true,
                searchInput: action.input,
                searchFailed: false
            };

        case SEARCH_FINISHED:
            return {
                ...state,
                loading: false,
                filteredCustomers: action.filteredCustomers
            };

            case NO_SEARCH_RESULT:
            return {
                ...state,
              loading: false,
              searchFailed: true
            };

        default:
            return state;
    }
};