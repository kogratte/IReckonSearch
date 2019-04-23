import { Actions, CUSTOMERS_LOADED, CUSTOMERS_LOADING_FAILED, LOAD_CUSTOMERS, 
    SHOW_PROFILE } from './actions';
import { Customer } from './models';

export type AppState = {
    app: State;
};

export type State = {
    searchInput: string;
    loading: boolean;
    customers: Customer[],
};

export const initialState: State = {
    searchInput: "",
    loading: false,
    customers: [],
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
                customers: action.customers
            };

        case CUSTOMERS_LOADING_FAILED:
            return {
                ...state,
                loading: false,
                customers: []
            };

        default:
            return state;
    }
};