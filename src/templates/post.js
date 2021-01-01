import React, { useState } from 'react'
import { Link, graphql } from 'gatsby'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import { MDXProvider } from '@mdx-js/react'
import MDX from '@mdx-js/runtime'

import Layout, { LOGO_OPTIONS } from '../components/Layout'
import SEO from '../components/seo'

// Components
import { NewsPostHeader, ThinkingPostHeader, PostHeader } from './post-headers'

import YouTube from 'react-youtube'

// Locale
import { Text } from '../containers/Language'

import CATEGORIES from '../data/categories'

import DEMO_1 from '../img/demo/1.jpg'
import DEMO_2 from '../img/demo/2.jpg'
import DEMO_3 from '../img/demo/3.jpg'

// Icons
import { BsPlayFill } from 'react-icons/bs'

// Share buttons
import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
} from 'react-share'

function NewsPost(props) {
  const post = props.data.mdx
  const { frontmatter } = post
  const siteTitle = props.data.site.siteMetadata.title

  const [play, setPlay] = useState(false)

  // Type of the post
  const isNewsPost = frontmatter.posttype === 'news'
  const isThinkingPost = frontmatter.posttype === 'thinking'

  const previousPost = props.pageContext.previous

  console.log("weg", post)

  return (
    <Layout
      location={props.location}
      title={siteTitle}
      logo={LOGO_OPTIONS.orangeBlue}
      footerCTA={
        isNewsPost ? (
          <h6>
            Interested in joining the team? <a href="#">Let's chat</a>
          </h6>
        ) : null
      }
    >
      <SEO
        title={frontmatter.title}
        image={`https://mosaic.com${frontmatter.shareImage ||
          frontmatter.featuredImage}`}
      />

      <div className="post">
        {isNewsPost ? (
          <NewsPostHeader post={post} />
        ) : (
          <PostHeader post={post} play={play} setPlay={setPlay} />
        )}

        <div className="container">
          <div className="post-body content">
            <div className="columns post-single ui-grid">
              <div className="column is-8">
                {/* <MDXProvider components={{
					  English: (mProps) => {
						  console.log("Ewgewg", mProps)
						  return <MDX>{mProps.children}</MDX>
					  }
				  }}>
                  <MDXRenderer>{post.body}</MDXRenderer>
                </MDXProvider> */}

                <MDX>
                  {Text({
                    variations: {
                      en: post.frontmatter.bodyEN,
                      fr: post.frontmatter.bodyFR,
                    },
                  })}
                </MDX>
              </div>
            </div>
          </div>
        </div>

        {play && (
          <div
            className="video-overlay"
            onClick={e => {
              e.preventDefault()
              setPlay(!play)
            }}
          >
            <div className="cp-content">
              <YouTube
                videoId={post.frontmatter.videoID}
                opts={{
                  height: '100%',
                  width: '100%',
                  playerVars: {
                    // https://developers.google.com/youtube/player_parameters
                    autoplay: true,
                  },
                }}
              />
            </div>
          </div>
        )}

        <div className="share-wrapper">
          <div className="container">
            <div className="share columns">
              <div className="column is-narrow cp-title">
                <span>SHARE</span>
              </div>

              <div className="column">
                <FacebookShareButton
                  url={`https://mosaic.com/${post.fields.slug}`}
                  title={frontmatter.title}
                >
                  <button class="button is-medium">Facebook</button>
                </FacebookShareButton>
              </div>

              <div className="column">
                <TwitterShareButton
                  url={`https://mosaic.com/${post.fields.slug}`}
                  title={frontmatter.title}
                >
                  <button class="button is-medium">Twitter</button>
                </TwitterShareButton>
              </div>

              <div className="column">
                <LinkedinShareButton
                  url={`https://mosaic.com/${post.fields.slug}`}
                  title={frontmatter.title}
                >
                  <button class="button is-medium">LinkedIn</button>
                </LinkedinShareButton>
              </div>

              <div className="column">
                <button class="button is-medium">Copy link</button>{' '}
              </div>
            </div>
          </div>
        </div>

        <div className="next-project">
          <div className="cp-bg white"></div>
          <div className="cp-bg"></div>

          <div className="container">
            <Link to={previousPost.fields.slug}>
              <div
                className="columns"
                style={{
                  minHeight: isNewsPost ? '15em' : null,
                }}
              >
                {!isNewsPost && (
                  <div className="column is-narrow cp-img">
                    <img src={DEMO_2} style={{ maxWidth: 400 }} />
                  </div>
                )}

                <div className="column cp-text">
                  <div className="cp-texts">
                    <p>
                      <Text
                        tid={
                          isNewsPost
                            ? 'news.next'
                            : isThinkingPost
                            ? post.frontmatter.category === 'one-eighty'
                              ? 'thinking.next.oneEighty'
                              : 'thinking.next'
                            : 'caseStudies.next'
                        }
                      />
                    </p>
                    <h6>
                      <Text
                        variations={{
                          en: previousPost.frontmatter.titleEN,
                          fr: previousPost.frontmatter.titleFR,
                        }}
                      />
                    </h6>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default NewsPost

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
        category
        companyName
        posttype
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
