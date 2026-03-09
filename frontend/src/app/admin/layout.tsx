import { cookies } from 'next/headers';
import AdminShell from '@/components/AdminShell';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
    const cookieStore = await cookies();
    const lang = cookieStore.get('NEXT_LOCALE')?.value || 'en';
    const isAr = lang === 'ar';

    return <AdminShell isAr={isAr}>{children}</AdminShell>;
}
