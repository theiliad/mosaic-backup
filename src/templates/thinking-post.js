import Post from './post-base'

export default Post

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
        titleEN
        titleFR
        author
        category
        companyName
        posttype
        panel {
		  name
		  text
		  title
		  link
		  linkTitle
		  image
        }
        date
        bodyEN
        bodyFR
        descriptionEN
        descriptionFR
        featuredImage
        category
        videoID
      }
      body
    }
  }
`
