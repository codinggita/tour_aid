import axiosInstance from './axiosInstance';

const mapHospitalData = (h) => ({
  id: h._id || h.id,
  name: h.name,
  image: `/images/hospital${((String(h._id || h.id || "1").charCodeAt(0)) % 3) + 1}.png`,
  rating: h.rating || (4 + Math.random()).toFixed(1),
  reviews: h.reviews || Math.floor(Math.random() * 500) + 50,
  coordinates: h.coordinates || null,
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
    const queryParams = [];
    if (params.lat && params.lng) {
        queryParams.push(`lat=${params.lat}&lng=${params.lng}`);
    } else if (params.city) {
        queryParams.push(`city=${encodeURIComponent(params.city)}`);
    }
    if (params.language) {
        queryParams.push(`language=${encodeURIComponent(params.language)}`);
    }
    if (params.rating) {
        queryParams.push(`rating=${encodeURIComponent(params.rating)}`);
    }
    if (params.sortBy) {
        queryParams.push(`sortBy=${encodeURIComponent(params.sortBy)}`);
    }
    if (params.specialty) {
        queryParams.push(`specialty=${encodeURIComponent(params.specialty)}`);
    }
    const response = await axiosInstance.get(`/hospitals${queryParams.length > 0 ? '?' + queryParams.join('&') : ''}`);
    return response.data.map(mapHospitalData);
};

const hospitalService = {
    getHospitals
};

export default hospitalService;
