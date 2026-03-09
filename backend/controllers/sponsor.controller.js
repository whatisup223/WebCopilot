const Sponsor = require('../models/Sponsor');

const getSponsors = async (req, res) => {
    try {
        const sponsors = await Sponsor.find().sort({ createdAt: -1 });
        res.json({ success: true, sponsors });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

const createSponsor = async (req, res) => {
    try {
        const sponsor = await Sponsor.create(req.body);
        res.json({ success: true, sponsor });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

const updateSponsor = async (req, res) => {
    try {
        const sponsor = await Sponsor.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json({ success: true, sponsor });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

const deleteSponsor = async (req, res) => {
    try {
        await Sponsor.findByIdAndDelete(req.params.id);
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

module.exports = {
    getSponsors,
    createSponsor,
    updateSponsor,
    deleteSponsor
};
