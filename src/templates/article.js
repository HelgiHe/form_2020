import React from "react"
import styled from "styled-components"
import Layout from "../components/layout"
import { ArrowBack } from "@material-ui/icons"

import { Link } from "gatsby"

const Article = ({ pageContext }) => {
  const { article } = pageContext
  return (
    <Layout>
      <Container>
        <Title>{article.node.title}</Title>
        <Author>{article.node.author}</Author>
        <NewsContainer>
          <StyledImage src={`${article.node.image.asset.url}?w=450`} />
          <TextContainer>
            {article.node.text[0]._rawChildren.map(text => (
              <StyledText key={text._key}>{text.text}</StyledText>
            ))}
          </TextContainer>
        </NewsContainer>
        <StyledLink to="/news">
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

const Author = styled.p`
  font-size: 0.8em;
  color: var(--darkGrey);
  font-family: Gilroy-LightItalic;
  margin-bottom: 12px;
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
  @media (min-width: 768px) {
    margin-right: 24px;
    max-width: 50%;
  }
`

export default Article
