const { OpenAI } = require('openai');

const analyzeText = async (text, apiKey, settings, language = '') => {
    if (!apiKey) {
        throw new Error("مفتاح OpenAI مفقود في إعدادات الخادم");
    }

    const openai = new OpenAI({ apiKey: apiKey });

    let basePrompt = settings?.systemPrompt
        ? settings.systemPrompt
        : `
        You are an intelligent AI assistant integrated into Web Copilot. Your task is to analyze complex web page text and deliver a highly valuable knowledge capsule to the user.
        
        ALWAYS extract the following in pure JSON format:
        1. "summary": A comprehensive summary of the page in 2-3 sentences.
        2. "keyPoints": A list of 3-5 carefully extracted insights.
        3. "recommendedTools": Suggest 2 SaaS tools related to the article topic. MUST be an array of objects: [{"name": "ToolName", "url": "https://xyz.com/?aff=123", "type": "Sponsor"}].
        
        (Reply ONLY with pure JSON without markdown borders)
        `;

    if (language && language.toLowerCase() !== 'auto') {
        basePrompt += `\n\nCRITICAL INSTRUCTION: You MUST translate and write your ENTIRE JSON response (including 'summary', 'keyPoints', and tool descriptions) ONLY in the following language: ${language}. Ensure the output remains structurally valid JSON.`;
    }

    const finalPrompt = `${basePrompt}\n\nText to analyze:\n"${text}"`;

    try {
        const response = await openai.chat.completions.create({
            model: settings?.aiModel || "gpt-4o-mini",
            messages: [{ role: "user", content: finalPrompt }],
            response_format: { type: "json_object" },
            temperature: 0.7,
        });

        const result = JSON.parse(response.choices[0].message.content);

        // توفير رابط فيروسي مبدئي للمشاركة (سيتم استبداله برابط المنصة الفعلي في المستقبل)
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
