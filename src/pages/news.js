import React from 'react'
import { Link, graphql } from 'gatsby'

import Layout from '../components/Layout'
import SEO from '../components/seo'

class News extends React.Component {
  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title
    const posts = data.allMdx.edges

    return (
      <Layout
        location={this.props.location}
        title={siteTitle}
        HeaderExtension={
          <div className="header_extension news">
            <div class="bg">
              <div className="container">
                <h1 class="primary heading_lg aligncenter">
                  <span>News</span>
                </h1>
              </div>
            </div>
          </div>
        }
      >
        <SEO
          title="TODO"
          keywords={['TODO']}
          image="https://mosaic.com/img/logo/share.jpg"
        />

        <div className="pages-index">
          <div className="section-news">
            <div className="container">
              <div className="columns post-single ui-grid">
                <div className="column is-10">
                  {posts.map(({ node }) => (
                    <Link
                      to={`news${node.fields.slug}`}
                      className="press-release columns"
                    >
                      <p className="column is-9 cp-title">
                        {node.frontmatter.titleEN}
                      </p>

                      <p className="column is-3 cp-date">
                        {node.frontmatter.date}
                      </p>
                    </Link>
                  ))}
                </div>
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
      filter: { frontmatter: { posttype: { eq: "news" } } }
    ) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            titleEN
            titleFR
          }
        }
      }
    }
  }
`
