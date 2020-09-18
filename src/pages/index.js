import React from "react"
import { graphql } from "gatsby"
import Slider from "../components/slider"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { gsap, Draggable, InertiaPlugin, SplitText, CSSPlugin } from "gsap/all"

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
      <Slider featured={featured} />
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

export default IndexPage
