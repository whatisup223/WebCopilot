import './globals.css'
import type { Metadata } from 'next'
import { Outfit, IBM_Plex_Sans_Arabic } from 'next/font/google'
import { cookies } from 'next/headers'

const outfit = Outfit({ subsets: ['latin'] })
const ibm = IBM_Plex_Sans_Arabic({ weight: ['300', '400', '500', '600', '700'], subsets: ['arabic'] })

export const metadata: Metadata = {
  title: 'Web Copilot - AI Content Summarizer',
  description: 'AI-powered extension to extract insights and monetize content.',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const cookieStore = await cookies();
  const lang = cookieStore.get('NEXT_LOCALE')?.value || 'en';
  const isAr = lang === 'ar';

  return (
    <html lang={isAr ? "ar" : "en"} dir={isAr ? "rtl" : "ltr"}>
      <body className={`${isAr ? ibm.className : outfit.className} relative min-h-screen overflow-x-hidden antialiased text-slate-900`}>
        {/* Background glow effects for glassmorphism */}
        <div className="fixed top-[-10%] left-[-10%] w-[50%] h-[50%] bg-orange-400/20 rounded-full blur-[140px] -z-10 pointer-events-none"></div>
        <div className="fixed top-[20%] right-[-10%] w-[40%] h-[60%] bg-pink-400/10 rounded-full blur-[140px] -z-10 pointer-events-none"></div>
        <div className="fixed bottom-[-10%] left-[20%] w-[50%] h-[40%] bg-indigo-400/10 rounded-full blur-[140px] -z-10 pointer-events-none"></div>
        {children}
      </body>
    </html>
  )
}
