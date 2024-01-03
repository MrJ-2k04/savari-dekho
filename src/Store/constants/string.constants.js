

// ############################################## SITE SETTINGS ##############################################

import { Cancel, DoNotDisturb, MinorCrash, NoCrash, Pending, PendingActions, Verified } from "@mui/icons-material";

export const SITE_TITLE = "Savari Dekho";
export const SITE_CAPTION = "Unlock Affordable Adventures Across Cities and States";

export const CONTACT_NUMBER = '+91 79906 74110';
export const CONTACT_EMAIL_PRIMARY = 'info@webwizards.in';
export const CONTACT_EMAIL_SECONDARY = 'wizardsweb142@gmail.com';

export const TESTIMONIALS = [
  {
    image: 'https://www.tutorialrepublic.com/examples/images/clients/1.jpg',
    content:
      'Savari Dekho has transformed my daily commute! The platform is user-friendly, and I\'ve met wonderful travel companions. The experience has been smooth, and I highly recommend it.',
    name: 'ANANYA SINGH',
    role: 'Frequent Commuter',
  },
  {
    image: 'https://www.tutorialrepublic.com/examples/images/clients/2.jpg',
    content:
      'Being a part of Savari Dekho community is fantastic. It\'s more than just ridesharing; it\'s about building connections and making each journey enjoyable. I\'ve had great experiences so far!',
    name: 'RAJAT VERMA',
    role: 'Community Member',
  },
  {
    image: 'https://www.tutorialrepublic.com/examples/images/clients/3.jpg',
    content:
      'Savari Dekho makes carpooling convenient and eco-friendly. I appreciate the safety features and the opportunity to share rides with like-minded individuals. It has truly made commuting a breeze!',
    name: 'PRIYA MEHTA',
    role: 'Environment Enthusiast',
  },
];


export const FAQS = [
  {
    question: "What is Savari Dekho?",
    answer: "Savari Dekho is a carpooling platform that connects drivers with empty seats to passengers traveling in the same direction. It's a cost-effective and eco-friendly way to travel."
  },
  {
    question: "How does carpooling work?",
    answer: "Carpooling with Savari Dekho is simple. Drivers offer their available seats, and passengers can find rides going their way. The platform facilitates convenient and affordable travel for both drivers and passengers."
  },
  {
    question: "Is it safe to carpool with Savari Dekho?",
    answer: "Yes, safety is our top priority. We implement various safety features, including user verifications, reviews, and ratings. Users can choose their travel companions based on shared preferences and reviews from the community."
  },
  {
    question: "What are the benefits of carpooling?",
    answer: "Carpooling benefits both drivers and passengers. Drivers save on fuel costs, reduce traffic congestion, and contribute to a greener environment. Passengers enjoy affordable and comfortable rides while meeting new people."
  },
  {
    question: "How do I join Savari Dekho?",
    answer: "Joining Savari Dekho is easy. Simply sign up, create a profile, and start offering or booking rides. Whether you're a driver with extra seats or a passenger looking for a ride, Savari Dekho connects you with travel companions."
  },
  {
    question: "Can I choose my travel companions?",
    answer: "Yes, with Savari Dekho, you have the flexibility to review profiles, ratings, and preferences, allowing you to find the perfect travel companions for your carpooling journey."
  }

];


// Google Map settings
export const MAP_CENTER = { lat: 20.5937, lng: 78.9629 };
export const MAP_SEARCH_COUNTRY_RESTRICTION = ["IN"];
export const GOOGLE_MAP_ID = "1a52ed7dbb9da825";
export const MIN_DELAY_FOR_BOOKING = 2 * 60;  // 2 hrs

// ############################################## RESPONSE TYPES ##############################################

export const RES = {
  ERROR: 'error',
  SUCCESS: 'success',
};

// ############################################## UI Constants ##############################################

export const DRAWER_WIDTH = 280;
export const APP_BAR_MOBILE = 64;
export const APP_BAR_DESKTOP = 92;

export const THEME = {
  LIGHT: "Light",
  DARK: "Dark",
};

// ############################################## FAQS ##############################################

export const WALLET_FAQS = [
  {
    question: "Q: What is the Carpooling Wallet?",
    answer: "A: The Carpooling Wallet is a digital wallet service that allows you to conveniently manage payments for rides and related services within our platform."
  },
  {
    question: "Q: How do I add funds to my Carpooling Wallet?",
    answer: "A: Adding funds to your Carpooling Wallet is easy. Simply go to your account settings, navigate to the 'Wallet' section, and follow the instructions to link your bank account or credit card."
  },
  {
    question: "Q: Can I use my Carpooling Wallet to pay for rides?",
    answer: "A: Absolutely. Your Carpooling Wallet balance can be used to pay for rides you book through our platform. It's a convenient way to make seamless payments for your carpooling trips."
  },
  {
    question: "Q: How secure is the Carpooling Wallet?",
    answer: "A: Your security is our priority. The Carpooling Wallet employs advanced encryption and security measures to safeguard your financial information and ensure the safety of your funds."
  },
  {
    question: "Q: How can I withdraw funds from my Carpooling Wallet?",
    answer: "A: If you have a balance in your Carpooling Wallet that you'd like to withdraw, you can initiate a transfer back to your linked bank account. The process is user-friendly and can be done from within the app."
  },
  {
    question: "Q: Can I request a refund for unused Wallet funds?",
    answer: "A: Yes, if you decide to close your account or no longer wish to use the Wallet feature, you can request a refund for any remaining funds in your Carpooling Wallet."
  },
  // Add more relevant FAQs as needed
];

export const PASSENGER_FILTER_STATUS = ["requested", "booked", "confirmed", "started", "completed"];
export const PASSENGER_STATUS = {
  REQUESTED: 'requested',
  BOOKED: 'booked',
  REJECTED: 'rejected',
  CONFIRMED: 'confirmed',
  STARTED: 'started',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled'
}
export const STATUS_DESCRIPTION_FOR_PASSENGER = {
  [PASSENGER_STATUS.REQUESTED]: "- Awaiting ride request approval from driver",
  [PASSENGER_STATUS.BOOKED]: "- Driver has approved your ride, please confirm by making payment",
  [PASSENGER_STATUS.REJECTED]: "- Your ride request has been rejected by driver",
  [PASSENGER_STATUS.CONFIRMED]: "- Ride is successfully booked",
  [PASSENGER_STATUS.STARTED]: "- Ride is started",
  [PASSENGER_STATUS.COMPLETED]: "- Ride is completed",
  [PASSENGER_STATUS.CANCELLED]: "- Ride is cancelled",
};
export const STATUS_DESCRIPTION_FOR_DRIVER = {
  [PASSENGER_STATUS.REQUESTED]: "",
  [PASSENGER_STATUS.BOOKED]: "- Awaiting payment confirmation from passenger",
  [PASSENGER_STATUS.REJECTED]: "",
  [PASSENGER_STATUS.CONFIRMED]: "- Passenger has completed the payment",
  [PASSENGER_STATUS.STARTED]: "- Passenger's ride has started",
  [PASSENGER_STATUS.COMPLETED]: "- Passenger's ride is completed",
  [PASSENGER_STATUS.CANCELLED]: "- Passenger's ride is cancelled",
};
export const PASSENGER_STATUS_ICONS = {
  [PASSENGER_STATUS.REQUESTED]: <Pending color="warning" />,
  [PASSENGER_STATUS.BOOKED]: <PendingActions color="warning" />,
  [PASSENGER_STATUS.REJECTED]: <DoNotDisturb color="error" />,
  [PASSENGER_STATUS.CONFIRMED]: <Verified color="success" />,
  [PASSENGER_STATUS.STARTED]: <MinorCrash color="info" />,
  [PASSENGER_STATUS.COMPLETED]: <NoCrash color="success" />,
  [PASSENGER_STATUS.CANCELLED]: <Cancel color="error" />,
};