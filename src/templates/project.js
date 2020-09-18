import React from "react"
import styled from "styled-components"
import Layout from "../components/layout"
import { ArrowBack } from "@material-ui/icons"
import { Link } from "gatsby"

const Project = ({ pageContext }) => {
  const { project } = pageContext
  const [mainImage, setMainImage] = React.useState(
    project.node.imagesGallery[0].asset.url
  )
  return (
    <Layout>
      <Container>
        <Title>{project.node.title}</Title>
        <ProjectContainer>
          <StyledImage src={`${mainImage}?w=450`} />
          <TextContainer>
            {project.node.description[0]._rawChildren.map(text => (
              <StyledText key={text._key}>{text.text}</StyledText>
            ))}
          </TextContainer>
        </ProjectContainer>
        <ImagesContainer>
          <ExtraImageContainer>
            {project.node.imagesGallery.map(image => {
              return (
                <ExtraImage
                  src={`${image.asset.url}?w=450`}
                  alt={project.node.title}
                  onMouseEnter={() => setMainImage(`${image.asset.url}`)}
                  onClick={() => setMainImage(`${image.asset.url}`)}
                ></ExtraImage>
              )
            })}
          </ExtraImageContainer>
        </ImagesContainer>
        <StyledLink to="/projects">
          <ArrowBack /> <span>Til Baka</span>
        </StyledLink>
      </Container>
    </Layout>
  )
}

const Container = styled.article`
  padding: 0px 24px;
`
const Title = styled.h2`
  margin-bottom: 4px;
  font-family: Gilroy-Medium;
`

const ExtraImage = styled.img`
  height: 75px;
  width: 100px;
  object-fit: cover;
  margin-right: 12px;
  margin-bottom: 12px;
  filter: grayscale(100%);
  &:hover {
    filter: none;
  }
`

const ExtraImageContainer = styled.span`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-bottom: 24px;
`

const ImagesContainer = styled.span`
  display: flex;
  flex-direction: column;
`

const StyledLink = styled(Link)`
  margin-top: 12px;
  display: flex;
  align-items: center;
  margin-bottom: 24px;
  &:hover {
    svg {
      transition: all 0.22s ease-out;
      transform: translateX(-3px);
    }
  }
`

const ProjectContainer = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
  @media (min-width: 768px) {
    flex-direction: row;
  }
`
const TextContainer = styled.span`
  display: flex;
  flex-direction: column;
  font-family: Gilroy-Regular;
  font-size: 1.2em;
  margin-bottom: 24px;
  @media (min-width: 768px) {
    margin-left: 24px;
  }
`

const StyledText = styled.p`
  margin-top: 12px;
`

const StyledImage = styled.img`
  margin: 12px 0px;
  object-fit: contain;
  width: 100%;
  @media (min-width: 768px) {
    margin-right: 24px;
    width: 45%;
    max-width: 50%;
    max-height: 70vh;
  }
`

export default Project
