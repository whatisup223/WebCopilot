import { cookies } from 'next/headers';
import SponsorsClient from './SponsorsClient';

export default async function AdminSponsorsPage() {
    const cookieStore = await cookies();
    const lang = cookieStore.get('NEXT_LOCALE')?.value || 'en';
    const isAr = lang === 'ar';

    return <SponsorsClient isAr={isAr} />;
}
