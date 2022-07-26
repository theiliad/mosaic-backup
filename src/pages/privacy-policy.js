import React from 'react'

import Layout, { LOGO_OPTIONS } from '../components/Layout'
import SEO from '../components/seo'

// Locale
import { Text } from '../containers/Language'

class PrivacyPolicy extends React.Component {
  render() {
    return (
      <Layout
        location={this.props.location}
        logo={LOGO_OPTIONS.orangeBlue}
        HeaderExtension={null}
      >
        <SEO title="Privacy Policy" />

        <div className="pages-sup">
          <div className="section-title">
            <div className="container">
              <h1>
                <Text tid="pages.privacy.title" />
              </h1>
            </div>
          </div>

          <div className="section-header">
            <div className="container">
              <Text tid="pages.privacy.header" />
            </div>
          </div>

          <div className="section-content content">
            <div className="container">
              <Text tid="pages.privacy.content" />
            </div>
          </div>
        </div>
      </Layout>
    )
  }
}

export default PrivacyPolicy
