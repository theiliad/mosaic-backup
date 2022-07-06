import React from 'react'
import acostaLogo from '../img/logo/acosta.svg'

const Acosta = () => {
  return (
    <div class="container columns acosta">
      <div class="column is-8">
        <h2>Mosaic is part of the Acosta Family</h2>
      </div>
      <div class="column is-5">
        <p>
          Acosta provides integrated, progressive, sales & marketing solutions
          that enable clients to win in the modern marketplace. Discover more at
          acosta.com
        </p>
      </div>
      <div className="column acosta-logos is-12">
        <img src={acostaLogo} alt="Acosta logo." />
      </div>
    </div>
  )
}

export default Acosta
