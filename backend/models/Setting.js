const mongoose = require('mongoose');

const settingSchema = new mongoose.Schema({
    openaiKey: { type: String, default: '' },
    aiModel: { type: String, default: 'gpt-4o' },
    systemPrompt: { type: String, default: 'You are an intelligent AI assistant integrated into Web Copilot. Your task is to analyze complex web page text and deliver a highly valuable knowledge capsule to the user.\n\nALWAYS extract the following in pure JSON format:\n1. "summary": A comprehensive summary of the page in 2-3 sentences.\n2. "keyPoints": A list of 3-5 carefully extracted insights.\n3. "recommendedTools": Suggest 2 SaaS tools related to the article topic. MUST be an array of objects: [{"name": "ToolName", "url": "https://xyz.com/?aff=123", "type": "Sponsor"}].\n\n(Reply ONLY with pure JSON without markdown borders)' },
    siteName: { type: String, default: 'Web Copilot' },
    freeDemoLimit: { type: Number, default: 1 },
    siteDescription: { type: String, default: 'The smart AI assistant to summarize everything.' },
    stripePubKey: { type: String, default: '' },
    stripeSecKey: { type: String, default: '' },
    stripeWebhookSecret: { type: String, default: '' },
    adsEnabled: { type: Boolean, default: true },
    topBannerScript: { type: String, default: '' }
}, {
    timestamps: true
});

module.exports = mongoose.model('Setting', settingSchema);
