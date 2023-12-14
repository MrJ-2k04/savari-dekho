import { AcUnit, AccessibilityNew, AirlineSeatReclineExtra, Checkroom, ChildCare, DirectionsBus, Fastfood, MusicNote, Pets, PhotoSizeSelectLarge, SmokeFree, VolumeOff, Wifi } from "@mui/icons-material";



export const GENDER_OPTIONS = ["Male", "Female", "Other"];
export const ADD_FUND_AMOUNTS = [100, 500, 1000, 2000];
export const SEARCH_BAR_SIZE = 'small';

export const BOOLEAN_OPTIONS = ["Yes", "No"];

export const STATE_OPTIONS = [
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Delhi",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
];

export const CITY_OPTIONS = {
    "Andhra Pradesh": [
        "Adoni", "Amaravati", "Anantapur", "Chittoor", "East Godavari", "Guntur", "Kadapa", "Krishna",
        "Kurnool", "Nellore", "Prakasam", "Srikakulam", "Visakhapatnam", "Vizianagaram", "West Godavari"
    ],
    "Arunachal Pradesh": [
        "Anjaw", "Changlang", "East Kameng", "East Siang", "Kamle", "Kra Daadi", "Kurung Kumey",
        "Lepa Rada", "Lohit", "Longding", "Lower Dibang Valley", "Lower Siang", "Lower Subansiri",
        "Namsai", "Pakke Kessang", "Papum Pare", "Shi Yomi", "Siang", "Tawang", "Tirap",
        "Upper Dibang Valley", "Upper Siang", "Upper Subansiri", "West Kameng", "West Siang"
    ],
    "Assam": [
        "Baksa", "Barpeta", "Biswanath", "Bongaigaon", "Cachar", "Charaideo", "Chirang", "Darrang",
        "Dhemaji", "Dhubri", "Dibrugarh", "Dima Hasao", "Goalpara", "Golaghat", "Hailakandi", "Hojai",
        "Jorhat", "Kamrup", "Kamrup Metropolitan", "Karbi Anglong", "Karimganj", "Kokrajhar", "Lakhimpur",
        "Majuli", "Morigaon", "Nagaon", "Nalbari", "Sivasagar", "Sonitpur", "South Salmara-Mankachar",
        "Tinsukia", "Udalguri", "West Karbi Anglong"
    ],
    "Bihar": [
        "Araria", "Arwal", "Aurangabad", "Banka", "Begusarai", "Bhagalpur", "Bhojpur", "Buxar", "Darbhanga",
        "East Champaran", "Gaya", "Gopalganj", "Jamui", "Jehanabad", "Kaimur", "Katihar", "Khagaria",
        "Kishanganj", "Lakhisarai", "Madhepura", "Madhubani", "Munger", "Muzaffarpur", "Nalanda", "Nawada",
        "Patna", "Purnia", "Rohtas", "Saharsa", "Samastipur", "Saran", "Sheikhpura", "Sheohar", "Sitamarhi",
        "Siwan", "Supaul", "Vaishali", "West Champaran"
    ],
    "Chhattisgarh": [
        "Balod", "Baloda Bazar", "Balrampur", "Bastar", "Bemetara", "Bijapur", "Bilaspur", "Dantewada",
        "Dhamtari", "Durg", "Gariaband", "Gaurela-Pendra-Marwahi", "Janjgir-Champa", "Jashpur",
        "Kabirdham", "Kanker", "Kondagaon", "Korba", "Koriya", "Mahasamund", "Mungeli", "Narayanpur",
        "Raigarh", "Raipur", "Rajnandgaon", "Sukma", "Surajpur", "Surguja"
    ],
    "Delhi": [
        "Central Delhi", "East Delhi", "New Delhi", "North Delhi", "North East Delhi", "North West Delhi",
        "Shahdara", "South Delhi", "South East Delhi", "South West Delhi", "West Delhi"
    ],
    "Goa": ["North Goa", "South Goa"],
    "Gujarat": [
        "Ahmedabad", "Amreli", "Anand", "Aravalli", "Banaskantha", "Bharuch", "Bhavnagar", "Botad",
        "Chhota Udaipur", "Dahod", "Dang", "Devbhoomi Dwarka", "Gandhinagar", "Gir Somnath", "Jamnagar",
        "Junagadh", "Kheda", "Kutch", "Mahisagar", "Mehsana", "Morbi", "Narmada", "Navsari", "Panchmahal",
        "Patan", "Porbandar", "Rajkot", "Sabarkantha", "Surat", "Surendranagar", "Tapi", "Vadodara",
        "Valsad"
    ],
    "Haryana": [
        "Ambala", "Bhiwani", "Charkhi Dadri", "Faridabad", "Fatehabad", "Gurgaon", "Hisar", "Jhajjar",
        "Jind", "Kaithal", "Karnal", "Kurukshetra", "Mahendragarh", "Nuh", "Palwal", "Panchkula",
        "Panipat", "Rewari", "Rohtak", "Sirsa", "Sonipat", "Yamunanagar"
    ],
    "Himachal Pradesh": [
        "Bilaspur", "Chamba", "Hamirpur", "Kangra", "Kinnaur", "Kullu", "Lahaul and Spiti", "Mandi",
        "Shimla", "Sirmaur", "Solan", "Una"
    ],
    "Jharkhand": [
        "Bokaro", "Chatra", "Deoghar", "Dhanbad", "Dumka", "East Singhbhum", "Garhwa", "Giridih", "Godda",
        "Gumla", "Hazaribagh", "Jamtara", "Khunti", "Koderma", "Latehar", "Lohardaga", "Pakur", "Palamu",
        "Ramgarh", "Ranchi", "Sahebganj", "Seraikela Kharsawan", "Simdega", "West Singhbhum"
    ],
    "Karnataka": [
        "Bagalkot", "Ballari", "Belagavi", "Bengaluru Urban", "Bengaluru Rural", "Bidar", "Chamarajanagar",
        "Chikkaballapur", "Chikkamagaluru", "Chitradurga", "Dakshina Kannada", "Davanagere", "Dharwad",
        "Gadag", "Hassan", "Haveri", "Kalaburagi", "Kodagu", "Kolar", "Koppal", "Mandya", "Mysuru", "Raichur",
        "Ramanagara", "Shivamogga", "Tumakuru", "Udupi", "Uttara Kannada", "Vijayapura", "Yadgir"
    ],
    "Kerala": [
        "Alappuzha", "Ernakulam", "Idukki", "Kannur", "Kasaragod", "Kollam", "Kottayam", "Kozhikode",
        "Malappuram", "Palakkad", "Pathanamthitta", "Thiruvananthapuram", "Thrissur", "Wayanad"
    ],
    "Madhya Pradesh": [
        "Agar Malwa", "Alirajpur", "Anuppur", "Ashoknagar", "Balaghat", "Barwani", "Betul", "Bhind",
        "Bhopal", "Burhanpur", "Chhatarpur", "Chhindwara", "Damoh", "Datia", "Dewas", "Dhar", "Dindori",
        "Guna", "Gwalior", "Harda", "Hoshangabad", "Indore", "Jabalpur", "Jhabua", "Katni", "Khandwa",
        "Khargone", "Mandla", "Mandsaur", "Morena", "Narsinghpur", "Neemuch", "Panna", "Raisen", "Rajgarh",
        "Ratlam", "Rewa", "Sagar", "Satna", "Sehore", "Seoni", "Shahdol", "Shajapur", "Sheopur", "Shivpuri",
        "Sidhi", "Singrauli", "Tikamgarh", "Ujjain", "Umaria", "Vidisha"
    ],
    "Maharashtra": [
        "Ahmednagar", "Akola", "Amravati", "Aurangabad", "Beed", "Bhandara", "Buldhana", "Chandrapur",
        "Dhule", "Gadchiroli", "Gondia", "Hingoli", "Jalgaon", "Jalna", "Kolhapur", "Latur", "Mumbai City",
        "Mumbai Suburban", "Nagpur", "Nanded", "Nandurbar", "Nashik", "Osmanabad", "Palghar", "Parbhani",
        "Pune", "Raigad", "Ratnagiri", "Sangli", "Satara", "Sindhudurg", "Solapur", "Thane", "Wardha",
        "Washim", "Yavatmal"
    ],
    "Manipur": [
        "Bishnupur", "Chandel", "Churachandpur", "Imphal East", "Imphal West", "Jiribam", "Kakching",
        "Kamjong", "Kangpokpi", "Noney", "Pherzawl", "Senapati", "Tamenglong", "Tengnoupal", "Thoubal",
        "Ukhrul"
    ],
    "Meghalaya": [
        "East Garo Hills", "East Jaintia Hills", "East Khasi Hills", "North Garo Hills", "Ri Bhoi", "South Garo Hills",
        "South West Garo Hills", "South West Khasi Hills", "West Garo Hills", "West Jaintia Hills", "West Khasi Hills"
    ],
    "Mizoram": [
        "Aizawl", "Champhai", "Hnahthial", "Khawzawl", "Kolasib", "Lawngtlai", "Lunglei", "Mamit",
        "Saiha", "Saitual", "Serchhip"
    ],
    "Nagaland": [
        "Dimapur", "Kiphire", "Kohima", "Longleng", "Mokokchung", "Mon", "Peren", "Phek", "Tuensang",
        "Wokha", "Zunheboto"
    ],
    "Odisha": [
        "Angul", "Balangir", "Balasore", "Bargarh", "Bhadrak", "Boudh", "Cuttack", "Deogarh", "Dhenkanal",
        "Gajapati", "Ganjam", "Jagatsinghpur", "Jajpur", "Jharsuguda", "Kalahandi", "Kandhamal", "Kendrapara",
        "Kendujhar", "Khordha", "Koraput", "Malkangiri", "Mayurbhanj", "Nabarangpur", "Nayagarh", "Nuapada",
        "Puri", "Rayagada", "Sambalpur", "Subarnapur", "Sundargarh"
    ],
    "Punjab": [
        "Amritsar", "Barnala", "Bathinda", "Faridkot", "Fatehgarh Sahib", "Fazilka", "Ferozepur", "Gurdaspur",
        "Hoshiarpur", "Jalandhar", "Kapurthala", "Ludhiana", "Mansa", "Moga", "Muktsar", "Nawanshahr", "Pathankot",
        "Patiala", "Rupnagar", "Sahibzada Ajit Singh Nagar", "Sangrur", "Tarn Taran"
    ],
    "Rajasthan": [
        "Ajmer", "Alwar", "Banswara", "Baran", "Barmer", "Bharatpur", "Bhilwara", "Bikaner", "Bundi",
        "Chittorgarh", "Churu", "Dausa", "Dholpur", "Dungarpur", "Hanumangarh", "Jaipur", "Jaisalmer",
        "Jalore", "Jhalawar", "Jhunjhunu", "Jodhpur", "Karauli", "Kota", "Nagaur", "Pali", "Pratapgarh",
        "Rajsamand", "Sawai Madhopur", "Sikar", "Sirohi", "Sri Ganganagar", "Tonk", "Udaipur"
    ],
    "Sikkim": ["East Sikkim", "North Sikkim", "South Sikkim", "West Sikkim"],
    "Tamil Nadu": [
        "Ariyalur", "Chennai", "Coimbatore", "Cuddalore", "Dharmapuri", "Dindigul", "Erode", "Kallakurichi",
        "Kanchipuram", "Kanyakumari", "Karur", "Krishnagiri", "Madurai", "Nagapattinam", "Namakkal", "Nilgiris",
        "Perambalur", "Pudukkottai", "Ramanathapuram", "Ranipet", "Salem", "Sivaganga", "Tenkasi", "Thanjavur",
        "Theni", "Thoothukudi", "Tiruchirappalli", "Tirunelveli", "Tirupathur", "Tiruppur", "Tiruvallur",
        "Tiruvannamalai", "Tiruvarur", "Vellore", "Viluppuram", "Virudhunagar"
    ],
    "Telangana": [
        "Adilabad", "Bhadradri Kothagudem", "Hyderabad", "Jagtial", "Jangaon", "Jayashankar Bhupalpally",
        "Jogulamba Gadwal", "Kamareddy", "Karimnagar", "Khammam", "Komaram Bheem", "Mahabubabad",
        "Mahbubnagar", "Mancherial", "Medak", "Medchal Malkajgiri", "Mulugu", "Nagarkurnool", "Nalgonda",
        "Nirmal", "Nizamabad", "Peddapalli", "Rajanna Sircilla", "Rangareddy", "Sangareddy", "Siddipet",
        "Suryapet", "Vikarabad", "Wanaparthy", "Warangal Rural", "Warangal Urban", "Yadadri Bhuvanagiri"
    ],
    "Tripura": ["Dhalai", "Gomati", "Khowai", "North Tripura", "Sepahijala", "South Tripura", "Unakoti", "West Tripura"],
    "Uttar Pradesh": [
        "Agra", "Aligarh", "Ambedkar Nagar", "Amethi", "Amroha", "Auraiya", "Azamgarh", "Baghpat", "Bahraich",
        "Ballia", "Balrampur", "Banda", "Barabanki", "Bareilly", "Basti", "Bhadohi", "Bijnor", "Budaun", "Bulandshahr",
        "Chandauli", "Chitrakoot", "Deoria", "Etah", "Etawah", "Ayodhya", "Farrukhabad", "Fatehpur", "Firozabad",
        "Gautam Buddha Nagar", "Ghaziabad", "Ghazipur", "Gonda", "Gorakhpur", "Hamirpur", "Hapur", "Hardoi",
        "Hathras", "Jalaun", "Jaunpur", "Jhansi", "Kannauj", "Kanpur Dehat", "Kanpur Nagar", "Kasganj", "Kaushambi",
        "Kushinagar", "Lakhimpur Kheri", "Lalitpur", "Lucknow", "Maharajganj", "Mahoba", "Mainpuri", "Mathura",
        "Mau", "Meerut", "Mirzapur", "Moradabad", "Muzaffarnagar", "Pilibhit", "Pratapgarh", "Prayagraj",
        "Raebareli", "Rampur", "Saharanpur", "Sambhal", "Sant Kabir Nagar", "Shahjahanpur", "Shamli",
        "Shravasti", "Siddharthnagar", "Sitapur", "Sonbhadra", "Sultanpur", "Unnao", "Varanasi"
    ],
    "Uttarakhand": [
        "Almora", "Bageshwar", "Chamoli", "Champawat", "Dehradun", "Haridwar", "Nainital", "Pauri Garhwal",
        "Pithoragarh", "Rudraprayag", "Tehri Garhwal", "Udham Singh Nagar", "Uttarkashi"
    ],
    "West Bengal": [
        "Alipurduar", "Bankura", "Birbhum", "Cooch Behar", "Dakshin Dinajpur", "Darjeeling", "Hooghly",
        "Howrah", "Jalpaiguri", "Jhargram", "Kalimpong", "Kolkata", "Malda", "Murshidabad", "Nadia",
        "North 24 Parganas", "Paschim Bardhaman", "Paschim Medinipur", "Purba Bardhaman", "Purba Medinipur",
        "Purulia", "South 24 Parganas", "Uttar Dinajpur"
    ],
};

export const PREFERENCES = [
    { id: "NO_SMK", title: "No Smoking", Icon: SmokeFree },
    { id: "NO_CHD", title: "No Child", Icon: ChildCare },
    { id: "NO_PET", title: "Pets not allowed", Icon: Pets },
    { id: "QT_RID", title: "Quiet Ride", Icon: VolumeOff },
    { id: "MU_RID", title: "Music Allowed", Icon: MusicNote },
    { id: "AC_RID", title: "Air Conditioning", Icon: AcUnit },
    { id: "LG_SPC", title: "Luggage Space", Icon: Checkroom },
    { id: "FLX_STP", title: "Flexible Stops", Icon: DirectionsBus },
    { id: "CMF_ST", title: "Comfortable Seats", Icon: AirlineSeatReclineExtra },
    { id: "WIFI", title: "Wi-Fi Available", Icon: Wifi },
    { id: "ACS_DIS", title: "Accessible for Disabilities", Icon: AccessibilityNew },
    { id: "FD_ALWD", title: "Food and Drinks Allowed", Icon: Fastfood },
    { id: "WIN_SHD", title: "Window Shades", Icon: PhotoSizeSelectLarge },
];


export const VEHICLE_TYPE_OPTIONS = [
    "Sedan",
    "SUV",
    "Compact",
    'Hatchback',
    "Van",
    "Crossover",
    "Convertible",
    "Sports Car",
    "Other",
    "Unknown",
]

export const VEHICLE_FUEL_TYPES = [
    "Gasoline/Petrol",
    "Diesel",
    "Electric",
    "Hybrid",
    "Natural Gas",
    "Propane",
    "Other"
]

export const VEHICLE_COLOR_OPTIONS = [
    { name: "Black", value: "#000000" },
    { name: "White", value: "#FFFFFF" },
    { name: "Dark gray", value: "#555555" },
    { name: "Gray", value: "#AAAAAA" },
    { name: "Burgundy", value: "#9b0004" },
    { name: "Red", value: "#FF0000" },
    { name: "Dark blue", value: "#0b2742" },
    { name: "Blue", value: "#1a7cbd" },
    { name: "Dark green", value: "#008000" },
    { name: "Green", value: "#00FF00" },
    { name: "Brown", value: "#4e301c" },
    { name: "Beige", value: "#F5F5DC" },
    { name: "Orange", value: "#FFA500" },
    { name: "Yellow", value: "#FFFF00" },
    { name: "Purple", value: "#800080" },
    { name: "Pink", value: "#FFC0CB" }
];

export const VEHICLE_MANUFACTURERS = [
    "Maruti Suzuki India Limited",
    "Hyundai Motor India Limited",
    "Tata Motors",
    "Mahindra & Mahindra",
    "Kia India",
    "Honda Cars India Ltd",
    "Toyota Kirloskar Motor",
    "Ford India Private Limited",
    "Volkswagen India Private Limited",
    "Skoda Auto India Private Limited",
    "Renault India Private Limited",
    "Nissan Motor India Private Limited",
    "MG Motor India",
    "Jeep India",
    "BMW India Private Limited",
    "Mercedes-Benz India",
    "Audi India",
    "Volvo Car India",
    "Jaguar Land Rover India",
    "Porsche India",
    "Lamborghini India",
    "Ferrari India",
    "Rolls-Royce India",
    "Bentley Motors India",
    "Mini India",
    "General Motors India",
    "Fiat India",
    "Ford India",
    "Chevrolet India",
    "Opel India",
    "Mahindra Renault",
    "Swaraj Mazda",
    "Tesla",
    "Unknown",
]

export const VEHICLE_MODELS = {
    "Maruti Suzuki India Limited": [
        "Maruti Alto",
        "Maruti Swift",
        "Maruti Baleno",
        "Maruti Dzire",
        "Maruti Wagon R",
        "Maruti Vitara Brezza",
        "Maruti Ertiga",
        "Maruti S-Presso",
        "Maruti Celerio",
        "Maruti Ignis",
        "Maruti Ciaz",
        "Maruti XL6",
        "Maruti S-Cross",
    ],
    "Hyundai Motor India Limited": [
        "Hyundai Venue",
        "Hyundai Creta",
        "Hyundai i20",
        "Hyundai Grand i10 Nios",
        "Hyundai Verna",
        "Hyundai Aura",
        "Hyundai Santro",
        "Hyundai Elantra",
        "Hyundai Tucson",
        "Hyundai Kona Electric",
        "Hyundai Palisade",
    ],
    "Tata Motors": [
        "Tata Tiago",
        "Tata Nexon",
        "Tata Harrier",
        "Tata Altroz",
        "Tata Tigor",
        "Tata Safari",
        "Tata Zest",
        "Tata Hexa",
        "Tata Sumo",
        "Tata Nano",
        "Tata Indigo",
        "Tata Indica",
    ],
    "Mahindra & Mahindra": [
        "Mahindra Bolero",
        "Mahindra Scorpio",
        "Mahindra XUV300",
        "Mahindra Thar",
        "Mahindra XUV500",
        "Mahindra TUV300",
        "Mahindra Alturas G4",
        "Mahindra KUV100",
        "Mahindra Verito",
    ],
    "Kia India": [
        "Kia Seltos",
        "Kia Sonet",
        "Kia Carnival",
    ],
    "Honda Cars India Ltd": [
        "Honda City",
        "Honda Amaze",
        "Honda WR-V",
        "Honda Jazz",
        "Honda Civic",
        "Honda CR-V",
    ],
    "Toyota Kirloskar Motor": [
        "Toyota Innova Crysta",
        "Toyota Fortuner",
        "Toyota Glanza",
        "Toyota Urban Cruiser",
        "Toyota Camry",
        "Toyota Vellfire",
    ],
    "Ford India Private Limited": [
        "Ford EcoSport",
        "Ford Figo",
        "Ford Aspire",
        "Ford Endeavour",
        "Ford Mustang",
    ],
    "Volkswagen India Private Limited": [
        "Volkswagen Polo",
        "Volkswagen Vento",
        "Volkswagen T-Roc",
        "Volkswagen Tiguan Allspace",
    ],
    "Skoda Auto India Private Limited": [
        "Skoda Rapid",
        "Skoda Octavia",
        "Skoda Superb",
        "Skoda Kodiaq",
    ],
    "Renault India Private Limited": [
        "Renault Kwid",
        "Renault Triber",
        "Renault Duster",
    ],
    "Nissan Motor India Private Limited": [
        "Nissan Magnite",
        "Nissan Kicks",
    ],
    "MG Motor India": [
        "MG Hector",
        "MG ZS EV",
    ],
    "Jeep India": ["Jeep Compass", "Jeep Wrangler"],
    "BMW India Private Limited": ["BMW 3 Series", "BMW 5 Series", "BMW X1", "BMW X3", "BMW X5", "BMW X7", "BMW Z4"],
    "Mercedes-Benz India": ["Mercedes-Benz A-Class", "Mercedes-Benz C-Class", "Mercedes-Benz E-Class", "Mercedes-Benz GLC", "Mercedes-Benz GLE", "Mercedes-Benz GLS"],
    "Audi India": ["Audi A3", "Audi A4", "Audi A6", "Audi Q2", "Audi Q3", "Audi Q5", "Audi Q7", "Audi Q8"],
    "Volvo Car India": ["Volvo S60", "Volvo S90", "Volvo XC40", "Volvo XC60", "Volvo XC90"],
    "Jaguar Land Rover India": ["Jaguar XE", "Jaguar XF", "Jaguar F-PACE", "Land Rover Discovery Sport", "Land Rover Range Rover Evoque", "Land Rover Range Rover Velar", "Land Rover Range Rover Sport", "Land Rover Range Rover"],
    "Porsche India": ["Porsche 911", "Porsche Panamera", "Porsche Cayenne", "Porsche Macan", "Porsche 718"],
    "Lamborghini India": ["Lamborghini Huracán", "Lamborghini Aventador", "Lamborghini Urus"],
    "Ferrari India": ["Ferrari Portofino", "Ferrari Roma", "Ferrari F8 Tributo", "Ferrari SF90 Stradale"],
    "Rolls-Royce India": ["Rolls-Royce Ghost", "Rolls-Royce Dawn", "Rolls-Royce Wraith", "Rolls-Royce Phantom"],
    "Bentley Motors India": ["Bentley Bentayga", "Bentley Continental GT", "Bentley Flying Spur"],
    "Mini India": ["Mini 3-Door", "Mini 5-Door", "Mini Countryman"],
    "General Motors India": ["Chevrolet Beat", "Chevrolet Sail", "Chevrolet Enjoy", "Chevrolet Cruze", "Chevrolet Tavera", "Chevrolet Trailblazer"],
    "Fiat India": ["Fiat Punto Evo", "Fiat Linea", "Fiat Avventura", "Fiat Urban Cross"],
    "Ford India": ["Ford Classic", "Ford Fiesta"],
    "Chevrolet India": ["Chevrolet Spark", "Chevrolet UVA", "Chevrolet Aveo", "Chevrolet Aveo U-VA", "Chevrolet Optra", "Chevrolet Optra Magnum", "Chevrolet Captiva"],
    "Opel India": ["Opel Corsa", "Opel Astra"],
    "Mahindra Renault": ["Renault Logan"],
    "Swaraj Mazda": ["Swaraj Mazda SD 550"],
    "Tesla": ["Tesla Model 3", "Tesla Model S", "Tesla Model X", "Tesla Model Y"],
    "Unknown": ["Unknown"],
};

export const VERIFICATION_STATUS = {
    PENDING: "pending",
    VERIFIED: "verified",
    NOT_VERIFIED: "not verified"
}

export const BANK_ACCOUNT_TYPES = [
    "savings",
    "current",
]

// Google Map Form IDs
export const ID_RIDE_TO = "to";
export const ID_RIDE_FROM = "from";
export const ID_RIDE_PICKUP = "pickup";
export const ID_RIDE_DROPOFF = "dropoff";
export const ID_WAYP_LOCATION = "location";
export const ID_WAYP_PRICE = "price";