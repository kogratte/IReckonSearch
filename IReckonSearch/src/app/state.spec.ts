import {  reducer, initialState } from './state';
import { SHOW_PROFILE } from './actions';
import { Customer } from './models';


describe('Reducers', () => {

    describe("Unknown action", () => {
        it("should let the initial state identical", () => {
            const action = { type: 'UNKNOWN' } as any;
            var currentState = reducer(initialState, action);

            expect(currentState).toBe(initialState);
        });
    });

    describe("SHOW_PROFILE", () => {
        it("should update the current displayed user in state", () => {
            const customer: Customer = {
                id: 5,
                firstName: "Will",
                lastName: "Smith",
                email: "willsmithemail@yopmail.com"
            };
            const action = { type: SHOW_PROFILE, customer: customer } as any;
            var currentState = reducer(initialState, action);

            expect(currentState).toEqual({
                currentCustomer: customer
            });
        });
    });
});
