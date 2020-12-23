import React from 'react'
import { Link, graphql } from 'gatsby'

import Layout from '../components/Layout'
import SEO from '../components/seo'

import HOME_HERO from '../img/home/hero.jpg'

// Locale
import { Text } from '../containers/Language'

// ICONS
import { FiArrowRight } from 'react-icons/fi'
import { RiArrowRightUpLine } from 'react-icons/ri'

import { get, chunk } from 'lodash-es'

import CATEGORIES from '../data/categories'

import Marquee from 'react-double-marquee'

import LOGO from '../img/logo/logo.png'

import DEMO_1 from '../img/demo/1.jpg'
import DEMO_2 from '../img/demo/2.jpg'
import DEMO_3 from '../img/demo/3.jpg'

class BlogIndex extends React.Component {
  render() {
    const { data } = this.props

    const siteTitle = data.site.siteMetadata.title
    // const pressReleases =
    //   data.allMdx.group.find(
    //     group => get(group, 'edges[0].node.frontmatter.posttype') === 'press'
    //   ).edges || []
    // const mediaPosts =
    //   data.allMdx.group.find(
    //     group => get(group, 'edges[0].node.frontmatter.posttype') === 'media'
    //   ).edges || []

    const isBrowser = typeof window !== `undefined`

    return (
      <Layout
        location={this.props.location}
        title={siteTitle}
        HeaderExtension={
          <div className="header_extension home">
            <div className="bg">
              <div className="container cp-hero">
                <div className="columns is-vcentered">
                  <div className="column is-6 aligncenter-mobile">
                    <h1 className="primary heading_lg">
                      <span>
                        <Text tid="pages.index.title" />
                      </span>
                    </h1>
                  </div>
                </div>
              </div>
            </div>
          </div>
        }
      >
        <SEO title="Home" keywords={['TODO']} description="TODO" />

        <div className="pages-index">
          <img src={HOME_HERO} style={{ width: '100%' }} />
          <div className="section-why">
            <div className="container">
              <div className="columns">
                <div className="column is-1"></div>

                <div className="column is-5">
                  <h2 className="primary heading_lg">
                    <Text tid="pages.index.why.title" />
                  </h2>
                </div>

                <div className="column is-1"></div>

                <div className="column is-5">
                  <p>
                    <Text tid="pages.index.why.description" />
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="section-cases">
            <div className="container">
              {chunk([2, 1, 1, 2], 2).map(cases => (
                <div
                  className="columns is-multiline"
                  style={{ marginBottom: '4em' }}
                >
                  {cases.map(cS => (
                    <div
                      className="column is-6"
                      style={{ alignSelf: 'flex-end' }}
                    >
                      <img
                        src={cS === 1 ? DEMO_1 : DEMO_2}
                        style={{ width: '100%' }}
                      />
                    </div>
                  ))}

                  {cases.map(cS => (
                    <div
                      className="column is-6"
                      style={{ alignSelf: 'flex-end' }}
                    >
                      <div className="columns">
                        <div className="column is-8">
                          <p>Loblaw Companies Limited —</p>
                          <p>National Kickoff</p>
                        </div>

                        <div className="column is-4">
                          Assisted Selling & Training
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          <div className="section-writeup">
            <div className="container">
              <div className="columns post-single ui-grid home-featured columns-reverse-mobile">
                <div className="column is-5-tablet is-6-desktop is-6-widescreen is-6-fullhd">
                  <img src={DEMO_3} className="image-below" />
                </div>

                <div className="column is-1"></div>

                <div className="column is-3-tablet is-4-desktop is-4-widescreen is-4-fullhd">
                  <p className="secondary">
                    From concept to conversion, our media-agnostic teams solve
                    business challenges by looking at brands from different
                    dimensions.
                  </p>

                  <a href="#" className="button light">
                    Explore our capabilities
                  </a>
                </div>

                <div className="column is-1"></div>
              </div>
            </div>
          </div>

          <div className="section-writeup2">
            <div className="container">
              <div className="columns post-single ui-grid home-featured columns-reverse-mobile">
                <div className="column is-1"></div>

                <div className="column is-3-tablet is-4-desktop is-4-widescreen is-4-fullhd">
                  <p className="secondary">
                    We love a good challenge and when we get one, we look at it
                    with a 180 view. It’s why we created the OneEighty
                    conference to analyze the future of culture, commerce and
                    creativity from all angles.
                  </p>

                  <a href="#" className="button">
                    Visit OneEighty
                  </a>
                </div>

                <div className="column is-1"></div>

                <div className="column is-5-tablet is-6-desktop is-6-widescreen is-6-fullhd">
                  <img src={DEMO_3} className="image-below" />
                </div>
              </div>
            </div>
          </div>

          <div className="section-partners">
            <div className="container">
              <h3>Our partners</h3>
            </div>

            <div class="slider">
              <div class="slide-track">
                <div class="slide">
                  <img
                    src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/557257/1.png"
                    height="100"
                    width="250"
                    alt=""
                  />
                </div>
                <div class="slide">
                  <img
                    src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/557257/2.png"
                    height="100"
                    width="250"
                    alt=""
                  />
                </div>
                <div class="slide">
                  <img
                    src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/557257/3.png"
                    height="100"
                    width="250"
                    alt=""
                  />
                </div>
                <div class="slide">
                  <img
                    src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/557257/4.png"
                    height="100"
                    width="250"
                    alt=""
                  />
                </div>
                <div class="slide">
                  <img
                    src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/557257/5.png"
                    height="100"
                    width="250"
                    alt=""
                  />
                </div>
                <div class="slide">
                  <img
                    src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/557257/6.png"
                    height="100"
                    width="250"
                    alt=""
                  />
                </div>
                <div class="slide">
                  <img
                    src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/557257/7.png"
                    height="100"
                    width="250"
                    alt=""
                  />
                </div>
                <div class="slide">
                  <img
                    src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/557257/1.png"
                    height="100"
                    width="250"
                    alt=""
                  />
                </div>
                <div class="slide">
                  <img
                    src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/557257/2.png"
                    height="100"
                    width="250"
                    alt=""
                  />
                </div>
                <div class="slide">
                  <img
                    src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/557257/3.png"
                    height="100"
                    width="250"
                    alt=""
                  />
                </div>
                <div class="slide">
                  <img
                    src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/557257/4.png"
                    height="100"
                    width="250"
                    alt=""
                  />
                </div>
                <div class="slide">
                  <img
                    src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/557257/5.png"
                    height="100"
                    width="250"
                    alt=""
                  />
                </div>
                <div class="slide">
                  <img
                    src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/557257/6.png"
                    height="100"
                    width="250"
                    alt=""
                  />
                </div>
                <div class="slide">
                  <img
                    src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/557257/7.png"
                    height="100"
                    width="250"
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    )
  }
}

export default BlogIndex

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
              posttype
              descriptionEN
            }
          }
        }
      }
    }
  }
`
