import React from "react"
import styled from "styled-components"

const ListItem = ({ title, imagePath, author = "", type = "" }) => {
  return (
    <Container>
      <ImageContainer>
        <StyledImage src={imagePath} alt={title} />
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
  margin-bottom 4px
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
  width: 200px;
  height: 160px;
`

const StyledImage = styled.img`
  object-fit: cover;
  width: 200px;
  height: 160px;
`

export default ListItem
