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
        videoID
        panel {
          name
          textEN
          textFR
          titleEN
          titleFR
          linkedin
          image
        }
        sponsors {
          image
          alt
        }
        moderator {
          name
          textEN
          textFR
          titleEN
          titleFR
          linkedin
          image
        }
        date
        streamStartDate
        streamEndDate
        recap
        reminderURL
        bodyEN
        bodyFR
        descriptionEN
        descriptionFR
        featuredImage {
          childImageSharp {
            gatsbyImageData(placeholder: BLURRED, formats: [AUTO, WEBP, AVIF])
          }
        }
        shareImage {
          childImageSharp {
            gatsbyImageData(placeholder: BLURRED, formats: [AUTO, WEBP, AVIF])
          }
        }
        category
        videoID
      }
      body
    }
  }
`
