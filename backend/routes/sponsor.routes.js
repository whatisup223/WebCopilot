const express = require('express');
const router = express.Router();
const sponsorController = require('../controllers/sponsor.controller');

router.get('/', sponsorController.getSponsors);
router.post('/', sponsorController.createSponsor);
router.put('/:id', sponsorController.updateSponsor);
router.delete('/:id', sponsorController.deleteSponsor);

module.exports = router;
