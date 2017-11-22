// TODO -- import this conditionally
import App from './components/app'
import './styles/reset.css'

// TODO -- add conditions to exclude from browsers that don't need it
// Polyfills only on the browser
if (typeof window !== 'undefined') {
  import('smoothscroll-polyfill').then(module => module.polyfill())
}

export default App
