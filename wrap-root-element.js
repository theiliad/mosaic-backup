import React from 'react'

import { LanguageProvider } from './src/containers/Language'
import { QueryParamProvider } from 'use-query-params'

import { globalHistory, Location } from '@reach/router'

export const wrapRootElement = ({ element }) => (
  <Location>
    {({ location }) => {
      return (
        <QueryParamProvider location={location} reachHistory={globalHistory}>
          <LanguageProvider>{element}</LanguageProvider>
        </QueryParamProvider>
      )
    }}
  </Location>
)
