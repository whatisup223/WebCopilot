import { cookies } from 'next/headers';
import Link from 'next/link';
import LangToggle from '@/components/LangToggle';

export const dynamic = 'force-dynamic'; // Prevent aggressive route caching

export default async function InsightPage({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = await params;
    const cookieStore = await cookies();
    const lang = cookieStore.get('NEXT_LOCALE')?.value || 'en';
    const isAr = lang === 'ar';

    let insight = null;
    let settings: any = null;
    let errorMsg = '';
    try {
        const [insightRes, settingsRes] = await Promise.all([
            fetch(`http://localhost:5000/api/analyze/insight/${resolvedParams.id}`, { cache: 'no-store' }),
            fetch(`http://localhost:5000/api/settings`, { cache: 'no-store' })
        ]);

        const insightData = await insightRes.json();
        const settingsData = await settingsRes.json();

        if (insightData.success && insightData.insight) {
            insight = insightData.insight;
        } else {
            errorMsg = isAr ? 'عذراً، لم يتم العثور على هذا التحليل.' : 'Insight not found.';
        }

        if (settingsData.success) {
            settings = settingsData.settings;
        }
    } catch (err) {
        console.error("Fetch Error:", err);
        errorMsg = isAr ? 'تعذر جلب البيانات. الخادم مغلق.' : 'Failed to fetch data. Server offline.';
    }

    if (!insight) {
        return (
            <div className={`min-h-screen flex items-center justify-center p-4 ${isAr ? 'text-right' : 'text-left'}`}>
                <div className="glass-card max-w-lg p-10 text-center rounded-3xl">
                    <div className="text-4xl mb-4">⚠️</div>
                    <h1 className="text-2xl font-black text-slate-800 mb-2">{errorMsg}</h1>
                    <p className="text-slate-500 mb-6 font-medium">{isAr ? 'تأكد من صحة الرابط أو أن خادم البيانات يعمل.' : 'Make sure the link is correct and the server is running.'}</p>
                    <Link href="/" className="px-6 py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition">
                        {isAr ? 'العودة للرئيسية' : 'Go Home'}
                    </Link>
                </div>
            </div>
        );
    }

    const adEnabled = settings?.adsEnabled ?? true;
    const adScript = settings?.topBannerScript || '';

    return (
        <div className={`min-h-screen relative overflow-hidden flex flex-col items-center py-12 px-4 ${isAr ? 'text-right' : 'text-left'}`}>

            {/* Nav & Toggle Overlay */}
            <div className={`w-full max-w-4xl flex justify-between items-center mb-8 relative z-20 ${isAr ? 'flex-row-reverse' : ''}`}>
                <Link href="/" className={`flex items-center gap-2 font-black text-slate-800 hover:text-orange-600 transition-colors ${isAr ? 'flex-row-reverse' : ''}`}>
                    <div className="bg-gradient-to-tr from-orange-500 to-red-500 w-8 h-8 rounded-[10px] flex items-center justify-center shadow-md">
                        <span className="text-white font-black text-lg leading-none mt-0.5">W</span>
                    </div>
                    Web Copilot
                </Link>
                <LangToggle isAr={isAr} />
            </div>

            {/* Background Glows */}
            <div className="fixed top-[-10%] left-[-10%] w-[50%] h-[50%] bg-orange-400/20 rounded-full blur-[140px] -z-10 pointer-events-none"></div>
            <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[60%] bg-pink-400/10 rounded-full blur-[140px] -z-10 pointer-events-none"></div>

            <div className="max-w-4xl w-full glass-card rounded-[3rem] p-0 overflow-hidden relative border-white">

                {/* Ad Banner For Free Users */}
                {adEnabled && (
                    <div className="bg-slate-100/50 p-4 text-center border-b border-white/50 backdrop-blur-sm min-h-[140px] flex flex-col items-center justify-center">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">{isAr ? 'مساحة إعلانية' : 'ADVERTISEMENT'}</span>
                        {adScript ? (
                            <div className="w-full max-w-2xl overflow-hidden" dangerouslySetInnerHTML={{ __html: adScript }}></div>
                        ) : (
                            <div className="h-24 w-full bg-white rounded-2xl flex items-center justify-center border border-slate-200 border-dashed shadow-sm mx-auto max-w-2xl">
                                <p className="text-slate-300 font-bold text-sm select-none italic">{isAr ? 'يمكنك تفعيل AdSense من لوحة التحكم' : 'Configure AdSense in Admin Panel'}</p>
                            </div>
                        )}
                    </div>
                )}

                <div className="p-8 md:p-12">
                    <div className={`flex flex-col md:flex-row items-start md:items-center justify-between mb-10 gap-4 ${isAr ? 'md:flex-row-reverse' : ''}`}>
                        <h1 className="text-3xl font-black text-slate-900 tracking-tight">{isAr ? 'تحليل صفحة الويب' : 'Webpage AI Insight'}</h1>
                        <span className="bg-gradient-to-r from-orange-500 to-red-500 text-white text-[11px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full shadow-lg shadow-orange-500/20 border border-orange-400">Web Copilot Verified</span>
                    </div>

                    <div className="space-y-10">
                        {/* Summary Section */}
                        <section>
                            <h2 className={`text-xl font-black text-slate-800 mb-4 flex items-center gap-2 ${isAr ? 'flex-row-reverse' : ''}`}><span className="text-orange-500 text-2xl">📝</span> {isAr ? 'الملخص الشامل' : 'Comprehensive Summary'}</h2>
                            <p className="text-slate-600 leading-relaxed font-medium bg-white/70 backdrop-blur-sm p-6 md:p-8 rounded-3xl border border-white shadow-sm text-[15px] whitespace-pre-line">
                                {insight.summary}
                            </p>
                        </section>

                        {/* Bullet Points Section */}
                        <section>
                            <h2 className={`text-xl font-black text-slate-800 mb-4 flex items-center gap-2 ${isAr ? 'flex-row-reverse' : ''}`}><span className="text-pink-500 text-2xl">💡</span> {isAr ? 'النقاط الرئيسية' : 'Smart Takeaways'}</h2>
                            <ul className="space-y-3 bg-white/70 backdrop-blur-sm p-6 md:p-8 rounded-3xl border border-white shadow-sm text-[15px]">
                                {(insight.keyPoints || []).map((point: string, i: number) => (
                                    <li key={i} className={`flex items-start gap-3 ${isAr ? 'flex-row-reverse' : ''}`}>
                                        <span className="text-orange-500 mt-0.5 text-xs">⭕</span>
                                        <span className="text-slate-600 font-medium leading-relaxed">{point}</span>
                                    </li>
                                ))}
                            </ul>
                        </section>

                        {/* Affiliate Tools / Sponsors */}
                        <section>
                            <h2 className={`text-xl font-black text-slate-800 mb-4 flex items-center gap-2 ${isAr ? 'flex-row-reverse' : ''}`}><span className="text-indigo-500 text-2xl">🛠️</span> {isAr ? 'أدوات مقترحة لمساعدتك' : 'Recommended Toolset'}</h2>
                            <div className={`grid grid-cols-1 sm:grid-cols-2 gap-4 ${isAr ? 'text-right' : 'text-left'}`}>
                                {(insight.toolsRecommended || []).map((tool: any, i: number) => {
                                    const isAffiliate = i % 2 === 0; // Fake toggle type for demo
                                    return typeof tool === 'string' ? (
                                        <div key={i} className={`flex items-center justify-between p-5 rounded-2xl border-2 border-transparent bg-white shadow-sm group ${isAr ? 'flex-row-reverse' : ''}`}>
                                            <span className="font-extrabold text-slate-800 text-lg">{tool}</span>
                                        </div>
                                    ) : (
                                        <a key={i} href={tool.url || '#'} target="_blank" className={`flex items-center justify-between p-5 rounded-2xl border-2 border-transparent bg-white hover:border-orange-500 shadow-sm transition-all hover:shadow-lg hover:-translate-y-1 group ${isAr ? 'flex-row-reverse' : ''}`}>
                                            <span className="font-extrabold text-slate-800 group-hover:text-orange-600 transition-colors text-lg truncate pr-3">{tool.name || tool}</span>
                                            <span className={`text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg border shrink-0 bg-emerald-50 text-emerald-700 border-emerald-100`}>
                                                {isAr ? 'أداة مفيدة' : 'USEFUL'}
                                            </span>
                                        </a>
                                    );
                                })}
                            </div>
                        </section>
                    </div>
                </div>

                {/* Footer CTA */}
                <div className="bg-slate-900 border-t border-slate-800 p-10 md:p-14 text-center text-white m-2 rounded-[2.5rem] relative overflow-hidden">
                    <div className="absolute top-0 right-1/2 translate-x-1/2 w-64 h-64 bg-orange-500/20 blur-[80px] rounded-full pointer-events-none"></div>
                    <h3 className="text-2xl font-black mb-3 relative z-10">{isAr ? 'وفر وقتك ولخّص مقالاتك بنفسك في ثوانٍ!' : 'Create your own summaries in seconds!'}</h3>
                    <p className="text-slate-400 mb-8 max-w-lg mx-auto font-medium text-sm leading-relaxed relative z-10">
                        {isAr ? 'أضف مساعدنا الذكي لمتصفح كروم مجاناً ووفر آلاف الساعات من القراءة المطوّلة شهرياً.' : 'Install our free Chrome copilot today, save thousands of reading hours and discover great tools instantly.'}
                    </p>
                    <button className="bg-gradient-to-r from-orange-500 to-red-500 text-white font-black px-10 py-4 rounded-full transition-transform shadow-xl shadow-orange-500/30 hover:-translate-y-1 relative z-10 border border-orange-400">
                        {isAr ? 'تثبيت الإضافة (ومجاناً)' : 'Add Extension Now (Free)'}
                    </button>
                </div>

            </div>
        </div>
    );
}
