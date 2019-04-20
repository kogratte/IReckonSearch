import { Customer } from './models';

export const SHOW_PROFILE = "SHOW_PROFILE";
export const showProfile = (customer: Customer) => ({ type: SHOW_PROFILE, customer });
export type ShowProfile = {
    type: typeof SHOW_PROFILE;
    customer: Customer;
};

export type Actions = ShowProfile;