import React, { useState, useContext } from 'react'
import { Link } from 'gatsby'

import '../styles/styles.scss'

import LOGO from '../img/logo/logo.png'
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
    const { HeaderExtension } = props
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
                <Link className="navbar-item logo" to="/">
                  <img src={LOGO} />
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

export const Footer = props => (
  <>
    <footer>
      <div className="container">
        <div>Hello</div>

        <div className="columns bottom-links is-vcentered">
          <div className="column is-narrow">Instagram</div>

          <div className="column right-links">
            <div className="last">© Mosaic 2020</div>
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

          <Footer location={location} />
        </div>
      </StickyContainer>
    </div>
  )
}

export default Layout