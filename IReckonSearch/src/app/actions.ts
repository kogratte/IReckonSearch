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
export type CustomersLoadingFailed = {
    type: typeof CUSTOMERS_LOADING_FAILED
};

export const GO_HOME = "GO_HOME";
export const goHome = () => ({ type: GO_HOME });
export type GoHome = {
    type: typeof GO_HOME
};

export const CUSTOMER_LOADING_FAILED = "CUSTOMER_LOADING_FAILED";
export const customerLoadingFailed = () => ({ type: CUSTOMER_LOADING_FAILED });
export type CustomerLoadingFailed = {
    type: typeof CUSTOMER_LOADING_FAILED
};

export const LOAD_CUSTOMER = "LOAD_CUSTOMER";
export const loadCustomer = (id: string) => ({ type: LOAD_CUSTOMER, id });
export type LoadCustomer = {
    type: typeof LOAD_CUSTOMER,
    id: string
};

export const CUSTOMER_LOADED = "CUSTOMER_LOADED";
export const customerLoaded = (customer: Customer) => ({ type: CUSTOMER_LOADED, customer });
export type CustomerLoaded = {
    type: typeof CUSTOMER_LOADED,
    customer: Customer
};

export const ROUTE_CHANGE = "ROUTE_CHANGE";
export const routeChanged = (params: any, path: string) => ({ type: ROUTE_CHANGE, params, path });
export type RouteChanged = {
    type: typeof ROUTE_CHANGE,
    params: any,
    path: string
};

export const INIT_APP = "INIT_APP";
export const initApp = () => ({ type: INIT_APP });
export type InitApp = {
    type: typeof INIT_APP
};


export type Actions = InitApp | ShowProfile  
    | LoadCustomers | CustomersLoaded | CustomersLoadingFailed | CustomerLoadingFailed
    | GoHome | RouteChanged | LoadCustomer | CustomerLoaded;