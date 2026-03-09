const { OpenAI } = require('openai');
const Sponsor = require('../models/Sponsor');

const analyzeText = async (text, apiKey, settings, language = '') => {
    if (!apiKey) {
        throw new Error("مفتاح OpenAI مفقود في إعدادات الخادم");
    }

    const openai = new OpenAI({ apiKey: apiKey });

    // Fetch active sponsors from MongoDB
    let dbSponsors = [];
    try {
        dbSponsors = await Sponsor.find({ active: true });
    } catch (err) {
        console.error("Error fetching sponsors from MongoDB for AI:", err);
    }

    let basePrompt = settings?.systemPrompt ? settings.systemPrompt : `
        You are an intelligent AI assistant. Analyze the text and provide a knowledge capsule.
        Extract: "summary", "keyPoints", and "recommendedTools".
    `;

    const mandatoryInstructions = `
    RESPONSE STRUCTURE:
    Return a JSON object with:
    - "summary": string (2-3 sentences)
    - "keyPoints": string array (3-5 items)
    - "recommendedTools": array of objects {name, url}. You MUST ensure this array has 2-3 items.
    - "labels": object containing translated UI strings in the exact same language as the analysis:
        - "summary": string (Translated "AI Summary")
        - "keyPoints": string (Translated "Core Insights")
        - "recommendedTools": string (Translated "Smart Tools")
        - "noTools": string (Translated "No tools found for this context")
        - "shareLink": string (Translated "SHARE LINK" - short and uppercase if applicable)
        - "copyLink": string (Translated "Copy link")
        - "copied": string (Translated "Copied!")
        - "loveSummary": string (Translated "Love the summary?")
        - "getExtension": string (Translated "Get the free extension to summarize unlimited tabs in real-time.")
        - "addToBrowser": string (Translated "Add to Browser")
        - "dir": string (Must be "rtl" if the output language is Arabic, Hebrew, Urdu, Persian, otherwise "ltr")
    `;

    // Intelligent Sponsor Integration
    let sponsorSection = "";
    if (dbSponsors && dbSponsors.length > 0) {
        const sponsorsList = dbSponsors.map(s => `- ${s.name} (Category: ${s.category}): ${s.url}`).join('\n');
        sponsorSection = `
        INTERNAL TOOLS DIRECTORY (MANDATORY PRIORITY):
        ${sponsorsList}

        INSTRUCTION FOR SMART SELECTION:
        1. Deeply analyze the webpage content and intent.
        2. Pick 2-3 tools from the INTERNAL list above that best match the content's niche (SEO, Design, Marketing, etc.).
        3. If any internal tool is even tangentially related, use it.
        4. ONLY if the internal list is empty or completely irrelevant (e.g., a cooking blog with only crypto tools), suggest world-class external SaaS tools (like Canva, Semrush, or generic productivity tools).
        `;
    } else {
        sponsorSection = `\n\nINSTRUCTION FOR TOOLS: Since the internal directory is empty, suggest 2-3 world-class SaaS tools or digital resources (e.g., Google Trends, Canva, Notion) that are highly relevant to the provided text to add value to the user.`;
    }

    let langInstruction = (language && language.toLowerCase() !== 'auto')
        ? `\n\nCRITICAL: Write the ENTIRE response in ${language}.`
        : "";

    const finalPrompt = `
    ${basePrompt}
    ${mandatoryInstructions}
    ${sponsorSection}
    ${langInstruction}
    
    TEXT TO ANALYZE:
    "${text.substring(0, 10000)}"
    `;

    try {
        const response = await openai.chat.completions.create({
            model: settings?.aiModel || "gpt-4o-mini",
            messages: [
                { role: "system", content: "You are a helpful assistant that summarizes web content. Provide the most useful summary, key points and tools based on the text provided, regardless of its length." },
                { role: "user", content: finalPrompt }
            ],
            response_format: { type: "json_object" },
            temperature: 0.4,
        });

        const result = JSON.parse(response.choices[0].message.content);
        result.shareableLink = "https://yourdomain.com/insight/" + Date.now().toString(36);
        return result;
    } catch (error) {
        console.error("OpenAI Error:", error);
        let errorMsg = "Internal AI Server Error";
        if (error.status === 401) {
            errorMsg = "Invalid OpenAI API Key (401). Please verify your key in Admin Settings.";
        } else if (error.status === 429) {
            errorMsg = "OpenAI Quota Exceeded (429). Please check your OpenAI billing account.";
        } else if (error.message) {
            errorMsg = "OpenAI Error: " + error.message;
        }
        throw new Error(errorMsg);
    }
};

module.exports = {
    analyzeText
};
