const express = require('express');
const mongoose = require('mongoose');

const insightSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    pageUrl: { type: String, required: true },
    title: { type: String },
    summary: { type: String, required: true },
    keyPoints: [{ type: String }],
    category: { type: String },
    toolsRecommended: [{ type: String }],
    affiliateLinks: [{ type: String }],
    shareableLink: { type: String },
    shareableImage: { type: String },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Insight', insightSchema);
