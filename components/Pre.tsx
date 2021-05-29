import clsx from 'clsx'
import { useEffect, useRef, useState } from 'react'
import { copyToClipboard } from '../lib/copyToClipboard'
import { CheckIcon } from './CheckIcon'
import { ClipboardIcon } from './ClipboardIcon'
import styles from './Pre.module.css'

export const Pre = ({ children, className }) => {
  const ref = useRef<HTMLPreElement>(null)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!copied) return
    const timeout = setTimeout(() => setCopied(false), 2000)

    return () => {
      clearTimeout(timeout)
    }
  }, [copied])

  return (
    <div className="relative">
      <button
        onClick={() => {
          if (!ref.current) return
          copyToClipboard(ref.current.innerText)
          setCopied(true)
        }}
        title="Copy to clipboard"
        className={clsx(
          className,
          'absolute right-0 flex items-center justify-center w-8 h-8 text-gray-700 dark:text-white text-opacity-50 md:right-6 top-1 ring-gray-400 dark:ring-white ring-opacity-70 focus:outline-none focus:bg-gray-300 focus:bg-opacity-20 focus:text-opacity-100 hover:text-opacity-100 focus:ring-2'
        )}
      >
        {copied ? (
          <div className="relative">
            <CheckIcon className="w-5 h-5 text-green-500 dark:text-green-400" />
            <div
              className={clsx(
                'fixed z-10 px-2 py-2 mt-2 text-black dark:text-white text-opacity-100 transform bg-white shadow-md dark:bg-gray-600 bottom-2 left-2 right-2 xs:py-1 xs:-translate-x-2/3 xs:absolute xs:right-auto xs:bottom-auto xs:left-1/2 xs:top-full md:-translate-x-1/2',
                styles.tooltip
              )}
            >
              Copied!
            </div>
          </div>
        ) : (
          <ClipboardIcon className="w-5 h-5" />
        )}

        <span className="sr-only">Copy to clipboard</span>
      </button>
      <pre
        ref={ref}
        className="p-6 pt-8 my-6 -mx-4 overflow-auto text-base bg-gray-100 md:mx-0 lg:-mx-6 dark:bg-gray-900"
      >
        {children}
      </pre>
    </div>
  )
}
