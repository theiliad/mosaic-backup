import React from 'react'
import Helmet from 'react-helmet'

import Layout, { LOGO_OPTIONS } from '../components/Layout'

class PrivacyPolicy extends React.Component {
  render() {
    return (
      <Layout location={this.props.location} logo={LOGO_OPTIONS.orangeBlue}>
        <Helmet>
          <meta name="robots" content="noindex" />
        </Helmet>
        <div className="pages-sup">
          <div className="section-title">
            <div className="container">
              <h1>MEDIA PURCHASE AUTHORIZATION ORDER FORM</h1>
            </div>
          </div>

          <div className="section-header">
            <div className="container">
              <h2>Terms and Conditions</h2>
            </div>
          </div>

          <div className="section-content content">
            <div className="container">
              <p>
                These Media Purchase Authorization Terms and Conditions (the
                "Terms") are included in and made part of that certain Media
                Purchase Authorization Order Form (hereinafter collectively
                referred to as “Agreement”) by and between Mosaic Sales
                Solutions US Operating Co., LLC (hereinafter referred to as
                “Mosaic”) and Client Company Name (hereinafter referred to as
                “Client”) entered into contemporaneously herewith and effective
                thereon, as follows:
              </p>
              <p>
                1. Authorization. By signing the Media Purchase Authorization
                Order Form ("Order Form"), Client's signatory represents and
                warrants that they are duly authorized to act as agent for
                Client and bind Client to the terms and conditions of this
                Agreement, and that Client thereby authorizes Mosaic to act as
                its agent for the purpose of performing media placement services
                (the "Services") for Client.
              </p>
              <p>
                2. Term and Termination. This Agreement shall be effective upon
                the earlier of full execution of the Order Form or any effective
                date specified on the Order Form, and shall continue until
                terminated by either party upon at least sixty (60) days'
                written notice (the "Term"). Notwithstanding the foregoing, in
                the event Mosaic and Client are parties to a separate agreement,
                then this Agreement shall automatically terminate upon the later
                of the effective date of termination of such other agreement in
                accordance with its terms and conditions, or until the
                conclusion of all advertising placed in connection with this
                Agreement.
              </p>
              <p>
                3. Media Plan; Media Placement; Invoicing. Mosaic and Client
                shall collaborate on the development of a media plan (which
                shall include but is not limited to Client's net spend, Mosaic
                fees, proposed Campaign Materials (as defined herein); space,
                time and media targets; campaign dates; and other mutually
                agreed plan details), which Mosaic shall execute by performing
                the Services as set forth in an Order Form. Client shall, upon
                Mosaic's request, supply to Mosaic any artwork, logos, images,
                written or graphic materials, or other campaign inventory (the
                “Client Materials”) in connection with Mosaic's performance of
                the Services. Unless otherwise agreed between the parties,
                Mosaic will issue Order Form invoices thirty (30) days prior to
                commencement of the media campaign set forth in an Order Form,
                and on a monthly basis thereafter. Payment is due immediately
                upon receipt of invoice unless otherwise agreed upon in the
                Order Form. If Mosaic requires all or any portion of the fees to
                be paid prior to a campaign launch, any delay in payment by
                Client will delay the launch date until such fees are paid in
                full. If Client requests any adjustments to a media plan once
                the media campaign has launched, Client shall be solely
                responsible for any increase in fees or costs, including media
                placement costs and cancellation penalties, which are subject to
                the respective media vendor policy requirements and notification
                periods.{' '}
              </p>
              <p>
                4. License; Indemnity. During the Term, Client hereby grants to
                Mosaic a non-exclusive, worldwide, royalty-free right and
                license to utilize, display, and reproduce any Client Materials
                in any media in connection with the Services under this
                Agreement. Client represents, warrants and covenants that the
                Client Materials do (and will during the Term) comply with all
                applicable laws, and do not (and will not during the Term)
                infringe, misappropriate or otherwise violate the rights of any
                third party. Client shall indemnify, defend and hold Mosaic and
                its subsidiaries and affiliates harmless from and against any
                third party claims arising out of: (i) Mosaic's use of Client
                Materials in connection with its performance of the Services
                under this Agreement; and (ii) Client's breach of this
                Agreement.
              </p>
              <p>
                5. Limitation of Liability. EXCLUDING CLIENT'S INDEMNIFICATION
                OBLIGATIONS HEREIN, NEITHER PARTY SHALL BE LIABLE TO THE OTHER
                FOR ANY INCIDENTAL, CONSEQUENTIAL, SPECIAL, OR PUNITIVE DAMAGES,
                OR LOST PROFITS ARISING OUT OF THIS AGREEMENT OR ITS
                TERMINATION, WHETHER FOR BREACH OF WARRANTY OR ANY OTHER
                OBLIGATION, AND WHETHER SUCH LIABILITY IS ASSERTED IN CONTRACT
                OR TORT (INCLUDING NEGLIGENCE AND STRICT PRODUCT LIABILITY),
                REGARDLESS OF WHETHER A PARTY HAS ADVISED OR HAS BEEN ADVISED OF
                THE POSSIBILITY OF SUCH DAMAGES. THE AGGREGATE LIABILITY OF
                MOSAIC UNDER THIS AGREEMENT UNDER ANY THEORY OF LIABILITY WILL
                BE LIMITED TO AN AMOUNT EQUAL TO THE FEES PAID BY CLIENT TO
                MOSAIC UNDER THE APPLICABLE ORDER FORM.
              </p>
              <p>
                6. Conflict. In the event these Terms conflict or are in any way
                inconsistent with the terms of any other agreement between the
                parties, then these Terms shall control to resolve any such
                conflict or inconsistency.
              </p>
            </div>
          </div>
        </div>
      </Layout>
    )
  }
}

export default PrivacyPolicy
