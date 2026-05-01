const API_URL = 'http://localhost:5000/api';

// Helper function to map backend data to frontend UI expectations
const mapHospitalData = (h) => ({
  id: h.id,
  name: h.name,
  image: `/images/hospital${(h.id % 3) + 1}.png`, // Mock image since backend has none
  rating: (Math.random() * (5 - 4) + 4).toFixed(1), // Mock rating between 4.0 and 5.0
  reviews: Math.floor(Math.random() * 500) + 50,
  distance: `${(Math.random() * 5 + 1).toFixed(1)} km`, // Mock distance
  location: `${h.city}, ${h.address.split(',').slice(-2, -1)[0]?.trim() || h.city}`,
  languages: h.languages || [],
  fee: `₹${h.consultationFee}`,
  specialties: h.specialties || [],
  openNow: h.isOpen,
  contactNumber: h.contactNumber,
  address: h.address
});

export const fetchHospitals = async () => {
  const response = await fetch(`${API_URL}/hospitals`);
  if (!response.ok) throw new Error('Failed to fetch hospitals');
  const data = await response.json();
  return data.map(mapHospitalData);
};

export const fetchHospitalById = async (id) => {
  const response = await fetch(`${API_URL}/hospitals/${id}`);
  if (!response.ok) throw new Error('Failed to fetch hospital');
  const data = await response.json();
  return mapHospitalData(data);
};

export const fetchEmergencyNumbers = async () => {
  const response = await fetch(`${API_URL}/emergency`);
  if (!response.ok) throw new Error('Failed to fetch emergency numbers');
  return response.json();
};
