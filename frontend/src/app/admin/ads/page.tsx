import { cookies } from 'next/headers';
import AdsClient from './AdsClient';

export default async function AdminAdsPage() {
    const cookieStore = await cookies();
    const lang = cookieStore.get('NEXT_LOCALE')?.value || 'en';
    const isAr = lang === 'ar';

    return <AdsClient isAr={isAr} />;
}
