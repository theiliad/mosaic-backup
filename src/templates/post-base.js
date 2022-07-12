import React, { useContext, useEffect, useState } from 'react'

import { Link } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'

// import { MDXRenderer } from 'gatsby-plugin-mdx'
// import { MDXProvider } from '@mdx-js/react'
import MDX from '@mdx-js/runtime'

import Layout, { LOGO_OPTIONS } from '../components/Layout'
import SEO from '../components/seo'

// Components
import { NewsPostHeader, ThinkingPostHeader, PostHeader } from './post-headers'

import ReactPlayer from 'react-player'

// Locale
import { getText, Text, LanguageContext } from '../containers/Language'

import CATEGORIES from '../data/categories'

import { get } from 'lodash-es'

// Icons
import { VscChevronLeft, VscChevronDown } from 'react-icons/vsc'
import { RiArrowRightUpLine } from 'react-icons/ri'
import { BsPlayFill } from 'react-icons/bs'
import { CgClose } from 'react-icons/cg'
import { FiArrowUpRight } from 'react-icons/fi'
import { FiArrowRight } from 'react-icons/fi'

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

// Copy to cliboard
import { Slide, toast } from 'react-toastify'
import { copyToClipboard } from '../utils'

function Post(props) {
  const post = props.data.mdx
  const { frontmatter } = post
  const siteTitle = props.data.site.siteMetadata.title

  const [play, setPlay] = useState(
    props.location.search === '?playVideo=true' ? frontmatter.videoID : null
  )

  const [ctaVisible, setCTAVisible] = useState(false)

  // Type of the post
  const isNewsPost = frontmatter.posttype === 'news'
  const isThinkingPost = frontmatter.posttype === 'thinking'
  const isCaseStudy = frontmatter.posttype === 'case-study'
  const isOneEightyPost = isThinkingPost && frontmatter.category === 'oneeighty'
  const isRecap = frontmatter.recap === true

  const previousPost = props.pageContext.previous

  const languageContext = useContext(LanguageContext)
  const { dictionary, userLanguage } = languageContext

  const elementInViewport = (el) => el.getBoundingClientRect().bottom >= 0

  const trackScrolling = () =>
    setCTAVisible(
      !elementInViewport(document.getElementById('thinking-post-header'))
    )

  useEffect(() => {
    if (isThinkingPost && isOneEightyPost) {
      document.addEventListener('scroll', trackScrolling, { passive: true })

      // will be called on component unmount
      return () => {
        document.removeEventListener('scroll', trackScrolling)
      }
    }
  }, [isThinkingPost])

  const EventMember = ({ member, isModerator }) => (
    <AccordionItem>
      <AccordionItemHeading>
        <AccordionItemButton>
          <div className="columns is-vcentered is-mobile">
            <div className="column is-narrow cp-panelist-image">
              <div className={`cp-image ${isModerator ? 'cp-gradient' : ''}`}>
                <div
                  className="cp-img"
                  style={{
                    backgroundImage: `url(${member.image})`,
                  }}
                ></div>
              </div>
            </div>

            <div className="column">
              <p className="cp-heading">
                <Text
                  tid={isModerator ? 'thinking.moderator' : 'thinking.panelist'}
                />
              </p>
              <p className="cp-name">{member.name}</p>
              <p className="cp-title">
                <Text
                  variations={{
                    en: member.titleEN,
                    fr: member.titleFR,
                  }}
                />
              </p>
            </div>
          </div>
          <AccordionItemState>
            {({ expanded }) => (
              <span>{expanded ? <VscChevronDown /> : <VscChevronLeft />}</span>
            )}
          </AccordionItemState>
        </AccordionItemButton>
      </AccordionItemHeading>
      <AccordionItemPanel>
        <div class="columns is-vcentered">
          <div class="column is-narrow cp-panelist-image cp-wide">
            <div class="cp-image ">
              <div class="cp-img"></div>
            </div>
          </div>
          <div class="column">
            <p>
              <Text
                variations={{
                  en: member.textEN,
                  fr: member.textFR,
                }}
              />

              {member.linkedin && (
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cp-linkedin"
                >
                  <span>
                    <Text tid="thinking.panelist.linkedin" />
                  </span>{' '}
                  <RiArrowRightUpLine />
                </a>
              )}
            </p>
          </div>
        </div>
      </AccordionItemPanel>
    </AccordionItem>
  )

  const previousPostImage = getImage(previousPost.frontmatter.featuredImage)

  return (
    <Layout
      location={props.location}
      title={siteTitle}
      logo={LOGO_OPTIONS.orangeBlue}
      navIdleLight={isOneEightyPost && !isRecap}
      navigationCTA={
        <a
          role="button"
          className={`cp-cta ${ctaVisible ? 'visible' : ''}`}
          onClick={(e) => {
            e.preventDefault()

            setPlay(frontmatter.videoID)
          }}
        >
          <BsPlayFill />
        </a>
      }
      footerCTA={
        isNewsPost ? (
          <h6>
            <Text tid="footerCTAs.joinTheTeam" />{' '}
            <a
              href="https://www.mosaicjobs.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Text tid="footerCTAs.viewOpenRoles" /> <FiArrowUpRight />
            </a>
          </h6>
        ) : isOneEightyPost ? (
          <h6>
            <Text tid="footerCTAs.oneEighty" />{' '}
            <Link to="/contact">
              <Text tid="footerCTAs.shout" /> <FiArrowRight />
            </Link>
          </h6>
        ) : null
      }
    >
      <SEO
        title={frontmatter.titleEN}
        image={`https://mosaic.com${
          get(
            frontmatter,
            'shareImage.childImageSharp.gatsbyImageData.images.fallback.src'
          ) ||
          get(
            frontmatter,
            'featuredImage.childImageSharp.gatsbyImageData.images.fallback.src'
          )
        }`}
      />

      <div className="post">
        {isNewsPost ? (
          <NewsPostHeader post={post} />
        ) : isThinkingPost ? (
          <ThinkingPostHeader post={post} play={play} setPlay={setPlay} />
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

                <MDX
                  components={{
                    a: (aProps) => {
                      const aText =
                        get(aProps, 'children.props.parentName') === 'p'
                          ? get(aProps, 'children.props.children')
                          : aProps.children

                      return <a {...aProps}>{aText}</a>
                    },
                    img: (imgProps) => (
                      <div className="cp-el-img">
                        <img {...imgProps} />

                        {imgProps.caption && (
                          <p className="cp-caption subtitle is-6">
                            {imgProps.caption}
                          </p>
                        )}
                      </div>
                    ),
                  }}
                >
                  {Text({
                    variations: {
                      en: post.frontmatter.bodyEN,
                      fr: post.frontmatter.bodyFR,
                    },
                  })}
                </MDX>

                <div className="columns cp-sponsors is-mobile is-multiline">
                  {frontmatter.sponsors &&
                    frontmatter.sponsors.map((sponsor) => (
                      <div className="column is-3-widescreen is-4-desktop is-4-tablet is-4-mobile">
                        <img src={sponsor.image} alt={sponsor.alt} />
                      </div>
                    ))}
                </div>

                {frontmatter.panel && (
                  <div className="cp-panel">
                    <Accordion allowZeroExpanded={true}>
                      {frontmatter.panel.map((panelist) => (
                        <EventMember member={panelist} />
                      ))}

                      {frontmatter.moderator.map((moderator) => (
                        <EventMember member={moderator} isModerator={true} />
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

            {
              /*
               *  Secondary video
               */
              frontmatter.secondaryVideoVimeoID && (
                <div
                  className="columns post-single ui-grid"
                  style={{ marginTop: '6em' }}
                >
                  <div className="column is-10">
                    <div className="cp-video-wrapper">
                      {play && play.type === 'secondary' && (
                        <ReactPlayer
                          url={`https://vimeo.com/${play.id}`}
                          loop={true}
                          playing={true}
                          autoPlay={true}
                          width="100%"
                          height={null}
                          className="cp-vimeo"
                        />
                      )}

                      <img
                        alt={frontmatter.titleEN}
                        src={frontmatter.secondaryVideoIMG}
                        style={{ width: '100%' }}
                      />

                      {(!play || play.type !== 'secondary') &&
                        frontmatter.secondaryVideoVimeoID && (
                          <div className="cp-overlay">
                            <a
                              href="/"
                              onClick={(e) => {
                                e.preventDefault()

                                setPlay({
                                  id: frontmatter.secondaryVideoVimeoID,
                                  type: 'secondary',
                                })
                              }}
                            >
                              <span className="cp-icon">
                                <BsPlayFill />
                              </span>

                              <span className="cp-text">
                                <Text tid="caseStudies.watchSpot" />
                              </span>
                            </a>
                          </div>
                        )}
                    </div>
                  </div>
                </div>
              )
            }
          </div>
        </div>

        {
          /*
           * Vimeo player for 180 posts
           */ play && !play.type && (
            <div
              className="video-overlay"
              onClick={(e) => {
                e.preventDefault()
                setPlay(null)
              }}
              role="presentation"
            >
              <div className="cp-content">
                <a href="/" onClick={(e) => setPlay(null)}>
                  <CgClose />
                </a>

                <ReactPlayer
                  playing
                  url={`https://vimeo.com/${play}`}
                  loop={true}
                  autoPlay={true}
                  width="100%"
                  height={null}
                  className="cp-vimeo"
                />
              </div>
            </div>
          )
        }

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
                <button
                  class="button is-medium"
                  onClick={(e) => {
                    copyToClipboard(`https://mosaic.com/${post.fields.slug}`)

                    toast(
                      getText({
                        tid: 'misc.copyLink.success',
                        dictionary,
                        userLanguage,
                      }),
                      {
                        position: 'bottom-right',
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        type: toast.TYPE.SUCCESS,
                        transition: Slide,
                      }
                    )
                  }}
                >
                  <Text tid="misc.copyLink" />
                </button>{' '}
              </div>
            </div>
          </div>
        </div>

        <div className="next-project">
          <div className="cp-bg white"></div>
          <div className="cp-bg"></div>

          <div className="container">
            <Link to={`/${previousPost.fields.slug}`}>
              <div
                className="columns"
                style={{
                  minHeight: isNewsPost ? '15em' : null,
                }}
              >
                <div className="column is-narrow cp-img">
                  <GatsbyImage
                    image={previousPostImage}
                    style={{ width: '100%' }}
                    alt={previousPost.frontmatter.titleEN}
                  />
                </div>

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
                        variations={
                          isCaseStudy
                            ? {
                                en: `${previousPost.frontmatter.companyName} —  ${previousPost.frontmatter.titleEN}`,
                                fr: `${previousPost.frontmatter.companyName} — ${previousPost.frontmatter.titleFR}`,
                              }
                            : {
                                en: previousPost.frontmatter.titleEN,
                                fr: previousPost.frontmatter.titleFR,
                              }
                        }
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
