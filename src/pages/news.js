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
      <Container>
        <Title>Fréttir</Title>
        <NewsContainer>
          {allSanityNews.edges.map(newsItem => {
            return (
              <Link to={`/news/${slugify(newsItem.node.title)}`}>
                <ListItem
                  key="newsItem.node.title"
                  title={newsItem.node.title}
                  imagePath={`${newsItem.node.image.asset.url}?w=160`}
                  author={newsItem.node.author}
                />
              </Link>
            )
          })}
        </NewsContainer>
      </Container>
    </Layout>
  )
}

const Container = styled.div``

const Title = styled.h1`
  margin-left: 24px;
`

const NewsContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`

export default News
