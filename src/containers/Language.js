import React, { useState, createContext, useContext } from 'react'

import { languageOptions } from '../languages'
import DICTIONARY from '../languages/dictionary'

import { get } from 'lodash-es'

// date-fns
import { format as dateFnsFormat } from 'date-fns'
import { fr as frLocale } from 'date-fns/locale'

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
export function Text({ tid, variations }) {
  const languageContext = useContext(LanguageContext)

  let text
  if (tid) {
    text = get(
      languageContext.dictionary,
      `${tid}.${languageContext.userLanguage}`
    )
  } else if (variations) {
    text = variations[languageContext.userLanguage]
  }

  return text || tid || ''
}

// get text according to id & current language
export function TextDate({ string, format, options }) {
  const languageContext = useContext(LanguageContext)

  let defaultOptions = {}
  if (languageContext.userLanguage === 'fr') {
    defaultOptions.locale = frLocale
  }

  const defaultFormat = "MMM dd yyyy"

  return dateFnsFormat(
    new Date(string),
    format || defaultFormat,
    options || defaultOptions
  )
}
