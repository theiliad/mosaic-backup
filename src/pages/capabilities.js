import React from 'react'
import { Link, graphql } from 'gatsby'

import Layout from '../components/Layout'
import SEO from '../components/seo'

// Locale
import { Text } from '../containers/Language'

// Assets
import LOGO_WHITE from '../img/logo/white-transparent.svg'
import DEMO_3 from '../img/demo/3.jpg'
import DEMO_4 from '../img/demo/4.jpg'

import { FiArrowRight } from 'react-icons/fi'

class Capabilities extends React.Component {
  render() {
    const { data } = this.props

    const siteTitle = data.site.siteMetadata.title

    return (
      <Layout
        location={this.props.location}
        title={siteTitle}
        HeaderExtension={
          <div className="header_extension home capabilities">
            <div className="bg">
              <div className="cp-hero" id="cp_hero">
                <div className="container">
                  <h1>
                    <span>
                      <Text tid="pages.capabilities.title" />
                    </span>
                  </h1>

                  <p>
                    <Text tid="pages.capabilities.title.text" />
                  </p>
                </div>
              </div>
            </div>
          </div>
        }
      >
        <SEO title="Home" keywords={['TODO']} description="TODO" />

        <div className="pages-index pages-capabilities">
          <div className="section-writeup">
            <div className="container">
              <div className="columns post-single ui-grid home-featured columns-reverse-mobile">
                <div className="column is-5-tablet is-6-desktop is-6-widescreen is-6-fullhd">
                  <img src={DEMO_4} className="image-below" />
                </div>

                <div className="column is-1"></div>

                <div className="column is-4-tablet is-5-desktop is-5-widescreen is-5-fullhd">
                  <h2>
                    <Text tid="pages.capabilities.content_digital.title" />
                  </h2>

                  <p className="secondary">
                    <Text tid="pages.capabilities.content_digital.text" />
                  </p>

                  <Link to="/">
                    <span>
                      <Text tid="pages.capabilities.content_digital.cta" />
                    </span>
                    <FiArrowRight />
                  </Link>
                </div>

                <div className="column is-1"></div>
              </div>
            </div>
          </div>

          <div className="section-writeup2">
            <div className="container">
              <div className="columns post-single ui-grid home-featured columns-reverse-mobile">
                <div className="column is-4-tablet is-5-desktop is-5-widescreen is-5-fullhd">
                  <h2>
                    <Text tid="pages.capabilities.experiential_marketing.title" />
                  </h2>

                  <p className="secondary">
                    <Text tid="pages.capabilities.experiential_marketing.text" />
                  </p>

                  <Link to="/">
                    <span>
                      <Text tid="pages.capabilities.experiential_marketing.cta" />
                    </span>
                    <FiArrowRight />
                  </Link>
                </div>

                <div className="column is-1"></div>

                <div className="column is-5-tablet is-6-desktop is-6-widescreen is-6-fullhd">
                  <img src={DEMO_4} className="image-below" />
                </div>
              </div>
            </div>
          </div>

          <div className="section-writeup">
            <div className="container">
              <div className="columns post-single ui-grid home-featured columns-reverse-mobile">
                <div className="column is-5-tablet is-6-desktop is-6-widescreen is-6-fullhd">
                  <img src={DEMO_4} className="image-below" />
                </div>

                <div className="column is-1"></div>

                <div className="column is-4-tablet is-5-desktop is-5-widescreen is-5-fullhd">
                  <h2>
                    <Text tid="pages.capabilities.retail_commerce.title" />
                  </h2>

                  <p className="secondary">
                    <Text tid="pages.capabilities.retail_commerce.text" />
                  </p>

                  <Link to="/">
                    <span>
                      <Text tid="pages.capabilities.retail_commerce.cta" />
                    </span>
                    <FiArrowRight />
                  </Link>
                </div>

                <div className="column is-1"></div>
              </div>
            </div>
          </div>

          <div className="section-writeup2">
            <div className="container">
              <div className="columns post-single ui-grid home-featured columns-reverse-mobile">
                <div className="column is-4-tablet is-5-desktop is-5-widescreen is-5-fullhd">
                  <h2>
                    <Text tid="pages.capabilities.b2b.title" />
                  </h2>

                  <p className="secondary">
                    <Text tid="pages.capabilities.b2b.text" />
                  </p>

                  <Link to="/">
                    <span>
                      <Text tid="pages.capabilities.b2b.cta" />
                    </span>
                    <FiArrowRight />
                  </Link>
                </div>

                <div className="column is-1"></div>

                <div className="column is-5-tablet is-6-desktop is-6-widescreen is-6-fullhd">
                  <img src={DEMO_4} className="image-below" />
                </div>
              </div>
            </div>
          </div>

          <div className="section-writeup">
            <div className="container">
              <div className="columns post-single ui-grid home-featured columns-reverse-mobile">
                <div className="column is-5-tablet is-6-desktop is-6-widescreen is-6-fullhd">
                  <img src={DEMO_4} className="image-below" />
                </div>

                <div className="column is-1"></div>

                <div className="column is-4-tablet is-5-desktop is-5-widescreen is-5-fullhd">
                  <h2>
                    <Text tid="pages.capabilities.assisted_selling.title" />
                  </h2>

                  <p className="secondary">
                    <Text tid="pages.capabilities.assisted_selling.text" />
                  </p>

                  <Link to="/">
                    <span>
                      <Text tid="pages.capabilities.assisted_selling.cta" />
                    </span>
                    <FiArrowRight />
                  </Link>
                </div>

                <div className="column is-1"></div>
              </div>
            </div>
          </div>

          <div className="section-writeup2">
            <div className="container">
              <div className="columns post-single ui-grid home-featured columns-reverse-mobile">
                <div className="column is-4-tablet is-5-desktop is-5-widescreen is-5-fullhd">
                  <h2>
                    <Text tid="pages.capabilities.brand_development.title" />
                  </h2>

                  <p className="secondary">
                    <Text tid="pages.capabilities.brand_development.text" />
                  </p>

                  <Link to="/">
                    <span>
                      <Text tid="pages.capabilities.brand_development.cta" />
                    </span>
                    <FiArrowRight />
                  </Link>
                </div>

                <div className="column is-1"></div>

                <div className="column is-5-tablet is-6-desktop is-6-widescreen is-6-fullhd">
                  <img src={DEMO_4} className="image-below" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    )
  }
}

export default Capabilities

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMdx(sort: { fields: [frontmatter___date], order: DESC }) {
      group(field: frontmatter___posttype) {
        edges {
          node {
            excerpt
            fields {
              slug
            }
            frontmatter {
              date(formatString: "MMMM DD, YYYY")
              titleEN
              titleFR
              companyName
              posttype
              descriptionEN
              category
            }
          }
        }
      }
    }
  }
`
