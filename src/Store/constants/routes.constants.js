
// ############################################################## APP ROUTES ##############################################################

// For Everyone
export const ROUTE_HOME = "/";
export const ROUTE_RESET_PASSWORD = "/reset-password";
export const ROUTE_RESET_PASSWORD_PAGE = "/reset-password/:userId";
export const ROUTE_USER = "/users";
export const ROUTE_USER_DETAILS = "/users/:userId";
export const ROUTE_SEARCH = "/search-rides";
export const ROUTE_SEARCH_RESULT = "/search";
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
export const DRIVER_ROUTES = [
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


// Auth Endpoints
const API_AUTH = `${API_ENDPOINT}/auth`
export const API_REGISTER = `${API_AUTH}/register`;
export const API_LOGIN = `${API_AUTH}/login`;
export const API_USER_ME = `${API_AUTH}/me`;  // GET
export const API_USER_UPDATE = `${API_AUTH}/user`;  // PUT
export const API_REFRESH_TOKEN = `${API_AUTH}/refresh-token`;
export const API_RESET_PASSWORD = `${API_AUTH}/reset-password`;
export const API_FORGOT_PASSWORD = `${API_AUTH}/forgot-password`;
export const API_DRIVER = `${API_AUTH}/driver`; // PATCH, POST

// Search Endpoints
export const API_SEARCH = `${API_ENDPOINT}/search`; // GET
export const API_SEARCH_HISTORY = `${API_SEARCH}/history`; // GET

// Otp Endpoints
const API_OTP = `${API_ENDPOINT}/otp`;
export const API_GENERATE_OTP = `${API_OTP}/generate`;
export const API_VALIDATE_OTP = `${API_OTP}/validate`;

// Payment Endpoints
const API_PAYMENT = `${API_ENDPOINT}/payment`;
export const API_PAYMENT_CREATE = `${API_PAYMENT}/checkout`;
export const API_PAYMENT_VALIDATE = `${API_PAYMENT}/verify`;
export const API_PAYMENT_CANCEL = `${API_PAYMENT}/cancel`; // PUT
export const API_TRANSACTION = `${API_PAYMENT}/transaction`;  // GET, POST

// Bank Endpoint
export const API_BANK = `${API_ENDPOINT}/bank`;  // GET, POST, PUT, DELETE

// Vehicle Endpoints
export const API_VEHICLES = `${API_ENDPOINT}/vehicle`; // GET, POST, PUT, DELETE

// Ride Endpoints
export const API_RIDE = `${API_ENDPOINT}/ride`; // GET, POST, PUT, DELETE
export const API_RIDES_BOOKED = `${API_RIDE}/booked`; // GET
export const API_RIDES_PUBLISHED = `${API_RIDE}/published`; // GET

// Ride Request Endpoints
export const API_RIDE_REQUEST = `${API_RIDE}/request`; // GET, POST, PUT





// Admin Endpoints
const API_ADMIN = `${API_ENDPOINT}/admin`;
export const API_ADMIN_LIST_USERS = `${API_ADMIN}/users`; // GET
export const API_ADMIN_DRIVER_REQUESTS = `${API_ADMIN}/driver`; // GET, PUT
export const API_ADMIN_VEHICLE_REQUESTS = `${API_ADMIN}/vehicle`; // GET, PUT