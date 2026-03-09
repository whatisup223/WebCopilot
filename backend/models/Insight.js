const express = require('express');
const mongoose = require('mongoose');

const insightSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    pageUrl: { type: String, required: true },
    title: { type: String },
    summary: { type: String, required: true },
    keyPoints: [{ type: String }],
    category: { type: String },
    toolsRecommended: [
        {
            name: { type: String },
            url: { type: String }
        }
    ],
    affiliateLinks: [{ type: String }],
    shareableLink: { type: String },
    labels: {
        summary: { type: String, default: 'AI Summary' },
        keyPoints: { type: String, default: 'Key Takeaways' },
        recommendedTools: { type: String, default: 'Useful Tools' },
        noTools: { type: String, default: 'No tools found for this context' },
        shareLink: { type: String, default: 'SHARE LINK' },
        copyLink: { type: String, default: 'Copy link' },
        copied: { type: String, default: 'Copied!' },
        loveSummary: { type: String, default: 'Love the summary?' },
        getExtension: { type: String, default: 'Get the free extension to summarize unlimited tabs in real-time.' },
        addToBrowser: { type: String, default: 'Add to Browser' },
        dir: { type: String, default: 'ltr', enum: ['ltr', 'rtl'] }
    },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Insight', insightSchema);
