import React from "react"
import { Link, graphql } from "gatsby"
// import Slider from "react-slick"
import Slider from "../components/slider"
import Image from "gatsby-image"

import styled from "styled-components"
import Layout from "../components/layout"
import SEO from "../components/seo"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

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
  const settings = {
    dots: true,
    arrows: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 7000,
    pauseOnHover: true,
    pauseOnFocus: true,
    className: "slides",
  }

  return (
    <Layout>
      <SEO title="Heim" />
      <Slider featured={featured} />
      {/* <Slider {...settings}>
        {featured.map(item => {
          return (
            <ImageContainer key="item.title">
              <StyledImage fluid={item.image} alt={item.title} />
              <Link to={`/projects/${slugify(item.title)}`}>
                <ImageText>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </ImageText>
              </Link>
            </ImageContainer>
          )
        })}
      </Slider> */}
    </Layout>
  )
}

const ImageContainer = styled.div`
  width: 100vw;
  height: calc(100% - 80px);
  z-index: 0;
  background-color: var(--lightGrey);
`
const StyledImage = styled(Image)`
  object-fit: cover;
  width: 100vw;
  height: calc(100vh - 80px);
`

const ImageText = styled.div`
  position: absolute;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.4);
  color: white;
  height: 116px;
  width: 100vw;
  @media (min-width: 768px) {
    height: 220px;
    width: 340px;
    padding: 24px;
  }
`

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
