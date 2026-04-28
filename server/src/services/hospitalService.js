const hospitals = require('../models/hospitalsData');

const getAllHospitals = (city) => {
  if (city) {
    return hospitals.filter(h => h.city.toLowerCase() === city.toLowerCase());
  }
  return hospitals;
};

const getHospitalById = (id) => {
  return hospitals.find(h => h.id === parseInt(id, 10));
};

module.exports = {
  getAllHospitals,
  getHospitalById
};
