import React from 'react'
import { Link, graphql } from 'gatsby'

import Layout from '../components/Layout'
import SEO from '../components/seo'
import Carousel from '../components/Carousel'

// Locale
import { Text } from '../containers/Language'

// Lodash
import { get, chunk } from 'lodash-es'

import CATEGORIES from '../data/categories'

// Assets
import LOGO_WHITE from '../img/logo/white-transparent.svg'
import DEMO_3 from '../img/demo/3.jpg'
import HOME_HERO from '../img/home/hero.jpg'
import HOME_CAPABILITIES from '../img/home/capabilities.jpg'
import HOME_ONEEIGHTY from '../img/home/oneeighty.jpg'

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

// Home logos
import HOME_LOGO_AQUABLUE from '../img/logo/animated/aqua-blue.svg'
import HOME_LOGO_ORANGEBLUE from '../img/logo/animated/orange-blue.svg'
import HOME_LOGO_REDMATRIX from '../img/logo/animated/red-matrix.svg'
import HOME_LOGO_WHITEMATRIX from '../img/logo/animated/white-matrix.svg'
import HOME_LOGO_WHITEOUTLINE from '../img/logo/animated/white-outline.svg'
import HOME_LOGO_WHITERED from '../img/logo/animated/white-red.svg'

// d3
import { scaleLinear } from 'd3-scale'

import { HOMEPAGE_NAV_HIDE_THRESHOLD } from '../components/Layout'

const HOME_ANIMATED_LOGOS = [
  HOME_LOGO_AQUABLUE,
  HOME_LOGO_ORANGEBLUE,
  HOME_LOGO_REDMATRIX,
  HOME_LOGO_WHITEMATRIX,
  HOME_LOGO_WHITEOUTLINE,
  HOME_LOGO_WHITERED,
]
const updateLogos = () => {
  const heroLogoElement = document.getElementById('cp_hero_logo')
  if (heroLogoElement) {
    const currentLogoIndex = HOME_ANIMATED_LOGOS.indexOf(heroLogoElement.src)
    const nextLogoIndex =
      currentLogoIndex < HOME_ANIMATED_LOGOS.length - 1
        ? currentLogoIndex + 1
        : 0

    heroLogoElement.src = HOME_ANIMATED_LOGOS[nextLogoIndex]
  }
}

export const CaseStudyMeta = ({ node, mobileVersion }) => (
  <>
    <div className={'columns' + (mobileVersion ? ' is-mobile' : '')}>
      <div className="column is-8">
        <p className="cp-company">{node.frontmatter.companyName}</p>

        <p className="cp-project">
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

    if (typeof window !== 'undefined') {
      window.addEventListener('resize', this.trackScrolling)
    }

    this.updateLogosIntervalID = setInterval(updateLogos, 400)
  }

  componentWillUnmount() {
    document.removeEventListener('scroll', this.trackScrolling)

    if (typeof window !== 'undefined') {
      window.removeEventListener('resize', this.trackScrolling)
    }

    clearInterval(this.updateLogosIntervalID)
  }

  trackScrolling() {
    const isBrowser = typeof window !== `undefined`

    if (isBrowser) {
      const heroElement = document.getElementById('cp_hero')

      const scale = scaleLinear()
        .domain([0, 400]) // Mouse y scroll positions
        .range([1, 0.263]) // Scale sizes

      const heroLogoElement = document.getElementById('cp_hero_logo')
      const hiddenHeroLogoElement = document.getElementById(
        'cp_hero_logo_hidden'
      )
      const siteLogoElement = document.getElementById('cp_site_logo')

      if (heroLogoElement && hiddenHeroLogoElement && siteLogoElement) {
        const hiddenLogoTopDistance = hiddenHeroLogoElement.getBoundingClientRect()
          .top
        const siteLogoTopDistance = siteLogoElement.getBoundingClientRect().top

        const st = window.pageYOffset || document.documentElement.scrollTop
        if (heroLogoElement && hiddenHeroLogoElement) {
          let heroLogoElementTop
          if (st >= scale.domain()[1]) {
            heroLogoElement.style.top = siteLogoTopDistance + 'px'
          } else {
            const computedTopValue =
              (1 - st / scale.domain()[1]) * hiddenLogoTopDistance +
              siteLogoTopDistance

            let topValue
            //   if (computedTopValue < siteLogoTopDistance) {
            //     topValue = siteLogoTopDistance
            //   } else if (computedTopValue > hiddenLogoTopDistance) {
            //     topValue = hiddenLogoTopDistance
            //   } else {
            //     topValue = computedTopValue
            //   }

			// The "* 1.5" bit adds some elastic easing to the animation
            // Can remove for a more subtle effect
            topValue = Math.max(
              Math.min(computedTopValue * 1.5, hiddenLogoTopDistance),
              siteLogoTopDistance
            )

            // console.log("top", topValue)

            heroLogoElement.style.top = topValue + 'px'

            //   console.log(st / scale.domain()[1])
            //   heroLogoElement.style.top =
            //     Math.max(
            //       hiddenLogoTopDistance,
            //       siteLogoTopDistance +
            //         (1 - st / scale.domain()[1]) * hiddenLogoTopDistance
            //     ) + 'px'
          }
          // heroLogoElement.style.top = `${Math.max(
          //   hiddenLogoTopDistance,
          //   siteLogoTopDistance
          // )}px`

          heroLogoElement.style.transform = `scale(${Math.max(
            scale(window.scrollY),
            scale.range()[1]
          )})`

          // Adds some elastic easing to the animation
          // Can remove for a more subtle effect
          hiddenHeroLogoElement.style.transform = `scale(${Math.min(
            Math.max(scale(window.scrollY), scale.range()[1]) * 1.3,
            1
          )})`

          heroLogoElement.style.transformOrigin = 'left top'

          heroLogoElement.style.opacity =
            st > HOMEPAGE_NAV_HIDE_THRESHOLD ? 0 : 1
        }
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
                <img src={HOME_LOGO_AQUABLUE} id="cp_hero_logo" />
                <img src={HOME_LOGO_AQUABLUE} id="cp_hero_logo_hidden" />

                <div className="container">
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
                  <img src={HOME_CAPABILITIES} className="image-below" />
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

                  <Link to="/thinking/oneeighty" className="button light">
                    See OneEighty streams
                  </Link>
                </div>

                <div className="column is-1"></div>

                <div className="column is-5-tablet is-6-desktop is-6-widescreen is-6-fullhd">
                  <img src={HOME_ONEEIGHTY} className="image-below" />
                </div>
              </div>
            </div>
          </div>

          <div className="section-partners">
            <div className="container">
              <h3>Our partners</h3>
            </div>

            <Carousel
              slides={[
                {
                  src: null,
                  alt: null,
                },
                {
                  src: ANHEUSER_BUSCH,
                  alt: 'Anheuser-Busch',
                },
                { src: DR_OETKER, alt: 'Dr. Oetker' },
                { src: GENERAL_MILLS, alt: 'General Mills' },
                { src: GOOGLE, alt: 'Google' },
                { src: IG_WEALTH_MANAGEMENT, alt: 'IG Wealth Management' },
                { src: IMPOSSIBLE, alt: 'Impossible' },
                { src: KRAFT_HEINZ, alt: 'Kraft Heinz' },
                { src: LABATT, alt: 'Labatt' },
                { src: LOBLAWS, alt: 'Loblaws' },
                { src: MACKENZIE_INVESTMENTS, alt: 'Mackenzie Investments' },
                { src: RBC, alt: 'RBC' },
                { src: SAMSUNG, alt: 'Samsung' },
                { src: SHOPPERS_DRUG_MART, alt: 'Shoppers Drug Mart' },
                { src: STARBUCKS, alt: 'Starbucks' },
                { src: TISHMAN_SPEYER, alt: 'Tishman Speyer' },
                {
                  src: null,
                  alt: null,
                },
              ]}
            />
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
