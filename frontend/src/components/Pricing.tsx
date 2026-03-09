import { cookies } from 'next/headers';

export default async function Pricing() {
    const cookieStore = await cookies();
    const lang = cookieStore.get('NEXT_LOCALE')?.value || 'en';
    const isAr = lang === 'ar';

    return (
        <section id="pricing" className={`py-32 px-4 relative z-10 overflow-hidden ${isAr ? 'text-right' : 'text-left'}`}>
            <div className="max-w-7xl mx-auto text-center relative z-10">

                <div className="text-orange-500 font-extrabold tracking-widest uppercase text-sm mb-4">
                    {isAr ? 'اختر خطتك' : 'Choose Your Plan'}
                </div>
                <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">
                    {isAr ? 'افتح قدرات ' : 'Unlock the Power of '}<span className="gradient-text">{isAr ? 'الذكاء الاصطناعي.' : 'AI.'}</span>
                </h2>
                <p className="text-lg text-slate-600 mb-20 max-w-xl mx-auto font-medium">
                    {isAr ? 'خطط بسيطة ومناسبة للجميع. جرب الإضافة مجاناً الآن.' : 'Simple and affordable plans. Start using the extension for free today.'}
                </p>

                <div className={`grid lg:grid-cols-2 gap-8 max-w-4xl mx-auto items-end ${isAr ? 'text-right' : 'text-left'}`}>

                    {/* Free Plan */}
                    <div className="glass-card p-10 rounded-[3rem] flex flex-col hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 h-[95%]">
                        <h3 className="text-2xl font-black text-slate-900 mb-2">{isAr ? 'المجانية' : 'Free Reader'}</h3>
                        <p className="text-slate-500 text-sm font-medium mb-8">
                            {isAr ? 'مثالية للطلاب وقُراء المحتوى اليومي' : 'Perfect for students and daily readers'}
                        </p>
                        <div className="text-5xl font-black text-slate-900 mb-8">$0<span className="text-lg text-slate-500 font-medium tracking-normal text-base">{isAr ? '/شهر' : '/mo'}</span></div>
                        <ul className="space-y-4 mb-10 text-slate-600 font-medium flex-1">
                            <li className="flex items-center gap-3"><span className="text-orange-500">✔</span> {isAr ? 'تلخيص ذكي غير محدود للمقالات' : 'Unlimited Page Summarizations'}</li>
                            <li className="flex items-center gap-3"><span className="text-orange-500">✔</span> {isAr ? 'اكتشاف الأدوات المقترحة' : 'Discover Suggested Tools'}</li>
                            <li className="flex items-center gap-3"><span className="text-orange-500">✔</span> {isAr ? 'مشاركة الملخصات مع الأصدقاء (يحتوي إعلانات)' : 'Share Insights (Ad-supported)'}</li>
                        </ul>
                        <button className="w-full py-4 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-black shadow-lg shadow-slate-900/20 transition-colors">
                            {isAr ? 'حمل الإضافة مجاناً' : 'Add Extension for Free'}
                        </button>
                    </div>

                    {/* Pro Plan */}
                    <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-10 rounded-[3rem] flex flex-col shadow-2xl shadow-slate-900/40 border border-slate-700 relative transform lg:-translate-y-6 h-[105%]">
                        <div className={`absolute top-0 ${isAr ? 'right-1/2 translate-x-1/2' : 'left-1/2 -translate-x-1/2'} -translate-y-1/2 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-black px-6 py-2 rounded-full shadow-lg border border-orange-400 uppercase tracking-widest whitespace-nowrap`}>
                            {isAr ? 'للباحثين المحترفين' : 'Pro Power'}
                        </div>
                        <h3 className="text-2xl font-black text-white mb-2">{isAr ? 'المحترفين (Pro)' : 'Pro Sub'}</h3>
                        <p className="text-slate-400 text-sm font-medium mb-8">
                            {isAr ? 'لصنّاع المحتوى والباحثين' : 'For creators and power readers'}
                        </p>
                        <div className="text-5xl font-black text-white mb-8">$9<span className="text-lg text-slate-400 font-medium tracking-normal text-base">{isAr ? '/شهر' : '/mo'}</span></div>
                        <ul className="space-y-4 mb-10 text-slate-300 font-medium flex-1">
                            <li className="flex items-center gap-3"><span className="text-orange-400">✔</span> {isAr ? 'جميع المميزات المجانية' : 'All Free Features'}</li>
                            <li className="flex items-center gap-3"><span className="text-orange-400">✔</span> {isAr ? 'مشاركة الملخصات بروابط خالية 100% من الإعلانات' : 'Share 100% Ad-Free Insights'}</li>
                            <li className="flex items-center gap-3 bg-slate-800/50 p-3 rounded-lg border border-slate-700 font-bold text-white"><span className="text-orange-500">🔥</span> {isAr ? 'إمكانية إدراج روابطك الربحية الخاصة في ملخصاتك' : 'Embed your own affiliate links in shared pages'}</li>
                        </ul>
                        <button className="w-full py-4 px-2 rounded-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-400 hover:to-red-400 text-white font-black shadow-xl shadow-orange-500/30 transition-all hover:scale-105 border border-orange-400">
                            {isAr ? 'اشترك الآن بـ 9$ فقط' : 'Go Pro for $9'}
                        </button>
                    </div>

                </div>
            </div>
        </section>
    );
}
