import React, { useContext, useState } from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/Layout'
import SEO from '../components/seo'
import Acosta from '../components/Acosta'

// Locale
import { getText, Text, LanguageContext } from '../containers/Language'

// ICONS
import { RiArrowRightUpLine } from 'react-icons/ri'
import { VscChevronLeft, VscChevronDown } from 'react-icons/vsc'
import { FiArrowUpRight } from 'react-icons/fi'

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
      number: '312.526.3126',
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
      name: 'Jacksonville',
      description: 'Mosaic Pro',
      number: '312.526.3126',
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
      number: '647.100.1000',
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
      number: '647.100.1000',
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
        .then((response) => {
          setLoading(false)
          setSuccess(true)
          setError(false)
        })
        .catch((err) => {
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
      items: [
        {
          value: 'pages.contact.formItems.subject.items.general-inquiries',
        },
        {
          value: 'pages.contact.formItems.subject.items.marketing-canada',
        },
        {
          value: 'pages.contact.formItems.subject.items.marketing-us',
        },
        {
          value: 'pages.contact.formItems.subject.items.marketing-other',
        },
        {
          value: 'pages.contact.formItems.subject.items.rst-canada',
        },
        {
          value: 'pages.contact.formItems.subject.items.rst-us',
        },
        {
          value: 'pages.contact.formItems.subject.items.rst-other',
        },
        {
          value: 'pages.contact.formItems.subject.items.media-relations',
        },
        {
          value: 'pages.contact.formItems.subject.items.talent-acquisition',
        },
        {
          value: 'pages.contact.formItems.subject.items.human-resources',
        },
      ],
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
      isRequired: 'pages.contact.formItems.errors.nameIsRequired',
    },
    company: {},
    subject: { isRequired: 'pages.contact.formItems.errors.subjectIsRequired' },
    email: {
      isRequired: 'pages.contact.formItems.errors.emailIsRequired',
      isEmail: 'pages.contact.formItems.errors.emailIsInvalid',
    },
    'phone-number': {
      isRegexMatch: {
        message: 'pages.contact.formItems.errors.phoneNumberIsInvalid',
        regex: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im,
      },
    },
    message: {
      isRequired: 'pages.contact.formItems.errors.messageIsRequired',
    },
  }

  const HERO_CONTACTS = [
    {
      titleTID: 'pages.contact.meta.contacts.newBusinessUS',
      // country: 'U.S.',
      name: 'Mike Pennington',
      email: 'USNewBusiness@mosaic.com',
    },
    {
      titleTID: 'pages.contact.meta.contacts.newBusinessCanada',
      //  country: 'Canada',
      name: 'Terri Truscello',
      email: 'CADNewBusiness@mosaic.com',
    },
    {
      titleTID: 'pages.contact.meta.contacts.mediaInquiries',
      email: 'Media@mosaic.com',
    },
    {
      titleTID: 'pages.contact.meta.contacts.general',
      email: 'Info@mosaic.com',
    },
    {
      titleTID: 'pages.contact.meta.contacts.employee',
      email: 'employeeservices@acosta.com',
    },
  ]

  const HeroContactAccordionItem = ({ contact }) => (
    <AccordionItem>
      <AccordionItemHeading>
        <AccordionItemButton>
          <Text tid={contact.titleTID} /> {contact.country}
          <AccordionItemState>
            {({ expanded }) => (
              <span>{expanded ? <VscChevronDown /> : <VscChevronLeft />}</span>
            )}
          </AccordionItemState>
        </AccordionItemButton>
      </AccordionItemHeading>
      <AccordionItemPanel>
        <div className="cp-contact">
          <p>{contact.name}</p>
          <p>
            <a href={`mailto:${contact.email}`}>{contact.email}</a>
          </p>
        </div>
      </AccordionItemPanel>
    </AccordionItem>
  )

  const Meta = () => (
    <>
      <h2>
        <Text tid="pages.contact.title" />
      </h2>

      <p className="cp-desc">
        <Text tid="pages.contact.meta.description" />
      </p>

      <div className="cp-contacts">
        <div className="cp-wide">
          {HERO_CONTACTS.map((contact) => (
            <div className="columns is-mobile">
              <div className="column is-4">
                <p>
                  <Text tid={contact.titleTID} />
                </p>

                {contact.country && <p>{contact.country}</p>}
              </div>

              <div className="column is-7">
                <p>
                  <a href={`mailto:${contact.email}`}>{contact.email}</a>
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="cp-mobile">
          <Accordion allowZeroExpanded={true}>
            {HERO_CONTACTS.map((contact) => (
              <HeroContactAccordionItem contact={contact} />
            ))}
          </Accordion>
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
                <img src={HERO} alt="Contact us" />
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
      footerCTA={
        <>
          <h6>
            <Text tid="footerCTAs.instagram.text" />{' '}
            <a
              href="https://www.instagram.com/mosaicna/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Text tid="footerCTAs.instagram.linkText" /> <FiArrowUpRight />
            </a>
          </h6>
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
                <Text tid="misc.offices" />
              </h5>

              <div className="columns is-multiline">
                {CONTACTS.USA.map((contact) => (
                  <div className="column is-4 cp-contact">
                    <Contact contact={contact} />
                  </div>
                ))}
              </div>

              <div className="columns is-multiline">
                {CONTACTS.CANADA.map((contact) => (
                  <div className="column is-4 cp-contact">
                    <Contact contact={contact} />
                  </div>
                ))}
              </div>
            </div>

            <div className="container cp-mobile">
              <h3>
                <Text tid="pages.contact.contacts.title" />
              </h3>

              <h5>
                <Text tid="misc.offices" />
              </h5>

              <Accordion allowZeroExpanded={true}>
                {CONTACTS.USA.map((contact) => (
                  <ContactAccordionItem contact={contact} />
                ))}
              </Accordion>

              <Accordion allowZeroExpanded={true}>
                {CONTACTS.CANADA.map((contact) => (
                  <ContactAccordionItem contact={contact} />
                ))}
              </Accordion>
            </div>
          </div>

          <Acosta />

          <div className="form">
            <div className="container page">
              <div className="columns">
                <div className="column is-1"></div>
                <div className="column is-3 contact-info">
                  <h5>
                    <Text tid="pages.contact.contacts.formTitle" />
                  </h5>
                </div>

                <div className="column is-1"></div>

                <div className="column is-6-tablet">
                  {!success && (
                    <FormValidation
                      onSubmit={handleSubmit}
                      config={config}
                      initialValues={{
                        subject: 'general-inquiries',
                      }}
                    >
                      {({ fields, errors, submitted }) => (
                        <>
                          <div>
                            {formItems.map((formItem) => (
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
                                          tid: 'pages.contact.formItems.optional',
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
                                        {formItem.items.map((item) => (
                                          <option>
                                            {getText({
                                              tid: item.value,
                                              dictionary,
                                              userLanguage,
                                            })}
                                          </option>
                                        ))}
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
                                    <Text tid={errors[formItem.name]} />
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
                  )}

                  {success && (
                    <div className="cp-success">
                      <Text tid="pages.contact.formSubmitted.message" />

                      <a
                        href="/"
                        className="button primary"
                        onClick={(e) => {
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

        {formItems.map((formItem) => (
          <>
            <label for={formItem.name}>{formItem.name}</label>

            {!formItem.type && (
              <input id={formItem.name} name={formItem.name} />
            )}

            {formItem.type === 'select' && (
              <div class="select">
                <select id={formItem.name} name={formItem.name}>
                  {formItem.items.map((item) => (
                    <option>
                      {getText({
                        tid: item.value,
                        dictionary,
                        userLanguage,
                      })}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {formItem.type === 'textarea' && (
              <textarea id={formItem.name} name={formItem.name}></textarea>
            )}
          </>
        ))}
      </form>
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
