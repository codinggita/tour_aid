const express = require('express');
const { submitSupportRequest } = require('../controllers/supportController');

const router = express.Router();

router.post('/', submitSupportRequest);

module.exports = router;
