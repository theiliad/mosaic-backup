import React from 'react'
import { Link } from 'gatsby'

import Layout, { LOGO_OPTIONS } from '../components/Layout'
import SEO from '../components/seo'

const Meta = () => (
  <div className="cp-meta-wrap">
    <p>
      Sorry, it looks like you broke the internet.<br />Luckily, we can help you fix
      it.
    </p>

    <Link to="/" className="button primary">
      Go home
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

              <p className="cp-ftext">404</p>
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
