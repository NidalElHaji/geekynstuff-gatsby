import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

import { Wrapper, Image } from "../styles/CollectableStyles"

const CollectableTemplate =({ data: { wpcontent: { collectable: { types: { edges: types }, Collectable }}}}) => {
    const { imageOne, imageTwo, imageThree, imageFour, imageFive, imageSix } = Collectable.images
    const pics = [ imageOne, imageTwo, imageThree, imageFour, imageFive, imageSix ]
    return (
        <Layout>
            <SEO title="Collectable"/>
            <Wrapper>
                <div className="collectable-container">
                    <div className="collectable-image">
                        <Image fluid={ Collectable.images.imageOne.imageFile.childImageSharp.fluid } altText={ Collectable.images.imageOne.altText }/>
                        <div className="types">
                            { types.map(({ node: type }) => (
                                <div className="type">{ type.name }</div>
                            ))}
                        </div>
                    </div>
                    <div className="collectable-info">
                        <h2>{ Collectable.name }</h2>
                        <h3><span>{ Collectable.franchise } - </span>{ Collectable.brand }</h3>
                        <p className="description">{ Collectable.description }</p>
                        <p className="info"><strong>estimatePrice:</strong>{` €${Collectable.estimatePrice}`}</p>
                        <p className="info"><strong>dimensions:</strong>{` ${Collectable.dimensions}`}</p>
                        <p className="info"><strong>year:</strong>{` ${Collectable.year}`}</p>
                    </div>
                </div>
                <div className="collectable-pictures">
                    { pics.map( pic => ( 
                        <div className="collectable-picture">
                            <Image key={pic.altText} fluid={ pic.imageFile.childImageSharp.fluid } altText={ pic.altText }/>
                        </div>
                    ))}
                </div>
            </Wrapper>
        </Layout>
    )
}

export default CollectableTemplate

export const pageQuery = graphql`
    query ($id: ID!) {
        wpcontent {
            collectable (id: $id, idType: ID) {
                types {
                    edges {
                        node {
                            name
                        }
                    }
                }
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
                        imageTwo {
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
                        imageThree {
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
                        imageFour {
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
                        imageFive {
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
                        imageSix {
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
                    franchise
                    brand
                    description
                    estimatePrice
                    dimensions
                    year
                }
            }
        }
    }
`