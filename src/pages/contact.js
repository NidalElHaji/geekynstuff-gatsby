import React from "react"
import { useStaticQuery, graphql } from "gatsby"

import { RiMailSendFill, RiPhoneLine, RiUserLocationLine } from "react-icons/ri"
import Layout from "../components/layout"
import SEO from "../components/seo"

import { Wrapper, Image, BottomEdgeUp } from "../styles/pageStyles"
import { COLORS } from "../components/constants"

const ContactPage = () => {
    const {
        wpcontent: {
            page: {
                ContactMeta: {
                    contactPageHeaderPicture,
                    contactPageDescription,
                    contactPageAddress,
                    contactPageCity,
                    contactPageZipCode,
                    contactPageEmail,
                    contactPagePhone,
                },
            },
        },
    } = useStaticQuery(graphql`
        query {
            wpcontent {
                page(id: "contact", idType: URI) {
                    ContactMeta {
                        contactPageHeaderPicture {
                            altText
                            sourceUrl
                            imageFile {
                                childImageSharp {
                                    fluid(quality: 100) {
                                        ...GatsbyImageSharpFluid_withWebp
                                    }
                                }
                            }
                        }
                        contactPageDescription
                        contactPageAddress
                        contactPageCity
                        contactPageZipCode
                        contactPageEmail
                        contactPagePhone
                    }
                }
            }  
        }
    `)

  return (
    <Layout>
      <SEO title="Contact" />
      <Wrapper descriptionColor={COLORS.PRIMARY}>
        <div className="banner">
          <Image fluid={contactPageHeaderPicture.imageFile.childImageSharp.fluid}/>
          <BottomEdgeUp color={COLORS.PRIMARY} />
        </div>
        <div className="description">
          <h2>Contact Us</h2>
          <p>{contactPageDescription}</p>
          <BottomEdgeUp color={COLORS.BLACK} />
        </div>
        <div className="contact-info">
          <div>
            <RiMailSendFill style={{ height: "4rem", width: "4rem" }} />
            <p>
              Send us an email at{" "}
              <a target="__blank" href={`mailto:${contactPageEmail}`}>
                {contactPageEmail}
              </a>
            </p>
          </div>
          <div>
            <RiPhoneLine style={{ height: "4rem", width: "4rem" }} />
            <p>Call us: +32/{contactPagePhone}</p>
          </div>
          <div>
            <RiUserLocationLine style={{ height: "4rem", width: "4rem" }} />
            <p>
              {contactPageAddress}, {contactPageZipCode} {contactPageCity}
            </p>
          </div>
        </div>
      </Wrapper>
    </Layout>
  )
}

export default ContactPage