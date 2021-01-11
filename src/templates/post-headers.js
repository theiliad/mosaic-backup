import React from 'react'

// Locale
import { Text, TextDate } from '../containers/Language'

import CATEGORIES from '../data/categories'

import DEMO_1 from '../img/demo/1.jpg'

// Icons
import { BsPlayFill } from 'react-icons/bs'

import { isBefore } from 'date-fns'

export function ThinkingPostHeader({ post, play, setPlay }) {
  const { frontmatter } = post
  const isOneEightyPost = frontmatter.category === 'one-eighty'
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
        <p className="cp-category">
          {isOneEightyPost ? (
            <>
              <Text variations={CATEGORIES.thinking['one-eighty']} />
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
            <Text tid="news.title" />
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

            <p className="cp-author">BY {frontmatter.author}</p>
          </>
        )}

        {isOneEightyPost && (
          <p className="cp-play">
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
          isOneEightyPost ? 'one-eighty' : ''
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
                  <Text tid="news.title" />
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
              <h1 className="cp-title">
                {frontmatter.companyName} -{' '}
                <Text
                  variations={{
                    en: frontmatter.titleEN,
                    fr: frontmatter.titleFR,
                  }}
                />
              </h1>

              <p className="cp-category">
                <Text
                  variations={CATEGORIES['case-studies'][frontmatter.category]}
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

      <img src={frontmatter.featuredImage} style={{ width: '100%' }} />
    </>
  )
}
