const hospitalService = require('../services/hospitalService');

const getHospitals = (req, res) => {
  try {
    const { city } = req.query;
    const hospitals = hospitalService.getAllHospitals(city);
    res.status(200).json(hospitals);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching hospitals', error: error.message });
  }
};

const getHospitalById = (req, res) => {
  try {
    const { id } = req.params;
    const hospital = hospitalService.getHospitalById(id);
    if (!hospital) {
      return res.status(404).json({ message: 'Hospital not found' });
    }
    res.status(200).json(hospital);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching hospital', error: error.message });
  }
};

module.exports = { getHospitals, getHospitalById };
