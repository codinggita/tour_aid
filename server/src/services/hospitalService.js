const hospitals = require('../models/hospitalsData');

const getAllHospitals = (query = {}) => {
  let results = [...hospitals];
  
  if (query.city) {
    results = results.filter(h => h.city.toLowerCase() === query.city.toLowerCase());
  }

  if (query.language) {
    results = results.filter(h => 
      h.languages && h.languages.includes(query.language)
    );
  }

  if (query.rating) {
    results = results.filter(h => h.rating >= parseFloat(query.rating));
  }
  
  if (query.specialty) {
    results = results.filter(h => 
      h.specialties && h.specialties.map(s => s.toLowerCase()).includes(query.specialty.toLowerCase())
    );
  }
  
  if (query.sortBy === 'Rating (High to Low)') {
    results.sort((a, b) => b.rating - a.rating);
  } else if (query.sortBy === 'Lowest Fee') {
    results.sort((a, b) => a.consultationFee - b.consultationFee);
  }
  
  return results;
};

const getHospitalById = (id) => {
  return hospitals.find(h => h.id === parseInt(id, 10));
};

module.exports = {
  getAllHospitals,
  getHospitalById
};
