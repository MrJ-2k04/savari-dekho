

// ############################################## SITE SETTINGS ##############################################

export const SITE_TITLE = "Savari Dekho";
export const SITE_CAPTION = "Unlock Affordable Adventures Across Cities and States";

export const CONTACT_NUMBER = '+91 79906 74110';
export const CONTACT_EMAIL_PRIMARY = 'info@webwizards.in';
export const CONTACT_EMAIL_SECONDARY = 'wizardsweb142@gmail.com';

export const TESTIMONIALS = [
  {
    image: 'https://www.tutorialrepublic.com/examples/images/clients/1.jpg',
    content:
      'Phasellus vitae suscipit justo. Mauris pharetra feugiat ante id lacinia. Etiam faucibus mauris id tempor egestas. Duis luctus turpis at accumsan tincidunt. Phasellus risus risus, volutpat vel tellus ac, tincidunt fringilla massa. Etiam hendrerit dolor eget rutrum',
    name: 'PAULA WILSON',
    role: 'Media Analyst',
  },
  {
    image: 'https://www.tutorialrepublic.com/examples/images/clients/2.jpg',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    name: 'JOHN DOE',
    role: 'Software Engineer',
  },
  {
    image: 'https://www.tutorialrepublic.com/examples/images/clients/3.jpg',
    content:
      'Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa.',
    name: 'JANE DOE',
    role: 'Product Manager',
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
    answer: "Yes, you have the flexibility to choose your travel companions. Review profiles, ratings, and preferences to find the perfect match for your carpooling journey."
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
