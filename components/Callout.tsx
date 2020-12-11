import { ReactNode } from 'react'
import styles from './Callout.module.css'

export type CalloutVariant = 'success' | 'error' | 'warning' | 'info'

interface CalloutProps {
  children: ReactNode
  variant?: CalloutVariant
  icon?: ReactNode
  heading?: ReactNode
  className?: string
}

interface ColorVariantConfig {
  light: {
    background: string
    border: string
    heading: string
  }
  dark: {
    background: string
    border: string
    heading: string
  }
  defaultIcon: ReactNode
}

const colorVariants: {
  [key in CalloutVariant]: { css: string; icon: string }
} = {
  info: {
    css:
      'bg-gray-100 border-gray-200 dark:bg-gray-900 dark:border-gray-800 text-gray-900 dark:text-white',
    icon: '💬',
  },
  success: {
    css:
      'bg-green-100 border-green-200 dark:bg-green-900 dark:border-green-800 text-green-900 dark:text-green-100',
    icon: '✅',
  },
  error: {
    css:
      'bg-red-100 border-red-200 dark:bg-red-900 dark:border-red-800 text-red-900 dark:text-red-100',
    icon: '🚨',
  },
  warning: {
    css:
      'bg-yellow-100 border-yellow-200 dark:bg-yellow-900 dark:border-yellow-800 text-yellow-900 dark:text-yellow-100',
    icon: '🚧',
  },
}

export const Callout = ({
  variant = 'info',
  icon,
  children,
  heading = null,
  ...props
}: CalloutProps) => {
  const config = colorVariants[variant]

  return (
    <div className={`${styles.container} ${config.css} bg-opacity-60`}>
      <div className="w-6 h-6 text-xl">{icon || config.icon}</div>

      {heading && <div className="text-xl font-medium">{heading}</div>}

      <div className="col-start-1 col-end-3 md:col-start-2 md:col-end-3 dark:text-white">
        {children}
      </div>
    </div>
  )
}
