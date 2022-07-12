import React from 'react'
import acostaLogo from '../img/logo/acosta.svg'

import { Text } from '../containers/Language'

const Acosta = () => {
  return (
    <div class="container columns acosta">
      <div class="column is-8">
        <h2>
          <Text tid="pages.contact.acosta.title" />
        </h2>
      </div>
      <div class="column is-5">
        <p>
          <Text tid="pages.contact.acosta.description" />
        </p>
      </div>
      <div className="column acosta-logos is-12">
        <img src={acostaLogo} alt="Acosta logo." />
      </div>
    </div>
  )
}

export default Acosta
