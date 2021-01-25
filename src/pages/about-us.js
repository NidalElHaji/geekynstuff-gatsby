import React from "react"
import { useStaticQuery, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

import { Wrapper, Image, BottomEdgeUp } from "../styles/pageStyles"
import { COLORS } from "../components/constants"

const AboutUsPage = () => {
    const {
        wpcontent: {
            page: {
                AboutUsMeta: { aboutUsHeaderPicture, aboutUsPageDescription },
            },
        },
    } = useStaticQuery(graphql`
        query {
            wpcontent {
                page(id: "about-us", idType: URI) {
                    AboutUsMeta {
                        aboutUsHeaderPicture {
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
                        aboutUsPageDescription
                    }
                }
            }
        }
    `)

    return (
        <Layout>
        <SEO title="About Us" />
        <Wrapper descriptionColor={COLORS.PRIMARY}>
            <div className="banner">
                <Image fluid={aboutUsHeaderPicture.imageFile.childImageSharp.fluid} alt={aboutUsHeaderPicture.altText} />
                <BottomEdgeUp color={COLORS.PRIMARY} />
            </div>
            <div className="description">
                <h2>About Us</h2>
                <p>{aboutUsPageDescription}</p>
                <BottomEdgeUp color={COLORS.BLACK} />
            </div>
        </Wrapper>
        </Layout>
    )

}

export default AboutUsPage