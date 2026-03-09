const Setting = require('../models/Setting');
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const fallbackPath = path.join(__dirname, '../settings-fallback.json');

const getFallbackSettings = () => {
    try {
        return JSON.parse(fs.readFileSync(fallbackPath, 'utf8'));
    } catch (e) {
        return {
            siteName: 'Web Copilot', siteDescription: '', openaiKey: '', aiModel: 'gpt-4o',
            systemPrompt: 'You are an intelligent AI assistant integrated into Web Copilot. Your task is to analyze complex web page text and deliver a highly valuable knowledge capsule to the user.\n\nALWAYS extract the following in pure JSON format:\n1. "summary": A comprehensive summary of the page in 2-3 sentences.\n2. "keyPoints": A list of 3-5 carefully extracted insights.\n3. "recommendedTools": Suggest 2 useful tools or resources related to the article topic. Return them as objects: [{"name": "ToolName", "url": "URL"}].\n\n(Reply ONLY with pure JSON without markdown borders)',
            freeDemoLimit: 1,
            sponsors: []
        };
    }
};

const getSettings = async (req, res) => {
    if (mongoose.connection.readyState !== 1) {
        console.warn("Database offline. Returning fallback settings instantly...");
        return res.json({ success: true, settings: getFallbackSettings() });
    }

    try {
        let settings = await Setting.findOne();
        if (!settings) {
            settings = await Setting.create({});
        }
        res.json({ success: true, settings });
    } catch (e) {
        res.status(500).json({ success: false, error: 'Failed to fetch settings' });
    }
};

const updateSettings = async (req, res) => {
    if (mongoose.connection.readyState !== 1) {
        const current = getFallbackSettings();
        const updated = { ...current, ...req.body };
        fs.writeFileSync(fallbackPath, JSON.stringify(updated, null, 2));
        return res.json({ success: true, settings: updated });
    }

    try {
        let settings = await Setting.findOne();
        if (!settings) {
            settings = await Setting.create({});
        }

        const updates = req.body;
        Object.assign(settings, updates);

        await settings.save();
        res.json({ success: true, settings });
    } catch (e) {
        res.status(500).json({ success: false, error: 'Failed to update settings' });
    }
};

const getPublicSettings = async (req, res) => {
    let limit = 1;
    if (mongoose.connection.readyState !== 1) {
        const fall = getFallbackSettings();
        limit = fall.freeDemoLimit !== undefined ? Number(fall.freeDemoLimit) : 1;
    } else {
        try {
            const settings = await Setting.findOne();
            if (settings && settings.freeDemoLimit !== undefined) {
                limit = Number(settings.freeDemoLimit);
            }
        } catch (err) { }
    }
    return res.json({ success: true, freeDemoLimit: limit });
};

module.exports = {
    getSettings,
    updateSettings,
    getPublicSettings
};
