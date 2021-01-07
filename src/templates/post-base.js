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
import { VscChevronLeft, VscChevronDown } from 'react-icons/vsc'

// Share buttons
import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
} from 'react-share'

// Accordion
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
  AccordionItemState,
} from 'react-accessible-accordion'

function Post(props) {
  const post = props.data.mdx
  const { frontmatter } = post
  const siteTitle = props.data.site.siteMetadata.title

  const [play, setPlay] = useState(false)

  // Type of the post
  const isNewsPost = frontmatter.posttype === 'news'
  const isThinkingPost = frontmatter.posttype === 'thinking'

  const previousPost = props.pageContext.previous

  console.log('previousPost', previousPost)

  return (
    <Layout
      location={props.location}
      title={siteTitle}
      logo={LOGO_OPTIONS.orangeBlue}
      footerCTA={
        isNewsPost ? (
          <h6>
            <Text tid="footerCTAs.joinTheTeam" />{' '}
            <Link to="/careers">
              <Text tid="footerCTAs.letsChat" />
            </Link>
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
        ) : isThinkingPost ? (
          <ThinkingPostHeader post={post} />
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

                {frontmatter.panel && (
                  <div className="cp-panel">
                    <Accordion allowZeroExpanded={true}>
                      {frontmatter.panel.map(panelist => (
                        <AccordionItem>
                          <AccordionItemHeading>
                            <AccordionItemButton>
                              <div className="columns is-vcentered">
                                <div className="column is-narrow cp-panelist-image">
                                  <div
                                    className="cp-image"
                                    style={{
                                      backgroundImage: `url(${panelist.image})`,
                                    }}
                                  ></div>
                                </div>

                                <div className="column">
                                  <p className="cp-heading"><Text tid="thinking.panelist" /></p>
                                  <p className="cp-name">{panelist.name}</p>
                                  <p className="cp-title">
                                    <Text
                                      variations={{
                                        en: panelist.titleEN,
                                        fr: panelist.titleFR,
                                      }}
                                    />
                                  </p>
                                </div>
                              </div>
                              <AccordionItemState>
                                {({ expanded }) => (
                                  <span>
                                    {expanded ? (
                                      <VscChevronDown />
                                    ) : (
                                      <VscChevronLeft />
                                    )}
                                  </span>
                                )}
                              </AccordionItemState>
                            </AccordionItemButton>
                          </AccordionItemHeading>
                          <AccordionItemPanel>
                            <p>
                              <Text
                                variations={{
                                  en: panelist.textEN,
                                  fr: panelist.textFR,
                                }}
                              />
                            </p>
                          </AccordionItemPanel>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </div>
                )}

                {isThinkingPost && (
                  <div className="cp-tag">
                    <Link
                      to={`/thinking/${frontmatter.category}`}
                      className="button"
                    >
                      <Text
                        variations={CATEGORIES.thinking[frontmatter.category]}
                      />
                    </Link>
                  </div>
                )}
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
                <span>Share</span>
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
                    <img src={previousPost.frontmatter.featuredImage} />
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
                            ? 'thinking.next'
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

export default Post
