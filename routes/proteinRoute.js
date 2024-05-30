const express = require('express');
const router = express.Router();
const proteinController = require('../controllers/proteinController');

router.get('/', proteinController.getProteins);

module.exports = router;