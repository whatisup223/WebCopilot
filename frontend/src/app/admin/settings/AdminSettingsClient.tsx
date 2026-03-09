"use client";
import { useState, useEffect } from 'react';
import { Globe, UserCog, CreditCard, BrainCircuit, KeyRound, Terminal, Loader2, Link as LinkIcon } from 'lucide-react';

export default function AdminSettingsClient({ isAr }: { isAr: boolean }) {
    const [activeTab, setActiveTab] = useState('general');
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [settings, setSettings] = useState({
        siteName: 'Web Copilot',
        siteDescription: '',
        openaiKey: '',
        aiModel: 'gpt-4o-mini',
        systemPrompt: '',
        stripePubKey: '',
        stripeSecKey: '',
        stripeWebhookSecret: '',
        freeDemoLimit: 1,
        sponsors: [] as Array<{ name: string, url: string, category: string }>
    });

    useEffect(() => {
        fetchSettings();
    }, []);

    const fetchSettings = async () => {
        setLoading(true);
        try {
            const res = await fetch('http://localhost:5000/api/settings');
            const data = await res.json();
            if (data.success && data.settings) {
                setSettings(prev => ({ ...prev, ...data.settings }));
            }
        } catch (error) {
            console.error('Error fetching settings:', error);
        }
        setLoading(false);
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        try {
            const res = await fetch('http://localhost:5000/api/settings', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(settings)
            });
            const data = await res.json();
            if (data.success) {
                alert(isAr ? 'تم حفظ الإعدادات بنجاح!' : 'Settings saved successfully!');
            }
        } catch (error) {
            console.error('Error saving settings:', error);
            alert(isAr ? 'خطأ أثناء الحفظ' : 'Error saving settings');
        }
        setSaving(false);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setSettings({ ...settings, [e.target.name]: e.target.value });
    };

    const tabs = [
        { id: 'general', name: isAr ? 'إعدادات الموقع' : 'General', icon: <Globe className="w-4 h-4" /> },
        { id: 'ai', name: isAr ? 'الذكاء الاصطناعي' : 'AI Models', icon: <BrainCircuit className="w-4 h-4" /> },
        { id: 'stripe', name: isAr ? 'بوابات الدفع' : 'Stripe & Billing', icon: <CreditCard className="w-4 h-4" /> },
        { id: 'sponsors', name: isAr ? 'أدوات الرعاة' : 'Sponsors', icon: <LinkIcon className="w-4 h-4" /> },
        { id: 'account', name: isAr ? 'حساب المدير' : 'Admin Profile', icon: <UserCog className="w-4 h-4" /> },
    ];

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
            </div>
        );
    }

    return (
        <div className="space-y-8 animate-in fade-in duration-700 pb-12">

            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-4">
                <div>
                    <h2 className="text-3xl font-black text-slate-800 tracking-tight">{isAr ? 'إعدادات النظام الشاملة' : 'System Configuration'}</h2>
                    <p className="text-sm font-medium text-slate-500 mt-2 max-w-lg leading-relaxed">
                        {isAr
                            ? 'تحكم في أدمغة الذكاء الاصطناعي، بوابات الدفع، وإعدادات الموقع المركزية الخاصة بك.'
                            : 'Master control center for AI Models, payment gateways, and core site preferences.'}
                    </p>
                </div>
            </div>

            {/* Tabs Navigation */}
            <div className="flex border-b border-slate-200 overflow-x-auto hide-scrollbar gap-2 mb-8">
                {tabs.map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex items-center gap-2 px-6 py-4 text-sm font-bold border-b-2 transition-all shrink-0
                        ${activeTab === tab.id
                                ? 'border-orange-500 text-orange-600 bg-orange-50/50'
                                : 'border-transparent text-slate-500 hover:text-slate-800 hover:bg-slate-50'}`}
                    >
                        {tab.icon}
                        {tab.name}
                    </button>
                ))}
            </div>

            <form onSubmit={handleSave} className="relative">

                {/* 1. General Settings Tab */}
                {activeTab === 'general' && (
                    <div className="glass-card rounded-[2.5rem] p-8 md:p-10 border border-white/80 shadow-sm relative overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="absolute top-0 end-0 w-40 h-40 bg-blue-100/50 rounded-full blur-3xl opacity-50 -z-10"></div>
                        <h3 className="text-xl font-black text-slate-800 mb-8 flex items-center gap-4">
                            <div className="w-12 h-12 bg-blue-50 text-blue-500 rounded-2xl flex items-center justify-center shadow-inner">
                                <Globe className="w-6 h-6" />
                            </div>
                            {isAr ? 'إعدادات الموقع المظهرية' : 'General Site Settings'}
                        </h3>
                        <div className="space-y-6 max-w-2xl">
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ms-2">{isAr ? 'اسم المنصة الأساسي' : 'Site Name'}</label>
                                <input type="text" name="siteName" value={settings.siteName} onChange={handleChange} className="w-full px-5 py-4 border border-slate-200/60 rounded-2xl text-sm font-bold text-slate-800 bg-white/60 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all shadow-sm" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ms-2">{isAr ? 'الوصف التعريفي (SEO)' : 'Meta Description (SEO)'}</label>
                                <textarea name="siteDescription" rows={4} value={settings.siteDescription} onChange={handleChange} className="w-full px-5 py-4 border border-slate-200/60 rounded-2xl text-sm font-medium text-slate-600 bg-white/60 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all shadow-sm resize-none"></textarea>
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ms-2">{isAr ? 'عدد التحليلات المجانية المسموحة (للزوار)' : 'Free Demo Analysis Limit'}</label>
                                <input type="number" name="freeDemoLimit" value={settings.freeDemoLimit} onChange={handleChange} min="0" className="w-full px-5 py-4 border border-slate-200/60 rounded-2xl text-sm font-bold text-slate-800 bg-white/60 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all shadow-sm text-start" dir="ltr" />
                                <p className="text-xs text-slate-400 ms-2 mt-1">{isAr ? 'الحد الأقصى للروابط التي يمكن لزائر الصفحة الرئيسية تحليلها مجاناً.' : 'Max analysis requests a non-logged in user can make on the landing page'}</p>
                            </div>
                        </div>
                    </div>
                )}

                {/* 2. AI Settings Tab */}
                {activeTab === 'ai' && (
                    <div className="glass-card rounded-[2.5rem] p-8 md:p-10 border border-white/80 shadow-sm relative overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="absolute top-0 end-0 w-64 h-64 bg-purple-200/40 rounded-full blur-3xl opacity-50 -z-10"></div>
                        <h3 className="text-xl font-black text-slate-800 mb-8 flex items-center gap-4">
                            <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center shadow-inner">
                                <BrainCircuit className="w-6 h-6" />
                            </div>
                            {isAr ? 'إعدادات الذكاء الاصطناعي والتحليل' : 'AI Models & Analysis Context'}
                        </h3>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ms-2">{isAr ? 'نموذج المعالجة الافتراضي' : 'Default AI Model'}</label>
                                    <select name="aiModel" value={settings.aiModel} onChange={handleChange} className="w-full px-5 py-4 border border-slate-200/60 rounded-2xl text-sm font-bold text-purple-900 bg-white/80 focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all shadow-sm appearance-none cursor-pointer" dir="ltr">
                                        <option value="gpt-4o">GPT-4o (OpenAI) - Default/Best</option>
                                        <option value="gpt-4o-mini">GPT-4o Mini (OpenAI) - Fastest</option>
                                        <option value="gpt-4-turbo">GPT-4 Turbo (OpenAI) - Reliable</option>
                                        <option value="gpt-4">GPT-4 (OpenAI) - Legacy Heavy</option>
                                        <option value="gpt-3.5-turbo">GPT-3.5 Turbo (OpenAI) - Legacy Fast</option>
                                        <option value="o1-preview">o1 Preview (OpenAI) - Advanced Reasoning</option>
                                        <option value="o1-mini">o1 Mini (OpenAI) - Fast Reasoning</option>
                                        <option value="claude-3-opus">Claude 3 Opus (Anthropic)</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ms-2 flex items-center gap-2">
                                        <KeyRound className="w-3 h-3" />
                                        {isAr ? 'مفتاح الـ API (OpenAI)' : 'OpenAI API Secret Key'}
                                    </label>
                                    <input type="password" name="openaiKey" value={settings.openaiKey} onChange={handleChange} placeholder="sk-..." className="w-full px-5 py-4 border border-slate-200/60 rounded-2xl text-sm font-medium text-slate-800 bg-white/80 focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all shadow-sm font-mono text-start" dir="ltr" />
                                    <p className="text-xs text-slate-400 ms-2 mt-1">{isAr ? 'سيتم استخدام هذا المفتاح فوراً في إضافة المتصفح لتحليل النصوص.' : 'This key will be instantly used by the Chrome extension.'}</p>
                                </div>
                            </div>
                            <div className="space-y-2 h-full flex flex-col">
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ms-2 flex items-center gap-2">
                                    <Terminal className="w-3 h-3" />
                                    {isAr ? 'برومبت النظام (System Prompt)' : 'Master System Prompt'}
                                </label>
                                <textarea
                                    name="systemPrompt"
                                    value={settings.systemPrompt}
                                    onChange={handleChange}
                                    className="w-full flex-1 min-h-[200px] p-5 border border-slate-200/60 rounded-2xl text-sm font-mono text-slate-500 bg-slate-900 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all shadow-inner leading-relaxed resize-none text-start"
                                    dir="ltr"
                                    spellCheck="false"
                                ></textarea>
                            </div>
                        </div>
                    </div>
                )}

                {/* 3. Stripe Tab */}
                {activeTab === 'stripe' && (
                    <div className="glass-card rounded-[2.5rem] p-8 md:p-10 border border-white/80 shadow-sm relative overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="absolute top-0 end-0 w-64 h-64 bg-indigo-100/50 rounded-full blur-3xl opacity-50 -z-10"></div>
                        <h3 className="text-xl font-black text-slate-800 mb-8 flex items-center gap-4">
                            <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center shadow-inner">
                                <CreditCard className="w-6 h-6" />
                            </div>
                            {isAr ? 'مفاتيح بوابات الدفع (Stripe)' : 'Payment Gateways Integration'}
                        </h3>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-4xl">
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ms-2">{isAr ? 'مفتاح النشر (Publishable Key)' : 'Stripe Publishable Key'}</label>
                                <input type="text" name="stripePubKey" value={settings.stripePubKey} onChange={handleChange} placeholder="pk_test_..." className="w-full px-5 py-4 border border-slate-200/60 rounded-2xl text-sm font-mono text-slate-800 bg-white/60 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all shadow-sm text-start" dir="ltr" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ms-2">{isAr ? 'المفتاح السري (Secret Key)' : 'Stripe Secret Key'}</label>
                                <input type="password" name="stripeSecKey" value={settings.stripeSecKey} onChange={handleChange} placeholder="sk_test_..." className="w-full px-5 py-4 border border-slate-200/60 rounded-2xl text-sm font-mono text-slate-800 bg-white/60 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all shadow-sm text-start" dir="ltr" />
                            </div>
                            <div className="space-y-2 lg:col-span-2">
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ms-2">{isAr ? 'مفتاح الـ Webhook' : 'Webhook Signing Secret'}</label>
                                <input type="password" name="stripeWebhookSecret" value={settings.stripeWebhookSecret} onChange={handleChange} placeholder="whsec_..." className="w-full px-5 py-4 border border-slate-200/60 rounded-2xl text-sm font-mono text-slate-800 bg-white/60 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all shadow-sm text-start" dir="ltr" />
                            </div>
                        </div>
                    </div>
                )}

                {/* 4. Sponsors Tab */}
                {activeTab === 'sponsors' && (
                    <div className="glass-card rounded-[2.5rem] p-8 md:p-10 border border-white/80 shadow-sm relative overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="absolute top-0 end-0 w-64 h-64 bg-emerald-100/50 rounded-full blur-3xl opacity-50 -z-10"></div>
                        <h3 className="text-xl font-black text-slate-800 mb-8 flex items-center gap-4">
                            <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center shadow-inner">
                                <LinkIcon className="w-6 h-6" />
                            </div>
                            {isAr ? 'إدارة أدوات الرعاة (Sponsor Tools)' : 'Manage Sponsor Tools'}
                        </h3>

                        <div className="space-y-6">
                            <p className="text-sm text-slate-500 font-medium max-w-2xl leading-relaxed">
                                {isAr
                                    ? 'هذه الأدوات ستظهر للمستخدمين كأدوات "مقترحة ومفيدة" بناءً على سياق المقال. سيقوم الذكاء الاصطناعي باختيار الأنسب منها تلقائياً.'
                                    : 'These tools will appear to users as "Suggested Useful Tools" based on context. AI will automatically pick the most relevant ones.'}
                            </p>

                            <div className="space-y-4">
                                {(settings.sponsors || []).map((sponsor, index) => (
                                    <div key={index} className="flex flex-wrap md:flex-nowrap gap-4 items-end bg-slate-50/50 p-6 rounded-[1.5rem] border border-slate-100 animate-in fade-in zoom-in duration-300">
                                        <div className="flex-1 min-w-[150px] space-y-2">
                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-tighter ms-1">{isAr ? 'اسم الأداة' : 'Tool Name'}</label>
                                            <input
                                                type="text"
                                                value={sponsor.name}
                                                onChange={(e) => {
                                                    const newSponsors = [...settings.sponsors];
                                                    newSponsors[index].name = e.target.value;
                                                    setSettings({ ...settings, sponsors: newSponsors });
                                                }}
                                                className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm font-bold bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                                            />
                                        </div>
                                        <div className="flex-1 min-w-[200px] space-y-2">
                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-tighter ms-1">{isAr ? 'الرابط (Affiliate URL)' : 'Affiliate URL'}</label>
                                            <input
                                                type="text"
                                                value={sponsor.url}
                                                onChange={(e) => {
                                                    const newSponsors = [...settings.sponsors];
                                                    newSponsors[index].url = e.target.value;
                                                    setSettings({ ...settings, sponsors: newSponsors });
                                                }}
                                                className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm font-medium bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                                            />
                                        </div>
                                        <div className="w-full md:w-32 space-y-2">
                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-tighter ms-1">{isAr ? 'التصنيف' : 'Category'}</label>
                                            <input
                                                type="text"
                                                value={sponsor.category}
                                                placeholder="SEO, AI, etc."
                                                onChange={(e) => {
                                                    const newSponsors = [...settings.sponsors];
                                                    newSponsors[index].category = e.target.value;
                                                    setSettings({ ...settings, sponsors: newSponsors });
                                                }}
                                                className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm font-bold bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 shadow-sm"
                                            />
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => {
                                                const newSponsors = settings.sponsors.filter((_, i) => i !== index);
                                                setSettings({ ...settings, sponsors: newSponsors });
                                            }}
                                            className="px-4 py-3 bg-red-50 text-red-500 rounded-xl hover:bg-red-100 transition-colors"
                                        >
                                            {isAr ? 'حذف' : 'Delete'}
                                        </button>
                                    </div>
                                ))}

                                <button
                                    type="button"
                                    onClick={() => {
                                        setSettings({
                                            ...settings,
                                            sponsors: [...(settings.sponsors || []), { name: '', url: '', category: '' }]
                                        });
                                    }}
                                    className="w-full py-4 border-2 border-dashed border-slate-200 rounded-2xl text-slate-400 font-bold hover:border-emerald-500 hover:text-emerald-500 hover:bg-emerald-50 transition-all flex items-center justify-center gap-2"
                                >
                                    + {isAr ? 'إضافة أداة راعي جديدة' : 'Add New Sponsor Tool'}
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* 5. Account Tab */}
                {activeTab === 'account' && (
                    <div className="glass-card rounded-[2.5rem] p-8 md:p-10 border border-white/80 shadow-sm relative overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="absolute top-0 end-0 w-40 h-40 bg-slate-200/50 rounded-full blur-3xl opacity-50 -z-10"></div>
                        <h3 className="text-xl font-black text-slate-800 mb-8 flex items-center gap-4">
                            <div className="w-12 h-12 bg-slate-100 text-slate-600 rounded-2xl flex items-center justify-center shadow-inner">
                                <UserCog className="w-6 h-6" />
                            </div>
                            {isAr ? 'حساب المدير' : 'Admin Profile'}
                        </h3>
                        <div className="space-y-6 max-w-2xl">
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ms-2">{isAr ? 'الاسم' : 'Name'}</label>
                                <input type="text" defaultValue="Super Admin" className="w-full px-5 py-4 border border-slate-200/60 rounded-2xl text-sm font-bold text-slate-800 bg-white/60 focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-500/20 transition-all shadow-sm" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ms-2">{isAr ? 'كلمة المرور الجديدة' : 'New Password'}</label>
                                <input type="password" placeholder="••••••••••••" className="w-full px-5 py-4 border border-slate-200/60 rounded-2xl text-sm font-bold text-slate-800 bg-white/60 focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-500/20 transition-all shadow-sm font-mono leading-none" />
                            </div>
                        </div>
                    </div>
                )}

                {/* Save Button */}
                <div className="mt-8 flex justify-end">
                    <button type="submit" disabled={saving} className={`bg-gradient-to-r from-orange-500 to-red-500 text-white font-black px-10 py-4 rounded-2xl shadow-xl shadow-orange-500/20 hover:shadow-orange-500/40 hover:-translate-y-0.5 transition-all flex items-center gap-3 ${saving ? 'opacity-70 cursor-not-allowed' : ''}`}>
                        {saving && <Loader2 className="w-5 h-5 animate-spin" />}
                        {isAr ? 'حفظ كافة التغييرات' : 'Save All Changes'}
                    </button>
                </div>
            </form>

        </div>
    );
}
