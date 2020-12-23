import React from 'react'

import Layout from '../components/Layout'
import SEO from '../components/seo'
import { Link } from 'gatsby'
import { FiArrowRight } from 'react-icons/fi'

class NotFoundPage extends React.Component {
  render() {
    return (
      <Layout location={this.props.location}>
        <SEO title="404 - Not Found" />

        <div class="not-found">
          <div class="not-found-type">
            <h1>Not found</h1>
          </div>
        </div>
      </Layout>
    )
  }
}

export default NotFoundPage
