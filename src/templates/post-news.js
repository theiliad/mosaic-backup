import React from 'react'
import { Link, graphql } from 'gatsby'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import { MDXProvider } from '@mdx-js/react'
import MDX from '@mdx-js/runtime'

import Layout from '../components/Layout'
import SEO from '../components/seo'

class BlogPostTemplate extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const post = this.props.data.mdx
    const { frontmatter } = post
    const siteTitle = this.props.data.site.siteMetadata.title

    const { data } = this.props
    const posts = data.allMdx.edges

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO
          title={frontmatter.title}
          image={`https://mosaic.com${frontmatter.shareImage ||
            frontmatter.featuredImage}`}
        />

        <div className="post-single-heading">
          <div className="container aligncenter">
            <div className="columns post-single ui-grid">
              <div className="column is-10">
                <h1 className="primary heading_lg">{frontmatter.title}</h1>

                <p className="cp-date">{frontmatter.date}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="post-body content">
            <div className="columns post-single ui-grid">
              <div className="column is-10">
                {/* <MDXProvider>
                  <MDXRenderer>{post.frontmatter.bodyFR}</MDXRenderer>
                </MDXProvider> */}

                <MDX>
                  {post.frontmatter.bodyFR}
                </MDX>
              </div>
            </div>
          </div>
        </div>

        <div className="pages-index related-posts">
          <div className="section-pressreleases">
            <div className="container">
              <div className="aligncenter">
                <h5>You may also be interested in</h5>
              </div>
              <div className="columns post-single ui-grid">
                <div className="column is-10">
                  {posts.slice(0, 3).map(({ node }) => (
                    <Link
                      to={node.fields.slug}
                      className="press-release columns"
                    >
                      <p className="column is-9 cp-title">
                        {node.frontmatter.title}
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

export default BlogPostTemplate

export const pageQuery = graphql`
  query($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    mdx(fields: { slug: { eq: $slug } }) {
      fields {
        slug
      }
      id
      excerpt(pruneLength: 160)
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        bodyEN
        bodyFR
      }
      body
    }
    allMdx(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: {
        frontmatter: { posttype: { eq: "press" } }
        fields: { slug: { ne: $slug } }
      }
    ) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
          }
        }
      }
    }
  }
`
