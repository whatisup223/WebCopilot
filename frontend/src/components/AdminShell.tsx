"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import LangToggle from './LangToggle';
import { Menu, X, BarChart3, Users, CreditCard, Wrench, Megaphone, LogOut, Settings } from 'lucide-react';

export default function AdminShell({ children, isAr }: { children: React.ReactNode, isAr: boolean }) {
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const [isDesktopCollapsed, setIsDesktopCollapsed] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        setIsMobileOpen(false);
    }, [pathname]);

    const menuItems = [
        { name: isAr ? 'نظرة عامة' : 'Overview', href: '/admin', icon: <BarChart3 className="w-5 h-5" /> },
        { name: isAr ? 'المستخدمين' : 'Users', href: '/admin/users', icon: <Users className="w-5 h-5" /> },
        { name: isAr ? 'الاشتراكات' : 'Subscriptions', href: '/admin/subscriptions', icon: <CreditCard className="w-5 h-5" /> },
        { name: isAr ? 'أدوات الرعاة' : 'Sponsors', href: '/admin/sponsors', icon: <Wrench className="w-5 h-5" /> },
        { name: isAr ? 'إعلانات النظام' : 'Ads Settings', href: '/admin/ads', icon: <Megaphone className="w-5 h-5" /> },
        { name: isAr ? 'إعدادات النظام' : 'Settings', href: '/admin/settings', icon: <Settings className="w-5 h-5" /> },
    ];

    // Mobile slide directions correctly aligned logic inside RTL/LTR flow
    const mobileTransformClass = isAr
        ? (isMobileOpen ? 'translate-x-0' : 'translate-x-full')
        : (isMobileOpen ? 'translate-x-0' : '-translate-x-full');

    const sidebarPositionClass = isAr ? 'right-0' : 'left-0';

    return (
        <div className="min-h-screen flex relative overflow-hidden bg-slate-50/50">

            {/* Background Glows */}
            <div className="fixed top-[-10%] start-[-10%] w-[50%] h-[50%] bg-orange-400/20 rounded-full blur-[140px] -z-10 pointer-events-none"></div>
            <div className="fixed bottom-[-10%] end-[-10%] w-[40%] h-[60%] bg-pink-400/10 rounded-full blur-[140px] -z-10 pointer-events-none"></div>

            {/* Mobile Backdrop Overlay */}
            {isMobileOpen && (
                <div
                    className="md:hidden fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 transition-opacity"
                    onClick={() => setIsMobileOpen(false)}
                />
            )}

            {/* Sidebar (Desktop Sticky + Mobile Fixed) */}
            <aside
                className={`
                    fixed md:sticky top-0 z-50 h-screen flex flex-col glass-card border-none bg-white/95 backdrop-blur-2xl transition-all duration-300 ease-in-out shadow-2xl md:shadow-none
                    ${sidebarPositionClass} ${mobileTransformClass} md:translate-x-0
                    ${isDesktopCollapsed ? 'md:w-20' : 'w-72 md:w-64'}
                    ${isAr ? 'md:border-l border-white/50' : 'md:border-r border-white/50'}
                `}
            >
                {/* Sidebar Header */}
                <div className="h-[80px] p-5 border-b border-gray-100/50 flex items-center justify-between xl:justify-center mb-2 relative shrink-0">

                    {/* Logo & Text - Shown only when expanded */}
                    <Link href="/admin" className={`flex w-full items-center gap-3 ${isDesktopCollapsed ? 'md:hidden' : ''}`}>
                        <div className="bg-gradient-to-tr from-orange-500 to-red-500 min-w-[36px] min-h-[36px] rounded-xl flex items-center justify-center shadow-md">
                            <span className="text-white text-base font-bold">W</span>
                        </div>
                        <span className="font-extrabold text-slate-800 tracking-tight text-lg overflow-hidden whitespace-nowrap">WebCopilot</span>
                    </Link>

                    {/* Logo - Shown only when collapsed */}
                    <Link href="/admin" className={`hidden md:flex justify-center w-full ${!isDesktopCollapsed ? 'md:hidden' : ''}`}>
                        <div className="bg-gradient-to-tr from-orange-500 to-red-500 min-w-[36px] min-h-[36px] rounded-xl flex items-center justify-center shadow-md">
                            <span className="text-white text-base font-bold">W</span>
                        </div>
                    </Link>

                    {/* Mobile Close Button (Only visible on mobile when sidebar is open) */}
                    <button
                        onClick={() => setIsMobileOpen(false)}
                        className="md:hidden text-slate-400 hover:text-red-500 transition-colors p-2 absolute end-4"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {/* Navigation Links */}
                <nav className="flex-1 px-3 space-y-2 overflow-y-auto py-2">
                    {menuItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`
                                    flex items-center py-3 rounded-2xl font-bold transition-all group overflow-hidden
                                    ${isDesktopCollapsed ? 'md:justify-center md:px-0' : 'px-4'}
                                    ${isActive ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg shadow-orange-500/20' : 'text-slate-500 hover:bg-orange-50 hover:text-orange-600'}
                                `}
                                title={isDesktopCollapsed ? item.name : ''}
                            >
                                <span className={`flex-shrink-0 ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-orange-500'}`}>
                                    {item.icon}
                                </span>
                                <span className={`
                                    whitespace-nowrap transition-all duration-300 ms-3
                                    ${isDesktopCollapsed ? 'md:hidden md:opacity-0 md:w-0 md:ms-0' : 'opacity-100 w-auto'}
                                `}>
                                    {item.name}
                                </span>
                            </Link>
                        );
                    })}
                </nav>

                {/* Logout Button */}
                <div className="p-4 border-t border-gray-100/50">
                    <Link
                        href="/"
                        className={`
                            flex items-center py-3 rounded-2xl font-bold transition-all overflow-hidden
                            ${isDesktopCollapsed ? 'md:justify-center md:px-0' : 'px-4'}
                            text-slate-400 hover:bg-red-50 hover:text-red-600
                        `}
                        title={isDesktopCollapsed ? (isAr ? 'تسجيل الخروج' : 'Logout') : ''}
                    >
                        <span className="flex-shrink-0"><LogOut className="w-5 h-5" /></span>
                        <span className={`
                            whitespace-nowrap transition-all duration-300 ms-3
                            ${isDesktopCollapsed ? 'md:hidden md:opacity-0 md:w-0 md:ms-0' : 'opacity-100 w-auto'}
                        `}>
                            {isAr ? 'تسجيل الخروج' : 'Logout'}
                        </span>
                    </Link>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 overflow-y-auto relative z-10 w-full flex flex-col h-screen min-w-0">

                {/* Header Navbar */}
                <header className="glass-card rounded-none border-b border-white/50 h-[80px] p-4 md:p-6 flex justify-between items-center sticky top-0 z-20 shrink-0 shadow-sm">
                    <div className="flex items-center gap-4">

                        {/* Mobile universal toggle button */}
                        <button onClick={() => setIsMobileOpen(true)} className="md:hidden text-slate-500 hover:text-orange-500 transition-colors p-1">
                            <Menu className="w-6 h-6" />
                        </button>

                        {/* Desktop universal toggle button */}
                        <button onClick={() => setIsDesktopCollapsed(!isDesktopCollapsed)} className={`hidden md:block text-slate-400 hover:text-orange-500 transition-colors p-1`}>
                            <Menu className="w-6 h-6" />
                        </button>

                        <div>
                            <h1 className="text-xl font-bold text-slate-900 line-clamp-1">{isAr ? 'مرحباً بالمدير 👋' : 'Welcome Admin 👋'}</h1>
                            <p className="text-[11px] font-bold text-slate-500 mt-0.5 uppercase tracking-widest hidden sm:block">
                                {isAr ? 'لوحة تحكم النظام' : 'System Dashboard'}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 shrink-0">
                        <LangToggle isAr={isAr} />
                        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-orange-100 to-red-50 border-2 border-white shadow-sm flex items-center justify-center text-orange-600 font-bold hidden sm:flex shrink-0">
                            A
                        </div>
                    </div>
                </header>

                <div className="flex-1 p-4 md:p-8 max-w-7xl mx-auto w-full">
                    {children}
                </div>
            </main>
        </div>
    );
}
