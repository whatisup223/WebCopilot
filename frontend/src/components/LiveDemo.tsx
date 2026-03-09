"use client";
import { useState, useEffect } from 'react';
import { Bot, Sparkles, Link as LinkIcon, Lock, ArrowRight, Loader2, Share2, CheckCircle2, Zap, Brain, Rocket, ChevronRight } from 'lucide-react';

const LOADING_MESSAGES = [
    { text: "Initializing AI Engine...", icon: <Zap className="w-4 h-4 text-orange-400" /> },
    { text: "Fetching webpage content...", icon: <Rocket className="w-4 h-4 text-blue-400" /> },
    { text: "Brainstorming insights...", icon: <Brain className="w-4 h-4 text-purple-400" /> },
    { text: "Filtering the gold...", icon: <Sparkles className="w-4 h-4 text-yellow-500" /> },
    { text: "Preparing your capsule...", icon: <Bot className="w-4 h-4 text-green-400" /> }
];

const LOADING_MESSAGES_AR = [
    { text: "تهيئة محرك الذكاء الاصطناعي...", icon: <Zap className="w-4 h-4 text-orange-400" /> },
    { text: "جلب محتوى الصفحة...", icon: <Rocket className="w-4 h-4 text-blue-400" /> },
    { text: "توليد الأفكار الذكية...", icon: <Brain className="w-4 h-4 text-purple-400" /> },
    { text: "تصفية الفوائد الرئيسية...", icon: <Sparkles className="w-4 h-4 text-yellow-500" /> },
    { text: "تجهيز الكبسولة المعرفية...", icon: <Bot className="w-4 h-4 text-green-400" /> }
];

export default function LiveDemo({ isAr }: { isAr: boolean }) {
    const [url, setUrl] = useState('');
    const [language, setLanguage] = useState('Auto');
    const [hasManuallyChangedLang, setHasManuallyChangedLang] = useState(false);
    const [loading, setLoading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [loadingMsgIdx, setLoadingMsgIdx] = useState(0);
    const [error, setError] = useState('');
    const [result, setResult] = useState<any>(null);
    const [demoCount, setDemoCount] = useState(0);
    const [demoLimit, setDemoLimit] = useState(1);
    const [showLock, setShowLock] = useState(false);
    const [copied, setCopied] = useState(false);

    const messages = isAr ? LOADING_MESSAGES_AR : LOADING_MESSAGES;

    const getApiUrl = (path: string) => {
        if (typeof window !== 'undefined') {
            return `http://${window.location.hostname}:5000${path}`;
        }
        return `http://localhost:5000${path}`;
    };

    // Sync analysis language with UI language ONLY if user hasn't touched the dropdown
    useEffect(() => {
        if (!hasManuallyChangedLang) {
            setLanguage(isAr ? 'Arabic' : 'English');
        }
    }, [isAr, hasManuallyChangedLang]);

    useEffect(() => {
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

    // Progress Simulation
    useEffect(() => {
        let interval: any;
        if (loading) {
            interval = setInterval(() => {
                setProgress(prev => {
                    if (prev >= 95) return prev;
                    return prev + Math.random() * 15;
                });
                setLoadingMsgIdx(prev => (prev + 1) % messages.length);
            }, 1200);
        } else {
            setProgress(0);
            setLoadingMsgIdx(0);
        }
        return () => clearInterval(interval);
    }, [loading, messages.length]);

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
        setResult(null);

        try {
            const res = await fetch(getApiUrl('/api/analyze/url'), {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ url, language, uiLang: isAr ? 'ar' : 'en' })
            });
            const data = await res.json();
            if (!data.success) throw new Error(data.message || data.error || 'Failed to analyze url');

            setProgress(100);
            setTimeout(() => {
                setResult(data);
                setLoading(false);
            }, 500);

            if (typeof window !== 'undefined') {
                const newCount = demoCount + 1;
                localStorage.setItem('webcopilot_demo_count', newCount.toString());
                setDemoCount(newCount);
            }
        } catch (err: any) {
            setError(err.message || (isAr ? 'فشل التحليل. تأكد من عمل السيرفر.' : 'Analysis failed. Make sure backend is running.'));
            setLoading(false);
        }
    };

    const handleCopy = () => {
        if (result?.insightId) {
            const baseUrl = typeof window !== 'undefined' ? `${window.location.protocol}//${window.location.host}` : 'http://localhost:3000';
            const textToCopy = `${baseUrl}/insight/${result.insightId}`;

            navigator.clipboard.writeText(textToCopy).then(() => {
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
            });
        }
    };

    const isOutputAr = language === 'Arabic' || (language === 'Auto' && isAr);

    return (
        <div className="relative w-full max-w-5xl mx-auto mt-24 px-4">
            <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-orange-50 to-orange-100/50 text-orange-600 rounded-full font-bold text-[11px] uppercase tracking-[0.2em] mb-6 border border-orange-100 shadow-sm animate-pulse">
                    <Sparkles className="w-4 h-4" />
                    {isAr ? 'تجربة المحرك الذكي' : 'LIVE AI ENGINE DEMO'}
                </div>
                <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-6 leading-[1.1] tracking-tight">
                    {isAr ? 'حوّل الروابط المزعجة إلى كبسولات معرفية' : 'Turn Any Noisy Link into a Knowledge Capsule'}
                </h2>
                <p className="text-slate-500 font-semibold text-base md:text-lg max-w-3xl mx-auto leading-relaxed">
                    {isAr ? 'ألصق أي رابط مقال أو تدوينة وشاهد كيف يستخلص ذكاءنا الاصطناعي "الزبدة" في ثوانٍ معدودة.' : 'Paste any article or blog post URL below. Our AI strips the noise and delivers high-impact insights instantly.'}
                </p>
            </div>

            <div className={`glass-card rounded-[3rem] p-4 md:p-10 border border-white/80 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] relative overflow-hidden transition-all duration-700 ${loading ? 'ring-4 ring-orange-500/10' : ''}`}>
                <div className="absolute top-[-20%] right-[-10%] w-80 h-80 bg-orange-400/10 rounded-full blur-[100px] -z-10 animate-pulse"></div>
                <div className="absolute bottom-[-10%] left-[-10%] w-64 h-64 bg-pink-400/10 rounded-full blur-[80px] -z-10"></div>

                {/* Input Section */}
                <div className={`flex flex-col lg:flex-row gap-4 items-stretch mb-4 z-10 relative transition-transform duration-500 ${result && !loading ? 'scale-[0.98] opacity-90' : ''}`}>
                    <div className="flex-1 relative group">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-6 pointer-events-none group-focus-within:text-orange-500 transition-colors">
                            <LinkIcon className="w-5 h-5 opacity-40" />
                        </div>
                        <input
                            type="text"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            placeholder={isAr ? 'أدخل رابط المقال هنا (https://...)' : 'Paste your long URL here (https://...)'}
                            className={`w-full py-5 ps-14 pe-6 rounded-[1.5rem] border-2 border-slate-100 bg-white/80 focus:bg-white focus:border-orange-500 focus:ring-4 focus:ring-orange-500/5 outline-none transition-all shadow-sm text-slate-800 font-bold tracking-tight text-lg ${isAr ? 'text-right rtl' : 'text-left ltr'}`}
                            dir={isAr ? "rtl" : "ltr"}
                        />
                    </div>
                    <div className="flex gap-4">
                        <select
                            value={language}
                            onChange={(e) => {
                                setLanguage(e.target.value);
                                setHasManuallyChangedLang(true);
                            }}
                            className="px-6 py-5 rounded-[1.5rem] border-2 border-slate-100 bg-white/80 focus:border-orange-500 outline-none transition-all shadow-sm text-slate-800 font-bold cursor-pointer md:text-lg appearance-none min-w-[140px] text-center"
                        >
                            <option value="Auto">🌐 {isAr ? 'تلقائي' : 'Auto'}</option>
                            <option value="Arabic">🇸🇦 العربية</option>
                            <option value="English">🇬🇧 English</option>
                            <option value="French">🇫🇷 Français</option>
                            <option value="Spanish">🇪🇸 Español</option>
                            <option value="German">🇩🇪 Deutsch</option>
                            <option value="Italian">🇮🇹 Italiano</option>
                            <option value="Turkish">🇹🇷 Türkçe</option>
                            <option value="Chinese">🇨🇳 中文</option>
                        </select>
                        <button
                            onClick={handleAnalyze}
                            disabled={loading}
                            className="flex-1 lg:flex-none px-10 py-5 bg-slate-900 hover:bg-black text-white font-bold rounded-[1.5rem] flex items-center justify-center gap-3 shadow-xl hover:shadow-orange-500/20 active:scale-95 transition-all disabled:opacity-50 group whitespace-nowrap md:text-lg"
                        >
                            {loading ? <Loader2 className="w-6 h-6 animate-spin text-orange-400" /> : isLocked && !result ? <Lock className="w-6 h-6 text-orange-400" /> : <Bot className="w-6 h-6 text-orange-400 group-hover:rotate-12 transition-transform" />}
                            {loading ? (isAr ? 'جاري التحليل' : 'Analyzing...') : (isAr ? 'استخلص الفائدة' : 'Extract Knowledge')}
                        </button>
                    </div>
                </div>

                {error && <p className="text-red-500 font-bold text-sm mt-4 text-center bg-red-50 py-3 rounded-xl border border-red-100 animate-bounce" dir={isAr ? "rtl" : "ltr"}>{error}</p>}

                {/* Progress Bar & Loading State */}
                {loading && (
                    <div className="mt-12 mb-8 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-xl mx-auto">
                        <div className="flex justify-between items-center mb-4 px-2">
                            <div className="flex items-center gap-3">
                                <div className="animate-spin">{messages[loadingMsgIdx].icon}</div>
                                <span className="font-black text-slate-800 tracking-tight text-lg">{messages[loadingMsgIdx].text}</span>
                            </div>
                            <span className="font-black text-orange-500 font-mono">{Math.round(progress)}%</span>
                        </div>
                        <div className="h-4 w-full bg-slate-100 rounded-full p-1 overflow-hidden shadow-inner">
                            <div
                                className="h-full bg-gradient-to-r from-orange-400 via-orange-500 to-red-500 rounded-full transition-all duration-300 ease-out shadow-[0_0_12px_rgba(249,115,22,0.4)]"
                                style={{ width: `${progress}%` }}
                            ></div>
                        </div>
                    </div>
                )}

                {/* Result Display */}
                {result && !loading && (
                    <div className="mt-10 animate-in zoom-in-95 fade-in duration-700" dir={result.data.labels?.dir || (isOutputAr ? 'rtl' : 'ltr')}>
                        <div className="grid grid-cols-1 lg:grid-cols-[1.6fr_1fr] gap-8">

                            {/* Left Side: Summary & Keypoints */}
                            <div className="space-y-8">
                                <div className="group relative">
                                    <div className="flex items-center gap-4 mb-4">
                                        <div className="p-3 bg-orange-50 text-orange-600 rounded-2xl shadow-sm border border-orange-100 group-hover:scale-110 transition-transform">
                                            <Sparkles className="w-6 h-6" />
                                        </div>
                                        <h4 className="text-xl font-bold text-slate-800 tracking-tight">{result.data.labels?.summary || (isOutputAr ? 'الخلاصة الذكية' : 'AI Genius Summary')}</h4>
                                    </div>
                                    <div className="bg-white/80 backdrop-blur-sm p-8 rounded-[2rem] border border-slate-100 shadow-sm leading-relaxed text-slate-700 font-semibold md:text-lg relative group-hover:shadow-md transition-all">
                                        {result.data.summary}
                                        <div className="absolute top-4 end-4 text-orange-100 italic font-bold text-4xl select-none opacity-50">"</div>
                                    </div>
                                </div>

                                <div className="group">
                                    <div className="flex items-center gap-4 mb-4">
                                        <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl shadow-sm border border-blue-100 group-hover:rotate-6 transition-transform">
                                            <Brain className="w-6 h-6" />
                                        </div>
                                        <h4 className="text-xl font-bold text-slate-800 tracking-tight">{result.data.labels?.keyPoints || (isOutputAr ? 'أهم الفوائد المستخرجة' : 'Core Insights')}</h4>
                                    </div>
                                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                        {(result.data.keyPoints || []).map((point: string, i: number) => (
                                            <li key={i} className="flex items-start gap-3 p-4 bg-white/50 hover:bg-white rounded-2xl border border-slate-100 shadow-sm transition-all hover:translate-y-[-2px] group/item">
                                                <div className="w-6 h-6 rounded-lg bg-slate-900 text-white flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5 shadow-md group-hover/item:bg-orange-600 transition-colors">
                                                    {i + 1}
                                                </div>
                                                <span className="text-slate-600 font-semibold text-sm leading-snug">{point}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            {/* Right Side: Tools & Actions */}
                            <div className="space-y-8">
                                <div className="bg-slate-950 rounded-[2.5rem] p-7 text-white relative overflow-hidden shadow-2xl group">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/20 blur-[50px] -z-0"></div>
                                    <div className="flex items-center gap-3 mb-5 relative z-10">
                                        <Zap className="w-5 h-5 text-orange-400" />
                                        <h4 className="text-lg font-bold tracking-tight">{result.data.labels?.recommendedTools || (isOutputAr ? 'أدوات مقترحة' : 'Smart Tools')}</h4>
                                    </div>

                                    <div className="space-y-3 relative z-10">
                                        {result.data.recommendedTools?.length > 0 ? (
                                            result.data.recommendedTools.map((t: any, i: number) => (
                                                <a key={i} href={t.url || '#'} target="_blank" className="flex items-center justify-between p-4 bg-white/10 hover:bg-white/20 border border-white/10 hover:border-orange-500/50 rounded-xl transition-all group/tool">
                                                    <span className="font-bold text-sm group-hover/tool:text-orange-400 transition-colors">{t.name}</span>
                                                    <ChevronRight className={`w-4 h-4 opacity-40 group-hover/tool:opacity-100 transition-all ${(result.data.labels?.dir || (isOutputAr ? 'rtl' : 'ltr')) === 'rtl' ? 'rotate-180' : ''}`} />
                                                </a>
                                            ))
                                        ) : (
                                            <div className="p-8 text-center border-2 border-dashed border-white/10 rounded-[2rem] opacity-40">
                                                <p className="text-xs font-semibold">{result.data.labels?.noTools || (isOutputAr ? 'لا توجد أدوات لهذا السياق' : 'No tools found')}</p>
                                            </div>
                                        )}
                                    </div>

                                    <div className="mt-6 pt-6 border-t border-white/10">
                                        <p className="text-[9px] uppercase font-bold tracking-widest text-white/30 mb-3">{result.data.labels?.shareLink || (isOutputAr ? 'رابط المشاركة' : 'SHARE LINK')}</p>
                                        <button onClick={handleCopy} className="w-full py-3.5 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl flex items-center justify-center gap-3 transition-all hover:scale-[1.02] shadow-xl shadow-orange-500/20 active:scale-95 text-sm">
                                            {copied ? <><CheckCircle2 className="w-4 h-4" /> {result.data.labels?.copied || (isOutputAr ? 'تم النسخ' : 'Copied')}</> : <><Share2 className="w-4 h-4" /> {result.data.labels?.copyLink || (isOutputAr ? 'نسخ الرابط' : 'Copy link')}</>}
                                        </button>
                                    </div>
                                </div>

                                <div className="bg-gradient-to-tr from-orange-50 to-pink-50 p-7 rounded-[2.5rem] border border-orange-100 shadow-sm group">
                                    <h5 className="font-bold text-slate-800 mb-1">{result.data.labels?.loveSummary || (isOutputAr ? 'هل أعجبتك الخلاصة؟' : 'Love the summary?')}</h5>
                                    <p className="text-[11px] font-semibold text-slate-500 mb-5 leading-relaxed">
                                        {result.data.labels?.getExtension || (isOutputAr ? 'ثبت الإضافة مجاناً لتلخيص عدد غير محدود من الصفحات فوراً.' : 'Get the free extension to summarize unlimited tabs in real-time.')}
                                    </p>
                                    <button className="w-full py-3.5 bg-white hover:bg-orange-50 text-orange-600 border border-orange-200 font-bold rounded-xl transition-all flex items-center justify-center gap-2 group-hover:shadow-md text-sm">
                                        <Rocket className="w-4 h-4" />
                                        {result.data.labels?.addToBrowser || (isOutputAr ? 'أضف للمتصفح' : 'Add to Browser')}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Lock Overlay Modal */}
            {showLock && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
                    <div className="glass-card max-w-md w-full p-10 rounded-[3rem] border-white text-center shadow-3xl animate-in zoom-in-95 duration-500">
                        <div className="w-20 h-20 bg-orange-50 text-orange-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl border border-orange-100">
                            <Lock className="w-10 h-10" />
                        </div>
                        <h3 className="text-3xl font-black text-slate-900 mb-4">{isAr ? 'انتهت محاولاتك المجانية' : 'Limit Reached!'}</h3>
                        <p className="text-slate-500 font-bold mb-10 leading-relaxed">
                            {isAr ? 'لقد وصلت لحد التجربة المجانية اليوم. اشترك الآن أو حمل الإضافة مجاناً للمزيد.' : 'You have reached the free demo limit. To continue, install our free extension or upgrade your plan.'}
                        </p>
                        <div className="flex flex-col gap-4">
                            <button className="w-full py-5 bg-gradient-to-r from-orange-500 to-red-600 text-white font-black rounded-2xl shadow-xl hover:shadow-orange-500/40 transition-shadow">
                                {isAr ? 'تثبيت الإضافة (مجاناً)' : 'Install Extension (Free)'}
                            </button>
                            <button onClick={() => setShowLock(false)} className="w-full py-5 bg-slate-100 hover:bg-slate-200 text-slate-600 font-black rounded-2xl transition-colors">
                                {isAr ? 'إغلاق' : 'Close'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

