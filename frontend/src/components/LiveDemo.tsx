"use client";
import { useState, useEffect } from 'react';
import { Bot, Sparkles, Link as LinkIcon, Lock, ArrowRight, Loader2, Share2 } from 'lucide-react';

export default function LiveDemo({ isAr }: { isAr: boolean }) {
    const [url, setUrl] = useState('');
    const [language, setLanguage] = useState('Auto');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [result, setResult] = useState<any>(null);
    const [demoCount, setDemoCount] = useState(0);
    const [demoLimit, setDemoLimit] = useState(1);
    const [showLock, setShowLock] = useState(false);
    const [copied, setCopied] = useState(false);

    const getApiUrl = (path: string) => {
        if (typeof window !== 'undefined') {
            return `http://${window.location.hostname}:5000${path}`;
        }
        return `http://localhost:5000${path}`;
    };

    useEffect(() => {
        // Fetch public settings for dynamic limit
        fetch(getApiUrl('/api/settings/public'))
            .then(res => res.json())
            .then(data => {
                if (data.success && data.freeDemoLimit !== undefined) {
                    setDemoLimit(Number(data.freeDemoLimit));
                }
            })
            .catch(err => console.error("Could not fetch demo limit", err));

        if (typeof window !== 'undefined') {
            const used = parseInt(localStorage.getItem('webcopilot_demo_count') || '0', 10);
            setDemoCount(used);
        }
    }, []);

    const isLocked = demoCount >= demoLimit;

    const handleAnalyze = async () => {
        if (!url || !url.startsWith('http')) {
            setError(isAr ? 'يرجى إدخال رابط صالح يبدأ بـ http' : 'Please enter a valid URL (http/https).');
            return;
        }

        if (isLocked) {
            setShowLock(true);
            return;
        }

        setLoading(true);
        setError('');
        setShowLock(false);

        try {
            const res = await fetch(getApiUrl('/api/analyze/url'), {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ url, language })
            });
            const data = await res.json();
            if (!data.success) throw new Error(data.error || 'Failed to analyze url');

            setResult(data);
            if (typeof window !== 'undefined') {
                const newCount = demoCount + 1;
                localStorage.setItem('webcopilot_demo_count', newCount.toString());
                setDemoCount(newCount);
            }
        } catch (err: any) {
            setError(err.message || 'Analysis failed. Make sure backend is running.');
        } finally {
            setLoading(false);
        }
    };

    const handleCopy = () => {
        if (result?.insightId) {
            const baseUrl = typeof window !== 'undefined' ? `${window.location.protocol}//${window.location.host}` : 'http://localhost:3000';
            const textToCopy = `${baseUrl}/insight/${result.insightId}`;

            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(textToCopy)
                    .then(() => {
                        setCopied(true);
                        setTimeout(() => setCopied(false), 2000);
                    })
                    .catch(() => fallbackCopy(textToCopy));
            } else {
                fallbackCopy(textToCopy);
            }
        }
    };

    const fallbackCopy = (text: string) => {
        const textArea = document.createElement("textarea");
        textArea.value = text;
        textArea.style.position = "fixed";
        textArea.style.left = "-9999px";
        textArea.style.top = "0";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        try {
            document.execCommand('copy');
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Fallback copy failed', err);
        }
        document.body.removeChild(textArea);
    };

    return (
        <div className="relative w-full max-w-4xl mx-auto mt-24">
            <div className="text-center mb-10">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-50 text-orange-600 rounded-full font-bold text-sm mb-4 border border-orange-100">
                    <Sparkles className="w-4 h-4" />
                    {isAr ? 'تجربة حية' : 'LIVE DEMO'}
                </div>
                <h2 className="text-3xl md:text-5xl font-black text-slate-800 mb-4">
                    {isAr ? 'جرّب الذكاء الاصطناعي الآن' : 'Try the AI Engine Yourself'}
                </h2>
                <p className="text-slate-500 font-medium text-lg max-w-2xl mx-auto">
                    {isAr ? 'ألصق أي رابط مقال أو تدوينة إنجليزية أو عربية وسنقوم بتحليلها واستخراج الزبدة فوراً.' : 'Paste any article or blog post URL below and watch our AI instantly summarize and extract knowledge.'}
                </p>
            </div>

            <div className="glass-card rounded-[2rem] p-6 shdow-xl border border-white/50 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-orange-400/20 to-red-400/20 blur-[50px] -z-10 rounded-full"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-orange-400/20 to-red-400/20 blur-[50px] -z-10 rounded-full"></div>

                <div className="flex flex-col md:flex-row gap-4 items-center mb-2 z-10 relative">
                    <div className="relative w-full flex-grow">
                        <LinkIcon className={`absolute top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 ${isAr ? 'right-4' : 'left-4'}`} />
                        <input
                            type="text"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            placeholder={isAr ? 'https://example.com/blog/article...' : 'https://example.com/blog/article...'}
                            className={`w-full py-4 md:py-5 rounded-2xl border-2 border-slate-100 bg-white/70 focus:bg-white focus:border-orange-500 outline-none transition-all shadow-sm text-slate-700 font-medium ${isAr ? 'pr-12 pl-4 text-right rtl' : 'pl-12 pr-4 ltr'} md:text-lg`}
                            dir={isAr ? "rtl" : "ltr"}
                        />
                    </div>
                    <select
                        value={language}
                        onChange={(e) => setLanguage(e.target.value)}
                        className={`py-4 md:py-5 px-4 rounded-2xl border-2 border-slate-100 bg-white/70 focus:bg-white focus:border-orange-500 outline-none transition-all shadow-sm text-slate-700 font-bold appearance-none cursor-pointer text-center min-w-[120px] md:text-lg`}
                    >
                        <option value="Auto">🌐 {isAr ? 'تلقائي' : 'Auto'}</option>
                        <option value="English">🇬🇧 English</option>
                        <option value="Arabic">🇸🇦 العربية</option>
                        <option value="Spanish">🇪🇸 Español</option>
                        <option value="French">🇫🇷 Français</option>
                        <option value="German">🇩🇪 Deutsch</option>
                        <option value="Chinese">🇨🇳 中文</option>
                    </select>
                    <button
                        onClick={handleAnalyze}
                        disabled={loading}
                        className="w-full md:w-auto px-8 py-4 md:py-5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-2xl flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all disabled:opacity-70 disabled:cursor-not-allowed group whitespace-nowrap md:text-lg"
                    >
                        {loading ? (
                            <><Loader2 className="w-5 h-5 animate-spin" /> {isAr ? 'جاري الاستخراج...' : 'Extracting...'}</>
                        ) : isLocked && !result ? (
                            <><Lock className="w-5 h-5 text-orange-400" /> {isAr ? 'استخراج (مقفول)' : 'Analyze (Locked)'}</>
                        ) : (
                            <><Bot className="w-5 h-5 text-orange-400 group-hover:scale-110 transition-transform" /> {isAr ? 'استخراج الفائدة مجاناً' : 'Analyze for Free'}</>
                        )}
                    </button>
                </div>

                {error && <p className="text-red-500 font-bold mt-4 text-center">{error}</p>}

                {/* Subcription lock modal popup built into the card */}
                {showLock && (
                    <div className="mt-8 bg-orange-50/80 rounded-2xl p-8 border border-orange-100 text-center relative overflow-hidden animate-in fade-in slide-in-from-bottom-4">
                        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg border border-orange-200 mx-auto mb-4">
                            <Lock className="w-8 h-8 text-orange-500" />
                        </div>
                        <h3 className="text-2xl font-black text-slate-800 mb-2">
                            {isAr ? 'لقد استهلكت جميع تحليلاتك المجانية!' : 'You\'ve reached your free demo limit!'}
                        </h3>
                        <p className="text-slate-600 mb-6 font-medium">
                            {isAr ? 'قم بتثبيت الإضافة في متصفحك أو اشترك في الخطة المدفوعة لتحليل عدد لا نهائي من المقالات الممتعة.' : 'Install the Chrome extension or subscribe to a plan to unlock unlimited AI analysis.'}
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button className="px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold rounded-xl shadow-lg hover:shadow-orange-500/30 transition-shadow">
                                {isAr ? 'احصل على الإضافة مجاناً' : 'Get Chrome Extension'}
                            </button>
                            <button className="px-6 py-3 bg-white text-slate-800 font-bold rounded-xl shadow-sm border border-slate-200 hover:bg-slate-50 transition-colors">
                                {isAr ? 'عرض الخطط المدفوعة' : 'View Premium Plans'}
                            </button>
                        </div>
                    </div>
                )}

                {/* Extracted Results Array */}
                {result && !loading && (
                    <div className="mt-8 grid md:grid-cols-[2fr_1fr] gap-6 animate-in fade-in slide-in-from-top-4 text-start" dir={isAr ? "rtl" : "ltr"}>
                        <div className="space-y-6">
                            <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm relative overflow-hidden group">
                                <div className="absolute top-0 left-0 w-1 h-full bg-orange-500"></div>
                                <h4 className="font-black text-sm text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2"><Sparkles className="w-4 h-4 text-orange-400" /> {isAr ? 'الخلاصة الذكية' : 'AI Summary'}</h4>
                                <p className="text-slate-700 leading-relaxed font-medium">{result.data.summary}</p>
                            </div>
                            <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
                                <h4 className="font-black text-sm text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2"><ArrowRight className="w-4 h-4 text-orange-400" /> {isAr ? 'أهم النقاط' : 'Key Takeaways'}</h4>
                                <ul className="space-y-3">
                                    {(result.data.keyPoints || []).map((point: string, i: number) => (
                                        <li key={i} className="flex items-start gap-3">
                                            <div className="w-6 h-6 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">{i + 1}</div>
                                            <span className="text-slate-600 font-medium leading-relaxed">{point}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-6 border border-slate-700 text-white shadow-xl">
                                <h4 className="font-black text-sm text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">🛠️ {isAr ? 'أدوات مقترحة' : 'Sponsored Tools'}</h4>
                                <div className="space-y-3">
                                    {(result.data.recommendedTools || result.data.suggestedTools || []).map((t: any, i: number) => (
                                        typeof t === 'string' ? (
                                            <div key={i} className="p-3 bg-white/10 border border-white/20 rounded-xl text-sm font-bold text-center block w-full">{t}</div>
                                        ) : (
                                            <a key={i} href={t.url || '#'} target="_blank" className="p-3 bg-white/10 hover:bg-orange-500 border border-white/20 hover:border-orange-400 rounded-xl text-sm font-bold text-center block w-full transition-all">
                                                {t.name}
                                            </a>
                                        )
                                    ))}
                                </div>
                            </div>

                            <button onClick={handleCopy} className="w-full py-4 rounded-2xl border-2 border-slate-200 text-slate-600 font-bold flex items-center justify-center gap-2 hover:bg-slate-50 transition-colors">
                                {copied ? <span className="text-green-600">✅ {isAr ? 'تم النسخ!' : 'Copied!'}</span> : <><Share2 className="w-5 h-5" /> {isAr ? 'نسخ الرابط الفيروسي' : 'Copy Viral Link'}</>}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
