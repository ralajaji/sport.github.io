import { Toaster } from 'react-hot-toast'
import LandingPage from './components/LandingPage'
import { LanguageProvider } from './contexts/LanguageContext'

function App() {
  return (
    <LanguageProvider>
      <div dir="rtl">
        <Toaster position="top-center" />
        <LandingPage />
      </div>
    </LanguageProvider>
  )
}

export default App 