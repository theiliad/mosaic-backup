import React from 'react'
import { Link, graphql } from 'gatsby'

import Layout from '../components/Layout'
import SEO from '../components/seo'

import { FormValidation } from 'calidation'

import axios from 'axios'
import * as qs from 'query-string'

const formItems = [
  {
    title: 'Subject',
    name: 'subject',
    type: 'select',
  },
  {
    title: 'Name',
    name: 'name',
  },
  {
    title: 'Email Address',
    name: 'email',
  },
  {
    title: 'Company',
    name: 'company',
  },
  {
    title: 'Phone number',
    name: 'phone-number',
  },
  {
    title: 'Your message',
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

class Contact extends React.Component {
  state = {
    loading: false,
    success: false,
    error: false,
  }

  componentDidMount() {
    console.log('EWgew', this.props.location.pathname)
  }

  handleSubmit = ({ fields, errors, isValid }) => {
    if (isValid) {
      this.setState({
        ...this.state,
        loading: true,
      })

      const axiosOptions = {
        url: this.props.location.pathname,
        method: 'post',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        data: qs.stringify({ 'form-name': 'contact', ...fields }),
      }

      // Submit to Netlify
      axios(axiosOptions)
        .then(response => {
          this.setState({
            ...this.state,
            loading: false,
            success: true,
            error: false,
          })
        })
        .catch(err =>
          this.setState({
            ...this.state,
            loading: false,
            error: true,
          })
        )
    }
  }

  handleChange = e => this.setState({ [e.target.name]: e.target.value })

  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title
    const { loading, success, error } = this.state

    return (
      <Layout
        HeaderExtension={<div></div>}
        location={this.props.location}
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
                        Let’s
                        <br />
                        chat.
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
                        onSubmit={this.handleSubmit}
                        config={config}
                        onSubmit={this.handleSubmit}
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
                                        ? ' (optional)'
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
                                Send message
                              </button>
                            </div>

                            {error && (
                              <div className="notification is-danger marginTop">
                                <span>
                                  Something went wrong, please try again!
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
                    <h1>We've got your message</h1>
                    <p>
                      We value your business. Our team will get in touch with
                      you shortly.
                    </p>

                    <Link to="/" className="button primary">
                      Continue Browsing
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
