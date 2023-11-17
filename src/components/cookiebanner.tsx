'use client'

import Link from 'next/link'
import { getLocalStorage, setLocalStorage } from '@/lib/storageHelper'
import { useState, useEffect } from 'react'

export default function CookieBanner() {
  const [cookieConsent, setCookieConsent] = useState(() =>
    getLocalStorage('cookie_consent', null),
  )

  useEffect(() => {
    const storedCookieConsent = getLocalStorage('cookie_consent', null)

    setCookieConsent(storedCookieConsent)
  }, [setCookieConsent])

  useEffect(() => {
    const newValue = cookieConsent ? 'granted' : 'denied'

    window.gtag('consent', 'update', {
      analytics_storage: newValue,
    })

    setLocalStorage('cookie_consent', cookieConsent)

    //For Testing
    console.log('Cookie Consent: ', cookieConsent)
  }, [cookieConsent])
  return (
    <div
      className={`fixed bottom-0 left-0 right-0
                        mx-auto my-10 flex max-w-max 
                        flex-col items-center justify-between gap-4 rounded-lg bg-gray-700 px-3 py-3 shadow  
                         sm:flex-row md:max-w-screen-sm md:px-4     ${
                           cookieConsent != null ? 'hidden' : 'flex'
                         } `}
    >
      <div className="text-center">
        <Link href="/info/cookies">
          <p className="text-white">
            Chúng mình sử dụng{' '}
            <span className="font-bold text-sky-400">cookies</span> trên trang
            web này.
          </p>
        </Link>
      </div>

      <div className="flex gap-2">
        <button
          className="rounded-md border-gray-900 px-5 py-2 text-gray-300"
          onClick={() => setCookieConsent(false)}
        >
          Từ chối
        </button>
        <button
          className="rounded-lg bg-gray-900 px-5 py-2 text-white"
          onClick={() => setCookieConsent(true)}
        >
          Chấp thuận
        </button>
      </div>
    </div>
  )
}
