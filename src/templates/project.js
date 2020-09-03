import React from "react"
import styled from "styled-components"
import Layout from "../components/layout"
import { ArrowBack } from "@material-ui/icons"

import { Link } from "gatsby"

const Project = ({ pageContext }) => {
  const { project } = pageContext
  const [mainImage, setMainImge] = React.useState(
    project.node.imagesGallery[0].asset.url
  )
  console.log(project)
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
`

const StyledLink = styled(Link)`
  margin-top: 12px;
  display: flex;
  align-items: center;
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
  width: 45%;
  @media (min-width: 768px) {
    margin-right: 24px;
    max-width: 50%;
    max-height: 70vh;
  }
`

export default Project
