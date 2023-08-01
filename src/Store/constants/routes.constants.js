
// ############################################################## INTERNAL ROUTES ##############################################################

export const ROUTE_HOME = "/";
export const ROUTE_LOGIN = "/login";
export const ROUTE_REGISTER = "/register";

export const ROUTE_WALLET = "/wallet";
export const ROUTE_PROFILE = "/profile";
export const ROUTE_SEARCH = "/search";
export const ROUTE_SEARCH_QUERY = "/search/:query";
export const ROUTE_RIDES = "/rides";
export const ROUTE_RIDE_DETAILS = "/rides/:id";
export const ROUTE_RIDE_PUBLISH = "/rides/publish";

export const ROUTE_ABOUT_US = "/about-us";
export const ROUTE_PRIVACY_POLICY = "/privacy-policy";
export const ROUTE_TERMS_AND_CODITIONS = "/terms-and-conditions";

/* ############################################################## API ENDPOINT ROUTES ############################################################## */

export const API_ENDPOINT = process.env.NODE_ENV === 'production' ? process.env.REACT_APP_API_ENDPOINT : `http://localhost:8080`;
export const API_REGISTER = `${API_ENDPOINT}/register`;
export const API_LOGIN = `${API_ENDPOINT}/login`;
export const API_USERS = `${API_ENDPOINT}/users`;
export const API_GENERATE_OTP = `${API_ENDPOINT}/generate-otp`;
export const API_VALIDATE_OTP = `${API_ENDPOINT}/validate-otp`;

// Payment Stuff
export const API_PAYMENT_CREATE = `${API_ENDPOINT}/payment/create`;
export const API_PAYMENT_VALIDATE = `${API_ENDPOINT}/payment/validate`;
export const API_CHECKOUT_SCRIPT = `https://checkout.razorpay.com/v1/checkout.js`;