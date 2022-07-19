import React from 'react'

import { StaticImage } from 'gatsby-plugin-image'

import Layout, { LOGO_OPTIONS } from '../components/Layout'
import SEO from '../components/seo'

// Locale
import { Text } from '../containers/Language'

// ICONS
import { RiArrowRightUpLine } from 'react-icons/ri'

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
        <SEO title="Careers" />

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

                  <a
                    href="https://www.mosaicjobs.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="button primary"
                  >
                    <Text tid="pages.careers.cta" /> <RiArrowRightUpLine />
                  </a>
                </div>
              </div>
            </div>

            <StaticImage
              src={'../img/careers.jpg'}
              style={{ width: '100%' }}
              alt="Careers"
            />
          </div>
        </div>
      </Layout>
    )
  }
}

export default Careers
