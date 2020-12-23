import React, { useState, createContext, useContext } from 'react'

import { languageOptions } from '../languages'
import DICTIONARY from '../languages/dictionary'

import { get } from 'lodash-es'

// create the language context with default selected language
export const LanguageContext = createContext({
  userLanguage: 'en',
  dictionary: DICTIONARY,
})

// it provides the language context to app
export function LanguageProvider({ children }) {
  const [userLanguage, setUserLanguage] = useState('en')

  const provider = {
    userLanguage,
    dictionary: DICTIONARY,
    changeUserLanguage: selected => {
      const newLanguage = languageOptions[selected] ? selected : 'en'
      setUserLanguage(newLanguage)

      window.localStorage.setItem('rcml-lang', newLanguage)
    },
  }

  return (
    <LanguageContext.Provider value={provider}>
      {children}
    </LanguageContext.Provider>
  )
}

// get text according to id & current language
export function Text({ tid }) {
  const languageContext = useContext(LanguageContext)

  return (
    <>
      {get(
        languageContext.dictionary,
        `${tid}.${languageContext.userLanguage}`
      ) || tid}
    </>
  )
}
