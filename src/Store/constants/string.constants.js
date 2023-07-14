

// ############################################## SITE SETTINGS ##############################################

export const SITE_TITLE = "Savari Dekho";

export const USER = "User";
export const RIDER = "Rider";
export const ROLES = {
    USER,
    RIDER
};

// ################################ API ENDPOINTS ################################

export const API_ENDPOINT = process.env.NODE_ENV === 'production' ?
    process.env.REACT_APP_API_ENDPOINT : "http://localhost:8080";

export const API_REGISTER = `${API_ENDPOINT}/register`;
export const API_LOGIN = `${API_ENDPOINT}/login`;
export const API_USERS = `${API_ENDPOINT}/users`;
export const API_PAYMENT_CREATE = `${API_ENDPOINT}/payment/create`;
export const API_PAYMENT_VALIDATE = `${API_ENDPOINT}/payment/validate`;
export const API_CHECKOUT_SCRIPT = `https://checkout.razorpay.com/v1/checkout.js`;


// ############################################## UI Constants ##############################################

export const DRAWER_WIDTH = 280;
export const APP_BAR_MOBILE = 64;
export const APP_BAR_DESKTOP = 92;

export const THEME = {
  LIGHT: "Light",
  DARK: "Dark",
};