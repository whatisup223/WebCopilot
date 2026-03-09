import { cookies } from 'next/headers';
import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';

export default async function Login() {
    const cookieStore = await cookies();
    const lang = cookieStore.get('NEXT_LOCALE')?.value || 'en';
    const isAr = lang === 'ar';

    return (
        <main className={`min-h-screen flex items-center justify-center p-4 relative ${isAr ? 'text-right' : 'text-left'}`}>

            {/* Back to Home Link */}
            <Link href="/" className={`absolute top-8 ${isAr ? 'right-8' : 'left-8'} flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-orange-500 transition-colors bg-white/60 backdrop-blur-md px-4 py-2 rounded-full border border-white shadow-sm hover:shadow-md z-20`}>
                {isAr ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
                {isAr ? 'العودة للرئيسية' : 'Back to Home'}
            </Link>

            {/* Background Glow specific to login */}
            <div className="fixed inset-0 flex items-center justify-center pointer-events-none -z-10">
                <div className="w-[500px] h-[500px] bg-orange-400/20 rounded-full blur-[100px]"></div>
            </div>

            {/* Login Card */}
            <div className="w-full max-w-md glass-card p-10 rounded-[3rem] shadow-2xl relative overflow-hidden z-10 border-[1.5px] border-white">

                {/* Decorative Top Glow inside card */}
                <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-orange-500 to-red-500"></div>
                <div className="absolute -top-20 -right-20 w-40 h-40 bg-orange-400/20 blur-3xl rounded-full"></div>

                <div className="flex flex-col items-center text-center mb-10 relative z-10">
                    <div className="bg-gradient-to-tr from-orange-500 to-red-500 w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg shadow-orange-500/30 mb-5 border border-orange-400">
                        <span className="text-white text-3xl font-black">W</span>
                    </div>
                    <h1 className="text-2xl font-black text-slate-900 mb-2 tracking-tight">{isAr ? 'مرحباً بعودتك' : 'Welcome Back'}</h1>
                    <p className="text-sm font-medium text-slate-500">
                        {isAr ? 'سجل الدخول لإدارة أرباحك وعملائك' : 'Sign in to access your admin dashboard'}
                    </p>
                </div>

                <form className="space-y-6 relative z-10">
                    <div>
                        <label className="block text-[11px] font-bold text-slate-700 mb-2 uppercase tracking-widest opacity-80">
                            {isAr ? 'البريد الإلكتروني' : 'Email Address'}
                        </label>
                        <input
                            type="email"
                            placeholder={isAr ? 'admin@example.com' : 'admin@example.com'}
                            className={`w-full bg-white/70 border border-white focus:bg-white text-slate-900 text-sm rounded-2xl focus:ring-4 focus:ring-orange-500/10 focus:border-orange-300 block p-4 shadow-sm transition-all outline-none placeholder:text-slate-400 font-medium ${isAr ? 'text-right' : 'text-left'}`}
                            required
                        />
                    </div>

                    <div>
                        <div className={`flex items-center justify-between mb-2 ${isAr ? 'flex-row-reverse' : ''}`}>
                            <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-widest opacity-80">
                                {isAr ? 'كلمة المرور' : 'Password'}
                            </label>
                            <a href="#" className="text-[11px] font-bold text-orange-500 hover:text-red-500 transition-colors">
                                {isAr ? 'نسيت كلمة المرور؟' : 'Forgot?'}
                            </a>
                        </div>
                        <input
                            type="password"
                            placeholder="••••••••"
                            className={`w-full bg-white/70 border border-white focus:bg-white text-slate-900 text-sm rounded-2xl focus:ring-4 focus:ring-orange-500/10 focus:border-orange-300 block p-4 shadow-sm transition-all outline-none placeholder:text-slate-400 font-medium ${isAr ? 'text-right' : 'text-left'}`}
                            required
                        />
                    </div>

                    <Link href="/admin"
                        className="w-full text-white bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 font-black rounded-2xl text-sm px-5 py-4 shadow-xl shadow-orange-500/25 transition-transform hover:-translate-y-1 mt-4 flex items-center justify-center border border-orange-400"
                    >
                        {isAr ? 'دخول آمن' : 'Secure Sign In'}
                    </Link>
                </form>

                <div className="mt-8 text-center relative z-10 border-t border-gray-100 pt-6">
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest flex items-center justify-center gap-1.5">
                        <span className="text-green-500 text-sm">🔒</span> {isAr ? 'مشفر ومحمي برقم سري' : 'Secured and encrypted'}
                    </p>
                </div>
            </div>
        </main>
    );
}
