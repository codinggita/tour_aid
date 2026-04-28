const hospitals = [
  {
    id: 1,
    name: "AIIMS (All India Institute of Medical Sciences)",
    city: "Delhi",
    address: "Ansari Nagar, New Delhi, Delhi 110029",
    coordinates: { lat: 28.5659, lng: 77.2111 },
    languages: ["English", "Hindi"],
    specialties: ["Cardiology", "Neurology", "Oncology", "Orthopedics", "Pediatrics"],
    isOpen: true,
    consultationFee: 500,
    contactNumber: "+91-11-26588500"
  },
  {
    id: 2,
    name: "Apollo Hospitals Indraprastha",
    city: "Delhi",
    address: "Sarita Vihar, Delhi Mathura Road, New Delhi, Delhi 110076",
    coordinates: { lat: 28.5375, lng: 77.2846 },
    languages: ["English", "Hindi"],
    specialties: ["Cardiac Sciences", "Neurosciences", "Orthopedics", "Emergency Care"],
    isOpen: true,
    consultationFee: 1500,
    contactNumber: "+91-11-29871090"
  },
  {
    id: 3,
    name: "Lilavati Hospital and Research Centre",
    city: "Mumbai",
    address: "A-791, Bandra Reclamation, Bandra (W), Mumbai, Maharashtra 400050",
    coordinates: { lat: 19.0504, lng: 72.8288 },
    languages: ["English", "Hindi", "Marathi"],
    specialties: ["Cardiology", "Gastroenterology", "Orthopedics", "Pediatrics"],
    isOpen: true,
    consultationFee: 1200,
    contactNumber: "+91-22-26751000"
  },
  {
    id: 4,
    name: "Kokilaben Dhirubhai Ambani Hospital",
    city: "Mumbai",
    address: "Rao Saheb Achutrao Patwardhan Marg, Four Bungalows, Andheri West, Mumbai, Maharashtra 400053",
    coordinates: { lat: 19.1314, lng: 72.8252 },
    languages: ["English", "Hindi", "Marathi", "Gujarati"],
    specialties: ["Robotic Surgery", "Oncology", "Neurology", "Cardiac Sciences"],
    isOpen: true,
    consultationFee: 2000,
    contactNumber: "+91-22-30999999"
  },
  {
    id: 5,
    name: "Apollo Hospital International Limited",
    city: "Ahmedabad",
    address: "Plot No. 1A, Bhat GIDC Estate, Gandhinagar, Ahmedabad, Gujarat 382428",
    coordinates: { lat: 23.0975, lng: 72.6102 },
    languages: ["English", "Hindi", "Gujarati"],
    specialties: ["Cardiology", "Neurology", "Orthopedics", "Urology"],
    isOpen: true,
    consultationFee: 1000,
    contactNumber: "+91-79-66701800"
  },
  {
    id: 6,
    name: "Zydus Hospital",
    city: "Ahmedabad",
    address: "Zydus Hospitals Road, SG Highway, Thaltej, Ahmedabad, Gujarat 380054",
    coordinates: { lat: 23.0560, lng: 72.5173 },
    languages: ["English", "Hindi", "Gujarati"],
    specialties: ["Critical Care", "Gastroenterology", "Neurology", "Cardiology"],
    isOpen: true,
    consultationFee: 1200,
    contactNumber: "+91-79-66190201"
  },
  {
    id: 7,
    name: "Fortis Hospital",
    city: "Bangalore",
    address: "154/9, Bannerghatta Road, Opposite IIM-B, Bengaluru, Karnataka 560076",
    coordinates: { lat: 12.8953, lng: 77.5985 },
    languages: ["English", "Hindi", "Kannada"],
    specialties: ["Cardiology", "Urology", "Orthopedics", "Oncology"],
    isOpen: true,
    consultationFee: 800,
    contactNumber: "+91-80-66214444"
  },
  {
    id: 8,
    name: "Manipal Hospital",
    city: "Bangalore",
    address: "98, HAL Old Airport Rd, Kodihalli, Bengaluru, Karnataka 560017",
    coordinates: { lat: 12.9592, lng: 77.6491 },
    languages: ["English", "Hindi", "Kannada", "Tamil"],
    specialties: ["Organ Transplant", "Oncology", "Cardiology", "Neurology"],
    isOpen: true,
    consultationFee: 1000,
    contactNumber: "+91-80-25023222"
  }
];

module.exports = hospitals;
