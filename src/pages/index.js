import React, { useContext } from 'react'
import { Link, graphql } from 'gatsby'

import { StaticImage } from 'gatsby-plugin-image'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'

import ReactPlayer from 'react-player'

import Layout from '../components/Layout'
import SEO from '../components/seo'
import Carousel from '../components/Carousel'

// Locale
import { LanguageContext, Text } from '../containers/Language'

// Lodash
import { get } from 'lodash-es'

import CATEGORIES from '../data/categories'

// icons
import { FiArrowRight } from 'react-icons/fi'

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
// import HOME_LOGO_AQUABLUE from '../img/logo/aqua-blue.svg'
// import HOME_LOGO_ORANGEBLUE from '../img/logo/orange-blue.svg'
import HOME_LOGO_AQUAMIDNIGHT from '../img/logo/aqua-midnight.svg'
import HOME_LOGO_ORANGEMIDNIGHT from '../img/logo/orange-midnight.svg'
import HOME_LOGO_REDMATRIX from '../img/logo/red-matrix.svg'
import HOME_LOGO_WHITEMATRIX from '../img/logo/white-matrix.svg'
import HOME_LOGO_WHITEOUTLINE from '../img/logo/white-outline.svg'
import HOME_LOGO_WHITERED from '../img/logo/white-red.svg'

// d3
import { scaleLinear } from 'd3-scale'

import { HOMEPAGE_NAV_HIDE_THRESHOLD } from '../components/Layout'

const HOME_ANIMATED_LOGOS = [
  // { name: 'aquablue', src: HOME_LOGO_AQUABLUE },
  // { name: 'orangeblue', src: HOME_LOGO_ORANGEBLUE },
  // { name: 'aquamidnight', src: HOME_LOGO_AQUAMIDNIGHT },
  { name: 'orangemidnight', src: HOME_LOGO_ORANGEMIDNIGHT },
  { name: 'redmatrix', src: HOME_LOGO_REDMATRIX },
  { name: 'whitematrix', src: HOME_LOGO_WHITEMATRIX },
  { name: 'whiteoutline', src: HOME_LOGO_WHITEOUTLINE },
  { name: 'whitered', src: HOME_LOGO_WHITERED },
]
const updateLogos = () => {
  const heroLogoElement = document.getElementById('cp_hero_logo')
  if (heroLogoElement) {
    const currentLogoIndex = HOME_ANIMATED_LOGOS.findIndex(
      (logo) => logo.name === heroLogoElement.getAttribute('data-lname')
    )
    const nextLogoIndex =
      currentLogoIndex < HOME_ANIMATED_LOGOS.length - 1
        ? currentLogoIndex + 1
        : 0

    heroLogoElement.src = HOME_ANIMATED_LOGOS[nextLogoIndex].src
    heroLogoElement.setAttribute(
      'data-lname',
      HOME_ANIMATED_LOGOS[nextLogoIndex].name
    )
  }
}

export const CaseStudyMeta = ({ node, mobileVersion }) => {
  console.log(node.frontmatter)

  return (
    <>
      <div className="cp-meta columns is-mobile">
        <div className="column is-8">
          <p className="cp-company">{node.frontmatter.companyName}</p>

          <p className="cp-project">
            <Text
              variations={{
                en: node.frontmatter.titleEN,
                fr: node.frontmatter.titleFR,
              }}
            />

            <div className="column columns is-12">
              <p className="cp-description">
                <Text
                  variations={{
                    en: node.frontmatter.descriptionEN,
                    fr: node.frontmatter.descriptionFR,
                  }}
                />
              </p>
            </div>
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
}

const HomeHead = () => {
  const languageContext = useContext(LanguageContext)
  const { userLanguage } = languageContext

  return (
    <SEO
      title={userLanguage === 'fr' ? 'Accueil' : 'Home'}
      description={
        userLanguage === 'fr'
          ? 'Mosaic est une agence de marketing intégrée qui a des bureaux partout en Amérique du Nord. Nous bâtissons des marques en dimension en utilisant la créativité pour stimuler la conversion'
          : 'Mosaic is an integrated marketing agency with offices across North America. We build brands in dimension by using creativity to drive conversion'
      }
    />
  )
}

class BlogIndex extends React.Component {
  componentDidMount() {
    document.addEventListener('scroll', this.trackScrolling, { passive: true })

    if (typeof window !== 'undefined') {
      window.addEventListener('resize', this.trackScrolling, { passive: true })
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
        const hiddenLogoTopDistance =
          hiddenHeroLogoElement.getBoundingClientRect().top
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

          const heroLogoElementOpacity =
            st > HOMEPAGE_NAV_HIDE_THRESHOLD ? 0 : 1
          heroLogoElement.style.opacity = heroLogoElementOpacity
          if (heroLogoElementOpacity === 0) {
            heroLogoElement.style.visibility = 'hidden'
          } else {
            heroLogoElement.style.visibility = 'visible'
          }
        }
      }
    }
  }

  render() {
    const { data } = this.props

    const siteTitle = data.site.siteMetadata.title

    const caseStudies =
      data.allMdx.group.find(
        (group) =>
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
            <ReactPlayer
              url="/hero.mp4"
              playing
              loop
              muted
              width="100%"
              height="75vh"
              className="cp-hero_video"
            />

            <div className="bg">
              <div className="cp-hero" id="cp_hero">
                <img
                  src={HOME_LOGO_AQUAMIDNIGHT}
                  id="cp_hero_logo"
                  alt="Mosaic logo"
                />
                <img
                  src={HOME_LOGO_AQUAMIDNIGHT}
                  id="cp_hero_logo_hidden"
                  alt="Mosaic logo"
                />

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
        <HomeHead />

        <div className="pages-index">
          {/* <StaticImage
            src={'../img/home/hero.jpg'}
            style={{ width: '100%' }}
            alt="Homepage hero"
          /> */}

          <div className="section-why">
            <div className="container">
              <div className="columns">
                <div className="column is-9 is-offset-2">
                  <h2 className="primary heading_lg">
                    <Text tid="pages.index.why.title" />
                    <div
                      className="button-wrapper"
                      style={{ marginTop: '22px' }}
                    >
                      <Link
                        to="/capabilities"
                        className="button primary"
                        style={{ fontSize: '.4em' }}
                      >
                        <Text tid="pages.index.why.buttonText" />
                        <FiArrowRight />
                      </Link>
                    </div>
                  </h2>
                </div>
              </div>
            </div>
          </div>
          <div className="section-cases">
            <div className="container">
              <div className="columns is-multiline">
                {caseStudies.map(({ node }, i) => {
                  const image = getImage(node.frontmatter.featuredImage)

                  return (
                    <div className="column is-6 capa">
                      <Link
                        to={`/${node.fields.slug}`}
                        className="cp-photo"
                        style={{ alignSelf: 'flex-end' }}
                      >
                        <GatsbyImage
                          image={image}
                          style={{ width: '100%' }}
                          alt={node.frontmatter.titleEN}
                        />

                        <svg
                          viewBox="0 0 2000 1125"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <rect width="2000" height="1125" fill="#e8eceb" />
                        </svg>
                      </Link>

                      <Link to={`/${node.fields.slug}`}>
                        <CaseStudyMeta node={node} />
                      </Link>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
          <div className="section-writeup" id="home-writeup">
            <div className="container">
              <div className="columns post-single ui-grid home-featured columns-reverse-mobile">
                <div className="column is-5-tablet is-5-desktop is-5-widescreen is-5-fullhd">
                  <StaticImage
                    src={'../img/home/capabilities.jpg'}
                    className="image-below"
                    alt="Capabilities"
                  />
                </div>

                <div className="column is-2-tablet is-2-desktop is-2-widescreen is-2-fullhd"></div>

                <div className="column is-5-tablet is-5-desktop is-5-widescreen is-5-fullhd">
                  <p className="secondary">
                    <Text tid="pages.index.capabilities.body" />
                  </p>

                  <Link to="/capabilities" className="button light">
                    <Text tid="pages.index.capabilities.cta" />
                    <FiArrowRight />
                  </Link>
                </div>
              </div>
            </div>
          </div>
          {/* <div className="section-writeup2" id="home-writeup2">
            <div className="container">
              <div className="columns post-single ui-grid home-featured columns-reverse-mobile">
                <div className="column is-6-tablet is-6-desktop is-5-widescreen is-5-fullhd">
                  <p className="secondary">
                    <Text tid="pages.index.oneEighty.body" />
                  </p>

                  <Link to="/thinking/oneeighty" className="button light">
                    <Text tid="pages.index.oneEighty.cta" />
                    <FiArrowRight />
                  </Link>
                </div>

                <div className="column is-1-tablet is-1-desktop is-2-widescreen is-2-fullhd"></div>

                <div className="column is-5-tablet is-5-desktop is-5-widescreen is-5-fullhd">
                  <StaticImage
                    src={'../img/home/oneeighty.jpg'}
                    className="image-below"
                    alt="OneEighty"
                  />
                </div>
              </div>
            </div>
          </div> */}
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
              descriptionFR
              featuredImage {
                childImageSharp {
                  gatsbyImageData(
                    placeholder: BLURRED
                    formats: [AUTO, WEBP, AVIF]
                  )
                }
              }
              category
            }
          }
        }
      }
    }
  }
`
