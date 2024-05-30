// routes/brothRoutes.js
const express = require('express');
const router = express.Router();
const brothController = require('../controllers/brothController');

router.get('/', brothController.getBroths);

module.exports = router;
