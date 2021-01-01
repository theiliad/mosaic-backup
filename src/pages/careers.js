import React from 'react'

import Layout, { LOGO_OPTIONS } from '../components/Layout'
import SEO from '../components/seo'

// Locale
import { Text } from '../containers/Language'

// ICONS
import { RiArrowRightUpLine } from 'react-icons/ri'

import CAREERS from '../img/careers.jpg'

class Careers extends React.Component {
  render() {
    return (
      <Layout
        location={this.props.location}
        logo={LOGO_OPTIONS.orangeBlue}
        HeaderExtension={
          <div className="header_extension news">
            <div class="bg">
              <div className="container"></div>
            </div>
          </div>
        }
      >
        <SEO
          title="TODO"
          keywords={['TODO']}
          image="https://mosaic.com/img/logo/share.jpg"
        />

        <div className="pages-careers">
          <div className="section-careers">
            <div className="container">
              <div className="columns post-single ui-grid">
                <div className="column is-8">
                  <h1>
                    <Text tid="pages.careers.title" />
                  </h1>

                  <p>
                    <Text tid="pages.careers.description" />
                  </p>

                  <a href="https://www.mosaicjobs.com/" target="_blank" className="button primary">
                    <Text tid="pages.careers.cta" /> <RiArrowRightUpLine />
                  </a>
                </div>
              </div>
            </div>

            <img src={CAREERS} style={{ width: '100%' }} />
          </div>
        </div>
      </Layout>
    )
  }
}

export default Careers
