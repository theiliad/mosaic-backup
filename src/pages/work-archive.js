import React from 'react'

import { Link, graphql } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'

import Layout, { LOGO_OPTIONS } from '../components/Layout'
import SEO from '../components/seo'

import { CaseStudyMeta } from './index'

// Lodash
import { get, chunk } from 'lodash-es'

// Locale
import { Text } from '../containers/Language'

class News extends React.Component {
  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title

    const caseStudies = get(data, 'allMdx.group[0].edges')

    return (
      <Layout
        location={this.props.location}
        title={siteTitle}
        logo={LOGO_OPTIONS.aquaBlue}
        HeaderExtension={
          <div className="header_extension news">
            <div class="bg">
              <div className="container">
                <h1 class="primary heading_lg">
                  <span>
                    <Text tid="pages.workArchive.title" />
                  </span>
                </h1>
              </div>
            </div>
          </div>
        }
      >
        <SEO title="TODO" keywords={['TODO']} image={null} />

        <div className="pages-index">
          <div className="section-cases" style={{ marginTop: '3em' }}>
            <div className="container">
              <div className="columns is-multiline">
                {caseStudies.map(({ node }, i) => {
                  const image = getImage(node.frontmatter.featuredImage)

                  return (
                    <div className="column is-6">
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
      filter: { frontmatter: { posttype: { eq: "case-study" } } }
    ) {
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
              contentEN
              contentFR
              date
              companyName
              posttype
              descriptionEN
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
