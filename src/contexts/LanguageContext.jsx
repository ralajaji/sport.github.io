import { createContext, useContext, useState } from 'react'
import { translations } from '../locales/translations'

const LanguageContext = createContext()

export function LanguageProvider({ children }) {
  const [language] = useState('ar') // Set Arabic as default

  const t = (key) => {
    const keys = key.split('.')
    let value = translations[language]
    
    for (const k of keys) {
      value = value[k]
    }
    
    return value
  }

  return (
    <LanguageContext.Provider value={{ t, language }}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useTranslation = () => useContext(LanguageContext) 