import { cookies } from 'next/headers';
import { Search, Filter, MoreVertical, ShieldCheck, User } from 'lucide-react';

export default async function AdminUsers() {
    const cookieStore = await cookies();
    const lang = cookieStore.get('NEXT_LOCALE')?.value || 'en';
    const isAr = lang === 'ar';

    return (
        <div className="space-y-8 animate-in fade-in duration-700">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-2">
                <div>
                    <h2 className="text-3xl font-black text-slate-800 tracking-tight">{isAr ? 'إدارة المستخدمين' : 'User Management'}</h2>
                    <p className="text-sm font-medium text-slate-500 mt-2 max-w-lg leading-relaxed">{isAr ? 'تحكم في حسابات المستخدمين وإدارة باقاتهم.' : 'Control user accounts and their subscription plans.'}</p>
                </div>
                <button className="bg-gradient-to-r from-slate-800 to-slate-900 text-white font-bold px-6 py-3 rounded-2xl shadow-lg shadow-slate-900/20 hover:shadow-slate-900/40 hover:-translate-y-0.5 transition-all">
                    {isAr ? '+ أضف مستخدماً' : '+ Create User'}
                </button>
            </div>

            {/* Content Container */}
            <div className="glass-card rounded-[2.5rem] p-6 text-start md:p-8 border border-white/80 shadow-sm relative overflow-hidden flex flex-col">
                <div className="absolute top-0 end-0 w-64 h-64 bg-orange-100 rounded-full blur-3xl opacity-50 -z-10"></div>

                {/* Tools Bar */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
                    <div className="relative w-full md:max-w-md">
                        <Search className={`absolute overflow-hidden ${isAr ? 'right-4' : 'left-4'} top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400`} />
                        <input
                            type="text"
                            placeholder={isAr ? 'ابحث بالبريد أو الاسم...' : 'Search by email or name...'}
                            className={`w-full ${isAr ? 'pr-12 pl-4' : 'pl-12 pr-4'} py-3.5 border border-slate-200/60 rounded-2xl text-sm font-medium bg-white/60 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition-all shadow-sm`}
                        />
                    </div>
                    <button className="flex items-center gap-2 px-5 py-3.5 bg-white border border-slate-200/60 rounded-2xl text-sm font-bold text-slate-600 hover:text-slate-900 hover:border-slate-300 transition-all w-full md:w-auto justify-center shadow-sm">
                        <Filter className="w-4 h-4" />
                        {isAr ? 'تصفية النتائج' : 'Filter Options'}
                    </button>
                </div>

                {/* Users List */}
                <div className="flex-1 overflow-x-auto min-h-[400px]">
                    <div className="min-w-[700px]">
                        {/* Header Row */}
                        <div className="grid grid-cols-[3fr_2fr_1.5fr_1fr] gap-4 pb-4 px-4 text-xs font-black uppercase tracking-widest text-slate-400 border-b border-slate-100 mb-2">
                            <div>{isAr ? 'المستخدم' : 'User'}</div>
                            <div>{isAr ? 'تاريخ الانضمام' : 'Joined'}</div>
                            <div>{isAr ? 'الخطة' : 'Plan'}</div>
                            <div className="text-end">{isAr ? 'الإجراءات' : 'Actions'}</div>
                        </div>

                        {/* User Items */}
                        <div className="space-y-3">
                            {[
                                { name: 'Ahmed Hassan', email: 'ahmed.dev@gmail.com', dateAr: '٢٢ أكتوبر ٢٠٢٥', dateEn: 'Oct 22, 2025', plan: 'PRO', active: true, letter: 'A' },
                                { name: 'Khaled Startups', email: 'khaled@agency.net', dateAr: '١٥ أكتوبر ٢٠٢٥', dateEn: 'Oct 15, 2025', plan: 'FREE', active: false, letter: 'K' },
                                { name: 'Sarah Tech', email: 'sarah.tech@outlook.com', dateAr: '10 أكتوبر ٢٠٢٥', dateEn: 'Oct 10, 2025', plan: 'PRO', active: true, letter: 'S' },
                                { name: 'Mark Willson', email: 'mark.w@startup.io', dateAr: '٠٥ أكتوبر ٢٠٢٥', dateEn: 'Oct 05, 2025', plan: 'FREE', active: true, letter: 'M' },
                                { name: 'Nour El-Din', email: 'nour422@gmail.com', dateAr: '٠١ أكتوبر ٢٠٢٥', dateEn: 'Oct 01, 2025', plan: 'PREMIUM', active: true, letter: 'N' },
                            ].map((user, idx) => (
                                <div key={idx} className="grid grid-cols-[3fr_2fr_1.5fr_1fr] items-center gap-4 p-4 rounded-2xl bg-white/40 hover:bg-white border text-start border-white hover:border-orange-100 hover:shadow-md transition-all group">

                                    {/* User Column */}
                                    <div className="flex items-center gap-4 truncate">
                                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-lg shadow-sm shrink-0
                                            ${user.plan === 'FREE' ? 'bg-slate-100 text-slate-500' : 'bg-gradient-to-tr from-orange-500 to-red-500 text-white'}`}>
                                            {user.letter}
                                        </div>
                                        <div className="truncate">
                                            <div className="font-bold text-sm text-slate-800 group-hover:text-orange-600 transition-colors truncate">{user.name}</div>
                                            <div className="text-xs font-semibold text-slate-500 mt-0.5 truncate">{user.email}</div>
                                        </div>
                                    </div>

                                    {/* Date Column */}
                                    <div className="text-xs font-semibold text-slate-500 truncate">
                                        {isAr ? user.dateAr : user.dateEn}
                                    </div>

                                    {/* Plan Column */}
                                    <div className="flex items-center gap-2 shrink-0">
                                        <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest border 
                                            ${user.plan === 'FREE' ? 'bg-slate-50 text-slate-500 border-slate-200' :
                                                user.plan === 'PRO' ? 'bg-orange-50 text-orange-600 border-orange-200' :
                                                    'bg-blue-50 text-blue-600 border-blue-200'}`}>
                                            {user.plan}
                                        </span>
                                    </div>

                                    {/* Actions Column */}
                                    <div className="flex justify-end pe-2">
                                        <button className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:bg-orange-50 hover:text-orange-600 transition-colors">
                                            <MoreVertical className="w-5 h-5" />
                                        </button>
                                    </div>

                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Pagination */}
                <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between text-sm gap-4">
                    <span className="font-semibold text-slate-500">{isAr ? 'عرض 1-5 من 3,500 حساب' : 'Showing 1-5 of 3,500 accounts'}</span>
                    <div className="flex gap-2">
                        <button className="px-4 py-2 rounded-xl border border-slate-200 font-bold text-slate-400 cursor-not-allowed bg-slate-50">{isAr ? 'السابق' : 'Prev'}</button>
                        <button className="px-4 py-2 rounded-xl border border-slate-200 font-bold text-slate-700 hover:border-orange-300 hover:text-orange-600 bg-white transition-colors shadow-sm">{isAr ? 'التالي' : 'Next'}</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
