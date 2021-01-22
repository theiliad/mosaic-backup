import React from 'react'
import { Link } from 'gatsby'

// Locale
import { Text, TextDate } from '../containers/Language'

import CATEGORIES from '../data/categories'

// Icons
import { BsPlayFill, BsBellFill } from 'react-icons/bs'
import { IoIosRadio } from 'react-icons/io'
import { RiArrowRightUpLine } from 'react-icons/ri'

import { isBefore, isAfter } from 'date-fns'

export function ThinkingPostHeader({ post, play, setPlay }) {
  const { frontmatter } = post
  const isOneEightyPost = frontmatter.category === 'oneeighty'

  const postDate = new Date(frontmatter.date)

  let streamStartDate = null,
    streamEndDate = null
  if (frontmatter.streamStartDate && frontmatter.streamEndDate) {
    streamStartDate = new Date(frontmatter.streamStartDate)
    streamEndDate = new Date(frontmatter.streamEndDate)
  }

  const isPastSession = isBefore(streamEndDate || postDate, new Date())
  const isLiveSession = !isPastSession && isBefore(streamStartDate, new Date())
  const isUpcomingSession =
    !isPastSession && isAfter(streamStartDate, new Date())

  const isRecap = frontmatter.recap === true

  let categoryTID
  if (isRecap) {
    categoryTID = 'thinking.recap'
  } else if (isPastSession) {
    categoryTID = 'thinking.pastSession'
  } else if (isLiveSession) {
    categoryTID = 'thinking.liveSession'
  } else if (isUpcomingSession) {
    categoryTID = 'thinking.upcomingSession'
  }

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

      <div style={{ marginTop: '1.5em' }}>
        <p className="cp-category cp-regular">
          {isOneEightyPost ? (
            <>
              {isLiveSession && <IoIosRadio />}
              <Text variations={CATEGORIES.thinking['oneeighty']} /> -{' '}
              <Text tid={categoryTID} />
            </>
          ) : (
            <Link to={`/thinking/${frontmatter.category}`}>
              <Text variations={CATEGORIES.thinking[frontmatter.category]} />
            </Link>
          )}
        </p>

        {isOneEightyPost && !isRecap && isPastSession && (
          <p className="cp-streaming-date">
            <Text tid="thinking.originallyStreamed" />{' '}
            <TextDate string={frontmatter.streamStartDate} />
          </p>
        )}

        {isOneEightyPost && !isRecap && isLiveSession && (
          <p className="cp-streaming-date">
            <Text tid="thinking.liveSession.startedAt" />{' '}
            <TextDate
              string={frontmatter.streamStartDate}
              format="hh:mma"
              lowercase={true}
            />
          </p>
        )}

        {isOneEightyPost && !isRecap && isUpcomingSession && (
          <p className="cp-streaming-date">
            <TextDate string={frontmatter.streamStartDate} />{' '}
            <Text tid="thinking.upcomingSession.at" />{' '}
            <TextDate
              string={frontmatter.streamStartDate}
              format="hh:mma"
              lowercase={true}
            />
          </p>
        )}

        {(!isOneEightyPost || isRecap) && (
          <>
            {isOneEightyPost && (
              <p className="cp-date">
                <TextDate string={frontmatter.date} />
              </p>
            )}

            <p className="cp-author">
              BY {frontmatter.author || <Text tid="thinking.defaultAuthor" />}
            </p>
          </>
        )}

        {isOneEightyPost && (
          <>
            {!isRecap && !isUpcomingSession && (
              <p className="cp-play">
                <a
                  href="/"
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

            {isUpcomingSession && (
              <p className="cp-play cp-reminder">
                <a
                  href={frontmatter.reminderURL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>
                    <BsBellFill />
                  </span>

                  <i>
                    <Text tid="thinking.upcomingSession.reminder" />

                    <RiArrowRightUpLine />
                  </i>
                </a>
              </p>
            )}
          </>
        )}
      </div>
    </>
  )

  return (
    <>
      <div
        className={`post-single-heading thinking ${
          isOneEightyPost && !isRecap ? 'oneeighty' : ''
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
            <img alt={frontmatter.titleEN} src={frontmatter.featuredImage} />
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

              <div style={{ marginTop: '1.5em' }}>
                <p
                  className="cp-category"
                  style={{ textTransform: 'uppercase' }}
                >
                  <Link to="/news">
                    <Text tid="news.title" />
                  </Link>
                </p>

                <p className="cp-date">
                  <TextDate string={frontmatter.date} />
                </p>
              </div>

              <img
                alt={frontmatter.titleEN}
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
                      href="/"
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
                      href="/"
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

      <img
        alt={frontmatter.titleEN}
        src={frontmatter.featuredImage}
        style={{ width: '100%' }}
      />
    </>
  )
}
