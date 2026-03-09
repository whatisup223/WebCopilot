import { cookies } from 'next/headers';
import { Users, CreditCard, Flame, Link2, Activity, ShieldCheck, ArrowUpRight, Cpu } from 'lucide-react';

export default async function AdminOverview() {
    const cookieStore = await cookies();
    const lang = cookieStore.get('NEXT_LOCALE')?.value || 'en';
    const isAr = lang === 'ar';

    return (
        <div className="space-y-10 animate-in fade-in duration-700">

            {/* Header Content for Dashboard */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-2">
                <div>
                    <h2 className="text-3xl font-black text-slate-800 tracking-tight">{isAr ? 'ملخص الأداء' : 'Performance Overview'}</h2>
                    <p className="text-sm font-medium text-slate-500 mt-2 max-w-lg leading-relaxed">
                        {isAr
                            ? 'إحصائيات النمو الحية والمدفوعات.'
                            : 'Live metrics of platform growth and revenue.'}
                    </p>
                </div>
            </div>

            {/* Top Premium KPIs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

                {/* KPI 1 */}
                <div className="glass-card relative p-8 rounded-[2rem] overflow-hidden group hover:scale-[1.03] transition-all duration-300 border border-white/60 hover:border-orange-200 hover:shadow-xl hover:shadow-orange-500/10">
                    <div className="absolute -top-10 -end-10 w-32 h-32 bg-orange-400 rounded-full blur-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
                    <div className="flex items-center justify-between mb-6 relative z-10">
                        <span className="text-slate-500 text-xs font-bold uppercase tracking-widest">{isAr ? 'إيرادات Stripe' : 'Stripe MRR'}</span>
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-orange-100 to-orange-50 text-orange-500 flex items-center justify-center shadow-inner">
                            <CreditCard className="w-5 h-5" />
                        </div>
                    </div>
                    <div className="flex items-baseline gap-3 relative z-10">
                        <span className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-500">$18,450</span>
                        <span className="flex items-center text-[10px] font-bold text-green-700 bg-green-100 px-2 py-1 rounded-lg">
                            <ArrowUpRight className="w-3 h-3 me-0.5" /> 18%
                        </span>
                    </div>
                </div>

                {/* KPI 2 */}
                <div className="glass-card relative p-8 rounded-[2rem] overflow-hidden group hover:scale-[1.03] transition-all duration-300 border border-white/60 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-500/10">
                    <div className="absolute -top-10 -end-10 w-32 h-32 bg-blue-400 rounded-full blur-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
                    <div className="flex items-center justify-between mb-6 relative z-10">
                        <span className="text-slate-500 text-xs font-bold uppercase tracking-widest">{isAr ? 'المشتركين (Pro)' : 'Pro Users'}</span>
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-100 to-blue-50 text-blue-500 flex items-center justify-center shadow-inner">
                            <Users className="w-5 h-5" />
                        </div>
                    </div>
                    <div className="flex items-baseline gap-3 relative z-10">
                        <span className="text-4xl font-black text-slate-800">3,492</span>
                        <span className="flex items-center text-[10px] font-bold text-green-700 bg-green-100 px-2 py-1 rounded-lg">
                            <ArrowUpRight className="w-3 h-3 me-0.5" /> +42
                        </span>
                    </div>
                </div>

                {/* KPI 3 */}
                <div className="glass-card relative p-8 rounded-[2rem] overflow-hidden group hover:scale-[1.03] transition-all duration-300 border border-white/60 hover:border-pink-200 hover:shadow-xl hover:shadow-pink-500/10">
                    <div className="absolute -top-10 -end-10 w-32 h-32 bg-pink-400 rounded-full blur-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
                    <div className="flex items-center justify-between mb-6 relative z-10">
                        <span className="text-slate-500 text-xs font-bold uppercase tracking-widest">{isAr ? 'الزيارات الفيروسية' : 'Viral Visits'}</span>
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-pink-100 to-pink-50 text-pink-500 flex items-center justify-center shadow-inner">
                            <Flame className="w-5 h-5" />
                        </div>
                    </div>
                    <div className="flex items-baseline gap-3 relative z-10">
                        <span className="text-4xl font-black text-slate-800">124K</span>
                        <span className="flex items-center text-[10px] font-bold text-green-700 bg-green-100 px-2 py-1 rounded-lg">
                            <ArrowUpRight className="w-3 h-3 me-0.5" /> 12%
                        </span>
                    </div>
                </div>

                {/* KPI 4 */}
                <div className="glass-card relative p-8 rounded-[2rem] overflow-hidden group hover:bg-orange-50/50 hover:scale-[1.03] transition-all duration-300 border border-orange-100 hover:border-orange-300 hover:shadow-xl hover:shadow-orange-500/10">
                    <div className="flex items-center justify-between mb-6 relative z-10">
                        <span className="text-orange-600 text-xs font-bold uppercase tracking-widest">{isAr ? 'نقرات أدوات الأفيليت' : 'Affiliate Clicks'}</span>
                        <div className="w-12 h-12 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center shadow-inner border border-orange-200">
                            <Link2 className="w-5 h-5" />
                        </div>
                    </div>
                    <div className="flex items-baseline gap-3 relative z-10">
                        <span className="text-4xl font-black text-orange-600">8,214</span>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                {/* Recent Users Activity (Premium List Style) */}
                <div className="glass-card rounded-[2.5rem] p-8 border border-white/80 shadow-sm relative overflow-hidden flex flex-col">
                    <div className="absolute top-0 end-0 w-40 h-40 bg-slate-100 rounded-full blur-3xl opacity-50 -z-10"></div>

                    <div className="flex justify-between items-center mb-8 pb-4">
                        <div>
                            <h2 className="text-xl font-black text-slate-800">{isAr ? 'آخر المسجلين اليوم' : 'Recent Users Today'}</h2>
                            <p className="text-xs font-semibold text-slate-500 mt-1">{isAr ? 'مزامنة حية للمستخدمين الجدد' : 'Live sync of newest sign-ups'}</p>
                        </div>
                        <button className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-orange-500 transition-colors bg-white px-3 py-2 rounded-xl shadow-sm border border-slate-100">
                            {isAr ? 'عرض الكل' : 'View All'}
                        </button>
                    </div>

                    <div className="flex-1 overflow-x-auto space-y-3">
                        {[
                            { name: 'Ahmed', email: 'ahmed@example.com', plan: 'PRO', bg: 'bg-orange-500', color: 'text-white', letter: 'A' },
                            { name: 'Mark', email: 'mark@startups.co', plan: 'FREE', bg: 'bg-slate-100', color: 'text-slate-600', letter: 'M' },
                            { name: 'Sarah', email: 'sarah.t@gmail.com', plan: 'PRO', bg: 'bg-orange-500', color: 'text-white', letter: 'S' },
                            { name: 'Khaled', email: 'khaled@agency.net', plan: 'FREE', bg: 'bg-slate-100', color: 'text-slate-600', letter: 'K' },
                        ].map((user, idx) => (
                            <div key={idx} className="flex items-center justify-between p-4 rounded-2xl bg-white/60 hover:bg-white border border-white hover:border-orange-100 hover:shadow-md transition-all group">
                                <div className="flex items-center gap-4">
                                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-lg shadow-sm ${user.plan === 'PRO' ? 'bg-gradient-to-tr from-orange-500 to-red-500 text-white' : 'bg-slate-100 text-slate-500'}`}>
                                        {user.letter}
                                    </div>
                                    <div>
                                        <div className="font-bold text-sm text-slate-800 group-hover:text-orange-600 transition-colors">{user.email}</div>
                                        <div className="text-xs font-semibold text-slate-400 mt-0.5">{isAr ? 'انضم منذ قليل' : 'Joined just now'}</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <span className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest border ${user.plan === 'PRO' ? 'bg-orange-50 text-orange-600 border-orange-200' : 'bg-white text-slate-500 border-slate-200'}`}>
                                        {user.plan}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* System Health Widget (Neon Dark Style) */}
                <div className="bg-slate-900 rounded-[2.5rem] border border-slate-800 shadow-2xl p-10 text-white relative overflow-hidden flex flex-col justify-between">
                    {/* Glowing effect inside */}
                    <div className="absolute top-0 end-0 w-64 h-64 bg-green-500/20 blur-[100px] rounded-full point-events-none"></div>
                    <div className="absolute bottom-[-10%] start-[-10%] w-40 h-40 bg-blue-500/20 blur-[80px] rounded-full point-events-none"></div>

                    <div className="relative z-10">
                        <div className="flex items-center justify-between mb-2">
                            <h2 className="text-xl font-black text-white">{isAr ? 'حالة النظام' : 'System Health'}</h2>
                            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-green-500/10 border border-green-500/20">
                                <Activity className="w-5 h-5 text-green-400 animate-pulse" />
                            </div>
                        </div>
                        <p className="text-xs font-medium text-slate-400 mb-8 max-w-xs">{isAr ? 'الخدمات السحابية وقواعد البيانات تعمل بكفاءة تامة دون انقطاع.' : 'Core cloud services and DB layers are functioning flawlessly.'}</p>

                        <div className="space-y-5">
                            <div className="group flex justify-between items-center p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                                <div className="flex items-center gap-3 text-sm">
                                    <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-400"><Cpu className="w-4 h-4" /></div>
                                    <span className="text-slate-300 font-bold tracking-wide">MongoDB Engine</span>
                                </div>
                                <span className="flex items-center gap-2 text-green-400 font-black bg-green-400/10 px-3 py-1.5 rounded-lg text-[10px] uppercase tracking-widest">
                                    <span className="w-1.5 h-1.5 rounded-full bg-green-400"></span>
                                    {isAr ? 'متصل' : 'ONLINE'}
                                </span>
                            </div>

                            <div className="group flex justify-between items-center p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                                <div className="flex items-center gap-3 text-sm">
                                    <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-400"><Cpu className="w-4 h-4" /></div>
                                    <span className="text-slate-300 font-bold tracking-wide">OpenAI API Access</span>
                                </div>
                                <span className="flex items-center gap-2 text-yellow-400 font-black bg-yellow-400/10 px-3 py-1.5 rounded-lg text-[10px] uppercase tracking-widest border border-yellow-400/20">
                                    <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-pulse"></span>
                                    {isAr ? '$45 سعة متبقية' : '$45 REMAINING'}
                                </span>
                            </div>

                            <div className="group flex justify-between items-center p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                                <div className="flex items-center gap-3 text-sm">
                                    <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-400"><ShieldCheck className="w-4 h-4" /></div>
                                    <span className="text-slate-300 font-bold tracking-wide">Stripe Webhooks</span>
                                </div>
                                <span className="flex items-center gap-2 text-green-400 font-black bg-green-400/10 px-3 py-1.5 rounded-lg text-[10px] uppercase tracking-widest">
                                    <span className="w-1.5 h-1.5 rounded-full bg-green-400"></span>
                                    {isAr ? 'جاهزة ومحمية' : 'SECURE & READY'}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 pt-6 border-t border-slate-800/80 flex items-center gap-2 relative z-10">
                        <span className="relative flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                        </span>
                        <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{isAr ? 'تدفق النظام يعمل بشكل طبيعي' : 'All systems operational'}</span>
                    </div>
                </div>

            </div>
        </div>
    );
}
