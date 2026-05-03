const hospitals = require('../models/hospitalsData');

const getAllHospitals = (query = {}) => {
  let results = hospitals;
  
  if (query.city) {
    results = results.filter(h => h.city.toLowerCase() === query.city.toLowerCase());
  }

  if (query.language) {
    results = results.filter(h => 
      h.languages && h.languages.includes(query.language)
    );
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
