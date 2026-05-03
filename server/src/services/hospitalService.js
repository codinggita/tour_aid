const hospitals = require('../models/hospitalsData');

// ── Haversine distance in km ──────────────────────────────────────────────────
const haversine = (lat1, lng1, lat2, lng2) => {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
};

// ── GET all (with filters) ────────────────────────────────────────────────────
const getAllHospitals = (query = {}) => {
  let results = [...hospitals];

  if (query.city) {
    results = results.filter(h => h.city.toLowerCase() === query.city.toLowerCase());
  }
  if (query.language) {
    results = results.filter(h => h.languages && h.languages.includes(query.language));
  }
  if (query.rating) {
    results = results.filter(h => h.rating >= parseFloat(query.rating));
  }
  if (query.specialty) {
    results = results.filter(h =>
      h.specialties && h.specialties.map(s => s.toLowerCase()).includes(query.specialty.toLowerCase())
    );
  }
  if (query.lat && query.lng) {
    results = results.map(h => ({
      ...h,
      distance: h.coordinates
        ? haversine(parseFloat(query.lat), parseFloat(query.lng), h.coordinates.lat, h.coordinates.lng)
        : null,
    })).sort((a, b) => (a.distance ?? Infinity) - (b.distance ?? Infinity));
  }
  if (query.sortBy === 'Rating (High to Low)') {
    results.sort((a, b) => b.rating - a.rating);
  } else if (query.sortBy === 'Lowest Fee') {
    results.sort((a, b) => a.consultationFee - b.consultationFee);
  }

  return results;
};

// ── GET by ID ─────────────────────────────────────────────────────────────────
const getHospitalById = (id) => {
  return hospitals.find(h => h.id === parseInt(id, 10));
};

// ── GET by Name ───────────────────────────────────────────────────────────────
const getHospitalByName = (name) => {
  return hospitals.filter(h =>
    h.name.toLowerCase().includes(name.toLowerCase())
  );
};

// ── GET by Location (nearby within radius km) ─────────────────────────────────
const getHospitalsByLocation = (lat, lng, radiusKm = 50) => {
  return hospitals
    .map(h => ({
      ...h,
      distance: h.coordinates
        ? haversine(parseFloat(lat), parseFloat(lng), h.coordinates.lat, h.coordinates.lng)
        : null,
    }))
    .filter(h => h.distance !== null && h.distance <= radiusKm)
    .sort((a, b) => a.distance - b.distance);
};

// ── PUT by ID (full replace) ──────────────────────────────────────────────────
const replaceHospitalById = (id, data) => {
  const index = hospitals.findIndex(h => h.id === parseInt(id, 10));
  if (index === -1) return null;
  hospitals[index] = { id: parseInt(id, 10), ...data };
  return hospitals[index];
};

// ── PATCH by ID (partial update) ──────────────────────────────────────────────
const updateHospitalById = (id, data) => {
  const index = hospitals.findIndex(h => h.id === parseInt(id, 10));
  if (index === -1) return null;
  hospitals[index] = { ...hospitals[index], ...data, id: parseInt(id, 10) };
  return hospitals[index];
};

// ── DELETE by Name ────────────────────────────────────────────────────────────
const deleteHospitalByName = (name) => {
  const index = hospitals.findIndex(h =>
    h.name.toLowerCase().includes(name.toLowerCase())
  );
  if (index === -1) return null;
  const deleted = hospitals.splice(index, 1);
  return deleted[0];
};

// ── DELETE by City (location) ─────────────────────────────────────────────────
const deleteHospitalsByCity = (city) => {
  const before = hospitals.length;
  const deleted = hospitals.filter(h => h.city.toLowerCase() === city.toLowerCase());
  const remaining = hospitals.filter(h => h.city.toLowerCase() !== city.toLowerCase());
  hospitals.length = 0;
  remaining.forEach(h => hospitals.push(h));
  return { deletedCount: before - hospitals.length, deleted };
};

// ── Bulk Create ───────────────────────────────────────────────────────────────
const bulkCreateHospitals = (newHospitals) => {
  if (!Array.isArray(newHospitals) || newHospitals.length === 0) {
    throw new Error('Request body must be a non-empty array of hospitals');
  }
  const requiredFields = ['name', 'city', 'languages', 'specialties'];
  const created = [];
  newHospitals.forEach((hospital, index) => {
    const missing = requiredFields.filter(f => !hospital[f]);
    if (missing.length > 0) {
      throw new Error(`Hospital at index ${index} is missing required fields: ${missing.join(', ')}`);
    }
    const maxId = hospitals.reduce((max, h) => (h.id > max ? h.id : max), 0);
    const newHospital = { id: maxId + 1, ...hospital };
    hospitals.push(newHospital);
    created.push(newHospital);
  });
  return created;
};

module.exports = {
  getAllHospitals,
  getHospitalById,
  getHospitalByName,
  getHospitalsByLocation,
  replaceHospitalById,
  updateHospitalById,
  deleteHospitalByName,
  deleteHospitalsByCity,
  bulkCreateHospitals,
};


