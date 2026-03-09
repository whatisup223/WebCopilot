import { cookies } from 'next/headers';
import AdminSettingsClient from './AdminSettingsClient';

export default async function AdminSettings() {
    const cookieStore = await cookies();
    const lang = cookieStore.get('NEXT_LOCALE')?.value || 'en';
    const isAr = lang === 'ar';

    return <AdminSettingsClient isAr={isAr} />;
}
