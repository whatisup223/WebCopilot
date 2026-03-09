import { cookies } from 'next/headers';
import Link from 'next/link';
import LangToggle from '@/components/LangToggle';
import { Sparkles, Brain, Wrench, ArrowRight, ExternalLink, ShieldCheck, Share2, MousePointer2 } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function InsightPage({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = await params;
    const cookieStore = await cookies();
    const lang = cookieStore.get('NEXT_LOCALE')?.value || 'en';
    const isAr = lang === 'ar';

    let insight: any = null;
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
            <div className={`min-h-screen flex items-center justify-center p-4 bg-[#fafafa] font-sans ${isAr ? 'text-right' : 'text-left'}`}>
                <div className="glass-card max-w-lg p-12 text-center rounded-[2.5rem] shadow-2xl border-white">
                    <div className="w-20 h-20 bg-red-50 text-red-500 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-sm border border-red-100">
                        <ShieldCheck className="w-10 h-10" />
                    </div>
                    <h1 className="text-3xl font-black text-slate-900 mb-3">{errorMsg}</h1>
                    <p className="text-slate-500 mb-8 font-medium leading-relaxed">{isAr ? 'تأكد من صحة الرابط أو أن خادم البيانات يعمل حالياً.' : 'Make sure the link is correct and the server is running.'}</p>
                    <Link href="/" className="inline-flex items-center gap-2 px-8 py-4 bg-slate-900 text-white rounded-2xl font-black hover:bg-black transition-all hover:-translate-y-1 shadow-xl shadow-slate-900/20">
                        {isAr ? 'العودة للرئيسية' : 'Go Home'}
                        <ArrowRight className={`w-5 h-5 ${isAr ? 'rotate-180' : ''}`} />
                    </Link>
                </div>
            </div>
        );
    }

    const adEnabled = settings?.adsEnabled ?? true;
    const adScript = settings?.topBannerScript || '';

    // Extract domain from URL for display
    let domain = 'Source';
    try {
        domain = new URL(insight.pageUrl).hostname.replace('www.', '');
    } catch (e) { }

    return (
        <div className={`min-h-screen relative overflow-hidden flex flex-col items-center py-8 px-4 bg-[#fafafa] font-sans ${isAr ? 'text-right' : 'text-left'}`}>

            {/* Background Decor */}
            <div className="fixed top-[-10%] start-[-10%] w-[50%] h-[50%] bg-orange-400/20 rounded-full blur-[140px] -z-10 pointer-events-none"></div>
            <div className="fixed bottom-[-10%] end-[-10%] w-[40%] h-[60%] bg-pink-400/10 rounded-full blur-[140px] -z-10 pointer-events-none"></div>

            {/* Nav Header */}
            <div className={`w-full max-w-7xl flex justify-between items-center mb-8 relative z-20 ${isAr ? 'flex-row-reverse' : ''}`}>
                <Link href="/" className={`flex items-center gap-3 group ${isAr ? 'flex-row-reverse' : ''}`}>
                    <div className="bg-gradient-to-tr from-orange-500 to-red-500 w-9 h-9 rounded-xl flex items-center justify-center shadow-lg shadow-orange-500/30 group-hover:scale-110 transition-transform">
                        <span className="text-white font-black text-lg">W</span>
                    </div>
                    <div>
                        <span className="font-bold text-slate-900 text-lg tracking-tight block leading-tight">WebCopilot</span>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{isAr ? 'رفيقك الذكي' : 'AI COMPANION'}</span>
                    </div>
                </Link>
                <div className="flex items-center gap-4">
                    <LangToggle isAr={isAr} />
                    <button className="p-2 bg-white rounded-lg shadow-sm border border-slate-200 text-slate-600 hover:text-orange-500 transition-all">
                        <Share2 className="w-4.5 h-4.5" />
                    </button>
                </div>
            </div>

            <main className="max-w-7xl w-full relative z-10 flex flex-col items-center">

                {/* TOP AD BANNER */}
                {adEnabled && (
                    <div className="w-full max-w-4xl mb-8">
                        <div className="bg-white/50 p-3 min-h-[90px] rounded-2xl border border-dashed border-slate-200 flex items-center justify-center">
                            {adScript ? (
                                <div className="w-full flex justify-center overflow-hidden" dangerouslySetInnerHTML={{ __html: adScript }}></div>
                            ) : (
                                <p className="text-slate-300 italic text-xs font-medium">{isAr ? 'مساحة إعلانية علوية' : 'Top display banner area'}</p>
                            )}
                        </div>
                    </div>
                )}

                <div className="w-full flex flex-col lg:flex-row gap-6 items-start justify-center">

                    {/* LEFT SIDEBAR AD */}
                    {adEnabled && (
                        <aside className="hidden lg:flex flex-col gap-2 w-40 sticky top-24 shrink-0">
                            <div className="bg-white/50 h-[600px] w-full rounded-2xl border border-dashed border-slate-200 flex items-center justify-center p-4">
                                <p className="text-slate-300 italic text-xs font-medium text-center rotate-90">{isAr ? 'مساحة إعلانية جانبية' : 'Vertical Sidebar Ad'}</p>
                            </div>
                        </aside>
                    )}

                    {/* MAIN CONTENT CENTER */}
                    <div className="max-w-4xl w-full">
                        <div className="glass-card rounded-[2.5rem] bg-white/70 backdrop-blur-3xl p-0 overflow-hidden shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] border-white relative" dir={insight.labels?.dir || (isAr ? 'rtl' : 'ltr')}>

                            {/* Header/Status Bar */}
                            <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 bg-white/40">
                                <div className="flex items-center gap-2.5">
                                    <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
                                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                                        {isAr ? 'تحليل ذكي معتمد' : 'Verified AI Insight'}
                                    </span>
                                </div>
                                <a href={insight.pageUrl} target="_blank" className="text-xs font-medium text-slate-400 hover:text-orange-600 flex items-center gap-1.5 transition-colors max-w-[200px] truncate" dir="ltr">
                                    {domain} <ExternalLink className="w-3 h-3" />
                                </a>
                            </div>

                            <div className="p-8 md:p-12">
                                {/* Summary Block */}
                                <div className="mb-12">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="w-10 h-10 bg-orange-500 text-white rounded-xl flex items-center justify-center shadow-lg shadow-orange-500/10">
                                            <Sparkles className="w-5 h-5" />
                                        </div>
                                        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
                                            {insight.labels?.summary || 'AI Summary'}
                                        </h2>
                                    </div>

                                    <div className="relative bg-white/80 p-6 md:p-8 rounded-2xl border border-slate-100 shadow-sm leading-relaxed text-slate-600 font-medium text-base md:text-lg">
                                        {insight.summary}
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    {/* Insights */}
                                    <div className="space-y-6">
                                        <div className="flex items-center gap-3">
                                            <div className="w-9 h-9 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center border border-blue-100">
                                                <Brain className="w-5 h-5" />
                                            </div>
                                            <h3 className="text-xl font-bold text-slate-800">{insight.labels?.keyPoints || 'Core Insights'}</h3>
                                        </div>
                                        <ul className="space-y-3">
                                            {(insight.keyPoints || []).map((point: string, i: number) => (
                                                <li key={i} className="flex items-start gap-3 p-4 bg-slate-50/50 rounded-xl border border-transparent hover:border-slate-100 transition-all">
                                                    <div className="w-6 h-6 rounded-lg bg-slate-200 text-slate-600 flex items-center justify-center font-bold text-[9px] shrink-0 mt-0.5">
                                                        {i + 1}
                                                    </div>
                                                    <span className="text-slate-600 font-medium text-sm leading-relaxed">{point}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    {/* Tools */}
                                    <div className="space-y-6">
                                        <div className="flex items-center gap-3">
                                            <div className="w-9 h-9 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center border border-indigo-100">
                                                <Wrench className="w-5 h-5" />
                                            </div>
                                            <h3 className="text-xl font-bold text-slate-800">{insight.labels?.recommendedTools || 'Smart Tools'}</h3>
                                        </div>
                                        <div className="space-y-3">
                                            {insight.toolsRecommended?.length > 0 ? (
                                                insight.toolsRecommended.map((tool: any, i: number) => (
                                                    <a key={i} href={typeof tool === 'string' ? '#' : tool.url || '#'} target="_blank" className="flex items-center justify-between gap-3 p-4 rounded-xl bg-white border border-slate-100 shadow-sm hover:border-orange-200 transition-all group">
                                                        <span className="font-bold text-slate-800 text-sm truncate">{typeof tool === 'string' ? tool : tool.name}</span>
                                                        <MousePointer2 className="w-3.5 h-3.5 text-slate-300 group-hover:text-orange-500" />
                                                    </a>
                                                ))
                                            ) : (
                                                <div className="p-4 text-center border-2 border-dashed border-slate-100 rounded-xl opacity-50">
                                                    <p className="text-xs font-semibold">{insight.labels?.noTools || 'No tools found'}</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Footer CTA */}
                            <div className="bg-slate-900 p-8 md:p-12 text-center text-white m-3 rounded-[2rem] relative overflow-hidden">
                                <h3 className="text-xl md:text-2xl font-bold mb-4">{insight.labels?.loveSummary || 'Love the summary?'}</h3>
                                <p className="text-slate-400 mb-6 text-xs md:text-sm font-medium leading-relaxed max-w-md mx-auto">
                                    {insight.labels?.getExtension || 'Get our Chrome extension and save hours of reading every day.'}
                                </p>
                                <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-3.5 rounded-xl transition-all shadow-lg shadow-orange-500/20 active:scale-95 text-sm inline-flex items-center gap-2">
                                    {insight.labels?.addToBrowser || 'Add to Browser'}
                                    <ArrowRight className={`w-4 h-4 ${(insight.labels?.dir || (isAr ? 'rtl' : 'ltr')) === 'rtl' ? 'rotate-180' : ''}`} />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT SIDEBAR AD */}
                    {adEnabled && (
                        <aside className="hidden lg:flex flex-col gap-2 w-40 sticky top-24 shrink-0">
                            <div className="bg-white/50 h-[600px] w-full rounded-2xl border border-dashed border-slate-200 flex items-center justify-center p-4">
                                <p className="text-slate-300 italic text-xs font-medium text-center -rotate-90">{isAr ? 'مساحة إعلانية جانبية' : 'Vertical Sidebar Ad'}</p>
                            </div>
                        </aside>
                    )}
                </div>

                {/* BOTTOM AD (Optional extra space) */}
                {adEnabled && (
                    <div className="w-full max-w-4xl mt-12 pb-12">
                        <div className="bg-orange-50/30 p-4 h-32 rounded-3xl border border-dashed border-orange-200 flex items-center justify-center">
                            <p className="text-slate-400 italic text-xs font-bold">{isAr ? 'مساحة إعلانية إضافية' : 'Additional Ad Space'}</p>
                        </div>
                    </div>
                )}
                <footer className="mt-20 pb-12 text-center">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">&copy; 2026 WebCopilot AI Insight Hub. All Rights Reserved.</p>
                </footer>
            </main>
        </div>
    );
}
