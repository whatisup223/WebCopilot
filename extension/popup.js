document.addEventListener('DOMContentLoaded', () => {
    const startScreen = document.getElementById('start-screen');
    const loading = document.getElementById('loading');
    const results = document.getElementById('results');
    const errorState = document.getElementById('error');

    document.getElementById('analyzeBtn').addEventListener('click', async () => {
        const selectedLanguage = document.getElementById('langSelect').value;

        if (selectedLanguage === 'Arabic') {
            document.body.classList.add('lang-ar');
        } else {
            document.body.classList.remove('lang-ar');
        }

        startScreen.classList.add('hidden');
        errorState.classList.add('hidden');
        loading.classList.remove('hidden');

        // Progress Animation
        const progressBar = document.getElementById('progressBar');
        const mainText = document.getElementById('loadingMainText');
        const subText = document.getElementById('loadingSubText');

        const messages = selectedLanguage === 'Arabic' ? [
            { main: "جاري التحليل...", sub: "نهيئ محرك الذكاء الاصطناعي" },
            { main: "استخراج البيانات...", sub: "نبحث عن الذهب في الكلمات" },
            { main: "تصفية الأفكار...", sub: "نستخلص الزبدة من المحتوى" },
            { main: "تجهيز الكبسولة...", sub: "ثوانٍ وتكون المعرفة بين يديك" }
        ] : [
            { main: "Initializing AI...", sub: "Waking up the neural networks" },
            { main: "Extracting Content...", sub: "Finding the gold in the noise" },
            { main: "Brainstorming...", sub: "Filtering for high-impact insights" },
            { main: "Finalizing...", sub: "Your knowledge capsule is almost ready" }
        ];

        let currentProgress = 0;
        let msgIdx = 0;
        const progressInterval = setInterval(() => {
            if (currentProgress < 92) {
                currentProgress += Math.random() * 8;
                progressBar.style.width = currentProgress + '%';

                if (currentProgress > (msgIdx + 1) * 25) {
                    msgIdx = Math.min(msgIdx + 1, messages.length - 1);
                    mainText.innerText = messages[msgIdx].main;
                    subText.innerText = messages[msgIdx].sub;
                }
            }
        }, 800);

        try {
            const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

            const response = await new Promise((resolve, reject) => {
                chrome.tabs.sendMessage(tab.id, { action: "extract" }, (res) => {
                    if (chrome.runtime.lastError) {
                        reject(new Error("Cannot read this page. Make sure it's a valid article."));
                    } else {
                        resolve(res);
                    }
                });
            });

            if (!response || !response.text) throw new Error("No readable text found on this page.");

            const req = await fetch('http://localhost:5000/api/analyze', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    text: response.text,
                    url: tab.url,
                    title: tab.title,
                    userId: "demo_user",
                    language: selectedLanguage,
                    uiLang: 'en'
                })
            });

            const data = await req.json();

            // Finish Progress
            clearInterval(progressInterval);
            progressBar.style.width = '100%';

            if (!data.success) throw new Error(data.error || "Analysis failed.");

            const isAr = selectedLanguage === 'Arabic';

            // Apply RTL/LTR to the whole extension
            document.body.dir = data.data.labels?.dir || (isAr ? 'rtl' : 'ltr');

            // Update Labels if provided by AI
            if (data.data.labels) {
                document.querySelector('.result-box:nth-child(1) h3').innerHTML = `<span>📝</span> ${data.data.labels.summary || 'AI Summary'}`;
                document.querySelector('.result-box:nth-child(2) h3').innerHTML = `<span>💡</span> ${data.data.labels.keyPoints || 'Key Takeaways'}`;
                document.querySelector('.result-box.tools-box h3').innerHTML = `<span>🛠️</span> ${data.data.labels.recommendedTools || 'Useful Tools'}`;
            }

            document.getElementById('summaryText').innerText = data.data.summary;

            const keyPointsList = document.getElementById('keyPointsList');
            keyPointsList.innerHTML = (data.data.keyPoints || []).map(p => `
                <li class="flex items-start gap-2">
                    <span class="text-orange-500 mt-0.5 text-[8px]">⭕</span> 
                    <span class="leading-relaxed">${p}</span>
                </li>
            `).join('');

            const toolsList = document.getElementById('toolsList');
            toolsList.innerHTML = (data.data.recommendedTools || data.data.suggestedTools || []).map(t => {
                const targetUrl = t.url || t.link || '';
                if (!targetUrl || targetUrl === '#') {
                    return `<div class="block w-full p-2.5 bg-white border border-slate-100 rounded-xl text-[10px] font-bold text-center text-slate-500 truncate cursor-help" title="No link provided by AI">${t.name}</div>`;
                }
                return `
                <a href="${targetUrl}" target="_blank" class="block w-full p-2.5 bg-white border border-orange-100 rounded-xl text-[10px] font-bold text-center text-slate-700 hover:border-orange-500 hover:text-orange-600 hover:shadow-md transition-all truncate">
                    ${t.name}
                </a>`;
            }).join('');

            const shareBtn = document.getElementById('shareBtn');
            const defaultCopyText = data.data.labels?.copyLink || (isAr ? '🔗 نسخ الرابط' : '🔗 Copy Viral Link');
            const successCopyText = data.data.labels?.copied || (isAr ? "✅ تم النسخ!" : "✅ Copied!");

            shareBtn.innerHTML = `🔗 ${defaultCopyText.replace('🔗 ', '')}`;

            shareBtn.onclick = () => {
                const viralLink = `http://localhost:3000/insight/${data.insightId}`;

                // Force copy natively in modern browsers
                if (navigator.clipboard && navigator.clipboard.writeText) {
                    navigator.clipboard.writeText(viralLink).catch(e => console.error("Clipboard API err:", e));
                }

                // Fallback for iframe restrictions
                window.parent.postMessage({ action: 'copy-to-clipboard', text: viralLink }, '*');

                shareBtn.innerHTML = `✅ ${successCopyText.replace('✅ ', '')}`;
                shareBtn.classList.add('bg-green-600', 'hover:bg-green-700');
                shareBtn.classList.remove('bg-slate-900', 'hover:bg-slate-800');

                setTimeout(() => {
                    shareBtn.innerHTML = `🔗 ${defaultCopyText.replace('🔗 ', '')}`;
                    shareBtn.classList.remove('bg-green-600', 'hover:bg-green-700');
                    shareBtn.classList.add('bg-slate-900', 'hover:bg-slate-800');
                }, 2000);
            };

            loading.classList.add('hidden');
            results.classList.remove('hidden');

        } catch (err) {
            console.error(err);
            document.getElementById('errorText').innerText = err.message || "An unexpected error occurred.";
            loading.classList.add('hidden');
            errorState.classList.remove('hidden');
        }
    });

    document.getElementById('retryBtn').addEventListener('click', () => {
        errorState.classList.add('hidden');
        startScreen.classList.remove('hidden');
    });
});
