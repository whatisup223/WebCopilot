"use client";
import { Globe } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function LangToggle({ isAr }: { isAr: boolean }) {
    const router = useRouter();

    const handleToggle = () => {
        document.cookie = `NEXT_LOCALE=${isAr ? 'en' : 'ar'}; path=/; max-age=31536000`;
        router.refresh();
    };

    return (
        <button
            onClick={handleToggle}
            className="flex items-center gap-1.5 text-xs font-black text-slate-600 hover:text-orange-600 transition-colors bg-white/80 hover:bg-orange-50 px-3 py-1.5 rounded-full border border-slate-200 hover:border-orange-200 shadow-sm"
        >
            <Globe className="w-4 h-4" />
            {isAr ? 'English' : 'عربي'}
        </button>
    );
}
