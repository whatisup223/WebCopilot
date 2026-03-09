import Link from 'next/link';
import LangToggle from './LangToggle';
import { cookies } from 'next/headers';
import { Menu, X } from 'lucide-react';

export default async function Header() {
    const cookieStore = await cookies();
    const lang = cookieStore.get('NEXT_LOCALE')?.value || 'en';
    const isAr = lang === 'ar';

    return (
        <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-xl border-b border-gray-200/50 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">

                {/* Logo */}
                <div className="flex items-center gap-3">
                    <div className="bg-gradient-to-tr from-orange-500 to-red-500 w-9 h-9 rounded-xl flex items-center justify-center shadow-lg shadow-orange-500/30">
                        <span className="text-white text-xl font-black">W</span>
                    </div>
                    <h1 className="text-xl font-extrabold tracking-tight">WebCopilot</h1>
                </div>

                {/* Desktop Navigation */}
                <nav className={`hidden md:flex items-center gap-8 text-sm font-bold text-slate-600 ${isAr ? 'flex-row-reverse' : ''}`}>
                    <Link href="#features" className="hover:text-orange-500 transition-colors">{isAr ? 'المميزات' : 'Features'}</Link>
                    <Link href="#pricing" className="hover:text-orange-500 transition-colors">{isAr ? 'الأسعار' : 'Pricing'}</Link>
                    <Link href="/dashboard" className="hover:text-orange-500 transition-colors">{isAr ? 'لوحة التحكم' : 'Dashboard'}</Link>
                </nav>

                {/* Desktop Actions */}
                <div className={`hidden md:flex items-center gap-5 ${isAr ? 'flex-row-reverse' : ''}`}>
                    <LangToggle isAr={isAr} />
                    <Link href="/login" className="text-sm font-bold text-slate-600 hover:text-slate-900 transition-colors">
                        {isAr ? 'دخول الأدمن' : 'Log in'}
                    </Link>
                    <button className="bg-slate-900 hover:bg-slate-800 text-white px-7 py-2.5 rounded-full text-sm font-black shadow-xl shadow-slate-900/20 transition-all hover:-translate-y-0.5">
                        {isAr ? 'التحميل لمتصفح كروم' : 'Add to Chrome'}
                    </button>
                </div>

                {/* Mobile Menu Toggle (Pure CSS Peer Trick) */}
                <div className="flex md:hidden items-center gap-4">
                    <LangToggle isAr={isAr} />
                    <label htmlFor="mobile-menu-toggle" className="cursor-pointer p-2 text-slate-600 hover:text-orange-500 transition-colors z-50">
                        <Menu className="w-6 h-6" />
                    </label>
                </div>
            </div>

            {/* Hidden Checkbox for Mobile Menu State */}
            <input type="checkbox" id="mobile-menu-toggle" className="peer hidden" />

            {/* Mobile Navigation Panel */}
            <div className={`fixed inset-x-0 top-20 bg-white/95 backdrop-blur-2xl border-b border-gray-200 shadow-2xl p-6 hidden peer-checked:flex flex-col gap-6 md:hidden z-40 transition-all ${isAr ? 'text-right' : 'text-left'}`}>
                <nav className="flex flex-col gap-4 text-base font-bold text-slate-600 pb-6 border-b border-slate-100">
                    <Link href="#features" className="hover:text-orange-500 transition-colors">{isAr ? 'المميزات' : 'Features'}</Link>
                    <Link href="#pricing" className="hover:text-orange-500 transition-colors">{isAr ? 'الأسعار' : 'Pricing'}</Link>
                    <Link href="/dashboard" className="hover:text-orange-500 transition-colors">{isAr ? 'لوحة التحكم' : 'Dashboard'}</Link>
                    <Link href="/login" className="hover:text-orange-500 transition-colors">{isAr ? 'دخول الأدمن' : 'Log in'}</Link>
                </nav>
                <button className="w-full bg-slate-900 hover:bg-slate-800 text-white px-7 py-4 rounded-xl text-base font-black shadow-xl shadow-slate-900/20 transition-all">
                    {isAr ? 'التحميل لمتصفح كروم' : 'Add to Chrome'}
                </button>
                {/* Close Button overlay instructions */}
                <p className="text-center text-xs text-slate-400 mt-2">{isAr ? 'اضغط خارج القائمة أو على الأيقونة للإغلاق' : 'Click the menu icon to close'}</p>
            </div>
        </header>
    );
}
