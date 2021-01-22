import React, { useState, useContext } from 'react'
import { Link, graphql, navigate } from 'gatsby'

import Layout, { LOGO_OPTIONS } from '../components/Layout'
import SEO from '../components/seo'

// Locale
import {
  getText,
  Text,
  TextDate,
  LanguageContext,
} from '../containers/Language'

import CATEGORIES from '../data/categories'

// Icons
import { BsPlayFill } from 'react-icons/bs'
import { VscChevronDown } from 'react-icons/vsc'
import { IoIosRadio } from 'react-icons/io'
import { GiBackwardTime } from 'react-icons/gi'
import { AiOutlineCalendar } from 'react-icons/ai'

import Fade from 'react-reveal/Fade'

// dates
import { isBefore, isAfter } from 'date-fns'

const ThinkingItem = ({ node, size }) => {
  const postDate = new Date(node.frontmatter.date)

  let streamStartDate = null,
    streamEndDate = null
  if (node.frontmatter.streamStartDate && node.frontmatter.streamEndDate) {
    streamStartDate = new Date(node.frontmatter.streamStartDate)
    streamEndDate = new Date(node.frontmatter.streamEndDate)
  }

  const isPastSession = isBefore(streamEndDate || postDate, new Date())
  const isLiveSession = !isPastSession && isBefore(streamStartDate, new Date())
  const isUpcomingSession =
    !isPastSession && isAfter(streamStartDate, new Date())

  const isOneEighty = node.frontmatter.category === 'oneeighty'
  const isRecap = node.frontmatter.recap === true

  let itemLink = node.fields.slug
  if (isOneEighty && !isRecap && isPastSession) {
    itemLink = itemLink + '?playVideo=true'
  }

  return (
    <Fade key={node.fields.slug} duration={300}>
      <div className={`column thinking-item ${size}`}>
        <Link to={node.fields.slug} className="cp-full-link">
          <div className="cp-image">
            <img src={node.frontmatter.featuredImage} />

            <svg
              viewBox="0 0 800 1066.67"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="800" height="1066.67" fill="#e8eceb" />
            </svg>
          </div>

          <p className="cp-title">
            <Text
              variations={{
                en: node.frontmatter.titleEN,
                fr: node.frontmatter.titleFR,
              }}
            />
          </p>
        </Link>

        <p className="cp-meta columns is-mobile">
          <span className="column is-narrow cp-category-wrapper">
            <Link to={`/thinking/${node.frontmatter.category}`}>
              <span className="cp-category">
                <Text
                  variations={CATEGORIES.thinking[node.frontmatter.category]}
                />
              </span>
            </Link>
          </span>

          {isOneEighty && !isRecap && (
            <Link to={itemLink} className="column is-narrow">
              {isPastSession && (
                <>
                  <span className="cp-play">
                    <a
                      href="/"
                      onClick={e => {
                        e.preventDefault()
                      }}
                    >
                      <span>
                        <BsPlayFill />
                      </span>
                    </a>
                  </span>

                  <span className="cp-date">
                    <span>
                      <Text tid="thinking.pastSession" />
                    </span>
                  </span>
                </>
              )}

              {isLiveSession && (
                <span className="cp-date cp-live">
                  <span>
                    <IoIosRadio />
                    <Text tid="thinking.liveSession" />
                  </span>
                </span>
              )}

              {isUpcomingSession && (
                <span className="cp-date">
                  <span>
                    <AiOutlineCalendar />
                    <Text tid="thinking.upcomingSession" />
                  </span>
                </span>
              )}

              {!isPastSession && !isLiveSession && !isUpcomingSession && (
                <span className="cp-date">
                  <span>
                    <TextDate string={node.frontmatter.date} />
                  </span>
                </span>
              )}
            </Link>
          )}

          {isOneEighty && isRecap && (
            <Link to={itemLink} className="column is-narrow">
              <span className="cp-date">
                <span>
                  <GiBackwardTime />
                  <Text tid="thinking.recap" />
                </span>
              </span>
            </Link>
          )}
        </p>
      </div>
    </Fade>
  )
}

function Thinking({ data, location }) {
  const [page, setPage] = useState(1)

  const languageContext = useContext(LanguageContext)
  const { dictionary, userLanguage } = languageContext

  const siteTitle = data.site.siteMetadata.title
  let allPosts = data.allMdx.edges

  let filter = null
  Object.keys(CATEGORIES.thinking).map(categoryKey => {
    if (location.pathname.indexOf(`thinking/${categoryKey}`) !== -1) {
      filter = categoryKey
    }
  })
  if (filter) {
    allPosts = allPosts.filter(
      post => post.node.frontmatter.category === filter
    )
  }

  const postsPerPage = 12
  const postsToShow = allPosts.slice(0, page * postsPerPage)

  const [sideNav, setSideNav] = useState(false)
  const handleSideNavToggle = e => {
    if (e) e.preventDefault()

    if (sideNav === true) {
      document.querySelector('html').style.overflowY = 'auto'
    } else {
      document.querySelector('html').style.overflowY = 'hidden'
    }

    setSideNav(!sideNav)
  }

  return (
    <Layout
      location={location}
      title={siteTitle}
      logo={LOGO_OPTIONS.orangeBlue}
      footerCTA={
        filter === 'oneeighty' ? (
          <h6>
            <Text tid="footerCTAs.oneEighty" />{' '}
            <Link to="/contact">
              <Text tid="footerCTAs.shout" />
            </Link>
          </h6>
        ) : null
      }
      HeaderExtension={
        <div className="header_extension thinking">
          <div class="bg">
            <div className="container">
              <div className="columns">
                <div className="column is-narrow">
                  <h1 class="primary heading_lg">
                    <span>
                      <Text tid="thinking.title" />
                    </span>
                  </h1>
                </div>
                <div className="column is-narrow cp-spacer"></div>
                <div className="cp-filter-wrapper">
                  <div className="cp-filter">
                    <ul>
                      <li className={filter === null ? 'active' : ''}>
                        <Link to="/thinking/">
                          <Text tid="misc.all" />
                        </Link>
                      </li>

                      {Object.keys(CATEGORIES.thinking).map(categoryKey => (
                        <li className={filter === categoryKey ? 'active' : ''}>
                          <Link to={`/thinking/${categoryKey}`}>
                            <Text
                              variations={CATEGORIES.thinking[categoryKey]}
                            />
                          </Link>
                        </li>
                      ))}
                    </ul>

                    <a
                      className="button primary"
                      href="/"
                      onClick={handleSideNavToggle}
                    >
                      {filter === null ? (
                        <Text tid="misc.all" />
                      ) : (
                        <Text variations={CATEGORIES.thinking[filter]} />
                      )}

                      <VscChevronDown />
                    </a>
                  </div>
                </div>
              </div>

              {filter === 'oneeighty' && (
                <div className="columns cp-desc">
                  <div className="column is-6 cp-spacer"></div>

                  <div className="column is-6 cp-text">
                    <p>
                      <Text tid="thinking.title.oneEightyDescription" />
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      }
    >
      <SEO title="Thinking" keywords={['Thinking']} image={null} />

      <div className={'sidenav thinking' + (sideNav ? ' open' : '')}>
        <div className="container cp-content">
          <h3>
            <Text tid="thinking.title" />
          </h3>

          <div className="links">
            <Link to={`/thinking/`} className={filter === null ? 'active' : ''}>
              <Text tid="misc.all" />
            </Link>

            {Object.keys(CATEGORIES.thinking).map(categoryKey => (
              <Link
                to={`/thinking/${categoryKey}`}
                className={filter === categoryKey ? 'active' : ''}
              >
                <Text variations={CATEGORIES.thinking[categoryKey]} />
              </Link>
            ))}
          </div>
        </div>
        <div className="close">
          <a
            href="/"
            onClick={e => {
              e.preventDefault()

              handleSideNavToggle()
            }}
          >
            <Text tid="misc.cancel" />
          </a>
        </div>
      </div>

      <div className="pages-index pages-thinking">
        <div className="section-thinking">
          <div className="container">
            <div
              className="columns post-single ui-grid"
              style={{ marginTop: '2em' }}
            >
              <div className="column is-12">
                <div className="columns is-multiline">
                  {postsToShow.map(({ node }) => (
                    <ThinkingItem
                      node={node}
                      size="is-3-widescreen is-4-desktop is-6-tablet is-12-mobile"
                    />
                  ))}
                </div>
              </div>
            </div>

            {allPosts.length > page * postsPerPage && (
              <a
                href="/"
                className="cp-load-more"
                onClick={e => {
                  e.preventDefault()

                  setPage(page + 1)
                }}
              >
                <Text tid="thinking.loadMore" />
              </a>
            )}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Thinking

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMdx(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { posttype: { eq: "thinking" } } }
    ) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date
            streamStartDate
            streamEndDate
            recap
            titleEN
            titleFR
            featuredImage
            category
          }
        }
      }
    }
  }
`
