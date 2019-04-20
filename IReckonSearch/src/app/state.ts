import { Actions, SHOW_PROFILE } from './actions';
import { Customer } from './models';

export type AppState = {
    app: State;
};

export type State = {
    currentCustomer: Customer | undefined;
};

export const initialState: State = {
        currentCustomer: undefined
};

export function reducer(state: State = initialState, action: Actions): State {
    switch (action.type) {
        case SHOW_PROFILE:
            return {
                ...state,
                currentCustomer: action.customer
            };
        default:
            return state;
    }
};