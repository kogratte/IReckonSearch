import { Actions, SEARCH_FINISHED, CUSTOMERS_LOADED, CUSTOMERS_LOADING_FAILED, LOAD_CUSTOMERS, PROCESS_SEARCH } from './actions';
import { Customer } from './models';

export type AppState = {
    app: State;
};

export type State = {
    searchInput: string;
    loading: boolean;
    customers: Customer[],
    filteredCustomers: Customer[]
};

export const initialState: State = {
    searchInput: "",
    loading: true,
    customers: [],
    filteredCustomers: []
};

export function reducer(state: State = initialState, action: Actions): State {
    switch (action.type) {
        case LOAD_CUSTOMERS:
            return {
                ...state,
                loading: true
            };

        case CUSTOMERS_LOADED:
            return {
                ...state,
                loading: false,
                customers: action.customers,
                filteredCustomers: action.customers
            };

        case CUSTOMERS_LOADING_FAILED:
            return {
                ...state,
                loading: false
            };

        case PROCESS_SEARCH:
            return {
                ...state,
                loading: true,
                searchInput: action.input
            };

        case SEARCH_FINISHED:
            return {
                ...state,
                loading: false,
                filteredCustomers: action.filteredCustomers
            };

        default:
            return state;
    }
};