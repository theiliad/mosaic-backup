import React, { useContext, useState } from 'react'
import { Link, graphql } from 'gatsby'

import Layout from '../components/Layout'
import SEO from '../components/seo'

// Locale
import { getText, Text, LanguageContext } from '../containers/Language'

import { FormValidation } from 'calidation'

import axios from 'axios'
import * as qs from 'query-string'

import HERO from '../img/contact.jpg'

function Contact({ data, location }) {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(false)

  const handleSubmit = ({ fields, errors, isValid }) => {
    if (isValid) {
      setLoading(true)

      const axiosOptions = {
        url: location.pathname,
        method: 'post',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        data: qs.stringify({ 'form-name': 'contact', ...fields }),
      }

      // Submit to Netlify
      axios(axiosOptions)
        .then(response => {
          setLoading(false)
          setSuccess(true)
          setError(false)
        })
        .catch(err => {
          setLoading(false)
          setError(true)
        })
    }
  }

  const siteTitle = data.site.siteMetadata.title

  const languageContext = useContext(LanguageContext)
  const { dictionary, userLanguage } = languageContext

  const formItems = [
    {
      title: getText({
        tid: 'pages.contact.formItems.subject',
        dictionary,
        userLanguage,
      }),
      name: 'subject',
      type: 'select',
    },
    {
      title: getText({
        tid: 'pages.contact.formItems.name',
        dictionary,
        userLanguage,
      }),
      name: 'name',
    },
    {
      title: getText({
        tid: 'pages.contact.formItems.email',
        dictionary,
        userLanguage,
      }),
      name: 'email',
    },
    {
      title: getText({
        tid: 'pages.contact.formItems.company',
        dictionary,
        userLanguage,
      }),
      name: 'company',
    },
    {
      title: getText({
        tid: 'pages.contact.formItems.phone',
        dictionary,
        userLanguage,
      }),
      name: 'phone-number',
    },
    {
      title: getText({
        tid: 'pages.contact.formItems.message',
        dictionary,
        userLanguage,
      }),
      name: 'message',
      type: 'textarea',
    },
  ]

  const config = {
    name: {
      isRequired: 'Let us know your name please!',
    },
    company: {},
    subject: { isRequired: 'Please choose a subject' },
    email: {
      isRequired: 'Email field is required!',
      isEmail: 'Please enter a valid email address',
    },
    'phone-number': {
      isRegexMatch: {
        message: 'Please enter a valid phone number',
        regex: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im,
      },
    },
    message: {
      isRequired: 'Please write a message!',
    },
  }

  const Meta = () => (
    <>
      <h2>
        Hi. Hello.
        <br />
        Bonjour. Howdy.
      </h2>

      <p className="cp-desc">
        <Text tid="pages.contact.meta.description" />
      </p>

      <div className="cp-contacts">
        <div className="columns is-mobile">
          <div className="column is-5">
            <p>
              <Text tid="pages.contact.meta.contacts.newBusiness" />
            </p>

            <p>U.S.</p>
          </div>

          <div className="column is-7">
            <p>Mike Pennington</p>

            <p>
              <a href="mailto:USNewBusiness@mosaic.com">
                USNewBusiness@mosaic.com
              </a>
            </p>
          </div>
        </div>

        <div className="columns is-mobile">
          <div className="column is-5">
            <p>
              <Text tid="pages.contact.meta.contacts.newBusiness" />
            </p>

            <p>Canada</p>
          </div>

          <div className="column is-7">
            <p>Terri Truscello</p>

            <p>
              <a href="mailto:CADNewBusiness@mosaic.com">
                CADNewBusiness@mosaic.com
              </a>
            </p>
          </div>
        </div>

        <div className="columns is-mobile">
          <div className="column is-5">
            <p>
              <Text tid="pages.contact.meta.contacts.mediaInquiries" />
            </p>
          </div>

          <div className="column is-7">
            <p>
              <a href="mailto:Media@mosaic.com">Media@mosaic.com</a>
            </p>
          </div>
        </div>

        <div className="columns is-mobile">
          <div className="column is-5">
            <p>
              <Text tid="pages.contact.meta.contacts.general" />
            </p>
          </div>

          <div className="column is-7">
            <p>
              <a href="mailto:Info@mosaic.com">Info@mosaic.com</a>
            </p>
          </div>
        </div>
      </div>
    </>
  )

  return (
    <Layout
      HeaderExtension={
        <>
          <div className="post-single-heading thinking contact">
            <div className="columns post-single cp-desktop">
              <div className="column is-5 cp-meta">
                <Meta />
              </div>

              <div className="column is-1"></div>

              <div
                className="column is-6 cp-image"
                style={{ backgroundImage: `url(${HERO})` }}
              ></div>
            </div>

            <div className="post-single cp-mobile">
              <div className="cp-image">
                <img src={HERO} />
              </div>

              <div className="cp-meta">
                <div className="container">
                  <Meta />
                </div>
              </div>
            </div>
          </div>
        </>
      }
      navIdleLight={true}
      location={location}
      title={siteTitle}
    >
      <SEO title="Contact" keywords={['Contact']} image={null} />

      <div>
        <div className="pages-index pages-contact">
          <div className="form">
            <div className="container page">
              {!success && (
                <div className="columns">
                  <div className="column is-4 contact-info">
                    <h5>
                      <Text tid="pages.contact.title" />
                    </h5>
                  </div>

                  <div className="column is-1"></div>

                  <div className="column is-7">
                    <form
                      name="contact"
                      method="post"
                      action="/thanks/"
                      data-netlify="true"
                      data-netlify-honeypot="bot-field"
                      style={{
                        display: 'block',
                        height: 0,
                        visibility: 'hidden',
                        opacity: '0',
                      }}
                    >
                      <input type="hidden" name="form-name" value="contact" />

                      {formItems.map(formItem => (
                        <>
                          {!formItem.type && (
                            <input id={formItem.name} name={formItem.name} />
                          )}

                          {formItem.type === 'select' && (
                            <div class="select">
                              <select id={formItem.name} name={formItem.name}>
                                <option>General inquiries</option>
                                <option>Support</option>
                              </select>
                            </div>
                          )}

                          {formItem.type === 'textarea' && (
                            <textarea
                              id={formItem.name}
                              name={formItem.name}
                            ></textarea>
                          )}
                        </>
                      ))}
                    </form>

                    <FormValidation
                      onSubmit={handleSubmit}
                      config={config}
                      onSubmit={handleSubmit}
                    >
                      {({ fields, errors, submitted }) => (
                        <>
                          <div>
                            {formItems.map(formItem => (
                              <div
                                className="field"
                                key={`formItem-${formItem.name}`}
                              >
                                <label
                                  className="label"
                                  for={`mc-${formItem.name}`}
                                >
                                  {formItem.title +
                                    (!config[formItem.name].isRequired
                                      ? ` (${getText({
                                          tid:
                                            'pages.contact.formItems.optional',
                                          dictionary,
                                          userLanguage,
                                        })})`
                                      : '')}
                                </label>
                                <div className="control">
                                  {!formItem.type && (
                                    <input
                                      className={`input ${
                                        submitted && errors[formItem.name]
                                          ? 'is-danger'
                                          : ''
                                      }`}
                                      id={`mc-${formItem.name}`}
                                      name={formItem.name}
                                    />
                                  )}

                                  {formItem.type === 'select' && (
                                    <div class="select">
                                      <select
                                        className={`input ${
                                          submitted && errors[formItem.name]
                                            ? 'is-danger'
                                            : ''
                                        }`}
                                        id={`mc-${formItem.name}`}
                                        name={formItem.name}
                                      >
                                        <option>General inquiries</option>
                                        <option>Support</option>
                                      </select>
                                    </div>
                                  )}

                                  {formItem.type === 'textarea' && (
                                    <textarea
                                      className={`textarea ${
                                        submitted && errors[formItem.name]
                                          ? 'is-danger'
                                          : ''
                                      }`}
                                      id={`mc-${formItem.name}`}
                                      name={formItem.name}
                                    ></textarea>
                                  )}
                                </div>

                                {submitted && errors[formItem.name] && (
                                  <p className="help is-danger">
                                    {errors[formItem.name]}
                                  </p>
                                )}
                              </div>
                            ))}
                          </div>

                          <div>
                            <button
                              type="submit"
                              className={`cp-button button primary ${
                                loading ? 'is-loading' : ''
                              }`}
                            >
                              <Text tid="pages.contact.formItems.send" />
                            </button>
                          </div>

                          {error && (
                            <div className="notification is-danger marginTop">
                              <span>
                                <Text tid="pages.contact.formItems.error" />
                              </span>
                            </div>
                          )}
                        </>
                      )}
                    </FormValidation>
                  </div>
                </div>
              )}

              {success && (
                <div className="aligncenter cp-success">
                  <Text tid="pages.contact.formSubmitted.message" />

                  <Link to="/" className="button primary">
                    <Text tid="pages.contact.formSubmitted.cta" />
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Contact

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`
