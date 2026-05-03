import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const mapHospitalData = (h) => ({
  id: h._id || h.id,
  name: h.name,
  image: `/images/hospital${((String(h._id || h.id || "1").charCodeAt(0)) % 3) + 1}.png`,
  rating: (4 + Math.random()).toFixed(1),
  reviews: Math.floor(Math.random() * 500) + 50,
  distance: h.distance,
  location: `${h.city}, ${h.address?.split(',').slice(-2, -1)[0]?.trim() || h.city}`,
  languages: h.languages || [],
  fee: `₹${h.consultationFee}`,
  specialties: h.specialties || [],
  openNow: h.isOpen,
  contactNumber: h.contactNumber,
  address: h.address
});

const getHospitals = async (params = {}) => {
    let url = `${API_URL}/hospitals`;
    const queryParams = [];
    if (params.city) queryParams.push(`city=${encodeURIComponent(params.city)}`);
    if (params.lat && params.lng) {
        queryParams.push(`lat=${params.lat}&lng=${params.lng}`);
    }
    if (queryParams.length > 0) {
        url += `?${queryParams.join('&')}`;
    }
    const response = await axios.get(url);
    return response.data.map(mapHospitalData);
};

const hospitalService = {
    getHospitals
};

export default hospitalService;
