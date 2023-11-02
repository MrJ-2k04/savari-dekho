
// ############################################################## APP ROUTES ##############################################################

// For Everyone
export const ROUTE_HOME = "/";
export const ROUTE_RESET_PASSWORD = "/reset-password";
export const ROUTE_RESET_PASSWORD_PAGE = "/reset-password/:userId";
export const ROUTE_USER_DETAILS = "/users/:userId";
export const ROUTE_SEARCH = "/search";
export const ROUTE_SEARCH_RESULT = "/search/results/:query";
export const ROUTE_RIDE_DETAILS = "/rides/:rideId";
export const ROUTE_RIDE_EDIT = "/rides/:rideId/edit";

export const ROUTE_ABOUT_US = "/about-us";
export const ROUTE_PRIVACY_POLICY = "/privacy-policy";
export const ROUTE_TERMS_AND_CODITIONS = "/terms-and-conditions";

// For Registered Users
export const ROUTE_WALLET = "/wallet";
export const ROUTE_PROFILE_DASHBOARD = "/profile";
export const ROUTE_RIDES = "/rides";
export const ROUTE_BANK = "/bank";
export const ROUTE_BANK_ADD = `${ROUTE_BANK}/add`;
export const ROUTE_BANK_DETAILS = `${ROUTE_BANK}/:id`;



// For Drivers
export const ROUTE_VERIFY_RIDER = "/verify";
export const ROUTE_RIDE_PUBLISH = "/rides/publish";
export const ROUTE_VEHICLE = "/vehicle";
export const ROUTE_VEHICLE_ADD = `${ROUTE_VEHICLE}/add`;
export const ROUTE_VEHICLE_DETAILS = `${ROUTE_VEHICLE}/:id`;


// For Guests only
export const ROUTE_LOGIN = "/login";
export const ROUTE_REGISTER = "/register";

// ############################################################## ADMIN ROUTES ##############################################################

const ROUTE_ADMIN = '/admin'
export const ROUTE_ADMIN_DASHBOARD = `${ROUTE_ADMIN}/dashboard`
export const ROUTE_ADMIN_PROFILE = `${ROUTE_ADMIN}/profile`
export const ROUTE_ADMIN_USERS = `${ROUTE_ADMIN}/users`
export const ROUTE_ADMIN_TRANSACTIONS = `${ROUTE_ADMIN}/transactions`
export const ROUTE_ADMIN_REPORTS = `${ROUTE_ADMIN}/reports`
export const ROUTE_ADMIN_VERIFICATION_REQS = `${ROUTE_ADMIN}/verification-requests`

// ############################################################## ROUTES CATEGORY ##############################################################

export const PUBLIC_ROUTES = [
    ROUTE_HOME,
    ROUTE_RESET_PASSWORD,
    ROUTE_RESET_PASSWORD_PAGE,
    ROUTE_ABOUT_US,
    ROUTE_PRIVACY_POLICY,
    ROUTE_TERMS_AND_CODITIONS,
    ROUTE_USER_DETAILS,
    ROUTE_SEARCH,
    ROUTE_SEARCH_RESULT,
    ROUTE_RIDE_DETAILS,
];
export const GUEST_ONLY_ROUTES = [ROUTE_LOGIN, ROUTE_REGISTER];
export const USER_ROUTES = [
    ROUTE_WALLET,
    ROUTE_PROFILE_DASHBOARD,
    ROUTE_RIDES,
    // ROUTE_RIDE_PUBLISH,
    ROUTE_BANK,
    ROUTE_BANK_ADD,
    ROUTE_BANK_DETAILS,
];
export const RIDER_ROUTES = [
    ROUTE_RIDE_PUBLISH,
    ROUTE_RIDE_EDIT,
    ROUTE_VERIFY_RIDER,
    ROUTE_VEHICLE,
    ROUTE_VEHICLE_ADD,
    ROUTE_VEHICLE_DETAILS,
]
export const ADMIN_ROUTES = [
    ROUTE_ADMIN,
    ROUTE_ADMIN_DASHBOARD,
    ROUTE_ADMIN_PROFILE,
    ROUTE_ADMIN_USERS,
    ROUTE_ADMIN_TRANSACTIONS,
    ROUTE_ADMIN_REPORTS,
    ROUTE_ADMIN_VERIFICATION_REQS,
]

/* ############################################################## API ENDPOINT ROUTES ############################################################## */

// export const API_ENDPOINT = "http://savaridekho.webwizards.in";
export const API_ENDPOINT = process.env.NODE_ENV === 'production' ? process.env.REACT_APP_API_ENDPOINT : `http://localhost:8080`;
export const API_REGISTER = `${API_ENDPOINT}/register`;
export const API_LOGIN = `${API_ENDPOINT}/login`;
export const API_USER_ME = `${API_ENDPOINT}/me`;  // GET
export const API_USER_UPDATE = `${API_ENDPOINT}/user`;  // PUT
export const API_REFRESH_TOKEN = `${API_ENDPOINT}/refresh-token`;
export const API_RESET_PASSWORD = `${API_ENDPOINT}/reset-password`;
export const API_FORGOT_PASSWORD = `${API_ENDPOINT}/forgot-password`;
export const API_TRANSACTION = `${API_ENDPOINT}/transaction`;
export const API_GENERATE_OTP = `${API_ENDPOINT}/generate-otp`;
export const API_VALIDATE_OTP = `${API_ENDPOINT}/validate-otp`;

// Payment Stuff
export const API_PAYMENT_CREATE = `${API_ENDPOINT}/checkout`;
export const API_PAYMENT_VALIDATE = `${API_ENDPOINT}/verify-payment`;
export const API_PAYMENT_CANCEL = `${API_ENDPOINT}/cancel-payment`;
export const API_BANKS = `${API_ENDPOINT}/bank`;

// Driver Stuff
export const API_VEHICLES = `${API_ENDPOINT}/vehicles`;
export const API_UPLOAD_RIDER_DOCS = `${API_ENDPOINT}/requests/rider`;
export const API_UPLOAD_VEHICLE_DOCS = `${API_ENDPOINT}/requests/vehicle`;
export const API_RIDE = `${API_ENDPOINT}/ride`;
export const API_RIDES = `${API_ENDPOINT}/rides`;

// Admin
export const API_GET_USERS = `${API_ENDPOINT}/users`;
export const API_GET_RIDER_REQUESTS = `${API_ENDPOINT}/requests/rider`;
export const API_GET_VEHICLE_REQUESTS = `${API_ENDPOINT}/requests/vehicle`;