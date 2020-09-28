import React from "react"
import styled from "styled-components"
import Layout from "../components/layout"
import { ArrowBack } from "@material-ui/icons"
import gsap from "gsap"
import Image from "gatsby-image"
import AniLink from "gatsby-plugin-transition-link/AniLink"

const Article = ({ pageContext }) => {
  React.useEffect(() => {
    if (typeof document !== undefined) {
      const tl = gsap.timeline()
      tl.from(".text", {
        height: 0,
        delay: 0.3,
        duration: 0.6,
        ease: "power1",
        stagger: 0.5,
      })
        .from(".content", {
          opacity: 0,
          duration: 0.6,
          ease: "power1",
          stagger: 0.1,
        })
        .from(".backBtn", {
          opacity: 0,
          duration: 0.3,
          ease: "power1",
        })
    }
  }, [])
  const { article } = pageContext
  return (
    <Layout>
      <Container>
        <Title className="text">{article.node.title}</Title>
        <Author className="text">{article.node.author}</Author>
        <NewsContainer className="content">
          <StyledImage fluid={article.node.image.asset.fluid} />
          <TextContainer>
            {article.node.text[0]._rawChildren.map(text => (
              <StyledText key={text._key}>{text.text}</StyledText>
            ))}
          </TextContainer>
        </NewsContainer>
        <StyledLink
          to="/news"
          cover
          bg="#c9d6df"
          direction="left"
          className="backBtn"
        >
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
  overflow: hidden;
`

const StyledLink = styled(AniLink)`
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

const Author = styled.p`
  font-size: 0.8em;
  color: var(--darkGrey);
  font-family: Gilroy-LightItalic;
  margin-bottom: 12px;
  overflow: hidden;
`

const NewsContainer = styled.div`
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

const StyledImage = styled(Image)`
  margin: 12px 0px;
  object-fit: contain;
  min-width: 350px;
  @media (min-width: 768px) {
    margin-right: 24px;
    max-width: 50%;
  }
`

export default Article
