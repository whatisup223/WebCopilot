const express = require('express');
const router = express.Router();
const analyzeController = require('../controllers/analyze.controller');

// POST: /api/analyze
router.post('/', analyzeController.analyzePage);
router.post('/url', analyzeController.analyzeUrl);
router.get('/insight/:id', analyzeController.getInsight);

module.exports = router;
