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

import Fade from 'react-reveal/Fade'

// dates
import { isBefore } from 'date-fns'

const ThinkingItem = ({ node, size }) => {
  const postDate = new Date(node.frontmatter.date)
  const isPastSession = isBefore(postDate, new Date())
  const isOneEighty = node.frontmatter.category === 'one-eighty'

  return (
    <Fade key={node.fields.slug} duration={300}>
      <div className={`column thinking-item ${size}`}>
        <Link to={node.fields.slug}>
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

          <p className="cp-meta columns is-mobile">
            {isPastSession && isOneEighty && (
              <span className="column is-narrow cp-play">
                <p>
                  <a
                    href="#"
                    onClick={e => {
                      e.preventDefault()
                    }}
                  >
                    <span>
                      <BsPlayFill />
                    </span>
                  </a>
                </p>
              </span>
            )}
            <span className="column is-narrow">
              <span className="cp-category">
                <Text
                  variations={CATEGORIES.thinking[node.frontmatter.category]}
                />
              </span>
            </span>

            {isOneEighty && (
              <span className="column cp-date">
                <span>
                  {isPastSession && isOneEighty ? (
                    <Text tid="thinking.pastSession" />
                  ) : (
                    <TextDate string={node.frontmatter.date} />
                  )}
                </span>
              </span>
            )}
          </p>
        </Link>
      </div>
    </Fade>
  )
}

function Thinking({ data, location }) {
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

  return (
    <Layout
      location={location}
      title={siteTitle}
      logo={LOGO_OPTIONS.orangeBlue}
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

                    <div className="select">
                      <select
                        onChange={e => {
                          const filterTo = e.target.value

                          navigate(`/thinking/${filterTo}`)
                        }}
                      >
                        <option value="" selected={filter === null}>
                          {getText({
                            tid: 'misc.all',
                            dictionary,
                            userLanguage,
                          })}
                        </option>
                        {Object.keys(CATEGORIES.thinking).map(categoryKey => (
                          <option
                            value={categoryKey}
                            selected={filter === categoryKey}
                          >
                            {getText({
                              variations: CATEGORIES.thinking[categoryKey],
                              dictionary,
                              userLanguage,
                            })}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {filter === 'one-eighty' && (
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

      <div className="pages-index pages-thinking">
        <div className="section-thinking">
          <div className="container">
            <div
              className="columns post-single ui-grid"
              style={{ marginTop: '2em' }}
            >
              <div className="column is-12">
                <div className="columns is-multiline">
                  {allPosts.map(({ node }) => (
                    <ThinkingItem node={node} size="is-one-third" />
                  ))}
                </div>
              </div>
            </div>

            <a href="#" className="cp-load-more">
              <Text tid="thinking.loadMore" />
            </a>
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
