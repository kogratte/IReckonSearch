import { reducer, initialState } from './state';
import {
    loadCustomers,
    customersLoaded,
    customersLoadingFailed,
    processSearch,
    Actions
} from './actions';
import { buildCustomer } from './effects.spec';


describe('Reducers', () => {
    describe("Unknown action", () => {
        it("should let the initial state identical", () => {
            const action = { type: 'UNKNOWN' } as any;
            var currentState = reducer(initialState, action);

            expect(currentState).toBe(initialState);
        });
    });
    describe("Search actions", () => {
        describe("PROCESS_SEARCH", () => {
            it("should set the loading flag", () => {
                const _initState = { ...initialState, loading: false };

                var currentState = reducer(_initState, processSearch("this is my research") as Actions);
                expect(currentState.loading).toBeTruthy();
                expect(currentState.searchInput).toEqual("this is my research");
            });
        });

        describe("SEARCH_FINISHED", () => {
            it("should reset the loading flag", () => {
                const _initState = {
                    ...initialState,
                    loading: true,
                    filteredCustomers: []
                };
                const stubedCustomers = [
                    buildCustomer(5)
                ];

                var currentState = reducer(_initState, customersLoaded(stubedCustomers) as Actions);

                expect(currentState.loading).toBeFalsy();
            });
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

