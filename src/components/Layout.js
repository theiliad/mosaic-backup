import React, { useState, useContext, useEffect } from 'react'
import { Link } from 'gatsby'

import '../styles/styles.scss'

import { FiArrowUpRight, FiArrowRight, FiChevronDown } from 'react-icons/fi'

// Locale
import { Text, LanguageContext } from '../containers/Language'

// ICONS
import { FiInstagram } from 'react-icons/fi'
import { IoMdClose } from 'react-icons/io'
import { AiFillFacebook } from 'react-icons/ai'
import { FaLinkedin, FaInstagram, FaTwitter, FaFacebook } from 'react-icons/fa'

import ReactTooltip from 'react-tooltip'
import { StickyContainer, Sticky } from 'react-sticky'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

// Logo options
import LOGO from '../img/logo/logo.png'
import LOGO_AQUA_BLUE from '../img/logo/aqua-blue.svg'
import LOGO_DARK_BLUE from '../img/logo/blue-darkblue.svg'
import LOGO_ORANGE_BLUE from '../img/logo/orange-blue.svg'
import LOGO_WHITE_RED from '../img/logo/white-red.svg'
import LOGO_WHITE from '../img/logo/white-transparent.svg'

export const LOGO_OPTIONS = {
  aquaBlue: LOGO_AQUA_BLUE,
  darkBlue: LOGO_DARK_BLUE,
  orangeBlue: LOGO_ORANGE_BLUE,
  whiteRed: LOGO_WHITE_RED,
  white: LOGO_WHITE,
}

class Header extends React.Component {
  state = {
    scrollDir: 'up',
    whiteNav: false,
  }

  componentDidMount() {
    this.lastScrollTop = null
    document.addEventListener('scroll', this.trackScrolling)
  }

  trackScrolling = () => {
    const { scrollDir } = this.state
    if (typeof window !== 'undefined') {
      var st = window.pageYOffset || document.documentElement.scrollTop
      if (st > this.lastScrollTop) {
        if (scrollDir === 'up') {
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

      if (st === 0 && this.state.whiteNav !== false) {
        this.setState({
          ...this.state,
          whiteNav: false,
        })
      }

      this.lastScrollTop = st <= 0 ? 0 : st
    }
  }

  render() {
    const { props } = this
    const { HeaderExtension, location } = props
    const { scrollDir, whiteNav } = this.state

    return (
      <>
        <div
          className={
            'site-header' +
            (scrollDir === 'down' ? ' hidden' : '') +
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
                {location.pathname !== '/' && (
                  <Link className="navbar-item logo" to="/">
                    <img src={props.logo || LOGO_WHITE} />
                  </Link>
                )}

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

              <div id="navbarBasicExample" className="navbar-menu">
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

export const Footer = ({ footerCTA }) => (
  <>
    <footer>
      <div className="footer-content">
        <div className="container">
          {footerCTA || (
            <h6>
              <Text tid="footerCTAs.driveConversion" /> <a href="#"><Text tid="footerCTAs.letsChat" /></a>
            </h6>
          )}

          <div className="bottom-links">
            <div className="container">
              <div className="columns is-vcentered">
                <div className="column is-narrow">Instagram</div>
                <div className="column right-links">
                  <div className="last">© Mosaic 2020</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  </>
)

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
            <div className="columns is-mobile">
              <div className="column is-narrow logo-wrapper"></div>
              <div className="column close-wrapper">
                <div className="close">
                  <a
                    href="#"
                    onClick={e => {
                      e.preventDefault()

                      handleSideNavToggle()
                    }}
                  >
                    <IoMdClose />
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="container cp-content">
            <Link onClick={handleSideNavToggle} to="/">
              <img src={LOGO} />
            </Link>

            <div className="links">
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
