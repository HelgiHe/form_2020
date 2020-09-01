import React from "react"
import styled from "styled-components"

const ListItem = ({ title, imagePath, type = "" }) => {
  console.log(imagePath)
  return (
    <div>
      <h3>{title}</h3>
      <ImageContainer>
        <StyledImage src={imagePath} alt={title} />
      </ImageContainer>
    </div>
  )
}
//
const ImageContainer = styled.div`
  width: 160px;
  height: 110px;
`

//background-size
const StyledImage = styled.img`
  max-width: 100%;
  height: auto;
  object-fit: contain;
`

export default ListItem
