const hospitalService = require('../services/hospitalService');

// GET all (with filters)
const getHospitals = (req, res) => {
  try {
    const hospitals = hospitalService.getAllHospitals(req.query);
    res.status(200).json(hospitals);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching hospitals', error: error.message });
  }
};

// GET by ID
const getHospitalById = (req, res) => {
  try {
    const hospital = hospitalService.getHospitalById(req.params.id);
    if (!hospital) return res.status(404).json({ message: 'Hospital not found' });
    res.status(200).json(hospital);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching hospital', error: error.message });
  }
};

// GET by Name  →  GET /api/hospitals/search?name=AIIMS
const getHospitalByName = (req, res) => {
  const { name } = req.query;
  if (!name) return res.status(400).json({ message: 'Query param "name" is required' });
  const results = hospitalService.getHospitalByName(name);
  if (results.length === 0) return res.status(404).json({ message: 'No hospitals found with that name' });
  res.status(200).json(results);
};

// GET by Location  →  GET /api/hospitals/nearby?lat=28.56&lng=77.21&radius=50
const getHospitalsByLocation = (req, res) => {
  const { lat, lng, radius } = req.query;
  if (!lat || !lng) return res.status(400).json({ message: 'Query params "lat" and "lng" are required' });
  const results = hospitalService.getHospitalsByLocation(lat, lng, radius ? parseFloat(radius) : 50);
  res.status(200).json(results);
};

// PUT by ID (full replace)
const replaceHospital = (req, res) => {
  try {
    const updated = hospitalService.replaceHospitalById(req.params.id, req.body);
    if (!updated) return res.status(404).json({ message: 'Hospital not found' });
    res.status(200).json({ message: 'Hospital replaced successfully', data: updated });
  } catch (error) {
    res.status(500).json({ message: 'Error replacing hospital', error: error.message });
  }
};

// PATCH by ID (partial update)
const patchHospital = (req, res) => {
  try {
    const updated = hospitalService.updateHospitalById(req.params.id, req.body);
    if (!updated) return res.status(404).json({ message: 'Hospital not found' });
    res.status(200).json({ message: 'Hospital updated successfully', data: updated });
  } catch (error) {
    res.status(500).json({ message: 'Error updating hospital', error: error.message });
  }
};

// DELETE by Name  →  DELETE /api/hospitals/name?name=AIIMS
const deleteByName = (req, res) => {
  const { name } = req.query;
  if (!name) return res.status(400).json({ message: 'Query param "name" is required' });
  const deleted = hospitalService.deleteHospitalByName(name);
  if (!deleted) return res.status(404).json({ message: 'No hospital found with that name' });
  res.status(200).json({ message: 'Hospital deleted successfully', data: deleted });
};

// DELETE by City  →  DELETE /api/hospitals/location?city=Delhi
const deleteByCity = (req, res) => {
  const { city } = req.query;
  if (!city) return res.status(400).json({ message: 'Query param "city" is required' });
  const result = hospitalService.deleteHospitalsByCity(city);
  if (result.deletedCount === 0) return res.status(404).json({ message: 'No hospitals found in that city' });
  res.status(200).json({ message: `${result.deletedCount} hospital(s) deleted from ${city}`, data: result.deleted });
};

// POST bulk
const bulkAddHospitals = (req, res) => {
  try {
    const created = hospitalService.bulkCreateHospitals(req.body);
    res.status(201).json({ message: `${created.length} hospital(s) added successfully`, data: created });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getHospitals,
  getHospitalById,
  getHospitalByName,
  getHospitalsByLocation,
  replaceHospital,
  patchHospital,
  deleteByName,
  deleteByCity,
  bulkAddHospitals,
};
