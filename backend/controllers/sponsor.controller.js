const Sponsor = require('../models/Sponsor');

const getSponsors = async (req, res) => {
    try {
        const sponsors = await Sponsor.find().sort({ createdAt: -1 });
        res.json({ success: true, sponsors });
    } catch (error) {
        console.error("GET Sponsors Error:", error);
        res.status(500).json({ success: false, error: error.message });
    }
};

const createSponsor = async (req, res) => {
    try {
        console.log("Creating Sponsor in MongoDB:", req.body);
        const sponsor = await Sponsor.create(req.body);
        res.json({ success: true, sponsor });
    } catch (error) {
        console.error("POST Sponsor Error:", error);
        res.status(500).json({ success: false, error: error.message });
    }
};

const updateSponsor = async (req, res) => {
    try {
        console.log("Updating Sponsor in MongoDB ID:", req.params.id);
        const sponsor = await Sponsor.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json({ success: true, sponsor });
    } catch (error) {
        console.error("PUT Sponsor Error:", error);
        res.status(500).json({ success: false, error: error.message });
    }
};

const deleteSponsor = async (req, res) => {
    try {
        console.log("Deleting Sponsor from MongoDB ID:", req.params.id);
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
