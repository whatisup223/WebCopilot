const express = require('express');
const router = express.Router();
const settingsController = require('../controllers/settings.controller');

router.get('/', settingsController.getSettings);
router.post('/', settingsController.updateSettings);
router.get('/public', settingsController.getPublicSettings);

module.exports = router;
