const aiService = require('../services/ai.service');
const Insight = require('../models/Insight');
const Setting = require('../models/Setting');
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

const fallbackInsightsPath = path.join(__dirname, '../insights-fallback.json');

const saveFallbackInsight = (insightData) => {
    try {
        let insights = [];
        if (fs.existsSync(fallbackInsightsPath)) {
            insights = JSON.parse(fs.readFileSync(fallbackInsightsPath, 'utf8'));
        }
        let payload = insightData.toObject ? insightData.toObject() : insightData;

        // Convert ObjectID to string for JSON storage if needed
        if (payload._id && payload._id.toString) payload._id = payload._id.toString();

        insights.push(payload);
        if (insights.length > 50) insights.shift();
        fs.writeFileSync(fallbackInsightsPath, JSON.stringify(insights, null, 2));
    } catch (e) { console.error("Error saving fallback insight", e); }
};

const getFallbackInsight = (id) => {
    try {
        if (fs.existsSync(fallbackInsightsPath)) {
            const insights = JSON.parse(fs.readFileSync(fallbackInsightsPath, 'utf8'));
            return insights.find(i => String(i._id) === String(id));
        }
    } catch (e) { }
    return null;
}

const analyzePage = async (req, res) => {
    try {
        const { text, url, language, uiLang } = req.body;

        if (!text) {
            const isAr = uiLang === 'ar';
            return res.status(400).json({ success: false, error: isAr ? 'محتوى الصفحة مطلوب للتحليل. يرجى محاولة تحديث الصفحة.' : 'Page content is required for analysis. Please try refreshing the page.' });
        }

        // Fetch Setting for API Key safely without blocking if DB is down
        let settings = null;
        if (mongoose.connection.readyState === 1) {
            settings = await Setting.findOne();
        } else {
            console.warn("MongoDB is currently offline, instantly falling back to JSON config");
            try { settings = require('../settings-fallback.json'); } catch (e) { }
        }

        let apiKey = settings?.openaiKey || process.env.OPENAI_API_KEY;

        if (!apiKey) {
            const isAr = uiLang === 'ar';
            return res.status(400).json({ success: false, error: isAr ? 'مفتاح OpenAI مفقود. يرجى تهيئته في إعدادات المسؤول.' : 'OpenAI API key is missing. Please configure it in the Admin Settings.' });
        }

        // 1. طلب التحليل الذكي
        const analysisData = await aiService.analyzeText(text, apiKey, settings, language);

        // 2. الحفظ في قاعدة البيانات
        const newInsight = new Insight({
            pageUrl: url || 'Unknown URL',
            title: 'تحليل صفحة ويب',
            summary: analysisData.summary || 'No summary available.',
            keyPoints: analysisData.keyPoints || [],
            toolsRecommended: analysisData.recommendedTools || [],
            labels: analysisData.labels || {},
            shareableLink: analysisData.shareableLink
        });

        // Save to Database securely if online
        if (mongoose.connection.readyState === 1) {
            await newInsight.save();
        } else {
            console.warn("DB offline. Insight not saved persistently, but saved to fallback JSON.");
            saveFallbackInsight(newInsight);
        }

        // 3. إرجاع النتيجة للـ Extension
        res.json({
            success: true,
            data: analysisData,
            insightId: newInsight._id
        });
    } catch (error) {
        console.error("Analysis Error:", error);
        res.status(500).json({ success: false, error: error.message || 'Internal Server Error. Please try again later.' });
    }
};

const analyzeUrl = async (req, res) => {
    try {
        const { url, language, uiLang } = req.body;
        const isAr = uiLang === 'ar';
        if (!url || !url.startsWith('http')) {
            return res.status(400).json({ success: false, error: isAr ? 'يرجى إدخال رابط صالح.' : 'A valid URL is required.' });
        }

        const axios = require('axios');
        let htmlResponse;
        try {
            htmlResponse = await axios.get(url, {
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
                    'Accept-Language': 'en-US,en;q=0.9,ar;q=0.8',
                    'Accept-Encoding': 'gzip, deflate, br',
                    'Cache-Control': 'no-cache',
                    'Pragma': 'no-cache',
                    'Referer': 'https://www.google.com/'
                },
                timeout: 10000
            });
        } catch (botErr) {
            console.error("Scraping Blocked:", botErr.message);
            return res.status(400).json({
                success: false,
                error: 'BLOCK_DETECTED',
                message: isAr ? 'هذا الموقع محمي ضد البوتات. يرجى استخدام إضافة Chrome لتحليله مباشرة.' : 'This site has bot protection. Please use our Chrome Extension to analyze it directly.'
            });
        }

        // Basic Text Extraction
        let text = htmlResponse.data
            .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
            .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
            .replace(/<[^>]+>/g, ' ')
            .replace(/\s+/g, ' ')
            .trim();

        const words = text.split(/\s+/).filter(w => w.length > 0);
        if (words.length < 3) {
            return res.status(400).json({
                success: false,
                isQualityError: true,
                error: isAr ? 'الصفحة فارغة تماماً ولا تحتوي على نصوص للتحليل.' : 'The page is completely empty and contains no text to analyze.'
            });
        }

        text = text.substring(0, 15000); // Guard rails

        let settings = null;
        if (mongoose.connection.readyState === 1) {
            settings = await Setting.findOne();
        } else {
            try { settings = require('../settings-fallback.json'); } catch (e) { }
        }

        let apiKey = settings?.openaiKey || process.env.OPENAI_API_KEY;
        if (!apiKey) return res.status(400).json({ success: false, error: isAr ? 'مفتاح OpenAI مفقود. يرجى تهيئته في إعدادات المسؤول.' : 'OpenAI API key is missing. Please configure it in Admin Settings.' });

        const analysisData = await aiService.analyzeText(text, apiKey, settings, language);

        const newInsight = new Insight({
            pageUrl: url,
            title: 'Live Demo',
            summary: analysisData.summary || 'No summary available.',
            keyPoints: analysisData.keyPoints || [],
            toolsRecommended: analysisData.recommendedTools || [],
            labels: analysisData.labels || {},
            shareableLink: analysisData.shareableLink
        });

        if (mongoose.connection.readyState === 1) {
            await newInsight.save();
        } else {
            console.warn("DB offline. Insight not saved persistently, but saved to fallback JSON.");
            saveFallbackInsight(newInsight);
        }

        res.json({ success: true, data: analysisData, insightId: newInsight._id });
    } catch (error) {
        console.error("Live Demo Analysis Error:", error);
        res.status(500).json({ success: false, error: error.message || 'Error running live demo analysis.' });
    }
};

const getInsight = async (req, res) => {
    try {
        let insight = null;
        if (mongoose.connection.readyState === 1) {
            try { insight = await Insight.findById(req.params.id); } catch (e) { }
        }

        // If not found in DB or DB offline, check fallback
        if (!insight) {
            insight = getFallbackInsight(req.params.id);
        }

        if (!insight) return res.status(404).json({ success: false, error: 'Insight not found' });

        res.json({ success: true, insight });
    } catch (error) {
        console.error("Get Insight Error:", error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
};

module.exports = {
    analyzePage,
    analyzeUrl,
    getInsight
};
