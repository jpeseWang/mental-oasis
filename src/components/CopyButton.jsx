'use client'
import { useState, useCallback, useRef } from 'react'
import { copyToClipboard } from '@/utils/copyToClipboard'
import { PaperAirplaneIcon } from '@heroicons/react/24/outline'

export default function CopyButton({ code, ...props }) {
  const [isCopied, setIsCopied] = useState(false)
  const timer = useRef()

  const handleCopy = useCallback(() => {
    clearTimeout(timer.current)
    copyToClipboard(code).then(() => {
      setIsCopied(true)
      timer.current = setTimeout(() => setIsCopied(false), 1000)
    })
  }, [code])

  return (
    <div>
      {isCopied ? (
        <button
          className="flex items-center whitespace-nowrap  px-2 py-0.5 text-sm font-semibold text-[#51b6de] lg:block"
          onClick={handleCopy}
          {...props}
        >
          <span className="mr-2 rounded-md bg-slate-100 px-2 py-0.5">
            Copied
          </span>
        </button>
      ) : (
        <PaperAirplaneIcon
          className="h-6 w-6 -rotate-12 cursor-pointer"
          onClick={handleCopy}
        />
      )}
    </div>
  )
}
