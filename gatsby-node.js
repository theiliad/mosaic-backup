const path = require(`path`)

const { createFilePath } = require(`gatsby-source-filesystem`)

const getNodePrefix = postType => {
  let prefix = ''
  if (postType === 'news') {
    prefix = 'news'
  } else if (postType === 'case-study') {
    prefix = 'case-studies'
  } else if (postType === 'thinking') {
    prefix = 'thinking'
  }

  return prefix
}

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  const postTemplate = path.resolve(`./src/templates/post.js`)
  return graphql(
    `
      {
        allMdx(
          sort: { fields: [frontmatter___date], order: DESC }
          limit: 1000
        ) {
          edges {
            node {
              id
              fields {
                slug
              }
              frontmatter {
                titleEN
                titleFR
                date(formatString: "MMMM DD, YYYY")
                posttype
                bodyEN
                bodyFR
                videoID
              }
              body
            }
          }
        }
      }
    `
  ).then(result => {
    if (result.errors) {
      throw result.errors
    }

    // Create blog posts pages.
    const posts = result.data.allMdx.edges

    posts.forEach((post, index) => {
      const postType = post.node.frontmatter.posttype

      //   if (postType === 'news') {
      const previous = index === posts.length - 1 ? null : posts[index + 1].node
      const next = index === 0 ? null : posts[index - 1].node

      const prefix = getNodePrefix(postType)
      createPage({
        path: post.node.fields.slug,
        component: postTemplate,
        context: {
          slug: post.node.fields.slug,
          previous,
          next,
        },
      })
      //   }
    })
  })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `Mdx`) {
    const value = createFilePath({ node, getNode })

    const postType = node.frontmatter.posttype
    const prefix = getNodePrefix(postType)

    console.log('prefix + value', prefix + value)

    createNodeField({
      name: `slug`,
      node,
      value: prefix + value,
    })
  }
}

exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
  if (stage === 'build-html') {
    actions.setWebpackConfig({
      node: {
        fs: 'empty',
      },
      module: {
        rules: [
          {
            test: /react-owl-carousel/,
            use: loaders.null(),
          },
        ],
      },
    })
  } else {
    actions.setWebpackConfig({
      node: {
        fs: 'empty',
      },
    })
  }
}
