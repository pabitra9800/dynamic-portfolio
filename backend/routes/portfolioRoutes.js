// backend/routes/portfolioRoutes.js
const express = require('express');
const router = express.Router();
const { getProjects } = require('../controllers/portfolioController');

router.get('/projects', getProjects);
module.exports = router;
