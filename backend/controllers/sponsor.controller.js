const Sponsor = require('../models/Sponsor');
const mongoose = require('mongoose');

const getSponsors = async (req, res) => {
    if (mongoose.connection.readyState !== 1) {
        return res.json({ success: true, sponsors: [] }); // Return empty if DB offline
    }
    try {
        const sponsors = await Sponsor.find().sort({ createdAt: -1 });
        res.json({ success: true, sponsors });
    } catch (error) {
        console.error("GET Sponsors Error:", error);
        res.status(500).json({ success: false, error: error.message });
    }
};

const createSponsor = async (req, res) => {
    if (mongoose.connection.readyState !== 1) {
        return res.status(500).json({ success: false, error: "Database offline. Cannot save sponsor." });
    }
    try {
        console.log("Creating Sponsor with body:", req.body);
        const sponsor = await Sponsor.create(req.body);
        res.json({ success: true, sponsor });
    } catch (error) {
        console.error("POST Sponsor Error:", error);
        res.status(500).json({ success: false, error: error.message });
    }
};

const updateSponsor = async (req, res) => {
    if (mongoose.connection.readyState !== 1) {
        return res.status(500).json({ success: false, error: "Database offline" });
    }
    try {
        console.log("Updating Sponsor ID:", req.params.id, "with body:", req.body);
        const sponsor = await Sponsor.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json({ success: true, sponsor });
    } catch (error) {
        console.error("PUT Sponsor Error:", error);
        res.status(500).json({ success: false, error: error.message });
    }
};

const deleteSponsor = async (req, res) => {
    if (mongoose.connection.readyState !== 1) {
        return res.status(500).json({ success: false, error: "Database offline" });
    }
    try {
        console.log("Deleting Sponsor ID:", req.params.id);
        await Sponsor.findByIdAndDelete(req.params.id);
        res.json({ success: true });
    } catch (error) {
        console.error("DELETE Sponsor Error:", error);
        res.status(500).json({ success: false, error: error.message });
    }
};

module.exports = {
    getSponsors,
    createSponsor,
    updateSponsor,
    deleteSponsor
};
