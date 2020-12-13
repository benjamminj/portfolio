import { ReactNode } from 'react'

interface BannerProps {
  children: ReactNode
}

export const Banner = ({ children }: BannerProps) => {
  return (
    <div className="flex items-end pt-48 pb-8 bg-gray-100 min-h-32 dark:bg-gray-900">
      <div className="w-full max-w-screen-md px-4 mx-auto my-0 md:px-0">
        {children}
      </div>
    </div>
  )
}
