import React from 'react'
import { Link, graphql } from 'gatsby'

import Layout from '../components/Layout'
import SEO from '../components/seo'

// Locale
import { Text } from '../containers/Language'

// Assets
import GAUGE from '../img/capabilities/capabilities-guage.svg'

import IMG01 from '../img/capabilities/experiential-marketing.jpg'
import IMG02 from '../img/capabilities/02.jpg'
import IMG03 from '../img/capabilities/03.jpg'
import IMG04 from '../img/capabilities/04.jpg'
import IMG05 from '../img/capabilities/05.jpg'
import IMG06 from '../img/capabilities/06.jpg'

import { FiArrowRight } from 'react-icons/fi'

class Capabilities extends React.Component {
  componentDidMount() {
    setTimeout(
      () => document.getElementById('animated_svg').classList.add('active'),
      300
    )
  }

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
                  <div className="columns">
                    <div className="column cp-copy">
                      <h1>
                        <span>
                          <Text tid="pages.capabilities.title" />
                        </span>
                      </h1>

                      <p>
                        <Text tid="pages.capabilities.title.text" />
                      </p>
                    </div>

                    <div className="column cp-img">
                      <svg
                        version="1.1"
                        id="animated_svg"
                        xmlns="http://www.w3.org/2000/svg"
                        // xmlns:xlink="http://www.w3.org/1999/xlink"
                        x="0px"
                        y="0px"
                        viewBox="0 0 543.6 646.9"
                        style={{ enableBackground: 'new 0 0 543.6 646.9' }}
                        // xml:space="preserve"
                        width="543.5999755859375"
                        height="646.9000244140625"
                      >
                        <g
                          id="Group_997"
                          transform="translate(-533.816 -129.672)"
                        >
                          <path
                            id="Path_1190"
                            class="st0 svg-elem-1"
                            d="M805.6,772.1L538.3,612.6v-319l267.3,159.5V772.1z"
                          ></path>
                          <path
                            id="Path_1191"
                            class="st0 svg-elem-2"
                            d="M805.6,772.1l267.3-159.5v-319L805.6,453.1V772.1z"
                          ></path>
                          <path
                            id="Path_1192"
                            class="st0 svg-elem-3"
                            d="M538.3,612.6l267.3-159.5v-319L538.3,293.6V612.6z"
                          ></path>
                          <path
                            id="Path_1193"
                            class="st0 svg-elem-4"
                            d="M538.3,293.6l267.3,159.5l267.3-159.5L805.6,134.2L538.3,293.6z"
                          ></path>
                          <path
                            id="Path_1194"
                            class="st0 svg-elem-5"
                            d="M538.3,612.6l267.3,159.5l267.3-159.5L805.6,453.1L538.3,612.6z"
                          ></path>
                          <path
                            id="Path_1195"
                            class="st0 svg-elem-6"
                            d="M805.6,772.1L538.3,293.6h534.6L805.6,772.1z"
                          ></path>
                          <path
                            id="Path_1196"
                            class="st0 svg-elem-7"
                            d="M805.6,134.2L538.3,612.6h534.6L805.6,134.2z"
                          ></path>
                        </g>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        }
        navIdleLight={true}
      >
        <SEO title="Capabilities" keywords={['TODO']} description="TODO" />

        <div className="pages-index pages-capabilities">
          <div className="gauge">
            <div className="container">
              <div className="columns">
                <div className="column is-4 is-offset-2 gauge-text">
                  <h1>
                    <Text tid="pages.capabilities.gauge.title" />
                  </h1>

                  <p>
                    <Text tid="pages.capabilities.gauge.text" />
                  </p>
                </div>

                <div className="gauge-image">
                  {/* TODO - alt text should be confirmed */}
                  <img src={GAUGE} alt="Image of six strategy steps." />
                </div>
              </div>
              <div className="dots"></div>
            </div>
          </div>

          <div className="section-writeup">
            <div className="container">
              <div className="columns post-single ui-grid home-featured columns-reverse-mobile">
                <div className="column is-5-tablet is-5-desktop is-5-widescreen is-5-fullhd">
                  {/* TODO - alt text should be confirmed */}
                  <img
                    src={IMG01}
                    className="image-below"
                    alt="Content & Digital"
                  />
                </div>

                <div className="column is-1"></div>

                <div className="column is-4-tablet is-4-desktop is-4-widescreen is-4-fullhd">
                  <h2>
                    <Text tid="pages.capabilities.content_digital.title" />
                  </h2>

                  <p className="secondary secondary-blue">
                    <Text tid="pages.capabilities.content_digital.text" />
                  </p>
                </div>

                <div className="column is-1"></div>
              </div>
            </div>
          </div>

          <div className="section-writeup2">
            <div className="container">
              <div className="columns post-single ui-grid home-featured columns-reverse-mobile">
                <div className="column is-4-tablet is-4-desktop is-4-widescreen is-4-fullhd">
                  <h2>
                    <Text tid="pages.capabilities.experiential_marketing.title" />
                  </h2>

                  <p className="secondary secondary-orange">
                    <Text tid="pages.capabilities.experiential_marketing.text" />
                  </p>
                </div>

                <div className="column is-1"></div>

                <div className="column is-5-tablet is-5-desktop is-5-widescreen is-5-fullhd">
                  {/* TODO - alt text should be confirmed */}
                  <img
                    src={IMG02}
                    className="image-below"
                    alt="Experiential Marketing"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="section-writeup">
            <div className="container">
              <div className="columns post-single ui-grid home-featured columns-reverse-mobile">
                <div className="column is-5-tablet is-5-desktop is-5-widescreen is-5-fullhd">
                  {/* TODO - alt text should be confirmed */}
                  <img
                    src={IMG03}
                    className="image-below"
                    alt="Retail & Commerce"
                  />
                </div>

                <div className="column is-1"></div>

                <div className="column is-4-tablet is-4-desktop is-4-widescreen is-4-fullhd">
                  <h2>
                    <Text tid="pages.capabilities.retail_commerce.title" />
                  </h2>

                  <p className="secondary secondary-red">
                    <Text tid="pages.capabilities.retail_commerce.text" />
                  </p>
                </div>

                <div className="column is-1"></div>
              </div>
            </div>
          </div>

          <div className="section-writeup2">
            <div className="container">
              <div className="columns post-single ui-grid home-featured columns-reverse-mobile">
                <div className="column is-4-tablet is-4-desktop is-4-widescreen is-4-fullhd">
                  <h2>
                    <Text tid="pages.capabilities.b2b.title" />
                  </h2>

                  <p className="secondary secondary-cyan">
                    <Text tid="pages.capabilities.b2b.text" />
                  </p>
                </div>

                <div className="column is-1"></div>

                <div className="column is-5-tablet is-5-desktop is-5-widescreen is-5-fullhd">
                  {/* TODO - alt text should be confirmed */}
                  <img src={IMG04} className="image-below" alt="B2B" />
                </div>
              </div>
            </div>
          </div>

          <div className="section-writeup">
            <div className="container">
              <div className="columns post-single ui-grid home-featured columns-reverse-mobile">
                <div className="column is-5-tablet is-5-desktop is-5-widescreen is-5-fullhd">
                  {/* TODO - alt text should be confirmed */}
                  <img
                    src={IMG05}
                    className="image-below"
                    alt="Assisted Selling & Training"
                  />
                </div>

                <div className="column is-1"></div>

                <div className="column is-4-tablet is-4-desktop is-4-widescreen is-4-fullhd">
                  <h2>
                    <Text tid="pages.capabilities.assisted_selling.title" />
                  </h2>

                  <p className="secondary secondary-blue">
                    <Text tid="pages.capabilities.assisted_selling.text" />
                  </p>
                </div>

                <div className="column is-1"></div>
              </div>
            </div>
          </div>

          <div className="section-writeup2">
            <div className="container">
              <div className="columns post-single ui-grid home-featured columns-reverse-mobile">
                <div className="column is-4-tablet is-4-desktop is-4-widescreen is-4-fullhd">
                  <h2>
                    <Text tid="pages.capabilities.brand_development.title" />
                  </h2>

                  <p className="secondary secondary-orange">
                    <Text tid="pages.capabilities.brand_development.text" />
                  </p>
                </div>

                <div className="column is-1"></div>

                <div className="column is-5-tablet is-5-desktop is-5-widescreen is-5-fullhd">
                  {/* TODO - alt text should be confirmed */}
                  <img
                    src={IMG06}
                    className="image-below"
                    alt="Brand Development & Design"
                  />
                </div>
              </div>
              <div className="dots"></div>
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
