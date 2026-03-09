"use client";
import { useState, useEffect } from 'react';
import { PlusCircle, Link as LinkIcon, Star, Trash2, Loader2, Globe } from 'lucide-react';

interface Sponsor {
    _id?: string;
    name: string;
    url: string;
    type: 'AFFILIATE' | 'SPONSOR';
    category: string;
}

export default function SponsorsClient({ isAr }: { isAr: boolean }) {
    const [sponsors, setSponsors] = useState<Sponsor[]>([]);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [newSponsor, setNewSponsor] = useState<Sponsor>({
        name: '',
        url: '',
        type: 'AFFILIATE',
        category: ''
    });

    const fetchSponsors = async () => {
        try {
            const res = await fetch('http://localhost:5000/api/sponsors');
            const data = await res.json();
            if (data.success) setSponsors(data.sponsors);
        } catch (err) {
            console.error("Failed to fetch sponsors:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSponsors();
    }, []);

    const handleAdd = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newSponsor.name || !newSponsor.url) return;
        setSubmitting(true);
        try {
            const res = await fetch('http://localhost:5000/api/sponsors', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newSponsor)
            });
            const data = await res.json();
            if (data.success) {
                setSponsors([data.sponsor, ...sponsors]);
                setNewSponsor({ name: '', url: '', type: 'AFFILIATE', category: '' });
            }
        } catch (err) {
            console.error("Error adding sponsor:", err);
        } finally {
            setSubmitting(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm(isAr ? 'هل أنت متأكد من حذف هذه الأداة؟' : 'Are you sure you want to delete this tool?')) return;
        try {
            const res = await fetch(`http://localhost:5000/api/sponsors/${id}`, { method: 'DELETE' });
            const data = await res.json();
            if (data.success) {
                setSponsors(sponsors.filter(s => s._id !== id));
            }
        } catch (err) {
            console.error("Error deleting sponsor:", err);
        }
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-700">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-2">
                <div>
                    <h2 className="text-3xl font-black text-slate-800 tracking-tight">{isAr ? 'أدوات الرعاة (Sponsors)' : 'Sponsors & Affiliates'}</h2>
                    <p className="text-sm font-medium text-slate-500 mt-2 max-w-lg leading-relaxed">
                        {isAr ? 'أضف راوبط الأدوات لتظهر في ملخصات المستخدمين الفيروسية بشكل ذكي.' : 'Add AI tools and sponsors that will be intelligently exposed in user viral summaries.'}
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">

                {/* Form to Add New Tool */}
                <div className="lg:col-span-2 glass-card rounded-[2.5rem] p-8 border border-white/80 shadow-sm relative overflow-hidden h-fit">
                    <div className="absolute top-0 end-0 w-40 h-40 bg-orange-100 rounded-full blur-3xl opacity-50 -z-10"></div>

                    <h3 className="text-xl font-black text-slate-800 mb-8 flex items-center gap-3">
                        <div className="w-10 h-10 bg-orange-50 text-orange-500 rounded-xl flex items-center justify-center">
                            <PlusCircle className="w-5 h-5" />
                        </div>
                        {isAr ? 'إضافة أداة جديدة' : 'Add New Tool'}
                    </h3>

                    <form className="space-y-5" onSubmit={handleAdd}>
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-2">{isAr ? 'اسم الأداة' : 'Tool Name'}</label>
                            <input
                                type="text"
                                value={newSponsor.name}
                                onChange={(e) => setNewSponsor({ ...newSponsor, name: e.target.value })}
                                placeholder={isAr ? 'مثال: Canva' : 'e.g., Canva'}
                                className="w-full px-5 py-4 border border-slate-200/60 rounded-2xl text-sm font-medium bg-white/60 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition-all shadow-sm"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-2">{isAr ? 'رابط الإحالة' : 'Affiliate URL'}</label>
                            <input
                                type="url"
                                value={newSponsor.url}
                                onChange={(e) => setNewSponsor({ ...newSponsor, url: e.target.value })}
                                placeholder="https://"
                                className="w-full px-5 py-4 border border-slate-200/60 rounded-2xl text-sm font-medium bg-white/60 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition-all shadow-sm text-start"
                                dir="ltr"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-2">{isAr ? 'التصنيف (لذكاء الإصطناعي)' : 'Category (AI Smart Match)'}</label>
                            <input
                                type="text"
                                value={newSponsor.category}
                                onChange={(e) => setNewSponsor({ ...newSponsor, category: e.target.value })}
                                placeholder={isAr ? 'مثال: SEO, Marketing' : 'e.g. SEO, Marketing'}
                                className="w-full px-5 py-4 border border-slate-200/60 rounded-2xl text-sm font-medium bg-white/60 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition-all shadow-sm"
                            />
                        </div>

                        <div className="space-y-3 pt-2">
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-2">{isAr ? 'نوع الرابط' : 'Link Type'}</label>
                            <div className="grid grid-cols-2 gap-4">
                                <button type="button" onClick={() => setNewSponsor({ ...newSponsor, type: 'AFFILIATE' })} className={`flex items-center gap-3 p-4 rounded-2xl border cursor-pointer transition-all ${newSponsor.type === 'AFFILIATE' ? 'border-orange-200 bg-orange-50' : 'border-slate-100 bg-white'}`}>
                                    <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${newSponsor.type === 'AFFILIATE' ? 'border-orange-500 bg-orange-500 shadow-[0_0_0_2px_white_inset]' : 'border-slate-300'}`}></div>
                                    <span className="text-[10px] font-black tracking-widest">AFFILIATE</span>
                                </button>
                                <button type="button" onClick={() => setNewSponsor({ ...newSponsor, type: 'SPONSOR' })} className={`flex items-center gap-3 p-4 rounded-2xl border cursor-pointer transition-all ${newSponsor.type === 'SPONSOR' ? 'border-orange-200 bg-orange-50' : 'border-slate-100 bg-white'}`}>
                                    <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${newSponsor.type === 'SPONSOR' ? 'border-orange-500 bg-orange-500 shadow-[0_0_0_2px_white_inset]' : 'border-slate-300'}`}></div>
                                    <span className="text-[10px] font-black tracking-widest">SPONSOR</span>
                                </button>
                            </div>
                        </div>

                        <button
                            disabled={submitting}
                            className="w-full mt-6 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-black py-4 rounded-2xl shadow-xl shadow-orange-500/20 transition-transform hover:-translate-y-1 flex items-center justify-center gap-2"
                        >
                            {submitting ? <Loader2 className="w-5 h-5 animate-spin" /> : (isAr ? 'حفظ ونشر مباشر' : 'Save & Publish Live')}
                        </button>
                    </form>
                </div>

                {/* List of active tools */}
                <div className="lg:col-span-3 glass-card rounded-[2.5rem] p-8 border border-white/80 shadow-sm relative overflow-hidden min-h-[500px] flex flex-col">
                    <div className="absolute top-0 end-0 w-64 h-64 bg-slate-100 rounded-full blur-3xl opacity-30 -z-10"></div>

                    <h3 className="text-xl font-black text-slate-800 mb-8 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-slate-50 text-slate-400 rounded-xl flex items-center justify-center">
                                <Globe className="w-5 h-5" />
                            </div>
                            {isAr ? 'الأدوات النشطة' : 'Active Integrations'}
                        </div>
                        <span className="text-xs font-bold bg-slate-100 text-slate-500 px-3 py-1.5 rounded-lg">{sponsors.length} {isAr ? 'أداة' : 'Tools'}</span>
                    </h3>

                    {loading ? (
                        <div className="flex-1 flex flex-col items-center justify-center gap-2 text-slate-400">
                            <Loader2 className="w-8 h-8 animate-spin" />
                            <span className="text-sm font-bold">{isAr ? 'جاري التحميل...' : 'Fetching directory...'}</span>
                        </div>
                    ) : (
                        <div className="space-y-4 flex-1 overflow-y-auto pr-2">
                            {sponsors.length === 0 ? (
                                <div className="text-center py-10 text-slate-400 font-bold border-2 border-dashed border-slate-100 rounded-3xl">
                                    {isAr ? 'لا يوجد أدوات حالياً' : 'No tools registered yet'}
                                </div>
                            ) : (
                                sponsors.map((sponsor) => (
                                    <div key={sponsor._id} className="group p-5 border border-slate-100 bg-white/60 hover:bg-white rounded-[1.5rem] flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all shadow-sm hover:shadow-md hover:border-orange-100">
                                        <div className="flex items-start sm:items-center gap-4">
                                            <div className="w-12 h-12 bg-gradient-to-tr from-orange-100 to-orange-50 text-orange-600 rounded-xl flex items-center justify-center font-black text-xl shrink-0 border border-orange-200/50 uppercase">
                                                {sponsor.name.charAt(0)}
                                            </div>
                                            <div className="truncate text-start">
                                                <h4 className="font-bold text-slate-800 group-hover:text-orange-600 transition-colors flex items-center gap-2">
                                                    {sponsor.name}
                                                    <span className="text-[9px] bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded uppercase">{sponsor.category || 'General'}</span>
                                                </h4>
                                                <div className="flex items-center gap-2 mt-1">
                                                    <LinkIcon className="w-3 h-3 text-slate-400" />
                                                    <p className="text-[11px] font-semibold text-slate-400 truncate w-48" dir="ltr">{sponsor.url}</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between sm:justify-end gap-4 shrink-0">
                                            <span className={`text-[10px] font-black px-2 py-1.5 rounded-lg tracking-widest border ${sponsor.type === 'AFFILIATE' ? 'bg-orange-50 text-orange-600 border-orange-100' : 'bg-blue-50 text-blue-600 border-blue-100'}`}>
                                                {sponsor.type}
                                            </span>
                                            <div className="flex items-center gap-2 ms-2 ps-4 border-l border-slate-100">
                                                <button onClick={() => handleDelete(sponsor._id!)} className="text-slate-400 hover:text-red-500 transition-colors p-1"><Trash2 className="w-4 h-4" /></button>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
}
