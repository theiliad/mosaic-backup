import React from 'react'
import { Link } from 'gatsby'

// Locale
import { Text, TextDate } from '../containers/Language'

import CATEGORIES from '../data/categories'

// Icons
import { BsPlayFill } from 'react-icons/bs'

import { isBefore } from 'date-fns'

export function ThinkingPostHeader({ post, play, setPlay }) {
  const { frontmatter } = post
  const isOneEightyPost = frontmatter.category === 'oneeighty'
  const isPastSession = isBefore(new Date(frontmatter.date), new Date())

  const PostMeta = () => (
    <>
      <h1 className="cp-title">
        <Text
          variations={{
            en: frontmatter.titleEN,
            fr: frontmatter.titleFR,
          }}
        />
      </h1>

      <div style={{ fontSize: '0.85em', marginTop: '1.5em' }}>
        <p className="cp-category cp-regular">
          {isOneEightyPost ? (
            <>
              <Text variations={CATEGORIES.thinking['oneeighty']} />
              {isPastSession ? (
                <>
                  {' '}
                  - <Text tid="thinking.pastSession" />
                </>
              ) : (
                ''
              )}
            </>
          ) : (
            <Link to={`/thinking/${frontmatter.category}`}>
              <Text variations={CATEGORIES.thinking[frontmatter.category]} />
            </Link>
          )}
        </p>

        {isOneEightyPost && isPastSession && (
          <p className="cp-streaming-date">
            <Text tid="thinking.originallyStreamed" />{' '}
            <TextDate string={frontmatter.date} />
          </p>
        )}

        {!isOneEightyPost && (
          <>
            <p className="cp-date">
              <TextDate string={frontmatter.date} />
            </p>

            <p className="cp-author">
              BY {frontmatter.author || <Text tid="thinking.defaultAuthor" />}
            </p>
          </>
        )}

        {isOneEightyPost && (
          <p className="cp-play">
            <a
              href="#"
              onClick={e => {
                e.preventDefault()
                setPlay(frontmatter.videoID)
              }}
            >
              <span>
                <BsPlayFill />
              </span>

              <i>
                <Text tid="thinking.watchNow" />
              </i>
            </a>
          </p>
        )}
      </div>
    </>
  )

  return (
    <>
      <div
        className={`post-single-heading thinking ${
          isOneEightyPost ? 'oneeighty' : ''
        }`}
      >
        <div className="columns post-single cp-desktop">
          <div
            className="column is-5 cp-image"
            style={{ backgroundImage: `url(${frontmatter.featuredImage})` }}
          ></div>

          <div className="column is-5 cp-meta">
            <PostMeta />
          </div>
        </div>

        <div className="post-single cp-mobile">
          <div className="cp-image">
            <img src={frontmatter.featuredImage} />
          </div>

          <div className="cp-meta">
            <div className="container">
              <PostMeta />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export function NewsPostHeader({ post }) {
  const { frontmatter } = post

  return (
    <>
      <div className="post-single-heading">
        <div className="container">
          <div className="columns post-single ui-grid">
            <div className="column is-8">
              <h1 className="cp-title">
                <Text
                  variations={{
                    en: frontmatter.titleEN,
                    fr: frontmatter.titleFR,
                  }}
                />
              </h1>

              <p className="cp-desc">
                <Text
                  variations={{
                    en: frontmatter.descriptionEN,
                    fr: frontmatter.descriptionFR,
                  }}
                />
              </p>

              <div style={{ fontSize: '0.85em', marginTop: '1.5em' }}>
                <p
                  className="cp-category"
                  style={{ textTransform: 'uppercase' }}
                >
                  <Link to="/news"><Text tid="news.title" /></Link>
                </p>

                <p className="cp-date">
                  <TextDate string={frontmatter.date} />
                </p>
              </div>

              <img
                src={frontmatter.featuredImage}
                style={{ width: '100%', marginTop: '1.5em' }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export function PostHeader({ post, play, setPlay }) {
  const { frontmatter } = post

  return (
    <>
      <div className="post-single-heading">
        <div className="container">
          <div className="columns post-single ui-grid">
            <div className="column is-10">
              <div className="columns">
                <div className="column is-10">
                  <p className="cp-company">{frontmatter.companyName}</p>

                  <h1 className="cp-title">
                    <Text
                      variations={{
                        en: frontmatter.titleEN,
                        fr: frontmatter.titleFR,
                      }}
                    />
                  </h1>

                  <p className="cp-desc">
                    <Text
                      variations={{
                        en: frontmatter.descriptionEN,
                        fr: frontmatter.descriptionFR,
                      }}
                    />
                  </p>

                  <p className="cp-category cp-regular cp-mobile">
                    <Text
                      variations={
                        CATEGORIES['case-studies'][frontmatter.category]
                      }
                    />
                  </p>

                  <p className="cp-controls">
                    <a
                      href="#"
                      className="cp-watch-case-study"
                      onClick={e => {
                        e.preventDefault()
                        setPlay(frontmatter.caseStudyVideoID)
                      }}
                    >
                      <span>
                        <BsPlayFill />
                      </span>
                      <i>
                        <Text tid="caseStudies.watchCaseStudy" /> (
                        {frontmatter.caseStudyVideoDuration})
                      </i>
                    </a>

                    <a
                      href="#"
                      className="cp-watch-spot"
                      onClick={e => {
                        e.preventDefault()
                        setPlay(frontmatter.spotVideoID)
                      }}
                    >
                      <span>
                        <BsPlayFill />
                      </span>
                      <i>
                        <Text tid="caseStudies.watchSpot" /> (
                        {frontmatter.spotVideoDuration})
                      </i>
                    </a>
                  </p>
                </div>

                <div className="column is-2 cp-wide">
                  <p className="cp-category cp-regular">
                    <Text
                      variations={
                        CATEGORIES['case-studies'][frontmatter.category]
                      }
                    />
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <img src={frontmatter.featuredImage} style={{ width: '100%' }} />
    </>
  )
}
