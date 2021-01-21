import React from 'react'
import { Link, graphql } from 'gatsby'

import Layout, { LOGO_OPTIONS } from '../components/Layout'
import SEO from '../components/seo'

// Locale
import { Text, TextDate } from '../containers/Language'

class News extends React.Component {
  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title
    const posts = data.allMdx.edges

    return (
      <Layout
        location={this.props.location}
        title={siteTitle}
        logo={LOGO_OPTIONS.aquaBlue}
        footerCTA={
          <>
            <h6>
              <Text tid="footerCTAs.joinTheTeam" />{' '}
              <a
                href="https://www.mosaicjobs.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Text tid="footerCTAs.viewOpenRoles" />
              </a>
            </h6>
          </>
        }
        HeaderExtension={
          <div className="header_extension news">
            <div class="bg">
              <div className="container">
                <h1 class="primary heading_lg">
                  <span>
                    <Text tid="news.title" />
                  </span>
                </h1>
              </div>
            </div>
          </div>
        }
      >
        <SEO title="TODO" keywords={['TODO']} image={null} />

        <div className="pages-news">
          <div className="section-news">
            <div className="container">
              {posts.map(({ node }) => (
                <Link to={node.fields.slug} className="press-release columns">
                  <p className="column is-9 cp-title">
                    <Text
                      variations={{
                        en: node.frontmatter.titleEN,
                        fr: node.frontmatter.titleFR,
                      }}
                    />
                  </p>

                  <p className="column is-3 cp-date">
                    <TextDate string={node.frontmatter.date} />
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </Layout>
    )
  }
}

export default News

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMdx(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { posttype: { eq: "news" } } }
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
          }
        }
      }
    }
  }
`
