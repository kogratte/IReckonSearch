import { Customer } from './models';

export const SHOW_PROFILE = "SHOW_PROFILE";
export const showProfile = (customer: Customer) => ({ type: SHOW_PROFILE, customer });
export type ShowProfile = {
    type: typeof SHOW_PROFILE,
    customer: Customer
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

export const GO_HOME = "GO_HOME";
export const goHome = () => ({ type: GO_HOME });
export type GoHome = {
    type: typeof GO_HOME
};

export type Actions = ShowProfile  
    | LoadCustomers | CustomersLoaded | CustomerLoadingFailed
    | GoHome;