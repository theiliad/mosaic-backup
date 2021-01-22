import React from 'react'
import { Link, graphql } from 'gatsby'

import Layout from '../components/Layout'
import SEO from '../components/seo'

// Locale
import { Text } from '../containers/Language'

// Assets
import CAPABILITIES_CONTENT_DIGITAL from '../img/capabilities/content-digital.jpg'
import CAPABILITIES_EXPERIENTIAL_MARKETING from '../img/capabilities/experiential-marketing.jpg'
import CAPABILITIES_RETAIL_COMMERCE from '../img/capabilities/retail-commerce.jpg'
import CAPABILITIES_B2B from '../img/capabilities/b2b.jpg'
import CAPABILITIES_ASSISTED_SELLING from '../img/capabilities/assisted-selling.jpg'
import CAPABILITIES_BRAND_DEVELOPMENT from '../img/capabilities/brand-development.jpg'

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
                  <div className="columns">
                    <div className="column">
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
                        xmlns="http://www.w3.org/2000/svg"
                        width="543.572021484375"
                        height="646.9089965820312"
                        viewBox="0 0 543.572 646.909"
                      >
                        <g
                          id="Group_997"
                          data-name="Group 997"
                          transform="translate(-533.816 -129.672)"
                        >
                          <path
                            id="Path_1190"
                            data-name="Path 1190"
                            d="M804.347,769.674,537.061,610.2V291.242L804.347,450.72Z"
                            transform="translate(1.255 2.407)"
                            fill="none"
                            stroke="#ffffff"
                            stroke-linejoin="round"
                            stroke-width="9"
                            class="svg-elem-1"
                          ></path>
                          <path
                            id="Path_1191"
                            data-name="Path 1191"
                            d="M801.084,769.674,1068.37,610.2V291.242L801.084,450.72Z"
                            transform="translate(4.518 2.407)"
                            fill="none"
                            stroke="#ffffff"
                            stroke-linejoin="round"
                            stroke-width="9"
                            class="svg-elem-2"
                          ></path>
                          <path
                            id="Path_1192"
                            data-name="Path 1192"
                            d="M537.061,612.143,804.347,452.666V133.712L537.061,293.189Z"
                            transform="translate(1.255 0.46)"
                            fill="none"
                            stroke="#ffffff"
                            stroke-linejoin="round"
                            stroke-width="9"
                            class="svg-elem-3"
                          ></path>
                          <path
                            id="Path_1193"
                            data-name="Path 1193"
                            d="M537.061,293.189,804.347,452.666l267.286-159.477L804.347,133.712Z"
                            transform="translate(1.255 0.46)"
                            fill="none"
                            stroke="#ffffff"
                            stroke-linejoin="round"
                            stroke-width="9"
                            class="svg-elem-4"
                          ></path>
                          <path
                            id="Path_1194"
                            data-name="Path 1194"
                            d="M537.061,608.25,804.347,767.727,1071.632,608.25,804.347,448.773Z"
                            transform="translate(1.255 4.354)"
                            fill="none"
                            stroke="#ffffff"
                            stroke-linejoin="round"
                            stroke-width="9"
                            class="svg-elem-5"
                          ></path>
                          <path
                            id="Path_1195"
                            data-name="Path 1195"
                            d="M804.347,769.674,537.061,291.242h534.572Z"
                            transform="translate(1.255 2.407)"
                            fill="none"
                            stroke="#ffffff"
                            stroke-linejoin="round"
                            stroke-width="9"
                            class="svg-elem-6"
                          ></path>
                          <path
                            id="Path_1196"
                            data-name="Path 1196"
                            d="M804.347,133.712,537.061,612.143h534.572Z"
                            transform="translate(1.255 0.46)"
                            fill="none"
                            stroke="#ffffff"
                            stroke-linejoin="round"
                            stroke-width="9"
                            class="svg-elem-7"
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
        <SEO title="Home" keywords={['TODO']} description="TODO" />

        <div className="pages-index pages-capabilities">
          <div className="section-writeup">
            <div className="container">
              <div className="columns post-single ui-grid home-featured columns-reverse-mobile">
                <div className="column is-5-tablet is-5-desktop is-5-widescreen is-5-fullhd">
                  <img src={CAPABILITIES_CONTENT_DIGITAL} className="image-below" />
                </div>

                <div className="column is-1"></div>

                <div className="column is-4-tablet is-4-desktop is-4-widescreen is-4-fullhd">
                  <h2>
                    <Text tid="pages.capabilities.content_digital.title" />
                  </h2>

                  <p className="secondary">
                    <Text tid="pages.capabilities.content_digital.text" />
                  </p>

                  <Link to="/case-studies/budweiser/">
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
                <div className="column is-4-tablet is-4-desktop is-4-widescreen is-4-fullhd">
                  <h2>
                    <Text tid="pages.capabilities.experiential_marketing.title" />
                  </h2>

                  <p className="secondary">
                    <Text tid="pages.capabilities.experiential_marketing.text" />
                  </p>

                  <Link to="/case-studies/stella/">
                    <span>
                      <Text tid="pages.capabilities.experiential_marketing.cta" />
                    </span>
                    <FiArrowRight />
                  </Link>
                </div>

                <div className="column is-1"></div>

                <div className="column is-5-tablet is-5-desktop is-5-widescreen is-5-fullhd">
                  <img src={CAPABILITIES_EXPERIENTIAL_MARKETING} className="image-below" />
                </div>
              </div>
            </div>
          </div>

          <div className="section-writeup">
            <div className="container">
              <div className="columns post-single ui-grid home-featured columns-reverse-mobile">
                <div className="column is-5-tablet is-5-desktop is-5-widescreen is-5-fullhd">
                  <img src={CAPABILITIES_RETAIL_COMMERCE} className="image-below" />
                </div>

                <div className="column is-1"></div>

                <div className="column is-4-tablet is-4-desktop is-4-widescreen is-4-fullhd">
                  <h2>
                    <Text tid="pages.capabilities.retail_commerce.title" />
                  </h2>

                  <p className="secondary">
                    <Text tid="pages.capabilities.retail_commerce.text" />
                  </p>

                  <Link to="/case-studies/google/">
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
              <div className="column is-4-tablet is-4-desktop is-4-widescreen is-4-fullhd">
                  <h2>
                    <Text tid="pages.capabilities.b2b.title" />
                  </h2>

                  <p className="secondary">
                    <Text tid="pages.capabilities.b2b.text" />
                  </p>

                  <Link to="/case-studies/loblaws/">
                    <span>
                      <Text tid="pages.capabilities.b2b.cta" />
                    </span>
                    <FiArrowRight />
                  </Link>
                </div>

                <div className="column is-1"></div>

                <div className="column is-5-tablet is-5-desktop is-5-widescreen is-5-fullhd">
                  <img src={CAPABILITIES_B2B} className="image-below" />
                </div>
              </div>
            </div>
          </div>

          <div className="section-writeup">
            <div className="container">
              <div className="columns post-single ui-grid home-featured columns-reverse-mobile">
               <div className="column is-5-tablet is-5-desktop is-5-widescreen is-5-fullhd">
                  <img src={CAPABILITIES_ASSISTED_SELLING} className="image-below" />
                </div>

                <div className="column is-1"></div>

                <div className="column is-4-tablet is-4-desktop is-4-widescreen is-4-fullhd">
                  <h2>
                    <Text tid="pages.capabilities.assisted_selling.title" />
                  </h2>

                  <p className="secondary">
                    <Text tid="pages.capabilities.assisted_selling.text" />
                  </p>

                  <Link to="/case-studies/digital-main-st/">
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
               <div className="column is-4-tablet is-4-desktop is-4-widescreen is-4-fullhd">
                  <h2>
                    <Text tid="pages.capabilities.brand_development.title" />
                  </h2>

                  <p className="secondary">
                    <Text tid="pages.capabilities.brand_development.text" />
                  </p>

                  <Link to="/case-studies/tishman-speyer/">
                    <span>
                      <Text tid="pages.capabilities.brand_development.cta" />
                    </span>
                    <FiArrowRight />
                  </Link>
                </div>

                <div className="column is-1"></div>

                <div className="column is-5-tablet is-5-desktop is-5-widescreen is-5-fullhd">
                  <img src={CAPABILITIES_BRAND_DEVELOPMENT} className="image-below" />
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
