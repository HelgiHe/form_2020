import React from "react"
import styled from "styled-components"
import Image from "gatsby-image"
import { gsap, ScrollTrigger } from "gsap/all"

const ListItem = ({ title, imagePath, author = "", type = "" }) => {
  return (
    <Container className="listItem-container">
      <ImageContainer>
        <StyledImage fluid={imagePath.fluid} alt={title} />
      </ImageContainer>
      <Title>{title}</Title>
      {author && <Author>{author}</Author>}
      {type && <Type>{type}</Type>}
    </Container>
  )
}

const Container = styled.div`
  margin: 12px 24px;
`

const Title = styled.h3`
  margin-top: 4px;
  margin-bottom 4px;
  font-family: Gilroy-Medium;
`

const Author = styled.p`
  font-size: 0.8em;
  color: var(--darkGrey);
  font-family: Gilroy-LightItalic;
`
const Type = styled.h5`
  margin-top: 3px;
  font-family: Gilroy-Regular;
`

const ImageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.1);
  width: 100%;
  @media (min-width: 768px) {
    width: 400px;
    height: 320px;
  }
`

const StyledImage = styled(Image)`
  object-fit: cover;
  width: 100%;
  @media (min-width: 768px) {
    width: 400px;
    height: 320px;
  }
`

export default ListItem
