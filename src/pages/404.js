import React from 'react'
import { Link } from 'gatsby'

import Layout, { LOGO_OPTIONS } from '../components/Layout'
import SEO from '../components/seo'

// Locale
import { Text, LanguageContext } from '../containers/Language'

const Meta = () => (
  <div className="cp-meta-wrap">
    <p>  
    <Text tid="pages.notFound.body" />
    </p>

    <Link to="/" className="button primary">
      <Text tid="pages.notFound.cta" />
    </Link>
  </div>
)

class NotFoundPage extends React.Component {
  render() {
    return (
      <Layout
        location={this.props.location}
        logo={LOGO_OPTIONS.aquaBlue}
        HeaderExtension={
          <>
            <div className="post-single-heading thinking fourOFour">
              <div className="cp-meta">
                <div className="container">
                  <Meta />
                </div>
              </div>

              <p className="cp-ftext">
                <Text tid="pages.notFound.title" />
                </p>
            </div>
          </>
        }
      >
        <SEO title="404 - Not Found" />
      </Layout>
    )
  }
}

export default NotFoundPage
