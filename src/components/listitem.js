import React from "react"
import styled from "styled-components"

const ListItem = ({ title, imagePath, author = "", type = "" }) => {
  return (
    <Container>
      <ImageContainer>
        <StyledImage src={imagePath} alt={title} />
      </ImageContainer>
      <Title>{title}</Title>
      <Author>{author}</Author>
    </Container>
  )
}

const Container = styled.div`
  margin: 12px 24px;
`

const Title = styled.h3`
  margin-top: 4px;
  margin-bottom 4px
`

const Author = styled.p`
  font-size: 0.8em;
  color: var(--darkGrey);
  font-family: Gilroy-LightItalic;
`

const ImageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.1);
  width: 160px;
  height: 160px;
`

const StyledImage = styled.img`
  object-fit: contain;
`

export default ListItem
