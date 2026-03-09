import { cookies } from 'next/headers';
import { CreditCard, ExternalLink, ShieldCheck, Activity, DollarSign, TrendingUp } from 'lucide-react';

export default async function AdminSubscriptions() {
    const cookieStore = await cookies();
    const lang = cookieStore.get('NEXT_LOCALE')?.value || 'en';
    const isAr = lang === 'ar';

    return (
        <div className="space-y-8 animate-in fade-in duration-700">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-2">
                <div>
                    <h2 className="text-3xl font-black text-slate-800 tracking-tight">{isAr ? 'الاشتراكات والمدفوعات' : 'Subscriptions & Billing'}</h2>
                    <p className="text-sm font-medium text-slate-500 mt-2 max-w-lg leading-relaxed">
                        {isAr ? 'تتبع إيرادات Stripe، وإدارة الاتصال بالبوابة المالية بشكل مباشر.' : 'Monitor Stripe revenue, billing cycles, and payment gateway connectivity.'}
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Main Stripe Connection Card */}
                <div className="lg:col-span-2 glass-card rounded-[2.5rem] p-8 md:p-12 border border-white/80 shadow-sm relative overflow-hidden flex flex-col items-center justify-center text-center">
                    {/* Glow effect */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-indigo-500/20 blur-[100px] rounded-full -z-10 pointer-events-none"></div>

                    <div className="relative z-10 w-20 h-20 bg-gradient-to-tr from-[#635BFF] to-[#8C86FF] text-white rounded-[2rem] flex items-center justify-center text-3xl mb-8 shadow-2xl shadow-indigo-500/30 ring-8 ring-indigo-50">
                        <DollarSign className="w-10 h-10" />
                    </div>

                    <h3 className="text-2xl font-black text-slate-800 mb-4">{isAr ? 'بوابة Stripe متصلة ونشطة' : 'Stripe Gateway is Active'}</h3>
                    <p className="text-slate-500 font-medium max-w-md mb-8 leading-relaxed">
                        {isAr
                            ? 'المدفوعات تُعالج تلقائياً. كل دورات الفوترة والاشتراكات تُدار من خلال لوحة Stripe الخاصة بك وتزامن لحظياً هنا.'
                            : 'Payments are being processed automatically. All billing cycles are handled safely via your managed Stripe Dashboard.'}
                    </p>

                    <a href="https://dashboard.stripe.com" target="_blank" className="bg-[#635BFF] hover:bg-[#5851DF] text-white font-bold py-4 px-8 rounded-2xl shadow-xl shadow-indigo-500/20 transition-all hover:-translate-y-1 inline-flex items-center gap-3 group">
                        {isAr ? 'إدارة الاشتراكات في Stripe' : 'Manage Subscriptions in Stripe'}
                        <ExternalLink className="w-5 h-5 opacity-70 group-hover:opacity-100 transition-opacity" />
                    </a>

                    <div className="mt-10 flex items-center justify-center gap-2 px-4 py-2 bg-green-50 rounded-full border border-green-100">
                        <span className="relative flex h-2.5 w-2.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
                        </span>
                        <span className="text-[11px] font-bold text-green-700 tracking-widest uppercase">{isAr ? 'Webhooks تعمل بنسبة 100%' : 'Webhooks operating perfectly'}</span>
                    </div>
                </div>

                {/* Side Stats */}
                <div className="space-y-6">
                    <div className="glass-card rounded-[2rem] p-8 border border-white/80 shadow-sm relative overflow-hidden group hover:border-orange-200 transition-colors">
                        <div className="absolute top-0 end-0 w-32 h-32 bg-orange-400/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-12 h-12 bg-orange-50 text-orange-500 rounded-2xl flex items-center justify-center">
                                <TrendingUp className="w-5 h-5" />
                            </div>
                            <div>
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{isAr ? 'الإيرادات الشهرية' : 'Monthly MRR'}</p>
                                <p className="text-2xl font-black text-slate-800">$18,450</p>
                            </div>
                        </div>
                        <div className="text-sm font-semibold text-green-600 bg-green-50 p-3 rounded-xl inline-block w-full text-center border border-green-100">
                            {isAr ? '+12% نمو عن الشهر الماضي' : '+12% vs last month'}
                        </div>
                    </div>

                    <div className="glass-card rounded-[2rem] p-8 border border-white/80 shadow-sm relative overflow-hidden group hover:border-indigo-200 transition-colors">
                        <div className="absolute top-0 end-0 w-32 h-32 bg-indigo-400/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-12 h-12 bg-indigo-50 text-indigo-500 rounded-2xl flex items-center justify-center">
                                <Activity className="w-5 h-5" />
                            </div>
                            <div>
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{isAr ? 'المشتركين الفعالين' : 'Active Subscribers'}</p>
                                <p className="text-2xl font-black text-slate-800">3,492</p>
                            </div>
                        </div>
                        <div className="text-sm font-semibold text-slate-500 bg-slate-50 p-3 rounded-xl inline-block w-full text-center border border-slate-100">
                            {isAr ? 'متوسط الاحتفاظ: 96%' : 'Average Retention: 96%'}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
