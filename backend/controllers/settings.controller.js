const Setting = require('../models/Setting');
const mongoose = require('mongoose');

const getSettings = async (req, res) => {
    try {
        let settings = await Setting.findOne();
        if (!settings) {
            settings = await Setting.create({});
        }
        res.json({ success: true, settings });
    } catch (e) {
        console.error("GET Settings Error:", e);
        res.status(500).json({ success: false, error: 'Failed to fetch settings from MongoDB' });
    }
};

const updateSettings = async (req, res) => {
    try {
        let settings = await Setting.findOne();
        if (!settings) {
            settings = await Setting.create({});
        }

        const updates = req.body;
        // Ensure freeDemoLimit is a number if provided
        if (updates.freeDemoLimit !== undefined) {
            updates.freeDemoLimit = Number(updates.freeDemoLimit);
        }

        Object.assign(settings, updates);

        await settings.save();
        res.json({ success: true, settings });
    } catch (e) {
        console.error("UPDATE Settings Error:", e);
        res.status(500).json({ success: false, error: 'Failed to update settings in MongoDB' });
    }
};

const getPublicSettings = async (req, res) => {
    try {
        // Only attempt DB if connected, otherwise use fallback or default
        let settings = null;
        if (mongoose.connection.readyState === 1) {
            settings = await Setting.findOne().maxTimeMS(2000); // 2s timeout
        }

        const limit = (settings && settings.freeDemoLimit !== undefined) ? Number(settings.freeDemoLimit) : 1;
        res.json({ success: true, freeDemoLimit: limit });
    } catch (err) {
        console.error("Public Settings Error:", err);
        res.json({ success: true, freeDemoLimit: 1 });
    }
};

module.exports = {
    getSettings,
    updateSettings,
    getPublicSettings
};
