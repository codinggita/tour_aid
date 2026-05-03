const express = require('express');
const router = express.Router();
const {
  getHospitals,
  getHospitalById,
  getHospitalByName,
  getHospitalsByLocation,
  replaceHospital,
  patchHospital,
  deleteByName,
  deleteByCity,
  bulkAddHospitals,
} = require('../controllers/hospitalController');

// ── Named / static routes first (before /:id) ────────────────────────────────
router.get('/search', getHospitalByName);       // GET /api/hospitals/search?name=AIIMS
router.get('/nearby', getHospitalsByLocation);  // GET /api/hospitals/nearby?lat=28.56&lng=77.21
router.post('/bulk', bulkAddHospitals);         // POST /api/hospitals/bulk
router.delete('/name', deleteByName);           // DELETE /api/hospitals/name?name=AIIMS
router.delete('/location', deleteByCity);       // DELETE /api/hospitals/location?city=Delhi

// ── Dynamic :id routes ────────────────────────────────────────────────────────
router.get('/', getHospitals);                  // GET /api/hospitals
router.get('/:id', getHospitalById);            // GET /api/hospitals/1
router.put('/:id', replaceHospital);            // PUT /api/hospitals/1
router.patch('/:id', patchHospital);            // PATCH /api/hospitals/1

module.exports = router;
