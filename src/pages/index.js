import React from "react"
import { graphql } from "gatsby"
import styled from "styled-components"
import Slider from "../components/slider"
import Layout from "../components/layout"
import SEO from "../components/seo"

const IndexPage = ({ data }) => {
  const {
    allSanityVerk: { edges },
  } = data
  const featured = edges.map(item => {
    return {
      title: item.node.title,
      image: item.node.imagesGallery[0].asset.fluid,
      description: item.node.description[0]._rawChildren[0].text,
    }
  })

  return (
    <Layout>
      <SEO title="Heim" />
      <SliderContainer>
        <Slider featured={featured} />
      </SliderContainer>
    </Layout>
  )
}

export const query = graphql`
  query Featured {
    allSanityVerk(filter: { featured: { eq: true } }) {
      edges {
        node {
          title
          featured
          imagesGallery {
            asset {
              fluid(maxWidth: 700) {
                src
                srcSet
                srcSetWebp
                srcWebp
                sizes
                base64
                aspectRatio
              }
            }
          }
          description {
            _rawChildren
          }
        }
      }
    }
  }
`
const SliderContainer = styled.div`
  width: 100vw;
  height: 84vh;
  height: calc(100% - 80px);
  @media (max-width: 769px) {
    z-index: 0;
    height: 79vh;
  }
`

export default IndexPage
