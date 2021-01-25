import React from "react"
import { useStaticQuery, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

import { Wrapper, Image, BottomEdgeUp, Collect } from "../styles/pageStyles"
import { COLORS } from "../components/constants"

const CollectablesPage = () => {
    const {
        wpcontent: {
            page: { CollectablesMeta: { collectablesPageHeaderPicture, collectablesPageDescription, }, },
            collectables: { edges: collectables, },
        },
      } = useStaticQuery(graphql`
        query {
            wpcontent {
                page(id: "collectables", idType: URI) {
                    CollectablesMeta {
                        collectablesPageHeaderPicture {
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
                        collectablesPageDescription
                    }
                }
                collectables {
                    edges {
                        node {
                            Collectable {
                                name
                                images {
                                    imageOne {
                                        altText
                                        sourceUrl
                                        imageFile {
                                            childImageSharp {
                                                fluid(quality: 50, grayscale: true) {
                                                    ...GatsbyImageSharpFluid_withWebp
                                                }
                                            }
                                        }
                                    }
                                }
                                brand
                            }
                            slug
                        }
                    }
                }
            }
        }
    `)

    return (
        <Layout>
            <SEO title="Collectables"/>
            <Wrapper collectablesColor={COLORS.BLACK} descriptionColor={COLORS.PRIMARY}>
                <div className="banner">
                    <Image fluid={collectablesPageHeaderPicture.imageFile.childImageSharp.fluid}  alt={collectablesPageHeaderPicture.altText} />
                    <BottomEdgeUp color={COLORS.PRIMARY} />
                </div>
                <div className="description">
                    <h2>Geeky N Stuff</h2>
                    <p>{collectablesPageDescription}</p>
                    <BottomEdgeUp color={COLORS.BLACK} />
                </div>
                <div className="collectables">
                    <h2>Collectables</h2>
                    <div className="collectable-items">
                        {collectables.map(({ node: { Collectable, slug } }) => (
                            <Collect key={slug} to={`/${slug}`}>
                                <Image fluid={Collectable.images.imageOne.imageFile.childImageSharp.fluid} alt={Collectable.images.imageOne.altText} />
                                <div className="collectable-info">
                                    <p> {Collectable.name} </p>
                                    <p>{Collectable.brand}</p>
                                </div>
                            </Collect>
                        ))}
                    </div>
                </div>
            </Wrapper>
        </Layout>
    )
}

export default CollectablesPage