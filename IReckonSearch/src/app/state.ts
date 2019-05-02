import {
    Actions,
    CUSTOMERS_LOADED, CUSTOMERS_LOADING_FAILED, LOAD_CUSTOMERS,
    CUSTOMER_LOADED,
    GO_HOME
} from './actions';
import { Customer } from './models';

export type AppState = {
    app: State;
};

export type State = {
    searchInput: string;
    loading: boolean;
    customers: Customer[],
    currentCustomer: Customer | undefined
};

export const initialState: State = {
    searchInput: "",
    loading: false,
    customers: [],
    currentCustomer: undefined
};

export function reducer(state: State = initialState, action: Actions): State {
    // Each action impact the state, but sometimes, it just trigger a side effect!
    switch (action.type) {
        case GO_HOME: return {
            ...state,
            currentCustomer: undefined
        };

        case LOAD_CUSTOMERS:
            return {
                ...state,
                loading: true,
                currentCustomer: undefined
            };

        case CUSTOMERS_LOADED:
            return {
                ...state,
                loading: false,
                customers: action.customers
            };

        case CUSTOMERS_LOADING_FAILED:
            return {
                ...state,
                loading: false,
                customers: []
            };

        case CUSTOMER_LOADED: return {
            ...state,
            currentCustomer: action.customer
        };

        default:
            return state;
    }
};