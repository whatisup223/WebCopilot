import { cookies } from 'next/headers';
import Link from 'next/link';
import LangToggle from '@/components/LangToggle';

export default async function Dashboard() {
    const cookieStore = await cookies();
    const lang = cookieStore.get('NEXT_LOCALE')?.value || 'en';
    const isAr = lang === 'ar';

    return (
        <div className={`min-h-screen flex relative overflow-hidden ${isAr ? 'text-right' : 'text-left'}`}>

            {/* Background glows */}
            <div className="fixed top-[-10%] left-[-10%] w-[50%] h-[50%] bg-orange-400/20 rounded-full blur-[140px] -z-10 pointer-events-none"></div>
            <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[60%] bg-pink-400/10 rounded-full blur-[140px] -z-10 pointer-events-none"></div>

            <aside className="w-20 md:w-64 glass-card border-r border-white/50 flex flex-col h-screen sticky top-0 rounded-none z-20">
                <div className="p-6 border-b border-gray-100 flex items-center justify-center mb-6">
                    <div className="bg-gradient-to-tr from-orange-500 to-red-500 w-10 h-10 md:w-8 md:h-8 rounded-xl flex items-center justify-center shadow-lg shadow-orange-500/30">
                        <span className="text-white text-lg font-black">W</span>
                    </div>
                    <div className="hidden md:block ml-3 font-extrabold text-slate-800 tracking-tight text-xl">WebCopilot</div>
                </div>
                <nav className="flex-1 px-4 space-y-3">
                    <a href="#" className={`flex items-center justify-center md:justify-start gap-3 bg-gradient-to-r from-orange-500 to-red-500 text-white p-3 md:px-4 md:py-3 rounded-2xl font-bold shadow-lg shadow-orange-500/30 transition-all ${isAr ? 'md:flex-row-reverse' : ''}`}>
                        <span className="text-lg">📊</span>
                        <span className="hidden md:block">{isAr ? 'الإحصائيات' : 'Insights'}</span>
                    </a>
                    <a href="#" className={`flex items-center justify-center md:justify-start gap-3 hover:bg-white/50 text-slate-600 hover:text-orange-600 p-3 md:px-4 md:py-3 rounded-2xl font-bold transition ${isAr ? 'md:flex-row-reverse' : ''}`}>
                        <span className="text-lg">💳</span>
                        <span className="hidden md:block">{isAr ? 'الاشتراك' : 'Billing'}</span>
                    </a>
                    <a href="#" className={`flex items-center justify-center md:justify-start gap-3 hover:bg-white/50 text-slate-600 hover:text-orange-600 p-3 md:px-4 md:py-3 rounded-2xl font-bold transition ${isAr ? 'md:flex-row-reverse' : ''}`}>
                        <span className="text-lg">⚙️</span>
                        <span className="hidden md:block">{isAr ? 'الإعدادات' : 'Settings'}</span>
                    </a>
                </nav>
            </aside>
            <main className="flex-1 overflow-y-auto relative z-10 p-6 md:p-10">
                <header className={`flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4 ${isAr ? 'md:flex-row-reverse text-right' : 'text-left'}`}>
                    <div>
                        <h1 className="text-3xl font-black text-slate-900 mb-2">{isAr ? 'لوحة التحكم' : 'Dashboard'}</h1>
                        <p className="text-sm font-medium text-slate-500">{isAr ? 'ملخص لآخر التحليلات والروابط الفيروسية التي قمت بإنشائها ونشرها.' : 'Overview of your recent AI summaries and viral link loop growth.'}</p>
                    </div>
                    <div className={`flex items-center gap-4 w-full md:w-auto ${isAr ? 'md:flex-row-reverse' : ''}`}>
                        <LangToggle isAr={isAr} />
                        <Link href="/" className="bg-white/80 border border-slate-200 text-slate-700 font-bold text-sm px-5 py-2.5 rounded-xl hover:bg-red-50 hover:text-red-600 transition shadow-sm w-full md:w-auto text-center">
                            {isAr ? 'خروج' : 'Logout'}
                        </Link>
                    </div>
                </header>
                <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 ${isAr ? 'text-right' : 'text-left'}`}>
                    <div className="glass-card p-8 rounded-[2rem] hover:scale-[1.02] transition-transform">
                        <div className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-2">{isAr ? 'الملخصات المُولدة' : 'Total Summaries'}</div>
                        <div className="text-4xl font-black text-slate-900 flex items-center gap-3">
                            124 <span className="text-[10px] font-black tracking-widest text-green-600 bg-green-50 border border-green-100 px-2 py-0.5 rounded-lg">+12%</span>
                        </div>
                    </div>
                    <div className="glass-card p-8 rounded-[2rem] hover:scale-[1.02] transition-transform relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-orange-500 to-red-500 blur-3xl opacity-20"></div>
                        <div className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-2 relative z-10">{isAr ? 'زيارات روابطك' : 'Viral Visits'}</div>
                        <div className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-500 flex items-center gap-3 relative z-10">
                            3,492 <span className="text-[10px] font-black tracking-widest text-green-600 bg-green-50 border border-green-100 px-2 py-0.5 rounded-lg bg-clip-border">+8.5%</span>
                        </div>
                    </div>
                    <div className="glass-card p-8 rounded-[2rem] hover:scale-[1.02] transition-transform">
                        <div className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-2">{isAr ? 'النقرات من أدواتك' : 'Affiliate Clicks'}</div>
                        <div className="text-4xl font-black text-slate-900 flex items-center gap-3">
                            58 <span className="text-[10px] font-black tracking-widest text-green-600 bg-green-50 border border-green-100 px-2 py-0.5 rounded-lg">+2%</span>
                        </div>
                    </div>
                </div>
                <div className="glass-card rounded-[2.5rem] overflow-hidden">
                    <div className={`p-8 border-b border-gray-100 ${isAr ? 'text-right' : 'text-left'}`}>
                        <h2 className="text-xl font-black text-slate-800">{isAr ? 'أحدث التحليلات والروابط' : 'Recent URL Insights'}</h2>
                    </div>
                    <div className="overflow-x-auto p-2">
                        <table className="w-full text-sm">
                            <thead className={`text-slate-400 text-[10px] uppercase tracking-widest border-b border-gray-100 ${isAr ? 'text-right' : 'text-left'}`}>
                                <tr>
                                    <th className="p-6 font-black">{isAr ? 'عنوان المقال' : 'Article Title'}</th>
                                    <th className="p-6 font-black">{isAr ? 'الرابط الفيروسي' : 'Viral Link'}</th>
                                    <th className="p-6 font-black">{isAr ? 'الزيارات' : 'Views'}</th>
                                    <th className="p-6 font-black">{isAr ? 'التاريخ' : 'Date'}</th>
                                </tr>
                            </thead>
                            <tbody className={`divide-y divide-gray-50 ${isAr ? 'text-right' : 'text-left'}`}>
                                <tr className="group hover:bg-orange-50/30 transition-colors">
                                    <td className="p-6 font-bold text-slate-800">{isAr ? 'كيف تضاعف أرباح الأفيليت بسرعة' : 'How to double affiliate revenue fast'}</td>
                                    <td className="p-6 text-orange-500 font-bold hover:underline cursor-pointer">/insight/abc123x</td>
                                    <td className="p-6 text-slate-600 font-bold">342</td>
                                    <td className="p-6 text-slate-400 font-medium text-xs">{isAr ? 'منذ ساعتين' : '2 hours ago'}</td>
                                </tr>
                                <tr className="group hover:bg-orange-50/30 transition-colors">
                                    <td className="p-6 font-bold text-slate-800">{isAr ? 'مستقبل تطبيقات الذكاء الاصطناعي الحديثة' : 'The future of modern AI applications'}</td>
                                    <td className="p-6 text-orange-500 font-bold hover:underline cursor-pointer">/insight/xyz890v</td>
                                    <td className="p-6 text-slate-600 font-bold">1,029</td>
                                    <td className="p-6 text-slate-400 font-medium text-xs">{isAr ? 'أمس' : 'Yesterday'}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </div>
    );
}
