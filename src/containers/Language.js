import React, { useState, createContext, useContext } from 'react'

import { languageOptions } from '../languages'
import DICTIONARY from '../languages/dictionary'

import { get } from 'lodash-es'

// date-fns
import { format as dateFnsFormat } from 'date-fns'
import { fr as frLocale } from 'date-fns/locale'

// Utils
import { updateQueryStringParameter } from '../utils'

// Query params
import { useQueryParam, NumberParam, StringParam } from 'use-query-params'

// create the language context with default selected language
export const LanguageContext = createContext({
  userLanguage: 'en',
  dictionary: DICTIONARY,
})

const AVAILABLE_LOCALES = ['en', 'fr']

// it provides the language context to app
export function LanguageProvider({ children }) {
  console.log(
    'window.localStorage.setItem',
    window.localStorage.getItem('rcml-lang')
  )
  const [lang, setLang] = useQueryParam('lang', StringParam)

  let entryLanguage = 'en'
  const localStorageValue = window.localStorage.getItem('rcml-lang')
  if (
    localStorageValue &&
    AVAILABLE_LOCALES.indexOf(localStorageValue) !== -1
  ) {
    entryLanguage = localStorageValue
  }

  if (lang && AVAILABLE_LOCALES.indexOf(lang) !== -1) {
    entryLanguage = lang
  }

  const [userLanguage, setUserLanguage] = useState(entryLanguage)

  const provider = {
    userLanguage,
    dictionary: DICTIONARY,
    changeUserLanguage: selected => {
      const newLanguage = languageOptions[selected] ? selected : 'en'
      setUserLanguage(newLanguage)

      window.localStorage.setItem('rcml-lang', newLanguage)
      console.log(
        updateQueryStringParameter(window.location.href, 'lang', newLanguage)
      )

      setLang(newLanguage)
    },
  }

  return (
    <LanguageContext.Provider value={provider}>
      {children}
    </LanguageContext.Provider>
  )
}

export function getText({ dictionary, tid, variations, userLanguage }) {
  let text
  if (tid) {
    text = get(dictionary, `${tid}.${userLanguage}`)
  } else if (variations) {
    text = variations[userLanguage]
  }

  return text || tid || ''
}

// get text according to id & current language
export function Text({ tid, variations }) {
  const languageContext = useContext(LanguageContext)
  const { dictionary, userLanguage } = languageContext

  return getText({
    dictionary,
    userLanguage,
    tid,
    variations,
  })
}

// get text according to id & current language
export function TextDate({ string, format, options, lowercase }) {
  const languageContext = useContext(LanguageContext)

  let defaultOptions = {}
  if (languageContext.userLanguage === 'fr') {
    defaultOptions.locale = frLocale
  }

  const defaultFormat = 'MMM dd yyyy'

  const result = dateFnsFormat(
    new Date(string),
    format || defaultFormat,
    options || defaultOptions
  )

  if (lowercase) {
    return result.toLowerCase()
  }

  return result
}
