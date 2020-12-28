import React, { useState } from 'react'
import { Link, graphql } from 'gatsby'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import { MDXProvider } from '@mdx-js/react'
import MDX from '@mdx-js/runtime'

import Layout, { LOGO_OPTIONS } from '../components/Layout'
import SEO from '../components/seo'

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

  return (
    <Layout location={props.location} title={siteTitle} logo={LOGO_OPTIONS.orangeBlue}>
      <SEO
        title={frontmatter.title}
        image={`https://mosaic.com${frontmatter.shareImage ||
          frontmatter.featuredImage}`}
      />

      <div className="post">
        <div className="post-single-heading">
          <div className="container">
            <div className="columns post-single ui-grid">
              <div className="column is-10">
                <h1 className="cp-title">
                  {frontmatter.companyName} - <Text
                    variations={{
                      en: frontmatter.titleEN,
                      fr: frontmatter.titleFR,
                    }}
                  />
                </h1>

                <p className="cp-category">
                  <Text
                    variations={
                      CATEGORIES['case-studies'][frontmatter.category]
                    }
                  />
                </p>

                <p className="cp-desc">
                  <Text
                    variations={{
                      en: frontmatter.descriptionEN,
                      fr: frontmatter.descriptionFR,
                    }}
                  />
                </p>

                <p>
                  <a
                    href="#"
                    onClick={e => {
                      e.preventDefault()
                      setPlay(!play)
                    }}
                  >
                    <span>
                      <BsPlayFill />
                    </span>
                    <Text tid="caseStudies.playButton" />
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>

        <img src={DEMO_1} style={{ width: '100%' }} />

        <div className="container">
          <div className="post-body content">
            <div className="columns post-single ui-grid">
              <div className="column is-8">
                {/* <MDXProvider>
                  <MDXRenderer>{post.frontmatter.bodyFR}</MDXRenderer>
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
            <div className="columns">
              <div className="column is-narrow cp-img">
                <img src={DEMO_2} style={{ maxWidth: 400 }} />
              </div>

              <div className="column cp-text">
                <div className="cp-texts">
                  <p>Next project</p>
                  <h6>Google — Pixelville</h6>
                </div>
              </div>
            </div>
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
		companyName
        date(formatString: "MMMM DD, YYYY")
        bodyEN
        bodyFR
        descriptionEN
        descriptionFR
        category
        videoID
      }
      body
    }
  }
`
