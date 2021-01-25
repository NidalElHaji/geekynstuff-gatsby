import React from "react"
import { useStaticQuery, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

import { Wrapper, Image, BottomEdgeUp, Collect } from "../styles/pageStyles"
import { COLORS } from "../components/constants"

const IndexPage = () => {
  const {
    wpcontent: {
      page: {
        HomeMeta: {
          homePageHeaderTitle,
          homePageHeaderPicture,
          homePageHeaderDescription,
          homePageDescription,
          homePageCollectablesDisplay,
        },
      },
    },
  } = useStaticQuery(graphql`
    query {
      wpcontent{
        page(id: "home", idType: URI) {
          HomeMeta {
            homePageHeaderTitle
            homePageHeaderPicture {
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
            homePageHeaderDescription
            homePageDescription
            homePageCollectablesDisplay {
              ... on WPGraphql_Collectable {
                id
                slug
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
              }
            }
          }
        }
      }
    }
  `)

  return (
    <Layout>
      <SEO title="Home" />
      <Wrapper>
        <div className="banner">
          <Image fluid={homePageHeaderPicture.imageFile.childImageSharp.fluid} alt={homePageHeaderPicture.altText} />
          <div className="inner-div">
            <p className="header-title">{homePageHeaderTitle}</p>
            <p className="header-description">{homePageHeaderDescription}</p>
          </div>
          <BottomEdgeUp color={COLORS.PRIMARY} />
        </div>
        <div className="description">
          <p>{homePageDescription}</p>
          <BottomEdgeUp color={COLORS.BLACK} />
        </div>
        <div className="collectables">
          <h2>Collectables</h2>
          <div className="collectable-items">
            {homePageCollectablesDisplay.map(({ Collectable, slug }) => (
              <Collect key={slug} to={`/${slug}`}>
                <Image fluid={Collectable.images.imageOne.imageFile.childImageSharp.fluid} alt={Collectable.images.imageOne.altText} />
                <div className="collectable-info">
                  <p>
                    {Collectable.name}
                  </p>
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

export default IndexPage