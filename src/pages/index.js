import React from "react"
import { Link, graphql } from "gatsby"
import Slider from "react-slick"
import { slugify } from "../utils"
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
      image: item.node.imagesGallery[0].asset.url,
      description: item.node.description[0]._rawChildren[0].text,
    }
  })

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 7000,
    pauseOnHover: true,
    pauseOnFocus: true,
  }

  console.log(featured)

  return (
    <Layout>
      <SEO title="Heim" />
      <Slider {...settings}>
        {featured.map(item => {
          return (
            <ImageContainer>
              <StyledImage src={item.image} alt={item.title} />
              <Link to={`/verk/${slugify(item.title)}`}>
                <ImageText>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </ImageText>
              </Link>
            </ImageContainer>
          )
        })}
      </Slider>
    </Layout>
  )
}

const ImageContainer = styled.div`
  width: 100vw;
  height: calc(100% - 80px);
  z-index: 0;
  background-color: var(--lightGrey);
`
const StyledImage = styled.img`
  object-fit: cover;
  width: 100vw;
  height: calc(100vh - 80px);
`

const ImageText = styled.div`
  position: absolute;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.4);
  height: 250px;
  width: 350px;
  padding: 24px;
  color: white;
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
              url
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
