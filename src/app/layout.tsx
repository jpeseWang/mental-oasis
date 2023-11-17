import { type Metadata } from 'next'
import { Providers } from '@/app/providers'
import { Layout } from '@/components/Layout'
import { Toaster } from 'react-hot-toast'
import Script from 'next/script'
import GoogleAnalytics from '@/components/GoogleAnalytics'
import '@/styles/tailwind.css'
import '@/styles/style.css'
import 'react-quill/dist/quill.snow.css'
import '@fortawesome/fontawesome-svg-core/styles.css'
import CookieBanner from '@/components/cookiebanner'

export const metadata: Metadata = {
  title: {
    template: 'Mental Oasis',
    default: 'Mental Oasis',
  },
  description: 'Mental Oasis ',
  alternates: {
    types: {
      'application/rss+xml': `${process.env.NEXT_PUBLIC_SITE_URL}/feed.xml`,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full antialiased" suppressHydrationWarning>
      <GoogleAnalytics GA_MEASUREMENT_ID="G-QG738YM2RG" />
      <body className="flex h-full bg-zinc-50 dark:bg-black">
        {/* <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-QG738YM2RG"
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
        >{`window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-QG738YM2RG');`}</Script> */}
        <Providers>
          <Toaster position="top-center" reverseOrder={false} />
          <div className="flex w-full">
            <Layout>{children}</Layout>
            <CookieBanner />
          </div>
        </Providers>
      </body>
    </html>
  )
}
