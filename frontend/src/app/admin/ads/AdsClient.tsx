"use client";
import { useState, useEffect } from 'react';
import { Megaphone, LayoutTemplate, ShieldAlert, Code2, Loader2 } from 'lucide-react';

export default function AdsClient({ isAr }: { isAr: boolean }) {
    const [settings, setSettings] = useState({
        adsEnabled: true,
        topBannerScript: ''
    });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        fetch('http://localhost:5000/api/settings')
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    setSettings({
                        adsEnabled: data.settings.adsEnabled ?? true,
                        topBannerScript: data.settings.topBannerScript || ''
                    });
                }
            })
            .finally(() => setLoading(false));
    }, []);

    const handleSave = async () => {
        setSaving(true);
        try {
            const res = await fetch('http://localhost:5000/api/settings', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(settings)
            });
            const data = await res.json();
            if (data.success) {
                alert(isAr ? 'تم الحفظ بنجاح!' : 'Settings saved successfully!');
            }
        } catch (err) {
            console.error(err);
        } finally {
            setSaving(false);
        }
    };

    if (loading) return (
        <div className="flex items-center justify-center min-h-[400px]">
            <Loader2 className="w-10 h-10 animate-spin text-orange-500" />
        </div>
    );

    return (
        <div className="space-y-8 animate-in fade-in duration-700">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-2">
                <div>
                    <h2 className="text-3xl font-black text-slate-800 tracking-tight">{isAr ? 'إعلانات النظام المحيطية' : 'Global Ads Settings'}</h2>
                    <p className="text-sm font-medium text-slate-500 mt-2 max-w-lg leading-relaxed">{isAr ? 'التحكم بنصوص الإعلانات وبرمجيات العرض للأعضاء المجانيين.' : 'Manage AdSense placements and visibility for free-tier users.'}</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Main AdSense Form Form */}
                <div className="glass-card rounded-[2.5rem] p-8 md:p-10 border border-white/80 shadow-sm relative overflow-hidden">
                    <div className="absolute top-0 end-0 w-64 h-64 bg-orange-100 rounded-full blur-3xl opacity-50 -z-10"></div>

                    <h3 className="text-xl font-black text-slate-800 mb-8 flex items-center gap-3">
                        <div className="w-10 h-10 bg-orange-50 text-orange-500 rounded-xl flex items-center justify-center">
                            <Code2 className="w-5 h-5" />
                        </div>
                        {isAr ? 'رموز العرض (AdSense)' : 'AdSense Integration'}
                    </h3>

                    <div className="space-y-8">
                        <div className="space-y-3">
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">
                                {isAr ? 'كود إعلان البانر العلوي' : 'Top Banner Script'}
                            </label>

                            <div className="relative group">
                                <textarea
                                    rows={5}
                                    value={settings.topBannerScript}
                                    onChange={(e) => setSettings({ ...settings, topBannerScript: e.target.value })}
                                    placeholder={`<script async src="https://pagead2.googlesyndication.com/..."></script>`}
                                    className="w-full p-5 border border-slate-200/60 rounded-2xl text-sm font-mono text-slate-600 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition-all shadow-inner text-start leading-relaxed resize-none"
                                    dir="ltr"
                                    spellCheck="false"
                                ></textarea>
                                <div className="absolute top-4 right-4 text-xs font-bold bg-white px-2 py-1 rounded-md text-slate-300 border border-slate-100 opacity-0 group-hover:opacity-100 transition-opacity">
                                    HTML / JS
                                </div>
                            </div>
                            <p className="text-xs font-semibold text-slate-400">
                                {isAr ? 'تأكد من وضع سكريبت التحميل و سكريبت الوحدة الإعلانية معاً.' : 'Ensure both the load script and ad unit script are included.'}
                            </p>
                        </div>

                        {/* Beautiful Toggle */}
                        <div className="group flex items-center justify-between p-6 bg-gradient-to-r from-orange-50/50 to-white rounded-2xl border border-orange-100/50 hover:border-orange-200 transition-all shadow-sm">
                            <div className="flex items-start gap-4">
                                <div className="mt-1 w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-orange-500 shrink-0">
                                    <Megaphone className="w-4 h-4" />
                                </div>
                                <div>
                                    <div className="font-bold text-slate-800 text-sm mb-1">{isAr ? 'تفعيل ظهور الإعلانات' : 'Toggle Advertisements'}</div>
                                    <div className="text-xs font-semibold text-slate-500 max-w-[200px] leading-relaxed">
                                        {isAr ? 'سيظهر الإعلان في الصفحات الفيروسية للزوار غير المسجلين فقط.' : 'Ads will only be injected into shareable insight links for strangers.'}
                                    </div>
                                </div>
                            </div>

                            <label className="relative inline-flex items-center cursor-pointer scale-110">
                                <input
                                    type="checkbox"
                                    className="sr-only peer"
                                    checked={settings.adsEnabled}
                                    onChange={(e) => setSettings({ ...settings, adsEnabled: e.target.checked })}
                                />
                                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500 rtl:peer-checked:after:-translate-x-full shadow-inner"></div>
                            </label>
                        </div>

                        <button
                            type="button"
                            onClick={handleSave}
                            disabled={saving}
                            className="w-full bg-slate-900 hover:bg-slate-800 text-white font-black py-4 rounded-2xl shadow-xl shadow-slate-900/20 transition-transform hover:-translate-y-1 flex items-center justify-center gap-2"
                        >
                            {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : (isAr ? 'تطبيق وحفظ' : 'Apply & Save Configuration')}
                        </button>
                    </div>
                </div>

                {/* Educational / Preview Card */}
                <div className="hidden lg:flex flex-col justify-center items-center text-center p-12 glass-card rounded-[2.5rem] border border-white/80 border-dashed bg-slate-50/50">
                    <div className="w-24 h-24 mb-6 relative">
                        <div className="absolute inset-0 bg-orange-200 rounded-full animate-ping opacity-20"></div>
                        <div className="relative w-full h-full bg-white rounded-full flex items-center justify-center shadow-lg border border-slate-100 text-slate-300">
                            <LayoutTemplate className="w-10 h-10" />
                        </div>
                    </div>
                    <h3 className="text-lg font-black text-slate-700 mb-2">{isAr ? 'طريقة العرض' : 'Ad Placement Preview'}</h3>
                    <p className="text-sm font-semibold text-slate-400 max-w-xs leading-relaxed">
                        {isAr
                            ? 'يتم عرض الإعلانات بتنسيق Responsive Banner في قمة شاشات التحليل لتوليد أقصى عائد للظهور.'
                            : 'Ads are injected seamlessly as a top-level responsive banner ensuring highest possible CPM rates.'}
                    </p>
                </div>

            </div>
        </div>
    );
}
