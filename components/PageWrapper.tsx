import { darkMode } from '../styles/media'
import { palette } from '../styles/theme'

export const PageWrapper = ({ children }) => {
  return (
    <div className="min-h-screen bg-white dark:text-white dark:bg-gray-800">
      {children}
    </div>
  )
}
