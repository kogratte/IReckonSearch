import { Customer } from './models';

export const SHOW_PROFILE = "SHOW_PROFILE";
export const showProfile = (customer: Customer) => ({ type: SHOW_PROFILE, customer });
export type ShowProfile = {
    type: typeof SHOW_PROFILE,
    customer: Customer
};

export const SEARCH_FINISHED = "SEARCH_FINISHED";
export const searchFinished = (filteredCustomers: Customer[]) => ({ type: SEARCH_FINISHED, filteredCustomers });
export type SearchFinished = {
    type: typeof SEARCH_FINISHED,
    filteredCustomers: Array<Customer>
};

export const PROCESS_SEARCH = "PROCESS_SEARCH";
export const processSearch = (input: string) => ({ type: PROCESS_SEARCH, input: input });
export type ProcessSearch = {
    type: typeof PROCESS_SEARCH,
    input: string
};

export const LOAD_CUSTOMERS = "LOAD_CUSTOMERS";
export const loadCustomers = () => ({ type: LOAD_CUSTOMERS});
export type LoadCustomers = {
    type: typeof LOAD_CUSTOMERS,
};

export const CUSTOMERS_LOADED = "CUSTOMERS_LOADED";
export const customersLoaded = (customers: Array<Customer>) => ({ type: CUSTOMERS_LOADED, customers: customers });
export type CustomersLoaded = {
    type: typeof CUSTOMERS_LOADED,
    customers: Array<Customer>
};

export const CUSTOMERS_LOADING_FAILED = "CUSTOMERS_LOADING_FAILED";
export const customersLoadingFailed = () => ({ type: CUSTOMERS_LOADING_FAILED });
export type CustomerLoadingFailed = {
    type: typeof CUSTOMERS_LOADING_FAILED
};

export type Actions = ShowProfile  
    | ProcessSearch | SearchFinished
    | LoadCustomers | CustomersLoaded | CustomerLoadingFailed;