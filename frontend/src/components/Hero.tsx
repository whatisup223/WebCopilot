import { cookies } from 'next/headers';
import LiveDemo from './LiveDemo';

export default async function Hero() {
    const cookieStore = await cookies();
    const lang = cookieStore.get('NEXT_LOCALE')?.value || 'en';
    const isAr = lang === 'ar';

    return (
        <section className="relative pt-32 pb-20 text-center px-4 max-w-5xl mx-auto z-10">

            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass-card text-sm font-bold text-slate-700 mb-8 mx-auto shadow-sm tracking-wide">
                <span className="bg-orange-500 text-white text-[10px] uppercase font-black px-2.5 py-1 rounded-md shadow-sm border border-orange-400">
                    {isAr ? 'مساعدك الشخصي' : 'YOUR AI COPILOT'}
                </span>
                🚀 {isAr ? 'وفر ساعات من القراءة يوميا' : 'Save hours of reading every day'}
            </div>

            <h1 className="text-4xl md:text-6xl font-black leading-[1.1] mb-6 tracking-tight">
                {isAr ? 'استخرج زبدة أي صفحة ويب في' : 'Unlock web insights instantly in'} <br className="hidden md:block" /> <span className="gradient-text">{isAr ? 'ثوانٍ معدودة.' : 'seconds.'}</span>
            </h1>

            <p className="text-lg md:text-xl text-slate-600 mb-12 max-w-2xl mx-auto leading-relaxed font-medium">
                {isAr ? 'ثلاث خطوات بسيطة: افتح أي صفحة ويب معقدة، دع الذكاء الاصطناعي يستخرج لك الخلاصة والنقاط الذهبية، ثم شاركها فوراً مع أصدقائك بضغطة زر.' : 'Three simple steps: Open any complex webpage, let AI extract the golden summaries and key takeaways, then share them instantly with your network in one click.'}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button className="w-full sm:w-auto px-10 py-4 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-black text-lg shadow-xl shadow-slate-900/30 transition-all hover:-translate-y-1 flex items-center justify-center gap-3">
                    {isAr ? 'أضف الإضافة مجاناً' : 'Add to Chrome - It\'s Free'}
                </button>
            </div>

            {/* 3 Steps Process UI */}
            <div className="mt-28 relative mx-auto max-w-5xl">
                <div className="absolute inset-x-0 -bottom-20 -top-20 bg-gradient-to-b from-orange-500/10 to-transparent blur-3xl -z-10 rounded-[4rem]"></div>

                <div className="grid md:grid-cols-3 gap-6 relative z-10">

                    {/* Step 1 */}
                    <div className={`glass-card p-8 rounded-[2rem] border border-white flex flex-col items-center text-center transform transition-all hover:-translate-y-2 hover:shadow-2xl group cursor-default`}>
                        <div className="w-16 h-16 rounded-[1.5rem] bg-orange-50 mb-6 flex items-center justify-center shadow-sm border border-orange-200 relative overflow-hidden transition-all duration-300 group-hover:scale-110">
                            <div className="absolute inset-0 bg-gradient-to-tr from-orange-500/10 to-red-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            <span className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-tr from-orange-500 to-red-500 z-10 transition-transform duration-300">01</span>
                        </div>
                        <h3 className="text-xl font-black text-slate-800 mb-3">{isAr ? 'افتح أي مقال' : 'Open any page'}</h3>
                        <p className="text-sm font-medium text-slate-500 leading-relaxed">
                            {isAr ? 'ادخل على أي صفحة ويب، تدوينة طويلة، أو مقال إخباري مكدس بالمعلومات.' : 'Navigate to any webpage, long blog post, or information-dense news article.'}
                        </p>
                        {/* Mini visual */}
                        <div className="mt-6 w-full bg-white/50 rounded-xl max-w-[200px] mx-auto overflow-hidden opacity-80 group-hover:opacity-100 transition-opacity">
                            <div className="h-4 bg-slate-200/50 w-full mb-2"></div>
                            <div className="h-2 bg-slate-100 w-3/4 mx-auto mb-1"></div>
                            <div className="h-2 bg-slate-100 w-5/6 mx-auto mb-1"></div>
                            <div className="h-2 bg-slate-100 w-1/2 mx-auto pb-4"></div>
                        </div>
                    </div>

                    {/* Step 2 */}
                    <div className={`bg-gradient-to-b from-white to-orange-50/50 p-8 rounded-[2rem] border border-orange-100 flex flex-col items-center text-center transform transition-all hover:-translate-y-2 shadow-xl shadow-orange-500/10 md:-translate-y-4 group cursor-default`}>
                        <div className="w-16 h-16 rounded-[1.5rem] bg-gradient-to-tr from-orange-500 to-red-500 mb-6 flex items-center justify-center shadow-lg shadow-orange-500/40 border border-orange-400 relative overflow-hidden transition-all duration-300 group-hover:scale-110">
                            <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            <span className="text-3xl font-black text-white z-10 drop-shadow-md">02</span>
                        </div>
                        <h3 className="text-xl font-black text-slate-800 mb-3">{isAr ? 'استخرج الزبدة' : 'Extract Insights'}</h3>
                        <p className="text-sm font-medium text-slate-600 leading-relaxed">
                            {isAr ? 'بضغطة واحدة، الذكاء الاصطناعي سيقرأ، يحلل، ويستخرج لك الملخص وأهم النقاط.' : 'With one click, AI reads, analyzes, and extracts the perfect summary and key takeaways.'}
                        </p>
                        {/* Mini visual */}
                        <div className={`mt-6 w-full bg-white rounded-xl shadow border border-orange-100 p-4 max-w-[200px] mx-auto ${isAr ? 'text-right' : 'text-left'}`}>
                            <div className="flex items-center gap-2 mb-2"><span className="text-[10px]">✨</span><div className="h-2.5 bg-slate-200 rounded w-16 group-hover:bg-orange-200 transition-colors"></div></div>
                            <div className="h-1.5 bg-slate-100 w-full rounded mb-1"></div>
                            <div className="flex items-center gap-1.5 mt-3 mb-1"><div className="w-1.5 h-1.5 rounded-full bg-orange-400"></div><div className="h-1.5 bg-slate-100 w-16 rounded group-hover:bg-orange-100 transition-colors"></div></div>
                            <div className="flex items-center gap-1.5 mb-1"><div className="w-1.5 h-1.5 rounded-full bg-orange-400"></div><div className="h-1.5 bg-slate-100 w-20 rounded group-hover:bg-orange-100 transition-colors"></div></div>
                        </div>
                    </div>

                    {/* Step 3 */}
                    <div className={`glass-card p-8 rounded-[2rem] border border-white flex flex-col items-center text-center transform transition-all hover:-translate-y-2 hover:shadow-2xl group cursor-default`}>
                        <div className="w-16 h-16 rounded-[1.5rem] bg-orange-50 mb-6 flex items-center justify-center shadow-sm border border-orange-200 relative overflow-hidden transition-all duration-300 group-hover:scale-110">
                            <div className="absolute inset-0 bg-gradient-to-tr from-orange-500/10 to-red-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            <span className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-tr from-orange-500 to-red-500 z-10 transition-transform duration-300">03</span>
                        </div>
                        <h3 className="text-xl font-black text-slate-800 mb-3">{isAr ? 'شارك الفائدة فوراً' : 'Share Instantly'}</h3>
                        <p className="text-sm font-medium text-slate-500 leading-relaxed">
                            {isAr ? 'احصل على رابط جاهز ومصمم بعناية، وشاركه على إكس (تويتر)، لينكدإن أو فيسبوك.' : 'Get a beautifully crafted link, ready to be shared on X (Twitter), LinkedIn or Facebook.'}
                        </p>
                        {/* Mini visual */}
                        <div className="mt-6 flex items-center justify-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-[#1DA1F2]/10 flex items-center justify-center transition-all duration-300 group-hover:bg-[#1DA1F2] group-hover:text-white group-hover:shadow-lg group-hover:shadow-[#1DA1F2]/30 text-xs font-bold text-[#1DA1F2]">X</div>
                            <div className="w-10 h-10 rounded-full bg-[#0A66C2]/10 flex items-center justify-center transition-all duration-300 group-hover:bg-[#0A66C2] group-hover:text-white group-hover:shadow-lg group-hover:shadow-[#0A66C2]/30 text-xs font-bold text-[#0A66C2]">in</div>
                            <div className="w-10 h-10 rounded-full bg-[#1877F2]/10 flex items-center justify-center transition-all duration-300 group-hover:bg-[#1877F2] group-hover:text-white group-hover:shadow-lg group-hover:shadow-[#1877F2]/30 text-xs font-bold text-[#1877F2]">f</div>
                        </div>
                    </div>

                </div>
            </div>

            {/* LIVE DEMO SECTION */}
            <LiveDemo isAr={isAr} />

        </section>
    );
}
