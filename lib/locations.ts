// Indian States and Metro Cities
export const INDIAN_STATES = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
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
  "Ladakh",
  "Jammu and Kashmir",
  "Puducherry",
  "Lakshadweep",
  "Andaman and Nicobar Islands",
  "Dadra and Nagar Haveli",
  "Daman and Diu",
  "Chandigarh",
  "Delhi",
];

export const METRO_CITIES: Record<string, string[]> = {
  "Andhra Pradesh": ["Hyderabad", "Visakhapatnam", "Vijayawada", "Tirupati"],
  "Arunachal Pradesh": ["Itanagar", "Guwahati", "Dibrugarh"],
  "Assam": ["Guwahati", "Silchar", "Dibrugarh", "Barpeta"],
  "Bihar": ["Patna", "Gaya", "Bhagalpur", "Darbhanga"],
  "Chhattisgarh": ["Raipur", "Bilaspur", "Durg"],
  "Goa": ["Panaji", "Margao", "Vasco da Gama"],
  "Gujarat": ["Ahmedabad", "Surat", "Vadodara", "Rajkot", "Junagadh", "Jamnagar"],
  "Haryana": ["Gurgaon", "Faridabad", "Hisar", "Rohtak", "Panipat"],
  "Himachal Pradesh": ["Shimla", "Solan", "Mandi", "Kangra"],
  "Jharkhand": ["Ranchi", "Dhanbad", "Jamshedpur", "Giridih"],
  "Karnataka": ["Bangalore", "Mysore", "Mangalore", "Belgaum", "Hubli", "Davangere"],
  "Kerala": ["Kochi", "Thiruvananthapuram", "Kozhikode", "Thrissur", "Alappuzha"],
  "Madhya Pradesh": ["Indore", "Bhopal", "Gwalior", "Jabalpur", "Ujjain"],
  "Maharashtra": ["Mumbai", "Pune", "Nagpur", "Aurangabad", "Nashik", "Kolhapur", "Amravati"],
  "Manipur": ["Imphal", "Senapati"],
  "Meghalaya": ["Shillong", "Tura", "Cherrapunji"],
  "Mizoram": ["Aizawl", "Lunglei"],
  "Nagaland": ["Kohima", "Dimapur", "Mon"],
  "Odisha": ["Bhubaneswar", "Cuttack", "Rourkela", "Sambalpur"],
  "Punjab": ["Amritsar", "Ludhiana", "Chandigarh", "Jalandhar", "Patiala"],
  "Rajasthan": ["Jaipur", "Jodhpur", "Udaipur", "Ajmer", "Bikaner", "Kota"],
  "Sikkim": ["Gangtok", "Namchi"],
  "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai", "Salem", "Trichy", "Tiruppur", "Erode"],
  "Telangana": ["Hyderabad", "Warangal", "Nizamabad"],
  "Tripura": ["Agartala", "Udaipur"],
  "Uttar Pradesh": [
    "Lucknow",
    "Kanpur",
    "Agra",
    "Varanasi",
    "Meerut",
    "Allahabad",
    "Noida",
    "Greater Noida",
    "Ghaziabad",
    "Bareilly",
    "Saharanpur",
    "Jhansi",
  ],
  "Uttarakhand": ["Dehradun", "Haridwar", "Rishikesh", "Almora"],
  "West Bengal": ["Kolkata", "Darjeeling", "Siliguri", "Durgapur", "Asansol"],
  "Ladakh": ["Leh", "Kargil"],
  "Jammu and Kashmir": ["Srinagar", "Jammu", "Leh", "Gulmarg"],
  "Puducherry": ["Puducherry", "Yanam", "Mahe"],
  "Lakshadweep": ["Kavaratti"],
  "Andaman and Nicobar Islands": ["Port Blair"],
  "Dadra and Nagar Haveli": ["Silvassa"],
  "Daman and Diu": ["Daman", "Diu"],
  "Chandigarh": ["Chandigarh", "Mohali", "Panchkula"],
  "Delhi": ["New Delhi", "Delhi", "Dwarka", "Rohini", "Saket"],
};

// Get all major metro cities
export const ALL_METRO_CITIES = Array.from(
  new Set(Object.values(METRO_CITIES).flat())
).sort();

// Get cities by state
export const getCitiesByState = (state: string): string[] => {
  return METRO_CITIES[state] || [];
};

// Get all cities
export const getAllCities = (): string[] => {
  return ALL_METRO_CITIES;
};

// Popular metro cities (top 15)
export const POPULAR_METRO_CITIES = [
  "Mumbai",
  "Delhi",
  "Bangalore",
  "Hyderabad",
  "Chennai",
  "Kolkata",
  "Pune",
  "Ahmedabad",
  "Jaipur",
  "Lucknow",
  "Chandigarh",
  "Gurgaon",
  "Kochi",
  "Surat",
  "Nagpur",
];
