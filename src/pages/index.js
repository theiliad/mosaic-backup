import React from 'react'
import { Link, graphql } from 'gatsby'

import Layout from '../components/Layout'
import SEO from '../components/seo'

// Locale
import { Text } from '../containers/Language'

// Lodash
import { get, chunk } from 'lodash-es'

import CATEGORIES from '../data/categories'

// Assets
import LOGO_WHITE from '../img/logo/white-transparent.svg'
import DEMO_1 from '../img/demo/1.jpg'
import DEMO_2 from '../img/demo/2.jpg'
import DEMO_3 from '../img/demo/3.jpg'
import HOME_HERO from '../img/home/hero.jpg'

// Partner logos
import ANHEUSER_BUSCH from '../img/home/partners/anheuser-busch.svg'
import DR_OETKER from '../img/home/partners/dr-oetker.svg'
import GENERAL_MILLS from '../img/home/partners/general-mills.svg'
import GOOGLE from '../img/home/partners/google.svg'
import IG_WEALTH_MANAGEMENT from '../img/home/partners/ig-wealth-management.svg'
import IMPOSSIBLE from '../img/home/partners/impossible.svg'
import KRAFT_HEINZ from '../img/home/partners/kraft-heinz.svg'
import LABATT from '../img/home/partners/labatt.svg'
import LOBLAWS from '../img/home/partners/loblaws.svg'
import MACKENZIE_INVESTMENTS from '../img/home/partners/mackenzie-investments.svg'
import RBC from '../img/home/partners/rbc.svg'
import SAMSUNG from '../img/home/partners/samsung.svg'
import SHOPPERS_DRUG_MART from '../img/home/partners/shoppers-drug-mart.svg'
import STARBUCKS from '../img/home/partners/starbucks.svg'
import TISHMAN_SPEYER from '../img/home/partners/tishman-speyer.svg'

export const CaseStudyMeta = ({ node, mobileVersion }) => (
  <>
    <div className={'columns' + (mobileVersion ? ' is-mobile' : '')}>
      <div className="column is-8">
        <p className="cp-company">{node.frontmatter.companyName}</p>

        <p>
          <Text
            variations={{
              en: node.frontmatter.titleEN,
              fr: node.frontmatter.titleFR,
            }}
          />
        </p>
      </div>

      <div className="column is-4">
        <p className="cp-category">
          <Text
            variations={CATEGORIES['case-studies'][node.frontmatter.category]}
          />
        </p>
      </div>
    </div>
  </>
)

class BlogIndex extends React.Component {
  componentDidMount() {
    document.addEventListener('scroll', this.trackScrolling)
  }

  componentWillUnmount() {
    document.removeEventListener('scroll', this.trackScrolling)
  }

  trackScrolling() {
    const isBrowser = typeof window !== `undefined`

    if (isBrowser) {
      const heroElement = document.getElementById('cp_hero')
      if (heroElement) {
        heroElement.style.transform = `translateY(-${window.scrollY / 3}px)`

        const opacity = Math.min(50 / window.scrollY, 1)
        heroElement.style.opacity = opacity
      }
    }
  }

  render() {
    const { data } = this.props

    const siteTitle = data.site.siteMetadata.title

    const caseStudies =
      data.allMdx.group.find(
        group =>
          get(group, 'edges[0].node.frontmatter.posttype') === 'case-study'
      ).edges || []

    return (
      <Layout
        navIdleLight={true}
        location={this.props.location}
        title={siteTitle}
        backgroundColorsOnScroll={{
          'home-writeup': '#021D49',
          'home-writeup2': '#e8eceb',
        }}
        HeaderExtension={
          <div className="header_extension home">
            <div className="bg">
              <div className="cp-hero" id="cp_hero">
                <div className="container">
                  <img src={LOGO_WHITE} />

                  <h1>
                    <span>
                      <Text tid="pages.index.title" />
                    </span>
                  </h1>
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
              </div>
            </div>
          </div>
          <div className="section-cases">
            <div className="container cp-wide">
              {chunk(caseStudies, 2).map(cases => (
                <div
                  className="columns is-multiline"
                  style={{ marginBottom: '4em' }}
                >
                  {cases.map(({ node }, i) => (
                    <div
                      className="column is-6 cp-photo"
                      style={{ alignSelf: 'flex-end' }}
                    >
                      <Link to={node.fields.slug}>
                        <img
                          src={node.frontmatter.featuredImage}
                          style={{ width: '100%' }}
                        />
                      </Link>
                    </div>
                  ))}

                  {cases.map(({ node }) => (
                    <div
                      className="column is-6"
                      style={{ alignSelf: 'flex-end' }}
                    >
                      <Link to={node.fields.slug}>
                        <CaseStudyMeta node={node} />
                      </Link>
                    </div>
                  ))}
                </div>
              ))}
            </div>

            <div className="container cp-mobile">
              <div
                className="columns is-multiline"
                style={{ marginBottom: '4em' }}
              >
                {caseStudies.map(({ node }, i) => (
                  <div
                    className="column is-6 is-mobile"
                    style={{ alignSelf: 'flex-end' }}
                  >
                    <Link to={node.fields.slug}>
                      <img
                        src={node.frontmatter.featuredImage}
                        style={{ width: '100%' }}
                      />

                      <CaseStudyMeta node={node} mobileVersion={true} />
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="section-writeup" id="home-writeup">
            <div className="container">
              <div className="columns post-single ui-grid home-featured columns-reverse-mobile">
                <div className="column is-5-tablet is-6-desktop is-6-widescreen is-6-fullhd">
                  <img src={DEMO_3} className="image-below" />
                </div>

                <div className="column is-1"></div>

                <div className="column is-3-tablet is-4-desktop is-4-widescreen is-4-fullhd">
                  <p className="secondary">
                    To effectively drive conversion, we assess every business
                    challenge through six specialized capabilities.
                  </p>

                  <Link to="/capabilities" className="button light">
                    Explore our capabilities
                  </Link>
                </div>

                <div className="column is-1"></div>
              </div>
            </div>
          </div>

          <div className="section-writeup2" id="home-writeup2">
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

                  <Link to="/thinking/one-eighty" className="button light">
                    See OneEighty streams
                  </Link>
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
                    src={ANHEUSER_BUSCH}
                    height="800"
                    width="800"
                    alt="Anheuser-Busch"
                  />
                </div>
                <div class="slide">
                  <img src={DR_OETKER} alt="Dr. Oetker" />
                </div>
                <div class="slide">
                  <img src={GENERAL_MILLS} alt="General Mills" />
                </div>
                <div class="slide">
                  <img src={GOOGLE} alt="Google" />
                </div>
                <div class="slide">
                  <img src={IG_WEALTH_MANAGEMENT} alt="IG Wealth Management" />
                </div>
                <div class="slide">
                  <img src={IMPOSSIBLE} alt="Impossible" />
                </div>
                <div class="slide">
                  <img src={KRAFT_HEINZ} alt="Kraft Heinz" />
                </div>
                <div class="slide">
                  <img src={LABATT} alt="Labatt" />
                </div>
                <div class="slide">
                  <img src={LOBLAWS} alt="Loblaws" />
                </div>
                <div class="slide">
                  <img
                    src={MACKENZIE_INVESTMENTS}
                    alt="Mackenzie Investments"
                  />
                </div>
                <div class="slide">
                  <img src={RBC} alt="RBC" />
                </div>
                <div class="slide">
                  <img src={SAMSUNG} alt="Samsung" />
                </div>
                <div class="slide">
                  <img src={SHOPPERS_DRUG_MART} alt="Shoppers Drug Mart" />
                </div>
                <div class="slide">
                  <img src={STARBUCKS} alt="Starbucks" />
                </div>
                <div class="slide">
                  <img src={TISHMAN_SPEYER} alt="Tishman Speyer" />
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
              titleEN
              titleFR
              date
              companyName
              posttype
              descriptionEN
              featuredImage
              category
            }
          }
        }
      }
    }
  }
`
