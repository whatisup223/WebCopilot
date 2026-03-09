import { cookies } from 'next/headers';
import { PlusCircle, Link as LinkIcon, Star, PenLine, Trash2, ArrowUpRight } from 'lucide-react';

export default async function AdminSponsors() {
    const cookieStore = await cookies();
    const lang = cookieStore.get('NEXT_LOCALE')?.value || 'en';
    const isAr = lang === 'ar';

    return (
        <div className="space-y-8 animate-in fade-in duration-700">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-2">
                <div>
                    <h2 className="text-3xl font-black text-slate-800 tracking-tight">{isAr ? 'أدوات الرعاة (Sponsors)' : 'Sponsors & Affiliates'}</h2>
                    <p className="text-sm font-medium text-slate-500 mt-2 max-w-lg leading-relaxed">
                        {isAr ? 'أضف راوبط الأدوات لتظهر في ملخصات المستخدمين الفيروسية.' : 'Add AI tools and sponsors that will be exposed in user viral summaries.'}
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">

                {/* Form to Add New Tool */}
                <div className="lg:col-span-2 glass-card rounded-[2.5rem] p-8 border border-white/80 shadow-sm relative overflow-hidden h-fit">
                    <div className="absolute top-0 end-0 w-40 h-40 bg-pink-100 rounded-full blur-3xl opacity-50 -z-10"></div>

                    <h3 className="text-xl font-black text-slate-800 mb-8 flex items-center gap-3">
                        <div className="w-10 h-10 bg-pink-50 text-pink-500 rounded-xl flex items-center justify-center">
                            <PlusCircle className="w-5 h-5" />
                        </div>
                        {isAr ? 'إضافة أداة جديدة' : 'Add New Tool'}
                    </h3>

                    <form className="space-y-5">
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-2">{isAr ? 'اسم الأداة' : 'Tool Name'}</label>
                            <input type="text" placeholder={isAr ? 'مثال: Canva' : 'e.g., Canva'} className="w-full px-5 py-4 border border-slate-200/60 rounded-2xl text-sm font-medium bg-white/60 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition-all shadow-sm" />
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-2">{isAr ? 'رابط الإحالة' : 'Affiliate URL'}</label>
                            <input type="url" placeholder="https://" className="w-full px-5 py-4 border border-slate-200/60 rounded-2xl text-sm font-medium bg-white/60 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition-all shadow-sm text-start" dir="ltr" />
                        </div>

                        <div className="space-y-3 pt-2">
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-2">{isAr ? 'نوع الرابط' : 'Link Type'}</label>
                            <div className="grid grid-cols-2 gap-4">
                                <label className="flex items-center gap-3 p-4 rounded-2xl border border-orange-200 bg-orange-50 cursor-pointer transition-all hover:bg-orange-100">
                                    <input type="radio" name="toolType" defaultChecked className="w-4 h-4 accent-orange-500" />
                                    <span className="text-xs font-black text-orange-700 tracking-widest">AFFILIATE</span>
                                </label>
                                <label className="flex items-center gap-3 p-4 rounded-2xl border border-slate-200 bg-white cursor-pointer transition-all hover:bg-slate-50">
                                    <input type="radio" name="toolType" className="w-4 h-4 accent-blue-500" />
                                    <span className="text-xs font-black text-slate-600 tracking-widest">SPONSOR</span>
                                </label>
                            </div>
                        </div>

                        <button className="w-full mt-6 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-black py-4 rounded-2xl shadow-xl shadow-orange-500/20 transition-transform hover:-translate-y-1">
                            {isAr ? 'حفظ ونشر مباشر' : 'Save & Publish Live'}
                        </button>
                    </form>
                </div>

                {/* List of active tools */}
                <div className="lg:col-span-3 glass-card rounded-[2.5rem] p-8 border border-white/80 shadow-sm relative overflow-hidden min-h-[500px] flex flex-col">
                    <div className="absolute top-0 end-0 w-64 h-64 bg-orange-100 rounded-full blur-3xl opacity-30 -z-10"></div>

                    <h3 className="text-xl font-black text-slate-800 mb-8 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-orange-50 text-orange-500 rounded-xl flex items-center justify-center">
                                <Star className="w-5 h-5" />
                            </div>
                            {isAr ? 'الأدوات النشطة' : 'Active Integrations'}
                        </div>
                        <span className="text-xs font-bold bg-slate-100 text-slate-500 px-3 py-1.5 rounded-lg">{isAr ? '2 أداة' : '2 Tools'}</span>
                    </h3>

                    <div className="space-y-4 flex-1 overflow-y-auto pr-2">
                        {/* Tool Item 1 */}
                        <div className="group p-5 border border-slate-100 bg-white/60 hover:bg-white rounded-[1.5rem] flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all shadow-sm hover:shadow-md hover:border-orange-100">
                            <div className="flex items-start sm:items-center gap-4">
                                <div className="w-12 h-12 bg-gradient-to-tr from-orange-100 to-orange-50 text-orange-600 rounded-xl flex items-center justify-center font-black text-xl shrink-0 border border-orange-200/50">
                                    S
                                </div>
                                <div className="truncate text-start">
                                    <h4 className="font-bold text-slate-800 group-hover:text-orange-600 transition-colors">Semrush</h4>
                                    <div className="flex items-center gap-2 mt-1">
                                        <LinkIcon className="w-3 h-3 text-slate-400" />
                                        <p className="text-[11px] font-semibold text-slate-400 truncate w-48" dir="ltr">https://semrush.com/ref/123</p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center justify-between sm:justify-end gap-4 shrink-0">
                                <span className="text-[10px] font-black bg-orange-50 border border-orange-100 text-orange-600 px-2 py-1.5 rounded-lg tracking-widest">AFFILIATE</span>
                                <div className="flex items-center gap-2 border-l border-slate-100 pl-4 (ltr mode override locally if needed) ms-2 ps-4">
                                    <button className="text-slate-400 hover:text-orange-500 transition-colors p-1"><PenLine className="w-4 h-4" /></button>
                                    <button className="text-slate-400 hover:text-red-500 transition-colors p-1"><Trash2 className="w-4 h-4" /></button>
                                </div>
                            </div>
                        </div>

                        {/* Tool Item 2 */}
                        <div className="group p-5 border border-slate-100 bg-white/60 hover:bg-white rounded-[1.5rem] flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all shadow-sm hover:shadow-md hover:border-blue-100">
                            <div className="flex items-start sm:items-center gap-4">
                                <div className="w-12 h-12 bg-gradient-to-tr from-blue-100 to-blue-50 text-blue-600 rounded-xl flex items-center justify-center font-black text-xl shrink-0 border border-blue-200/50">
                                    G
                                </div>
                                <div className="truncate text-start">
                                    <h4 className="font-bold text-slate-800 group-hover:text-blue-600 transition-colors">Grammarly</h4>
                                    <div className="flex items-center gap-2 mt-1">
                                        <LinkIcon className="w-3 h-3 text-slate-400" />
                                        <p className="text-[11px] font-semibold text-slate-400 truncate w-48" dir="ltr">https://grammarly.com/ref/abc</p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center justify-between sm:justify-end gap-4 shrink-0">
                                <span className="text-[10px] font-black bg-blue-50 border border-blue-100 text-blue-600 px-2 py-1.5 rounded-lg tracking-widest">SPONSOR</span>
                                <div className="flex items-center gap-2 border-slate-100 ms-2 ps-4" style={{ borderInlineStartWidth: '1px' }}>
                                    <button className="text-slate-400 hover:text-blue-500 transition-colors p-1"><PenLine className="w-4 h-4" /></button>
                                    <button className="text-slate-400 hover:text-red-500 transition-colors p-1"><Trash2 className="w-4 h-4" /></button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
