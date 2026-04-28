const express = require('express');
const router = express.Router();
const { getEmergencyNumbers } = require('../controllers/emergencyController');

router.get('/', getEmergencyNumbers);

module.exports = router;
