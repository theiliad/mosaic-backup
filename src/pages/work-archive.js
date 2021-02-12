import React from 'react'
import { Link, graphql } from 'gatsby'

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

    const caseStudies = get(data, "allMdx.group[0].edges")

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
          <div className="section-cases">
            <div className="container cp-wide" style={{ marginTop: "3em" }}>
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
                      <Link to={`/${node.fields.slug}`}>
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
                      <Link to={`/${node.fields.slug}`}>
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
                    <Link to={`/${node.fields.slug}`}>
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
