import React, { useState, useContext, useEffect } from 'react'
import { Link } from 'gatsby'

import '../styles/styles.scss'

// Locale
import { Text, LanguageContext } from '../containers/Language'

// ICONS
import { CgClose } from 'react-icons/cg'
import { FiArrowRight } from 'react-icons/fi'

import ReactTooltip from 'react-tooltip'
import { StickyContainer } from 'react-sticky'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

// Logo options
import LOGO_AQUA_BLUE from '../img/logo/aqua-blue.svg'
import LOGO_AQUA_MATRIX from '../img/logo/aqua-matrix.svg'
import LOGO_BLUE_MIDNIGHT from '../img/logo/blue-midnight.svg'
import LOGO_ORANGE_BLUE from '../img/logo/orange-blue.svg'
import LOGO_WHITE_RED from '../img/logo/white-red.svg'
import LOGO_WHITE_OUTLINE from '../img/logo/white-outline.svg'
import LOGO_WORDMARK from '../img/logo/white-wordmark.svg'

export const LOGO_OPTIONS = {
  aquaBlue: LOGO_AQUA_BLUE,
  blueMidnight: LOGO_BLUE_MIDNIGHT,
  orangeBlue: LOGO_ORANGE_BLUE,
  whiteRed: LOGO_WHITE_RED,
  white: LOGO_WHITE_OUTLINE,
}

export const HOMEPAGE_NAV_HIDE_THRESHOLD = 450

export const SOCIAL_LINKS = [
  {
    name: 'Facebook',
    href: 'https://facebook.com/mosaic',
  },
  {
    name: 'Instagram',
    href: 'https://instagram.com/mosaicna',
  },
  {
    name: 'LinkedIn',
    href:
      'https://www.linkedin.com/company/mosaic-sales-solutions?trk=tyah&trkInfo=tarId%3A1414520343515%2Ctas%3Amosaic%2Cidx%3A3-2-10',
  },
]

class Header extends React.Component {
  state = {
    scrollDir: 'up',
    whiteNav: false,
  }

  componentDidMount() {
    this.lastScrollTop = null
    document.addEventListener('scroll', this.trackScrolling)

    if (typeof window !== 'undefined') {
      window.addEventListener('resize', this.trackScrolling)
    }
  }

  trackScrolling = () => {
    const { scrollDir } = this.state
    const isHomepage = this.props.location.pathname === '/'

    if (typeof window !== 'undefined') {
      const st = window.pageYOffset || document.documentElement.scrollTop
      if (st > this.lastScrollTop) {
        if (
          scrollDir === 'up' &&
          (!isHomepage || st > HOMEPAGE_NAV_HIDE_THRESHOLD)
        ) {
          this.setState({
            ...this.state,
            scrollDir: 'down',
          })
        }
      } else {
        if (scrollDir === 'down') {
          this.setState({
            ...this.state,
            scrollDir: 'up',
          })
        }
      }

      if (st > 0 && this.state.whiteNav === false) {
        this.setState({
          ...this.state,
          whiteNav: true,
        })
      }

      if (
        ((isHomepage && st < HOMEPAGE_NAV_HIDE_THRESHOLD + 300) ||
          (!isHomepage && st < 150)) &&
        this.state.whiteNav !== false
      ) {
        this.setState({
          ...this.state,
          whiteNav: false,
        })
      }

      const siteLogoElement = document.getElementById('cp_site_logo')
      if (isHomepage && st <= HOMEPAGE_NAV_HIDE_THRESHOLD) {
        siteLogoElement.style.opacity = 0
      } else {
        siteLogoElement.style.opacity = 1
      }

      this.lastScrollTop = st <= 0 ? 0 : st
    }
  }

  render() {
    const { props } = this
    const { HeaderExtension, location, navIdleLight } = props
    const { scrollDir, whiteNav } = this.state

    const isHomepage = location.pathname === '/'

    let st = 0
    if (typeof window !== 'undefined') {
      st = window.pageYOffset || document.documentElement.scrollTop
    }

    return (
      <>
        <div
          className={
            'site-header' +
            (navIdleLight ? ' idle-light' : '') +
            // (scrollDir === 'down' ? ' hidden' : '') +
            (whiteNav === true ? ' white' : '')
          }
        >
          <div className="container">
            <nav
              className="navbar"
              role="navigation"
              aria-label="main navigation"
            >
              <div className="navbar-brand">
                <Link className="navbar-item logo" to="/">
                  <img
                    src={
                      props.logo ||
                      (navIdleLight && whiteNav
                        ? LOGO_ORANGE_BLUE
                        : LOGO_ORANGE_BLUE)
                    }
                    id="cp_site_logo"
                    style={{
                      opacity:
                        isHomepage && st <= HOMEPAGE_NAV_HIDE_THRESHOLD ? 0 : 1,
                    }}
                  />
                </Link>

                <a
                  role="button"
                  className="navbar-burger burger"
                  aria-label="menu"
                  aria-expanded="false"
                  onClick={this.props.handleSideNavToggle}
                >
                  <span aria-hidden="true"></span>
                  <span aria-hidden="true"></span>
                </a>
              </div>

              <div className="navbar-menu">
                <div className="navbar-start"></div>

                <div className="navbar-end">
                  <Link className="navbar-item link" to="/capabilities">
                    <Text tid="navigation.items.capabilities" />
                  </Link>

                  <Link className="navbar-item link" to="/thinking">
                    <Text tid="navigation.items.thinking" />
                  </Link>

                  <Link className="navbar-item link" to="/news">
                    <Text tid="navigation.items.news" />
                  </Link>

                  <Link className="navbar-item link" to="/careers">
                    <Text tid="navigation.items.careers" />
                  </Link>

                  <Link className="navbar-item link" to="/contact">
                    <Text tid="navigation.items.contact" />
                  </Link>
                </div>
              </div>
            </nav>
          </div>
        </div>

        {HeaderExtension}
      </>
    )
  }
}

export const Footer = ({ footerCTA }) => {
  const { userLanguage, changeUserLanguage } = useContext(LanguageContext)

  return (
    <>
      <footer>
        <div className="footer-content">
          <div className="container">
            {footerCTA || (
              <h6>
                <Text tid="footerCTAs.driveConversion" />{' '}
                <Link to="/contact">
                  <Text tid="footerCTAs.letsChat" /> <FiArrowRight />
                </Link>
              </h6>
            )}

            <div className="bottom-links">
              <div className="container">
                <div className="columns is-vcentered">
                  <div className="column is-narrow cp-mobile">
                    <div className="columns">
                      {SOCIAL_LINKS.map(footerSocialLink => (
                        <div className="column is-narrow">
                          <a
                            href={footerSocialLink.href}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {footerSocialLink.name}
                          </a>
                        </div>
                      ))}
                    </div>
                  </div>

                  {SOCIAL_LINKS.map(footerSocialLink => (
                    <div className="column is-narrow cp-wide">
                      <a
                        href={footerSocialLink.href}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {footerSocialLink.name}
                      </a>
                    </div>
                  ))}

                  <div className="column right-links">
                    <div className="last">© Mosaic 2020</div>
                    <div className="cp-lang-switcher">
                      <a
                        className={
                          'cp-lang-switcher ' +
                          (userLanguage === 'en' ? 'active' : '')
                        }
                        onClick={e => {
                          changeUserLanguage('en')
                        }}
                      >
                        EN
                      </a>{' '}
                      /{' '}
                      <a
                        className={
                          'cp-lang-switcher ' +
                          (userLanguage === 'fr' ? 'active' : '')
                        }
                        onClick={e => {
                          changeUserLanguage('fr')
                        }}
                      >
                        FR
                      </a>
                    </div>
                    <div>
                      <Link to="/accessibility">
                        <Text tid="navigation.footer.accessibility" />
                      </Link>
                    </div>
                    <div>
                      <Link to="/terms-of-use">
                       <Text tid="navigation.footer.termsOfUse" />
                      </Link>
                    </div>
                    <div>
                      <Link to="/privacy-policy">
                       <Text tid="navigation.footer.privacyPolicy" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}

const Layout = props => {
  const { children, location } = props

  const [sideNav, setSideNav] = useState(false)

  const handleSideNavToggle = () => {
    if (sideNav === true) {
      document.querySelector('html').style.overflowY = 'auto'
    } else {
      document.querySelector('html').style.overflowY = 'hidden'
    }

    setSideNav(!sideNav)
  }

  let showGrid = false
  if (
    typeof window !== `undefined` &&
    window &&
    window.location &&
    window.location.search === '?grid=true'
  ) {
    showGrid = true
  }

  const { userLanguage, changeUserLanguage } = useContext(LanguageContext)

  const isBottom = el =>
    getVerticalCenterPositionOfElement(el) <= window.innerHeight

  useEffect(() => {
    document.addEventListener('scroll', trackScrolling)
    trackScrolling()

    // returned function will be called on component unmount
    return () => {
      document.removeEventListener('scroll', trackScrolling)
      document.body.style.backgroundColor = '#fff'
    }
  }, [])

  const trackScrolling = () => {
    handlePageBGColor()
  }

  const getVerticalCenterPositionOfElement = element =>
    element.getBoundingClientRect().bottom -
    (element.getBoundingClientRect().bottom -
      element.getBoundingClientRect().top) /
      2

  const handlePageBGColor = () => {
    const { backgroundColorsOnScroll } = props

    if (backgroundColorsOnScroll) {
      const divsWithBackgroundColors = Object.keys(
        backgroundColorsOnScroll
      ).map(divID => ({
        color: backgroundColorsOnScroll[divID],
        element: document.getElementById(divID),
      }))

      divsWithBackgroundColors.forEach(div =>
        div.element.classList.remove('scroll-focused')
      )

      const scrolledElements = divsWithBackgroundColors.filter(div =>
        isBottom(div.element)
      )

      if (scrolledElements.length > 0) {
        const matchingElement = scrolledElements[scrolledElements.length - 1]

        const verticalCenterOfElement = getVerticalCenterPositionOfElement(
          matchingElement.element
        )

        if (verticalCenterOfElement < 0) {
          document.body.style.backgroundColor = '#fff'
          return
        }

        const secondaryColor = matchingElement.color || 'black'
        document.body.style.backgroundColor = secondaryColor

        matchingElement.element.classList.add('scroll-focused')
      } else {
        document.body.style.backgroundColor = '#fff'
      }
    }
  }

  return (
    <div className="app-wrapper">
      <div className="fr-toggle">
        <a
          className="button"
          style={{
            position: 'fixed',
            right: 0,
            bottom: 0,
            zIndex: 100000000,
            borderRadius: 0,
          }}
          onClick={e => {
            changeUserLanguage(userLanguage === 'en' ? 'fr' : 'en')
          }}
        >
          {(userLanguage === 'en' ? 'fr' : 'en').toUpperCase()}
        </a>
      </div>

      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      <StickyContainer>
        <div className={'sidenav' + (sideNav ? ' open' : '')}>
          <div className="container">
            <div className="columns is-mobile is-vcentered">
              <div className="column is-narrow logo-wrapper">
                <Link onClick={handleSideNavToggle} to="/">
                  <img src={LOGO_WORDMARK} />
                </Link>
              </div>

              <div className="column close-wrapper">
                <div className="close">
                  <a
                    href="/"
                    onClick={e => {
                      e.preventDefault()

                      handleSideNavToggle()
                    }}
                  >
                    <CgClose />
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="container cp-content">
            <div className="cp-spacer"></div>

            <div className="links">
              <Link to={`/`} onClick={handleSideNavToggle}>
                <Text tid="navigation.items.home" />
              </Link>

              <Link to={`/capabilities`} onClick={handleSideNavToggle}>
                <Text tid="navigation.items.capabilities" />
              </Link>

              <Link to={`/thinking`} onClick={handleSideNavToggle}>
                <Text tid="navigation.items.thinking" />
              </Link>

              <Link to={`/news`} onClick={handleSideNavToggle}>
                <Text tid="navigation.items.news" />
              </Link>

              <Link to={`/careers`} onClick={handleSideNavToggle}>
                <Text tid="navigation.items.careers" />
              </Link>

              <Link to={`/contact`} onClick={handleSideNavToggle}>
                <Text tid="navigation.items.contact" />
              </Link>

              <div className="social-links">
                {SOCIAL_LINKS.map(footerSocialLink => (
                  <a
                    href={footerSocialLink.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {footerSocialLink.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className={'app-container' + (sideNav ? ' sidenav-open' : '')}>
          <div className="overlay" onClick={handleSideNavToggle}></div>

          {showGrid && (
            <div className="grid-overlay container">
              <div className="columns">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(() => (
                  <div className="column">
                    <span></span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <ReactTooltip place="top" type="dark" effect="solid" />

          <Header handleSideNavToggle={handleSideNavToggle} {...props} />

          {children}

          <Footer location={location} {...props} />
        </div>
      </StickyContainer>
    </div>
  )
}

export default Layout
