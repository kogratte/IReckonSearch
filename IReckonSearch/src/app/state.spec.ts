import { reducer, initialState } from './state';
import {
    loadCustomers,
    customersLoadingFailed,
    Actions
} from './actions';


describe('Reducers', () => {
    describe("Unknown action", () => {
        it("should let the initial state identical", () => {
            const action = { type: 'UNKNOWN' } as any;
            var currentState = reducer(initialState, action);

            expect(currentState).toBe(initialState);
        });
    });

    describe("Loading actions", () => {
        describe("LOAD_CUSTOMERS", () => {
            it("should set the loading flag", () => {
                const _initState = { ...initialState, loading: false };

                var currentState = reducer(_initState, loadCustomers() as Actions);

                expect(currentState.loading).toBeTruthy();
            });
        });

        describe("CUSTOMER_LOADING_FAILED", () => {
            it("should reset the loading flag", () => {
                const _initState = { ...initialState, loading: true };

                var currentState = reducer(_initState, customersLoadingFailed() as Actions);

                expect(currentState.loading).toBeFalsy();
                expect(currentState.customers).toEqual([]);
                expect(currentState.filteredCustomers).toEqual([]);
            });
        });
    });
});

