import React from "react"
import styled from "styled-components"
import { Link, useStaticQuery, graphql } from "gatsby"
import ListItem from "../components/listitem"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { slugify } from "../utils"

const News = () => {
  const data = useStaticQuery(graphql`
    query NewsQuery {
      allSanityNews(sort: { fields: [_createdAt], order: DESC }) {
        edges {
          node {
            title
            text {
              _rawChildren
            }
            image {
              asset {
                url
              }
            }
            author
            _createdAt
          }
        }
      }
    }
  `)
  const { allSanityNews } = data
  return (
    <Layout>
      <SEO title="Fréttir" />
      <div>
        <Title>Fréttir</Title>
        <NewsContainer>
          {allSanityNews.edges.map(newsItem => {
            return (
              <StyledLink
                to={`/news/${slugify(newsItem.node.title)}`}
                key={newsItem.node.title}
              >
                <ListItem
                  title={newsItem.node.title}
                  imagePath={`${newsItem.node.image.asset.url}?w=160`}
                  author={newsItem.node.author}
                />
              </StyledLink>
            )
          })}
        </NewsContainer>
      </div>
    </Layout>
  )
}
const StyledLink = styled(Link)`
  @media (max-width: 768px) {
    width: 100%;
  }
`

const Title = styled.h1`
  margin-left: 24px;
  font-family: Gilroy-bold;
`

const NewsContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`

export default News
