import Post from './post-base'
import { graphql } from 'gatsby'

export default Post

export const pageQuery = graphql`
  query ($slug: String!) {
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
        titleEN
        titleFR
        author
        category
        companyName
        posttype
        date
        bodyEN
        bodyFR
        descriptionEN
        descriptionFR
        featuredImage {
          childImageSharp {
            gatsbyImageData(placeholder: BLURRED, formats: [AUTO, WEBP, AVIF])
          }
        }
        category
        primaryVideoVimeoID
        primaryVideoLocalURL
        secondaryVideoVimeoID
        secondaryVideoIMG
      }
      body
    }
  }
`
