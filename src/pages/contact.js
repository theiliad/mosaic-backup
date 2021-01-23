import React, { useContext, useState } from 'react'
import { Link, graphql } from 'gatsby'

import Layout from '../components/Layout'
import SEO from '../components/seo'

// Locale
import { getText, Text, LanguageContext } from '../containers/Language'

// ICONS
import { RiArrowRightUpLine } from 'react-icons/ri'
import { VscChevronLeft, VscChevronDown } from 'react-icons/vsc'

import { FormValidation } from 'calidation'

import axios from 'axios'
import * as qs from 'query-string'

// Accordion
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
  AccordionItemState,
} from 'react-accessible-accordion'

import HERO from '../img/contact.jpg'

const CONTACTS = {
  USA: [
    {
      name: 'Dallas',
      number: '877.870.4800',
      address: (
        <>
          220 East Las Colinas Blvd <br />
          Suite 300 <br />
          Irving, TX 75039
        </>
      ),
      link: 'https://goo.gl/maps/rJCQuKG9dMkq99m77',
    },
    {
      name: 'Chicago',
      number: '312.526.3126',
      address: (
        <>
          320 N. Elizabeth Street <br />
          Chicago, IL 60607
        </>
      ),
      link: 'https://goo.gl/maps/mUqWvoGd94WDh2iY8',
    },
    {
      name: 'Bentonville',
      number: '479.268.2775',
      address: (
        <>
          4204 S. Pinnacle Hills Pkwy <br />
          Suite 101 <br />
          Rogers, AR 72758
        </>
      ),
      link: 'https://goo.gl/maps/UZwCaAmLP6uC8McGA',
    },
    {
      name: 'Norwalk',
      description: 'FrontLine marketing',
      number: '203.662.5252',
      address: (
        <>
          383 Main Avenue <br />
          7th Floor <br />
          Norwalk, CT 06851
        </>
      ),
      link: 'https://goo.gl/maps/eJ8bGtrxC5h2tTAn7',
    },
    {
      name: 'Jacksonville',
      description: 'Mosaic Pro',
      number: '904.470.4196',
      address: (
        <>
          8500 Baycenter Road <br />
          Suite 2 <br />
          Jacksonville, FL 32256
        </>
      ),
      link: 'https://goo.gl/maps/DiDcSpfUcqFasqmy8',
    },
  ],
  CANADA: [
    {
      name: 'Toronto',
      number: '647.100.1000',
      address: (
        <>
          100 Liberty Street <br />
          Suite 100 <br />
          Toronto, ON M6K 3L7
        </>
      ),
      link: 'https://goo.gl/maps/8DWvFZ1k1iZAz5Rc6',
    },
    {
      name: 'Missisauga',
      number: '905.238.8422',
      address: (
        <>
          2700 Matheson Blvd East <br />
          East Tower, Suite 101 <br />
          Mississauga, ON L4W 4V9
        </>
      ),
      link: 'https://goo.gl/maps/HF2otzFhsvAws6188',
    },
    {
      name: 'Montreal',
      number: '514.228.8950',
      address: (
        <>
          2075, Boulevard Robert-Bourassa <br />
          Bureau 310 <br />
          Montréal, QB H3A 2L1
        </>
      ),
      link: 'https://goo.gl/maps/zMtartEnzaHCQYk28',
    },
  ],
}

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

  const Contact = ({ contact, title, description, numberLink }) => (
    <>
      {title !== false && <h6>{contact.name}</h6>}
      {description !== false && (
        <p className="cp-description">{contact.description}</p>
      )}

      <p className="cp-number">
        {numberLink ? (
          <a href={`tel:${contact.number.replace(/\./g, '')}`}>
            {contact.number}
          </a>
        ) : (
          contact.number
        )}
      </p>

      <p className="cp-address">
        <a href={contact.link} target="_blank" rel="noopener noreferrer">
          <span className="cp-a">{contact.address}</span>{' '}
          <span className="cp-icon">
            <RiArrowRightUpLine />
          </span>
        </a>
      </p>
    </>
  )

  const ContactAccordionItem = ({ contact }) => (
    <AccordionItem>
      <AccordionItemHeading>
        <AccordionItemButton>
          {contact.name} <span>{contact.description}</span>
          <AccordionItemState>
            {({ expanded }) => (
              <span>{expanded ? <VscChevronDown /> : <VscChevronLeft />}</span>
            )}
          </AccordionItemState>
        </AccordionItemButton>
      </AccordionItemHeading>
      <AccordionItemPanel>
        <div className="cp-contact">
          <Contact
            contact={contact}
            title={false}
            description={false}
            numberLink={true}
          />
        </div>
      </AccordionItemPanel>
    </AccordionItem>
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
          <div className="section-contacts">
            <div className="container cp-wide">
              <h3>
                <Text tid="pages.contact.contacts.title" />
              </h3>

              <h5>
                <Text tid="misc.countries.usa" />
              </h5>

              <div className="columns is-multiline">
                {CONTACTS.USA.map(contact => (
                  <div className="column is-4 cp-contact">
                    <Contact contact={contact} />
                  </div>
                ))}
              </div>

              <h5 className="cp-2nd-h5">
                <Text tid="misc.countries.canada" />
              </h5>

              <div className="columns is-multiline">
                {CONTACTS.CANADA.map(contact => (
                  <div className="column is-4 cp-contact">
                    <Contact contact={contact} />
                  </div>
                ))}
              </div>
            </div>

            <div className="container cp-mobile">
              <h5>
                <Text tid="misc.countries.usa" />
              </h5>

              <Accordion allowZeroExpanded={true}>
                {CONTACTS.USA.map(contact => (
                  <ContactAccordionItem contact={contact} />
                ))}
              </Accordion>

              <h5 className="cp-2nd-h5">
                <Text tid="misc.countries.canada" />
              </h5>

              <Accordion allowZeroExpanded={true}>
                {CONTACTS.CANADA.map(contact => (
                  <ContactAccordionItem contact={contact} />
                ))}
              </Accordion>
            </div>
          </div>

          <div className="form">
            <div className="container page">
              <div className="columns">
                <div className="column is-4 contact-info">
                  <h5>
                    <Text tid="pages.contact.title" />
                  </h5>
                </div>

                <div className="column is-1"></div>

                <div className="column is-7">
                  {!success && (
                    <>
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
                    </>
                  )}

                  {success && (
                    <div className="cp-success">
                      <Text tid="pages.contact.formSubmitted.message" />

                      <a
                        href="/"
                        className="button primary"
                        onClick={e => {
                          e.preventDefault()

                          if (typeof window !== undefined) {
                            window.location.reload()
                          }
                        }}
                      >
                        <Text tid="pages.contact.formSubmitted.cta" />
                      </a>
                    </div>
                  )}
                </div>
              </div>
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
